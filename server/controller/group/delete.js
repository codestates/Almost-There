const { _groups, users_groups } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  delete: async (req, res) => {
    // ! req.query -> ?group=true || ?user=true
    const userInfo = await isAuthorized(req);
    if (!userInfo) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      const { userId, id } = userInfo;
      const groupId = req.body.groupId;
      console.log(userId, id, groupId);
      console.log(req.query);

      // ! 생성한 그룹 삭제 -> ?group=true
      if (req.query.group === 'true') {
        try {
          // 해당하는 그룹 조회 후 삭제(_groups, users_groups)
          await _groups.destroy({
            where: {
              leaderId: userId,
              id: groupId
            },
            include: users_groups
          });
          return res.send({ message: 'deleted' });
        } catch (err) {
          console.log(err);
          return res.status(500).send({ message: 'server error' });
        }
      }

      // ! 그룹 탈퇴 -> ?user=true
      if (req.query.user === 'true') {
        try {
          // users_groups에서 탈퇴하는 사람(userId)의 overtime을 불참(-1)으로 변경
          await users_groups.update({ overtime: -1 },
            {
              where: {
                groupId: groupId,
                userId: id
              }
            });
          return res.send({ message: 'success' });
        } catch (err) {
          console.log(err);
          res.status(500).send({ message: 'server error' });
        }
      }
    }
  }
};

// ! +그룹 탈퇴 알림(user=true)
// 그룹 탈퇴했다고 다른 3명(불참하지 않는 사람에게만)에게 알림

// 오류(서버)
// kakao, google에서 사용하는 이메일이 같다보니
// kakao로 먼저 로그인 -> google로 로그인할 때
// 또는 google로 먼저 로그인 -> kakao로 로그인할 때
// jwt 토큰이 발급되지 않는 문제 (social이 달라서 조회가 안 되는 듯)

/*
* 참고: https://sequelize.org/master/manual/assocs.html#basics-of-queries-involving-associations
* 참고2: https://sequelize.org/master/manual/creating-with-associations.html#belongsto---hasmany---hasone-association
* 테스트용 더미데이터

? users
INSERT INTO users(userId, name, password, email, social, createdAt, updatedAt) VALUES('test2', '테스트2', '2', 'abcd', 'AT', '2022-02-17', '2022-02-17');
INSERT INTO users(userId, name, password, email, social, createdAt, updatedAt) VALUES('test3', '테스트3', '3', 'abcde', 'AT', '2022-02-17', '2022-02-17');
INSERT INTO users(userId, name, password, email, social, createdAt, updatedAt) VALUES('test4', '테스트4', '4', 'abcdef', 'AT', '2022-02-17', '2022-02-17');

? _groups
INSERT INTO _groups(name, time, leaderId, place, createdAt, updatedAt) VALUES('group1', '2022-02-19', 'test', 'anywhere', '2022-02-17', '2022-02-17');

? users_groups
INSERT INTO users_groups(groupId, userId, overtime, createdAt, updatedAt) VALUES(6, 1, 5, '2022-02-17', '2022-02-17');
INSERT INTO users_groups(groupId, userId, overtime, createdAt, updatedAt) VALUES(6, 2, 6, '2022-02-17', '2022-02-17');
INSERT INTO users_groups(groupId, userId, overtime, createdAt, updatedAt) VALUES(6, 3, 7, '2022-02-17', '2022-02-17');
INSERT INTO users_groups(groupId, userId, overtime, createdAt, updatedAt) VALUES(6, 4, 8, '2022-02-17', '2022-02-17');

*/
