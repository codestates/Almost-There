const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: (req, res) => {
    try {
      const userInfo = isAuthorized(req);
      if (userInfo) {
        return res.clearCookie('jwt').status(205).send({ message: 'Logged out successfully' });
      }
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
