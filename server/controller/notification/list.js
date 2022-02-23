const { notifications_users, notifications } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: async (req, res) => {
    const userInfo = await isAuthorized(req);
    if (!userInfo) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      try {
        const { id } = userInfo;
        const result = await notifications_users.findAll({
          where: {
            receiver: id
          },
          include: notifications
        });
        const notice = result.sort((a, b) => a.createdAt - b.createdAt);
        return res.send({ notice });
      } catch (err) {
        return res.status(500).send({ message: 'server error' });
      }
    }
  }
};

/*
* 테스트용 더미데이터

? users
INSERT INTO users(userId, name, password, email, social, createdAt, updatedAt) VALUES('test2', '테스트2', '2', 'abcd', 'AT', '2022-02-17', '2022-02-17');
INSERT INTO users(userId, name, password, email, social, createdAt, updatedAt) VALUES('test3', '테스트3', '3', 'abcde', 'AT', '2022-02-17', '2022-02-17');
INSERT INTO users(userId, name, password, email, social, createdAt, updatedAt) VALUES('test4', '테스트4', '4', 'abcdef', 'AT', '2022-02-17', '2022-02-17');

? notifications
INSERT INTO notifications(notifyType, createdAt, updatedAt) VALUES('test1', '2022-02-21', '2022-02-21');
INSERT INTO notifications(notifyType, createdAt, updatedAt) VALUES('test2', '2022-02-21', '2022-02-21');
INSERT INTO notifications(notifyType, createdAt, updatedAt) VALUES('test3', '2022-02-21', '2022-02-21');

? notifications_users
INSERT INTO notifications_users(sender, receiver, notifyId, createdAt, updatedAt) VALUES(1, 2, 1, '2022-02-21', '2022-02-21');
INSERT INTO notifications_users(sender, receiver, notifyId, createdAt, updatedAt) VALUES(1, 3, 2, '2022-02-20', '2022-02-20');
INSERT INTO notifications_users(sender, receiver, notifyId, createdAt, updatedAt) VALUES(4, 1, 3, '2022-02-19', '2022-02-19');
INSERT INTO notifications_users(sender, receiver, notifyId, createdAt, updatedAt) VALUES(3, 1, 1, '2022-02-18', '2022-02-18');

*/
