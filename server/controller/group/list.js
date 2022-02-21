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
        const { id } = userInfo;
        console.log(id);
        const result = await users_groups.findAll({
          where: {
            userId: id,
            overtime: { [Op.ne]: -1 }
          },
          include: _groups
        });
        const groups = result.sort((a, b) => a._group.time - b._group.time);

        return res.send({ groups });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'server error' });
      }
    }
  }
};
