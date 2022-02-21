const { _groups } = require('../../models');
const { users_groups } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  post: async (req, res) => {
    try {
      // const { name, time, place } = req.body
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        const { name, time, place } = req.body;
        const { userId } = userInfo;
        // if(!(name && time && place)){
        //   return res.status(400).send({ message: "bad request" })
        // }
        const group = await _groups.create({
          name: name,
          time: time,
          place: place,
          leaderId: userId
        });

        if (!group) {
          return res.status(500).send({ message: 'server error' });
        } else {
          await users_groups.create({
            groupId: group.dataValues.id
          });
          await users_groups.create({
            groupId: group.dataValues.id
          });
          await users_groups.create({
            groupId: group.dataValues.id
          });
          await users_groups.create({
            groupId: group.dataValues.id
          }); // 일단 하드코딩 중
        }
        console.log(group.dataValues.id);

        return res.status(201).send({ message: 'ok' });
      }
      // group생성하고 생성된 id를  users_groups groupId에 추가 (map(?) 사용해서 그룹 구성원 수만큼)
      // 해당 그룹 구성원 아이디를 받아서 userId에 추가
    } catch (err) {
      console.log('err!!!!!!!');
    }
  }
};
