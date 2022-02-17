const { users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  delete: async (req, res) => {
    try {
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        const { userId } = userInfo;
        const user = await users.findOne({
          where: { userId }
        });
        if (!user) { return res.status(401).send({ message: 'not authorized' }); } else {
          await users.destroy({ where: { userId } });
          return res.status(200).send({ message: 'successfully deleted' });
        }
      }
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};

// ! 추가: userId가 leaderId인 그룹(생성한 그룹) 삭제
