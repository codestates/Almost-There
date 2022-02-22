const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const app = express();
const httpServer = require('http').createServer(app);
const PORT = process.env.PORT || 4000;
const userRouter = require('./routes/user');
const groupRouter = require('./routes/group');
const notificationRouter = require('./routes/notification');
const socialRouter = require('./routes/social');

// const models = require('./models');
// models.sequelize.sync({ force: false });

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })
);

app.get('/', (req, res) => {
  res.send('<h1> Hello World </h1>');
});
app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/notification', notificationRouter);
app.use('/social', socialRouter);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }
});

const count = io.engine.clientsCount;
const count2 = io.of('/').sockets.size;
console.log(count, count2);

const uuid = require('uuid');
io.engine.generated = (req) => uuid.v4();

io.engine.on('connection_error', (err) => {
  console.log(err.req);
  console.log(err.code);
  console.log(err.message);
  console.log(err.context);
});

io.on('connection', (socket) => {
  console.log('connection');

  // // room join 테스트
  // socket.join('test room');
  // io.to('test room').emit('testRoom', 'in test room');
  // // console.log(socket.rooms.size);
  // console.log(socket.rooms);

  // // Socket.io 접속 테스트
  // socket.on('init', (payload) => {
  //   console.log(payload);
  // });

  // // 'success' 이벤트 처리 테스트
  // socket.on('success', (payload) => {
  //   console.log('success');
  //   console.log(payload);
  //   io.emit('success', 'success again');
  // });

  socket.on('test', (payload) => {
    console.log(payload);
  });

  // disconnection
  // socket.on('disconnecting', () => {
  //   console.log(socket.rooms);

  //   socket.on('disconnect', () => {
  //     console.log(socket.rooms.size);
  //   });
  // });
});

httpServer.listen(PORT, () => {
  console.log(`HTTP server listen on ${PORT}`);
});

// module.exports = io;

// const fs = require("fs");
// const https = require("https");

// let server;
// if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(PORT, () => console.log("server runnning"));

// } else {
//   server = app.listen(PORT)
// }

// module.exports = server;

/*

! Socket.io를 이용한 실시간 알림
Client: TEST 버튼 클릭 -> onClick으로 서버에 알림 전송
* 필요 데이터: 보내는 사람(sender) = userId,
* 받는 사람(receiver) = 다른 그룹원 3명, 알림 종류(notifyId)
{
  (OPTIONAL) sender: 클라이언트에서 자신의 id를 보내거나, 서버에서 토큰 해독하여 id 추출
  receiver: [2, 3, 4] // 그룹원의 id들을 배열로 전달
  notifyId: 1 // 목적에 따라 정해진 숫자(INTEGER)로 전달(쿼리)
}  // 데이터 형식 자체는 객체

Server: 특정 대상에게 그 알림 실시간으로 전송, 데이터베이스에 알림 내용 추가
Client: 특정 대상이 받은 알림 실시간으로 조회하여 사용자에게 전달

TODO0: (핵심) 실시간 위치 정보 제공: 여러 사람과 동시에 실시간 소통이 되도록하기(room)
- group 생성할 때 그 groupId 이름의 room 만들어서 초대된 사람들이 그 room에 접속되도록?
- 그룹 페이지 들어갈 때 room에 connect된다?

TODO1: 로그인할 때 알림 조회(notification/list => 특정 room에 join하여 실시간 접속?)
TODO2: 이벤트 발생 -> 보낼 사람에게 알림 보내기 -> 실시간으로 표시
TODO3: 알림 보냄 -> 서버에서 어떻게 처리?
- 서버 내부에서 API 사용(/notification/send)
- 받는 사람 room에 알림 실시간으로 전송

! >> 로그인
Client: 로그인 인증 요청
Server: 비로그인 때 있었던 알림들 전송(이건 비교적 간단한 듯),
본인 userId 이름의 room 접속
Client: 받은 알림들 표시, 배정된 socket에 실시간 접속

? Header에서 login 상태에 따라 다르게 보임
-> login 상태면 login modal 또는 header에서 socket.on('connect'), room join
-> logout 상태면 socket.on('disconnect')


? 자주 보이는 단어
on, emit, broadcast, room, namespace

*/