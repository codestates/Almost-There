const group = require('.');
const { _groups } = require('../../models');
const { users_groups } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  post: async (req, res) => {
    try {
      // 토큰 회원 검증 => userId 뽑아내서 해당 userId에 body로 받은 overtime 추가하기
      const userInfo = await isAuthorized(req);
      if (!userInfo) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        const { groupId, overtime } = req.body;
        const { userId } = userInfo;
        // groupId에 속하는 userId 찾아서 overtime 값 변경 // 그룹 두개에 같은 userId가 포함되어 있을 수 있기 때문에 조건에 groupId 달아줘야함
        const result = await users_groups.update({
          overtime: overtime
        }, {
          where: {
            groupId: groupId,
            userId: userId
          }
        });
        return res.status(200).send({ message: 'ok' });
      }
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
