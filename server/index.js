const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();
const httpServer = createServer(app);
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
    origin: 'http://localhost:3000',
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

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('send message', (item) => {
    const msg = item.name + ': ' + item.message;
    console.log(msg);
    io.emit('receive message', { name: item.name, message: item.message });
  });
  socket.on('disconnect', () => {
    console.log('disconnected', socket.id);
  });
  // ...
});

io.emit('success', '서버에서 메시지 보냄');

app.listen(PORT, () => {
  console.log(`HTTP server listen on ${PORT}`);
});

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
