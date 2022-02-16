const { users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: async (req, res) => {
    try {
      const userInfo = isAuthorized(req);
      console.log(userInfo)
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        const { userId } = userInfo;
        const user = await users.findOne({
          attributes: ['id', 'userId', 'name', 'email', 'createdAt', 'updatedAt'],
          where: { userId }
        });

        if (!user) { return res.status(404).send({ message: 'Not Found' }); } else {
          return res.status(200).send({ user });
        }
      }
    } catch (err) {
      res.status(500).send({ message: 'server error' });
    }
  }
};
