const { users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  delete: async (req, res) => {
    try {
      const userInfo = await isAuthorized(req);
      if (!userInfo) {
        return res.status(401).send({ message: 'not authorized' });
      } else {
        const { userId } = userInfo;
        await users.destroy({ where: { userId } });
        return res.status(200).send({ message: 'successfully deleted' });
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'server error' });
    }
  }
};

// ! 추가: userId가 leaderId인 그룹(생성한 그룹) 삭제
