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

});

// group생성 후 group name or id로 room 생성
// 생성된 room으로 소속된(초대 받은) 인원 연결('join')
//io.to(방의 아이디).emit('이벤트명', 데이터); // 그룹 전체
//socket.broadcast.to(방의 아이디).emit('이벤트명', 데이터); // 나를 제외한 그룹 전체
//io.to("room1").to("room2").to("room3").emit("some event");//동시에 여러 room으로 emit가능
//위의 방식으로 room에 포함된 인원들에게 초대 알림 전송하기
// //user가 소속된 room 알아내는 법 ===> socket.id(?)로 구분???