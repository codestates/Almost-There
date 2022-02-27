// const { authorizeSocket } = require('./controller/tokenFunctions');
const { users_groups } = require('./models');

module.exports = function (server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS']
    }
  });

  // ! connection
  io.on('connection', async (socket) => {
    console.log(`user connected: ${socket.id}`);
    // console.log(socket.rooms);
    // console.log(socket.adapter);
    // console.log(socket.namespace);

    // ! disconnect
    socket.on('disconnect', (reason) => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    // ! error
    socket.on('error', (error) => {
      console.log(error);
    });

    // login
    socket.on('login', async (payload) => {
      // console.log('login', payload);
      try {
        // const userAdapter = io.of('/user').adapter;
        // console.log(userAdapter.nsp.name);

        // console.log(socket.handshake.headers);
        // console.log(payload);
        const userId = payload.userId;
        // console.log(userId)

        if (!userId) { return io.emit('login', 'fail: not authorized'); }
        socket.join(`user ${userId}`)

        const result = await users_groups.findAll({
          where: { userId }
        });

        // 채널 들어가기
        for (let i = 0; i < result.length; i++) {
          // console.log(result[i].dataValues);
          socket.join(`group ${result[i].dataValues.groupId}`);
          io.to(`group ${result[i].dataValues.groupId}`).emit('login', `join group ${result[i].dataValues.groupId}`);
        } //1,2,3
        console.log(socket.rooms);
        socket.on('thisUser', (payload) => {
          socket.join(payload)
          // socket.emit('join ok', 'join ok')
        })
        // 
      } catch (err) {
        console.log(err);
      }
    });

    // create group
    // a가 그룹:1을 생성 -> 그룹1 룸에 a를 조인 -> b,c초대받은 유저의 개인 룸에 emit으로 메시지 전송 
    socket.on('createRoom', (payload) => {
      console.log(payload)
      socket.join(`group ${payload.room}`)
      io.to(`group ${payload.room}`).emit('createRoom',`join group ${payload.room}`)
      console.log(socket.rooms)
    })
    socket.on('inviteId',(payload) => {
      console.log(payload.inviteId)
      for(let i = 0; i < payload.inviteId.length; i++){
        io.to(`user ${payload.inviteId[i]}`).emit('inviteId', `group ${payload.room}번 모임에서 초대가 왔습니다.`)
      }
    })
    // a = 초대 알림을 받음
    // b = 초대 알림을 받음
    // a,b => 알림을 받은 그룹의 룸에 조인해줘야함

    // logout
    socket.on('logout', (payload) => {
      // console.log(payload);
      try {
        io.emit('logout', 'logout');
        // 채널 나가기
        const rooms = socket.rooms;
        rooms.forEach((room) => {
          console.log(room);
          room.includes('group') ? socket.leave(room) : null;
          room.includes('user') ? socket.leave(room) : null;
        });
        console.log(socket.rooms);
      } catch (err) {
        console.log(err);
      }
    });

    // 'success' 이벤트 처리 테스트
    // socket.on('success', async (payload) => {
    //   console.log('success');
    //   console.log(payload);
    //   try {
    //     const userInfo = await authorizeSocket(socket.handshake.headers.cookie);
    //     if (!userInfo) {
    //       return io.emit('success', 'fail: not authorized');
    //     }
    //     const { id, userId } = userInfo;
    //     console.log(id, userId);
    //     console.log(socket.rooms);
    //     io.emit('success', 'success again');
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });
  });

  return io;
};

// TODO: 그룹 생성 -> groupId 이름의 room 생성, 초대된 그룹원들 접속
// * groupId room에서 받을 정보: 초대 알림, 도착 알림, 탈퇴 알림, (+ 실시간 위치 정보)
// 로그인할 때 그 groupId room에 접속
// !group/create


/* 2022-02-24
! 로그인 때 소속된 모든 그룹 채널 접속
로그인할 때 알림 실시간으로 받기
로그인한 사람만 서비스 이용하도록 (인증) 

! 로그아웃 -> 접속한 모든 채널 나가기(leave)

room은 새로고침 전까지(socket.id가 바뀌기 전까지) 계속 유지됨.
- 서버 재시작, 클라이언트 새로고침 -> ???

login -> 로그인을 할 때 user state의 값이 서버에 제대로 전달되지 않음
(첫 로그인, 소셜 로그인)

1인 1소켓을 어떻게? -> Props로 소켓을 다룰 수 있는지

header -> logout을 해도 user state 값이 변하지 않음(setUser)

*/