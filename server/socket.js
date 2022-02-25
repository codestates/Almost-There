const { users, users_groups, notifications_users } = require('./models');

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
        socket.join(`user ${userId}`);

        // 채널 들어가기(소속된 그룹)
        const result = await users_groups.findAll({ where: { userId } });
        for (let i = 0; i < result.length; i++) {
          socket.join(`group ${result[i].dataValues.groupId}`);
        }
        console.log(socket.rooms);
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
          room.includes('user') ? socket.leave(room) : null;
        });
        console.log(rooms);
      } catch (err) {
        io.emit('error', err);
      }
    });

    // ! (Client) 실시간 알림: notice
    // 로그인 중인 사용자에게 알림이 왔을 때
    // socket.on('notice', (payload) => {
    //   // ~~~
    // })

    // ! 실시간 위치 정보: user/latlng (POST)
    // ? 로그인한 사용자의 위치를 실시간으로 관리
    // 로그인하면 본인 위치를 실시간으로 서버에 전달
    // - 클라이언트에서 일정 시간마다 user/latlng (POST) 요청?
    // - 클라이언트에서 일정 시간마다 socket.io 이벤트로 서버에 전달?
    // setTimeout?

    // ? getPosition: 다른 사람의 위치 정보 요청 시 요청한 클라이언트에 위치 정보 전달
    // * 요청 데이터: { userId: 본인, target: 대상 }
    // - 사용자의 위도&경도를 조회하는 API가 없음
    // - socket.io 이벤트로 전달
    socket.on('getPosition', async (payload) => {
      console.log(`user ${payload.userId} requests GET POSITION: user ${payload.target}`);
      const result = await users.findOne({
        attributes: ['lat', 'lng'],
        where: { userId: payload.target }
      });
      io.to(`user ${payload.userId}`).emit('getPosition', {
        lat: result.dataValues.lat,
        lng: result.dataValues.lng
      });
    });

    // ? arrive: 목적지에 도착했을 때 그 목적지와 연관된 그룹에 도착했음을 전달
    // * 요청 데이터: { groupId: 그룹 번호 }
    // 본인 위치 ~ 목적지까지의 거리를 계산하다가 조건 달성하면
    // 실시간으로 그 그룹원들에게 도착 소식 전달
    // ? 서버에서 본인 위치 & 목적지 위치 거리 계산 -> 조건 달성하면 클라이언트에 이벤트 전달
    // ? + 도착 알림 다른 그룹원들에게 알리기
    socket.on('arrive', async (payload) => {
      console.log('arrived');

      // 약속시간 30분 전 안인지 확인하고 알림 보내야함
      io.to(`group ${payload.groupId}`).emit('notice', '도착 알림');
    });

    // ! 그룹 생성: group/create (POST)
    // groupId 1번 -> group 1 room 만들어서 -> 초대한 사람들도 실시간으로 group 1에 연결
    // 로그인할 때 본인 room에도 입장시켜서, 초대할 때 동일한 userId room에다가 보내면

    // a -> group 1 => io.to('c').emit('초대', '초대됨')
    // b, c
    // b -> [ 로그인X ] // c -> [ c ] -> socket.on('초대' -> '채널 접속') -> socket.on('채널 접속' -> group 1)

    // ! 그룹 탈퇴: group/:groupId (DELETE)
    // * 요청 데이터: { userId: 본인, groupId: 그룹 번호, groupMember: [1, 2, 3, ...] }
    socket.on('leave', async (payload) => {
      console.log(`user ${payload.userId} leave group ${payload.groupId}`);
      for (let i = 0; i < payload.groupMember.length; i++) {
        await notifications_users.create({
          sender: payload.userId,
          receiver: payload.groupMember[i],
          notifyId: 3
        });
      }
      socket.leave(`group ${payload.groupId}`);
      io.to(`group ${payload.groupId}`).emit('notice', '탈퇴 알림');
    });
  });

  return io;
};

/* 2022-02-25
! 로그인 때 소속된 모든 그룹 채널 접속: 성공
room은 새로고침 전까지(socket.id가 바뀌기 전까지) 계속 유지됨.
- 서버 재시작하면 socket.id 바뀜.
- 클라이언트 새로고침은 해도 socket.id 유지됨

! 로그아웃 -> 접속한 모든 채널 나가기(leave): 성공
로그아웃할 때 user state가 변하지 않음(setUser) -> 헤더

! 그룹 탈퇴
! 도착 알림: 조건 어떻게 계산할지
---------------------
1인 1소켓을 어떻게? -> Props로 소켓을 다룰 수 있는지
로그인 -> AT는 잘 되지만, 소셜 로그인은 user 값을 제대로 못 가져옴.

TODO: (Client) 로그인할 때 notification/list 요청하여 알림왔는지 파악하기

*/
