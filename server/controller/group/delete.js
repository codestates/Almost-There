const { _groups, users_groups } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  delete: async (req, res) => {
    const userInfo = await isAuthorized(req);
    if (!userInfo) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      try {
        const { userId } = userInfo;
        const groupId = req.params.groupId;

        // 소속 그룹 탈퇴
        await users_groups.update({ 
          overtime: '00:00:00',
          arrive: 'leave'
        },
          { where: { groupId, userId } });

        // 다른 그룹원들도 모두 나간 상태면 그 그룹 정보 삭제
        const result = await users_groups.findAll({ where: { groupId } });
        const isAllMemberLeave = result.every(member => member.arrive === 'leave');
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
