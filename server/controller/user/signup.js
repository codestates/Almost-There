const crypto = require('crypto');
const { users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    try {
      const { userId, password, name, email } = req.body;
      if (!(userId && password && name && email)) {
        return res.status(400).send({ message: 'bad request' });
      }
      const hashPassword = crypto.createHash('sha512').update(password).digest('hex');
      const [userInfo] = await users.findOrCreate({
        where: { userId },
        defaults: { userId, password: hashPassword, name, email, social: 'AT' },
        raw: true
      });
      delete userInfo.dataValues.password;
      const jwt = generateAccessToken(userInfo.dataValues);
      sendAccessToken(res, jwt);
      return res.status(201).send({ message: 'ok' });
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
