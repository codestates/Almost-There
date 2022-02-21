const { users } = require('../../models');
const { generateAccessToken, sendAccessToken, isAuthorized } = require('../tokenFunctions');

module.exports = {
  put: async (req, res) => {
    try {
      const userInfo = await isAuthorized(req);
      if (!userInfo) {
        return res.status(401).send({ message: 'not authorized' });
      } else {
        const { userId } = userInfo;
        const [name, email] = [req.body.name, req.body.email];
        const updateInfo = {
          name: name,
          email: email
        };
        await users.update(updateInfo, {
          where: { userId }
        });

        const data = await users.findOne({
          attributes: ['id', 'userId', 'email', 'name', 'createdAt', 'updatedAt'],
          where: { userId }
        });
        res.clearCookie('jwt');
        const jwt = generateAccessToken(data.dataValues);
        sendAccessToken(res, jwt);
        return res.status(200).send({
          info: data.dataValues,
          message: 'user info successfully modified'
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  }
};
