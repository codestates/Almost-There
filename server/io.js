const { users, users_groups, notifications_users } = require('./models');
// 유저가 도착완료 누를떄마다 socket(db바꿔주고, 받았을 때 db를 조회해서 유저가 전부 완료인지 아닌지 둘다)

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
      io.to(`pos ${payload.user.userId}`).emit('getPosition', {x:payload.position.x, y:payload.position.y} )
    });

    

    // ? getPosition: 다른 사람의 위치 정보 요청 시 요청한 클라이언트에 위치 정보 전달
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

    // ! 알림 핸들링
    // * 요청 데이터: { contents: 알림 종류, sender: 본인, groupId: 그룹 번호 }
    socket.on('notify', async (payload) => {
      if (payload.contents === 1) {
        // 초대 알림
      }

      if (payload.contents === 2) {

        // 도착 알림
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
          userId: ''
        };
        io.to(`group ${payload.groupId}`).emit('notify', '탈퇴 알림');
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
