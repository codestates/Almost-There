const { users } = require('../../models');
const crypto = require('crypto');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    try {
      const { userId, password } = req.body;
      const hashPassword = crypto.createHash('sha512').update(password).digest('hex');

      const result = await users.findOne({
        where: {
          userId,
          password: hashPassword
        }
      });

      if (!result) {
        return res.status(401).send({ message: 'Invalid user or password' });
      }
      delete result.dataValues.password;
      const jwt = generateAccessToken(result.dataValues);
      sendAccessToken(res, jwt);
      return res.status(200).send({ data: result.dataValues });
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
