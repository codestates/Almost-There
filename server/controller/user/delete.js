const { users, _groups, users_groups } = require('../../models');
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
        await _groups.destroy({
          where: {
            leaderId: userId
          },
          include: users_groups
        });
        return res.status(200).send({ message: 'successfully deleted' });
      }
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};
