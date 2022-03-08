const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    try {
      const userInfo = await isAuthorized(req);
      if (!userInfo) {
        return res.status(401).send({ message: 'not authorized' });
      } else {
        return res.clearCookie('jwt').status(205).send({ message: 'Logged out successfully' });
      }
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
