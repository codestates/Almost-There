const { _groups, users_groups } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { Op } = require('sequelize')

module.exports = {
  get: async (req, res) => {
    const userInfo = await isAuthorized(req);
    if (!userInfo) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      try {
        const { id } = userInfo;
        console.log(id);
        const groups = await users_groups.findAll({
          where: {
            userId: id,
            overtime: { [Op.ne]: -1 }
          }
        });
        return res.send({ groups });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'server error' });
      }
    }
  }
};
