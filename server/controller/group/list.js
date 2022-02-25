const { _groups, users_groups } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { Op } = require('sequelize');

module.exports = {
  get: async (req, res) => {
    const userInfo = await isAuthorized(req);
    if (!userInfo) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      try {
        const { userId } = userInfo;
        const result = await users_groups.findAll({
          where: {
            userId: userId,
            overtime: { [Op.ne]: null }
          },
          include: _groups
        });
        const groups = result.sort((a, b) => a._group.time - b._group.time);

        return res.send({ groups });
      } catch (err) {
        return res.status(500).send({ message: 'server error' });
      }
    }
  }
};
