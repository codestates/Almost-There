const { notifications_users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    const userInfo = await isAuthorized(req);
    if (!userInfo) {
      return res.status(401).send({ message: 'not authorized' });
    } else {
      try {
        const { id } = userInfo;
        const [receiverId, notifyId] = [req.body.receiverId, req.body.notifyId];
        const notice = await notifications_users.create({
          sender: id,
          receiver: receiverId,
          notifyId: notifyId
        });
        return res.status(201).send({ message: 'success' });
      } catch (err) {
        return res.status(500).send({ message: 'server error' });
      }
    }
  }
};
