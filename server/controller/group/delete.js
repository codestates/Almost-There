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

      // ! 생성한 그룹 삭제 -> ?group=true
      if (req.query.group === 'true') {
        try {
          // 해당하는 그룹 조회 후 삭제(_groups, users_groups)
          await _groups.destroy({
            where: {
              leaderId: userId,
              id: groupId
            }
          });
          await users_groups.destroy({
            where: { groupId }
          });
          return res.send({ message: 'deleted' });
        } catch (err) {
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
          res.status(500).send({ message: 'server error' });
        }
      }
    }
  }
};

// ! +그룹 탈퇴 알림(user=true)
// 그룹 탈퇴했다고 다른 3명(불참하지 않는 사람에게만)에게 알림
