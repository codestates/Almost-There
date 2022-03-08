const { users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    try {
      const { userId } = req.body;
      const result = await users.findOne({
        where: { userId }
      });
      if (!result) {
        return res.status(200).send({ message: `Can Use ${userId}` });
      } else {
        return res.status(409).send({ message: 'already exists' });
      }
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
