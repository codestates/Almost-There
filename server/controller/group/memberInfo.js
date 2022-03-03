const { isAuthorized } = require('../tokenFunctions');
const { users_groups } = require('../../models');
const { users } = require('../../models');
const { _groups } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      // 토큰 회원 검증
      const userInfo = await isAuthorized(req);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        const { groupId } = req.query;
        const result = await users_groups.findAll({
          where: {
            groupId
          },
          include: _groups
        });
        const arr = [];
        for (let i = 0; i < result.length; i++) {
          a = result[i].dataValues.userId;
          b = result[i].dataValues.overtime;
          c = result[i].dataValues.arrive;
          arr.push({ userId: a, overtime: b, arrive: c });
        }
        const arr2 = [];
        for (let i = 0; i < arr.length; i++) {
          arr2.push(await users.findOne({
            where: { userId: arr[i].userId }
          }));
        }
        const arr3 = [];
        for (let i = 0; i < arr2.length; i++) {
          arr3.push(arr2[i].name);
        }
        for (let i = 0; i < arr.length; i++) { // arr = [{a:1,b:2,c:3},{a:1,b:2,c:3},{a:1,b:2,c:3}]
          for (let j = 0; j <= i; j++) { // arr3 = [d:4,d:5,d:6]
            arr[i].name = arr3[j];
          }
        }
        const result1 = await _groups.findOne({
          where: {
            id: groupId
          }
        });
        return res.status(200).send({ member: arr, groupInfo: result1.dataValues });
      }
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
// 그룹 정보랑 배열로 그룹인원 나오게
// 클라이언트에서 groupId 받아서 해당 그룹에 속한 유저와 해당 그룹의 정보 반환.
