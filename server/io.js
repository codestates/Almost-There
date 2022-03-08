const { users, users_groups, notifications_users, _groups } = require('./models');
const { Op } = require('sequelize');

module.exports = function (server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: process.env.REDIRECT_URI,
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS']
    }
  });

  // ! connection
  io.on('connection', async (socket) => {
    console.log(`user connected: ${socket.id}`);

    // ! disconnect
    socket.on('disconnect', (reason) => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    // ! error
    socket.on('error', (error) => {
      console.log(error);
    });

    // ! login
    socket.on('login', async (payload) => {
      console.log(`user ${payload.userId} login`);
      try {
        const userId = payload.userId;
        if (!userId) { return io.emit('error', 'not authorized'); }

        // 채널 들어가기(본인 아이디)
        socket.join(`notice ${userId}`);

        // 채널 들어가기(소속된 그룹)
        const result = await users_groups.findAll({ where: { userId } });
        for (let i = 0; i < result.length; i++) {
          socket.join(`group ${result[i].dataValues.groupId}`);
        }
      } catch (err) {
        io.emit('error', err);
      }
    });

    // ! logout
    socket.on('logout', (payload) => {
      console.log(`user ${payload.userId} logout`);
      try {
        // 채널 나가기
        const rooms = socket.rooms;
        rooms.forEach((room) => {
          room.includes('group') ? socket.leave(room) : null;
          room.includes('notice') ? socket.leave(room) : null;
        });
      } catch (err) {
        io.emit('error', err);
      }
    });

    // ! create group / 그룹 생성: group/create (POST)
    socket.on('joinGroup', (groupId) => {
      socket.join(`group ${groupId}`);
      io.to(`group ${groupId}`).emit('joinGroup', `join group ${groupId}`);
    });

    // ! 실시간 위치 정보
    // 내 위치 정보 -> 도착 여부 알려주기
    // 업데이트 -> 업데이트 될 때 마다 본인 userId room 에다가 x,y를 보내주기
    socket.on('sendPosition', async (payload) => {
      console.log(payload.position.x);
      console.log(payload.position.y);
      const updateData = {
        x: payload.position.x,
        y: payload.position.y
      };
      await users.update(updateData, {
        where: { userId: payload.user.userId }
      });
      // 도착 여부 판별
      const groups = await users_groups.findAll({
        where: {
          userId: payload.user.userId,
          arrive: { [Op.ne]: 'leave' }
        },
        include: _groups
      });
      // 도착시간과 현재시간 비교
      const filter = groups.filter((el) => {
        const a = new Date(el.dataValues._group.dataValues.time).getTime();
        const b = new Date().getTime();
        return (Number(Math.floor((a - b) / (1000 * 60))) - 540)< 10;
      });
      // console.log(filter);

      // 목적지와 현재위치 비교
      filter.forEach(async (el) => {
        // 위도 1도 110,000m, 경도 1도 88,740m
        const mx = payload.position.x + Math.floor(Math.random() * 100) / 1000 ;
        const my = payload.position.y + Math.floor(Math.random() * 100) / 1000 ;
        const tx = Math.floor(Number(el.dataValues._group.dataValues.x) * 10000) / 10000;
        const ty = Math.floor(Number(el.dataValues._group.dataValues.y) * 10000) / 10000;
        // Math.sqrt((Math.pow((mx - tx) * 88740)) + Math.pow(my-ty) * 110,000) 
        // console.log(Math.pow(((mx - tx) * 88740), 2), my, ty);
        console.log(el.dataValues._group.dataValues.place);
        console.log( Math.sqrt( Math.pow(((mx - tx) * 88740), 2) + Math.pow(((my - ty) * 110,000), 2) ) );
        // if ((Math.floor(payload.position.x * 100) / 100) === (Math.floor(el.dataValues._group.dataValues.x * 100) / 100) &&
        // (Math.floor(payload.position.y * 100) / 100) === (Math.floor(el.dataValues._group.dataValues.y * 100) / 100)) {
        if ( Math.sqrt( Math.pow(((mx - tx) * 88740), 2) + Math.pow(((my - ty) * 110,000), 2) ) < 50) {
          const update = await users_groups.update({ arrive: 'true' },
            {
              where: {
                groupId: el.dataValues.groupId,
                userId: el.dataValues.userId,
                arrive: { [Op.ne]: 'true' }
              }
            });
          console.log('a', update);
          if (update[0] > 0) {
            const groupMembers = await users_groups.findAll({
              where: {
                groupId: el.dataValues.groupId,
                userId: { [Op.ne]: el.dataValues.userId },
                arrive: { [Op.ne]: 'leave'}
              }
            });
            for (let i = 0; i < groupMembers.length; i++) {
              const notice = await notifications_users.create({
                sender: el.dataValues.userId,
                receiver: groupMembers[i].dataValues.userId,
                notifyId: 2,
                groupId: el.dataValues.groupId //groupId => el.dataValues.groupId
              });
              io.to(`notice ${groupMembers[i].dataValues.userId}`)
              .emit('notify', 'arrive', payload.userId, notice.dataValues.id, el.dataValues.groupId, el.dataValues._group.dataValues.groupName);
            }
            console.log('send arrive');
            io.to(`group ${el.dataValues.groupId}`).emit('arrive', `${el.dataValues.groupId}`, el.dataValues.userId, 'true');
          }
        }
      });

      io.to(`pos ${payload.user.userId}`).emit('getPosition', { x: payload.position.x, y: payload.position.y });
    });

    // ! getPosition: 다른 사람의 위치 정보 요청 시 요청한 클라이언트에 위치 정보 전달
    socket.on('getPosition', async (userId) => {
      const result = await users.findOne({
        attributes: ['x', 'y'],
        where: { userId }
      });
      io.to(`pos ${userId}`).emit('getPosition', {
        x: result.dataValues.x,
        y: result.dataValues.y
      });
    });

    // ! overtime
    socket.on('overtime', async (groupId, userId, time) => {
      await users_groups.update({ overtime: time }, {
        where: { groupId, userId }
      });
      io.to(`group ${groupId}`).emit('overtime', groupId, userId, time);
    });

    // ! notify / 알림
    socket.on('notify', async (type, sender, groupId) => {
      const group = await _groups.findOne({ where: { id: groupId } });
      if (group) {
        const groupName = group.dataValues.name;
        const groupMembers = await users_groups.findAll({
          where: {
            groupId: groupId,
            userId: { [Op.ne]: sender },
            arrive: { [Op.ne]: 'leave' }
          }
        });
  
        // 초대 알림
        if (type === 'invite') {
          for (let i = 0; i < groupMembers.length; i++) {
            const notice = await notifications_users.create({
              sender: sender,
              receiver: groupMembers[i].dataValues.userId,
              notifyId: 1,
              groupId: groupId
            });
            io.to(`notice ${groupMembers[i].dataValues.userId}`).emit('notify', type, sender, notice.dataValues.id, groupId, groupName);
          }
        }
  
        // 도착 알림
        if (type === 'arrive') {
          for (let i = 0; i < groupMembers.length; i++) {
            const notice = await notifications_users.create({
              sender: sender,
              receiver: groupMembers[i].dataValues.userId,
              notifyId: 2,
              groupId: groupId
            });
            io.to(`notice ${groupMembers[i].dataValues.userId}`).emit('notify', type, sender, notice.dataValues.id, groupId, groupName);
          }
        }
  
        // 탈퇴 알림
        if (type === 'leave') {
          for (let i = 0; i < groupMembers.length; i++) {
            const notice = await notifications_users.create({
              sender: sender,
              receiver: groupMembers[i].dataValues.userId,
              notifyId: 3,
              groupId: groupId
            });
            io.to(`notice ${groupMembers[i].dataValues.userId}`).emit('notify', type, sender, notice.dataValues.id, groupId, groupName);
          }
          socket.leave(`group ${groupId}`);
          io.to(`group ${groupId}`).emit('leave', groupId, sender, 'leave');
        }
      }
    });

    // ! join
    socket.on('join', (userId) => {
      console.log('join', userId);
      socket.join(`pos ${userId}`);
    });

    // ! leave
    socket.on('leave', (userId) => {
      console.log('leave', userId);
      socket.leave(`pos ${userId}`);
    });
  });
  return io;
};

/*

! 쓰지 않는 API 삭제 -> notification/send (POST), user/info (GET) query 옵션

! 알림 -> 불참한 사람 제외하는 쿼리 추가

! notifications_users 필드 추가 -> notify 이벤트에 그룹 관련 정보 포함

*/

// notifications_users id
// socket ('notify' 이벤트) ->
// type, sender, notifyId(알림의 고유번호), groupId, groupName
