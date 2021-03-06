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
const io = require('./io')(httpServer);
const models = require('./models');

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
// models.sequelize.sync({ force: true });
httpServer.listen(PORT, () => {
  console.log(`HTTP server listen on ${PORT}`);
});
