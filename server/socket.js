const { authorizeSocket } = require('./controller/tokenFunctions');

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

    // disconnect
    socket.on('disconnect', (reason) => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    // error
    socket.on('error', (error) => {
      console.log(error);
    });

    // login
    socket.on('login', (payload) => {
      console.log(payload);
      try {
        // const userAdapter = io.of('/user').adapter;
        // console.log(userAdapter.nsp.name);

        socket.join(`user ${payload.userId}`);
        io.to(`user ${payload.userId}`).emit('login', `join room - user ${payload.userId}`);
        console.log(socket.rooms);
        return socket;
      } catch (err) {
        console.log(err);
      }
    });

    // logout
    socket.on('logout', (payload) => {
      console.log(socket.rooms);
      console.log(payload);
      try {
        io.emit('logout', 'logout');
      } catch (err) {
        console.log(err);
      }
    });

    // 'success' 이벤트 처리 테스트
    socket.on('success', async (payload) => {
      console.log('success');
      console.log(payload);
      try {
        const userInfo = await authorizeSocket(socket.handshake.headers.cookie);
        if (!userInfo) {
          return io.emit('success', 'fail: not authorized');
        }
        const { id, userId } = userInfo;
        console.log(id, userId);
        console.log(socket.rooms);
        io.emit('success', 'success again');
      } catch (err) {
        console.log(err);
      }
    });
  });

  return io;
};

// const count = io.engine.clientsCount;
// const count2 = io.of('/').sockets.size;
// console.log(count, count2);

// const uuid = require('uuid');
// io.engine.generated = (req) => uuid.v4();

// io.engine.on('connection_error', (err) => {
//   console.log(err.req);
//   console.log(err.code);
//   console.log(err.message);
//   console.log(err.context);
// });

/*

! Socket.io를 이용한 실시간 알림
Server: 특정 대상에게 그 알림 실시간으로 전송, 데이터베이스에 알림 내용 추가
Client: 특정 대상이 받은 알림 실시간으로 조회하여 사용자에게 전달

1) 로그인(notification room)
- 비로그인 때 온 알림 조회(notification/list)
- Socket 접속, 소속된 모든 그룹 채널에 연결 -> 그룹 정보 주고받기
  - login 상태가 true가 되면 접속 -> login 상태가 있는 최상위 컴포넌트가 어디?

2) 로그아웃
- login 상태가 false
- 연결된 모든 채널(room)에서 나가기(leave)

3) 그룹(group room)
- 그룹 생성할 때
  - 그 groupId 이름으로 채널(room) 생성 후 소속 인원들 연결(join)
  - 생성자 제외 나머지 그룹원들에게 초대 알림 전송
  (각자 notification room으로 보내기?)
  Client: 그룹 생성 버튼 클릭 -> onClick으로 서버에 알림 전송
  * 필요 데이터: 보내는 사람(sender) = userId,
  * 받는 사람(receiver) = 다른 그룹원 3명, 알림 종류(notifyId)
  {
    (OPTIONAL) sender: 클라이언트에서 자신의 id를 보내거나, 서버에서 토큰 해독하여 id 추출
    receiver: [2, 3, 4] // 그룹원의 id들을 배열로 전달
    notifyId: 1 // 목적에 따라 정해진 숫자(INTEGER)로 전달(쿼리)
  }  // 데이터 형식 자체는 객체
  (notification/send 이용?: 알림 보낸 거 notifications_users 테이블에 저장)
- 그룹 탈퇴할 때
  - 그 groupId 채널에서 나가기(leave)

4) 실시간 위치 정보 공유: ?????
- 약속시간 30분 전부터 watchPosition으로 각자 좌표 실시간 제공?
  - 약속시간 30분 전부터 작동하도록 group 생성할 때 그 채널에 미리 조건을 걸어놓기?
  - 위치 정보 공유 시작 시간을 실시간으로 관리하는 채널을 따로 만들어놓기?
- groupId 채널에서 각자 위치 정보 확인 버튼을 클릭할 때?
  - 실시간으로 제공되는 좌표를 가져와서 지도에 표시?

*/

// TODO: 로그인 때 소속된 모든 그룹 채널 접속
// 로그인할 때 알림 실시간으로 받기
// 로그인한 사람만 서비스 이용하도록 (인증)

// TODO: 로그아웃 -> 접속한 모든 채널 나가기(leave)

// TODO: 그룹 생성 -> groupId 이름의 room 생성, 초대된 그룹원들 접속
// * groupId room에서 받을 정보: 초대 알림, 도착 알림, 탈퇴 알림, (+ 실시간 위치 정보)
// 로그인할 때 그 groupId room에 접속

// 생성된 groupId 이름의 room에 접속(로그인 시)

// 그룹 생성 때 groupId 이름의 room 접속 (+ 다른 그룹원도)
// 초대 알림 전송

// 접속 시 room 연결
// 그 room에 있는 사람에게 메시지 보내기
