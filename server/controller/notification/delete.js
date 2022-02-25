const { notifications_users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  delete: async (req, res) => {
    const userInfo = await isAuthorized(req);
    if (!userInfo) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      try {
        const { userId } = userInfo;
        await notifications_users.destroy({
          where: {
            id: req.params.notificationId,
            receiver: userId
          }
        });
        return res.send({ message: 'deleted' });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'server error' });
      }
    }
  }
};
