const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 4000;
const userRouter = require('./routes/user');
const groupRouter = require('./routes/group');
const notificationRouter = require('./routes/notification');
const socialRouter = require('./routes/social');
const httpServer = require('http').createServer(app);
const io = require('./socket')(httpServer);
// const models = require('./models');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.REDIRECT_URI,
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
// models.sequelize.sync({ force: false });
httpServer.listen(PORT, () => {
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
