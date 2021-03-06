const { notifications_users, _groups } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: async (req, res) => {
    const userInfo = await isAuthorized(req);
    if (!userInfo) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      try {
        const { userId } = userInfo;
        const result = await notifications_users.findAll({
          where: {
            receiver: userId
          },
          include: _groups
        });
        const notice = result.sort((a, b) => a.createdAt - b.createdAt);
        return res.send({ notice });
      } catch (err) {
        return res.status(500).send({ message: 'server error' });
      }
    }
  }
};
