const { notifications, notifications_users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const userInfo = await isAuthorized(req);
    if (!userInfo) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      try {
        // 알림 보낸 거 데이터베이스에 추가
        // from, to, contents, createdAt + 시간순으로 나열
        const [to, contents] = [req.body.to, req.body.contents];
        const result = await notifications
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'server error' });
      }
    }
  }
};

/*
* 테스트용 더미데이터
? notifications
INSERT INTO notifications(contents, createdAt, updatedAt) VALUES('test', '2022-02-17', '2022-02-17');
INSERT INTO notifications(contents, createdAt, updatedAt) VALUES('test', '2022-02-18', '2022-02-18');
INSERT INTO notifications(contents, createdAt, updatedAt) VALUES('test', '2022-02-19', '2022-02-19');


? notifications_users
INSERT INTO notifications_users(notifyId, from, to, createdAt, updatedAt) VALUES(1, 'test', 'test2', '2022-02-17', '2022-02-17');
INSERT INTO notifications_users(from, to, notifyId, createdAt, updatedAt) VALUES('test', 'test3', 2, '2022-02-18', '2022-02-18');
INSERT INTO notifications_users(from, to, notifyId, createdAt, updatedAt) VALUES('test4', 'test', 3, '2022-02-19', '2022-02-19');

INSERT INTO notifications_users(from, to) VALUES('test', 'test2');

*/