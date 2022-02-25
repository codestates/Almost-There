const { users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  post: async (req, res) => {
    try {
      const userInfo = await isAuthorized(req);
      if (!userInfo) {
        return res.status(401).send({ message: 'not authorized' });
      } else {
        const { userId } = userInfo;
        const { lat, lng } = req.body;
        const updateInfo = {
          lat: lat,
          lng: lng
        };
        console.log(lat, lng);
        await users.update(updateInfo, {
          where: { userId: userId }
        });
        return res.status(200).send({ message: 'ok' });
      }
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
