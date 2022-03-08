const { users } = require('../../models');
const crypto = require('crypto');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  put: async (req, res) => {
    try {
      const [password, newPassword] = [req.body.password, req.body.newPassword];
      const hashPassword = crypto.createHash('sha512').update(password).digest('hex');
      const userInfo = await isAuthorized(req);
      if (!userInfo) {
        return res.status(401).send({ message: 'not authorized' });
      } else {
        const { userId } = userInfo;
        const user = await users.findOne({
          attributes: ['id', 'name', 'email', 'userId', 'createdAt', 'updatedAt'],
          where: { userId: userId, password: hashPassword }
        });

        if (!user) { return res.status(401).send({ message: 'not authorized' }); } else {
          const hashNewPassword = crypto.createHash('sha512').update(newPassword).digest('hex');
          const updateInfo = {
            password: hashNewPassword
          };
          await users.update(updateInfo, {
            where: { userId }
          });
          return res.status(200).send({
            message: 'password successfully changed'
          });
        }
      }
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
