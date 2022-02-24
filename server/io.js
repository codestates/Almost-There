var app = require("express")();
var http = require("http").createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: '*',
        credentials: true
    }
});

var port = 4000;
http.listen(port, () => {
  console.log("listening on *:" + port);
});
app.get('/', (req, res) => {
    res.send('<h1> Hello World </h1>');
  });

io.on('connection', function (socket) {
  console.log(socket.id, 'Connected');

socket.on('그룹 생성', function (data){
  console.log(data)
  socket.emit('그룹 생성 확인', 'Server 그룹 생성 확인했습니다.')
})

// socket.emit('msg', `${socket.id} 연결 되었습니다.`);
  
// socket.on('msg', function (data) {
//     socket.emit('msg', `Server : "${data}" 받았습니다.`);
//   });
// 그룹 생성이 클릭됐을 떄 클라이언트에서 해당 내용을 받고 서버에서 room으로 넣고 해당 room에 초대 알림 발송
// 클라이언트에서 알림받고 알림창에 띄우기, 수락? or 거절? or 렌더링?
socket.join('test room'); // 초대 받은 클라이언트 개인마다 접속되게끔

io.to('test room').emit('test room',`${socket.rooms} 테스트 메시지입니다.`)

console.log(socket.rooms)
// const rooms = io.of("/").adapter.rooms;
// console.log(rooms)

});

// group생성 후 group name or id로 room 생성
// 생성된 room으로 소속된(초대 받은) 인원 연결('join')
//io.to(방의 아이디).emit('이벤트명', 데이터); // 그룹 전체
//socket.broadcast.to(방의 아이디).emit('이벤트명', 데이터); // 나를 제외한 그룹 전체
//io.to("room1").to("room2").to("room3").emit("some event");//동시에 여러 room으로 emit가능
//위의 방식으로 room에 포함된 인원들에게 초대 알림 전송하기
// //user가 소속된 room 알아내는 법 ===> socket.id(?)로 구분???

// ! Socket.io를 이용한 실시간 알림
// Server: 특정 대상에게 그 알림 실시간으로 전송, 데이터베이스에 알림 내용 추가
// Client: 특정 대상이 받은 알림 실시간으로 조회하여 사용자에게 전달
// 1) 로그인(notification room)
// - 비로그인 때 온 알림 조회(notification/list)
// - Socket 접속, 소속된 모든 그룹 채널에 연결 -> 그룹 정보 주고받기
//   - login 상태가 true가 되면 접속 -> login 상태가 있는 최상위 컴포넌트가 어디?
// 2) 로그아웃
// - login 상태가 false
// - 연결된 모든 채널(room)에서 나가기(leave)
// 3) 그룹(group room)
// - 그룹 생성할 때
//   - 그 groupId 이름으로 채널(room) 생성 후 소속 인원들 연결(join)
//   - 생성자 제외 나머지 그룹원들에게 초대 알림 전송
//   (각자 notification room으로 보내기?)
//   Client: 그룹 생성 버튼 클릭 -> onClick으로 서버에 알림 전송
//   * 필요 데이터: 보내는 사람(sender) = userId,
//   * 받는 사람(receiver) = 다른 그룹원 3명, 알림 종류(notifyId)
//   {
//     (OPTIONAL) sender: 클라이언트에서 자신의 id를 보내거나, 서버에서 토큰 해독하여 id 추출
//     receiver: [2, 3, 4] // 그룹원의 id들을 배열로 전달
//     notifyId: 1 // 목적에 따라 정해진 숫자(INTEGER)로 전달(쿼리)
//   }  // 데이터 형식 자체는 객체
//   (notification/send 이용?: 알림 보낸 거 notifications_users 테이블에 저장)
// - 그룹 탈퇴할 때
//   - 그 groupId 채널에서 나가기(leave)
// 4) 실시간 위치 정보 공유: ?????
// - 약속시간 30분 전부터 watchPosition으로 각자 좌표 실시간 제공?
//   - 약속시간 30분 전부터 작동하도록 group 생성할 때 그 채널에 미리 조건을 걸어놓기?
//   - 위치 정보 공유 시작 시간을 실시간으로 관리하는 채널을 따로 만들어놓기?
// - groupId 채널에서 각자 위치 정보 확인 버튼을 클릭할 때?
//   - 실시간으로 제공되는 좌표를 가져와서 지도에 표시?
// */

// TODO: 로그인 때 소속된 모든 그룹 채널 접속
// 로그인할 때 알림 실시간으로 받기
// 로그인한 사람만 서비스 이용하도록 (인증)

// TODO: 로그아웃 -> 접속한 모든 채널 나가기(leave)



// 그룹 생성 때 groupId 이름의 room 접속 (+ 다른 그룹원도)
// 초대 알림 전송