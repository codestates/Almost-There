const { _groups, users_groups } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  delete: async (req, res) => {
    // ! req.query -> ?id=(NUMBER)
    const userInfo = await isAuthorized(req);
    if (!userInfo) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      try {
        const { userId } = userInfo;
        const groupId = req.query.groupId;

        // 소속 그룹 탈퇴
        await users_groups.update({ overtime: null },
          { where: { groupId, userId } });
        
        // 다른 그룹원들도 모두 나간 상태면 그 그룹 정보 삭제
        const result = await users_groups.findAll({ where: { groupId } });
        const isAllMemberLeave = result.every(member => member.overtime === null);
        if (isAllMemberLeave) {
          await _groups.destroy({
            where: { id: groupId }
          });
          await users_groups.destroy({
            where: { groupId }
          });
        }
        return res.send({ message: 'success' });
      } catch (err) {
        return res.status(500).send({ message: 'server error' });
      }
    }
  }
};

// ! +그룹 탈퇴 알림(user=true)
// 그룹 탈퇴했다고 다른 3명(불참하지 않는 사람에게만)에게 알림

/*

? _groups
INSERT INTO _groups(name, time, leaderId, place, lat, lng, createdAt, updatedAt) VALUES('group1', '2022-02-24', 'yeonlee199900@gmail.com', 'anywhere', '0', '0', '2022-02-24', '2022-02-24');

? users_groups
INSERT INTO users_groups(groupId, userId, overtime, createdAt, updatedAt) VALUES(1, 'yeonlee199900@gmail.com', '00:00:00', '2022-02-24', '2022-02-24');
INSERT INTO users_groups(groupId, userId, overtime, createdAt, updatedAt) VALUES(1, 'test2', null, '2022-02-24', '2022-02-24');
INSERT INTO users_groups(groupId, userId, overtime, createdAt, updatedAt) VALUES(1, 'test3', null, '2022-02-24', '2022-02-24');
INSERT INTO users_groups(groupId, userId, overtime, createdAt, updatedAt) VALUES(1, 'test4', null, '2022-02-24', '2022-02-24');


UPDATE users_groups SET overtime='00:00:00' WHERE userId='yeonlee199900@gmail.com';
UPDATE users_groups SET overtime='00:00:00' WHERE userId='test2';
UPDATE users_groups SET overtime=null WHERE userId='test2';

*/
