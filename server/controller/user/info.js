const { users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: async (req, res) => {
    try {
      const userInfo = await isAuthorized(req);
      if (!userInfo) {
        return res.status(401).send({ message: 'not authorized' });
      } else {
        const { userId } = userInfo;
        const user = await users.findOne({
          attributes: ['id', 'userId', 'name', 'email', 'x', 'y', 'createdAt', 'updatedAt'],
          where: { userId }
        });
        return res.status(200).send({ user });
      }
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
