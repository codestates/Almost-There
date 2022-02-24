const { isAuthorized } = require('../tokenFunctions');
const { users_groups } = require('../../models');
const { _groups } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      // 토큰 회원 검증
      const userInfo = await isAuthorized(req);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        const { groupId } = req.query;
        // groupId, userId, overtime
        const result = await users_groups.findAll({
          where: {
            groupId 
          },
          include: _groups
        });
        return res.status(200).send({ result });
      }
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};

// 클라이언트에서 groupId 받아서 해당 그룹에 속한 유저와 해당 그룹의 정보 반환.
