const { users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: async (req, res) => {
    try {
      const userInfo = await isAuthorized(req);
      if (!userInfo) {
        return res.status(401).send({ message: 'not authorized' });
      } else {
        if (req.query.id) {
          // const id = req.query.id;
          // const user = await users.findOne({
          //   attributes: ['id', 'userId', 'name', 'email'],
          //   where: { id }
          // });
          // return res.status(200).send({ user });
        } else {
          const { userId } = userInfo;
          const user = await users.findOne({
            attributes: ['id', 'userId', 'name', 'email', 'createdAt', 'updatedAt'],
            where: { userId }
          });
          return res.status(200).send({ user });
        }
      }
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
