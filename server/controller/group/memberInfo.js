const { isAuthorized } = require('../tokenFunctions');
const { users_groups } = require('../../models');

module.exports = {
  post: async (req, res) => {
    try {
      // 토큰 회원 검증
      const userInfo = await isAuthorized(req);
      console.log(userInfo);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        const { groupId } = req.body;
        // groupId, userId, overtime
        const result = await users_groups.findAll({
          where: { groupId }
        });
        return res.status(200).send({ result });
      }
    } catch (err) {
      console.log('err!!!!!!!!!');
    }
  }
};
