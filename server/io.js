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
        console.log(socket.rooms);
        socket.on('thisUser', (payload) => {
          socket.join(payload)
        })
      } catch (err) {
        io.emit('error', err);
      }
    });

    // ! create group
    socket.on('createRoom', (payload) => {
      console.log(payload);
      socket.join(`group ${payload.room}`);
      io.to(`group ${payload.room}`).emit('createRoom', `join group ${payload.room}`);
      console.log(socket.rooms);
    });
    socket.on('notify', async(notify, sender, groupId) => {
      const result = await users_groups.findAll({
        where : {groupId: groupId}
      })
      for (let i = 0; i < result.length; i++) {
        io.to(`notice ${result[i].userId}`).emit('notify', `group ${groupId}번 모임에서 초대가 왔습니다.`);
      }
    })
    // ! 실시간 위치 정보
    // 내 위치 정보 -> 도착 여부 알려주기
    // { user: { userId, email, name }, position: { x, y } }
    socket.on('sendPosition', async (payload) => {
      // 업데이트 -> 업데이트 될 때 마다 본인 userId room 에다가 x,y를 보내주기
      console.log(payload.position.x);
      const updateData = {
        x: payload.position.x,
        y: payload.position.y
      }
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
        let a = new Date(el.time).getTime();
        let b = new Date().getTime();
        return Number(Math.floor(a-b/1000 * 60)) < 10;
      });
      console.log(filter);

      // 목적지와 현재위치 비교
      filter.forEach(async (el) => {
        if ( (Math.floor(el.x*100)/100) === (Math.floor(data.x*100)/100) &&
        (Math.floor(el.y*100)/100) === (Math.floor(data.y*100)/100) ) {
          await users_groups.update({ arrive: 'true' },
          { where: {
            groupId: el.groupId,
            userId: el.userId
            }
          });
          const data = {
            contents: 2,
            userId: el.userId
          }
          io.to(`group ${el.groupId}`).emit('notify', data);
        }
      });

      io.to(`pos ${payload.user.userId}`).emit('getPosition', {x:payload.position.x, y:payload.position.y} )
    });

    // ! getPosition: 다른 사람의 위치 정보 요청 시 요청한 클라이언트에 위치 정보 전달
    // * 요청 데이터: { userId: 본인, target: 대상 }
    // - 사용자의 위도&경도를 조회하는 API가 없음
    // - socket.io 이벤트로 전달
    socket.on('getPosition', async (payload) => {
      // console.log(user requests GET POSITION: user `${payload.target}`);
      const result = await users.findOne({
        attributes: ['x', 'y'],
        where: { userId: payload }
      });
      io.to(`pos ${payload}`).emit('getPosition', {
        x: result.dataValues.x,
        y: result.dataValues.y
      });
    });
    

    // socket.on('arrive', async(payload) => {
    //   const updateInfo = { arrive: 'Yes'}
    //   await users_groups.update(updateInfo, {
    //     where: {
    //       userId: payload.userId,
    //       groupId: payload.groupId
    //     }
    //   })
    //   // group의 user들이 모두 도착 상태면 클라이언트로 소켓 보내기
    //   const result = await users_groups.findAll({
    //     where: { groupId: payload.groupId} // result[0]
    //   })
    // })

    // ! overtime
    socket.on('overtime', async (payload) => {
      // groupId: string, userId: string, time: string
      await users_groups.update({ overtime: payload.time },
        { where: {
          groupId: payload.groupId,
          userId: payload.userId
        }
      });
      const data = {
        overtime: payload.time,
        userId: payload.userId
      }
      io.to(`group ${payload.groupId}`).emit('overtime', data);
    });    

    // ! 알림 핸들링
    // * 요청 데이터: { contents: 알림 종류, sender: 본인, groupId: 그룹 번호 }
    socket.on('notify', async (payload) => {
      if (payload.contents === 1) {
        // 초대 알림
        for (let i = 0; i < payload.groupMember.length; i++) {
          await notifications_users.create({
            sender: payload.userId,
            receiver: payload.groupMember[i],
            notifyId: 1
          });
          const data = {
            contents: 1,
            userId: payload.groupMember[i]
          }
          io.to(`user ${payload.groupMember[i]}`).emit('notify', data);
        }          
      }
      // console.log(payload.inviteId);
      // for (let i = 0; i < payload.inviteId.length; i++) {
      //   io.to(`user ${payload.inviteId[i]}`).emit('inviteId', `group ${payload.room}번 모임에서 초대가 왔습니다.`);
      // }

      if (payload.contents === 2) {

        // 도착 알림
        for (let i = 0; i < payload.groupMember.length; i++) {
          await notifications_users.create({
            sender: payload.userId,
            receiver: payload.groupMember[i],
            notifyId: 2
          });
        }
        const data = {
          contents: 2,
          userId: payload.userId
        };
        io.to(`group ${payload.groupId}`).emit('notify', data);
      }

      if (payload.contents === 3) {
        // 탈퇴 알림
        console.log(`user ${payload.userId} leave group ${payload.groupId}`);
        for (let i = 0; i < payload.groupMember.length; i++) {
          await notifications_users.create({
            sender: payload.userId,
            receiver: payload.groupMember[i],
            notifyId: 3
          });
        }
        socket.leave(`group ${payload.groupId}`);
        const data = {
          contents: 3,
          userId: payload.userId
        };
        io.to(`group ${payload.groupId}`).emit('notify', data);
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
        console.log(rooms);
      } catch (err) {
        io.emit('error', err);
      }
    });
    // ! join
    socket.on("join", (payload) => {
      console.log(payload)
      console.log('join', payload);
      socket.join(`pos ${payload}`)
    })

    socket.on("leave", (payload) => {
      console.log('leave', payload);
      socket.leave(`pos ${payload}`)
    })
  });
  return io;
};
