const { _groups } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  delete: async (req, res) => {
    // ! req.query -> group=true || user=true
    console.log(req.query);

    // ! 생성한 그룹 삭제 -> ?group=true
    if (req.query.group === 'true') {
      try {
        // 토큰으로 회원 인증()
        const userInfo = isAuthorized(req);
        if (!userInfo) { return res.status(404).send({ message: 'Bad Request' }); }
        const { userId } = userInfo;
        console.log(userId);
        const id = req.body.id;

        // 해당하는 그룹 조회 후 //삭제(_groups)
        const group = await _groups.findOne({
          where: {
            leaderId: userId,
            id: id
          }
        });
        console.log(group.dataValues);

        res.send({ message: group });

        // 그 그룹과 관련된 데이터 삭제(users_groups) - groupId로 조회

        // 그룹 삭제는 알림이 가는건가?
            // 
      } catch (err) {
        res.status(500).send({ message: 'server error' });
      }
    }

    // ! 그룹 탈퇴 -> ?user=true
    if (req.query.user === 'true') {
      try {
        // + 그룹 탈퇴 알림
        // users_groups에서 탈퇴하는 사람(userId)의 overtime을 '불참'으로 변경

        // 그룹 탈퇴했다고 다른 3명(불참하지 않는 사람에게만)에게 알림
      } catch (err) {
        res.status(500).send({ message: 'server error' });
      }
    }
  }
};

// ! 추가: /user (DELETE) 생성한 그룹 삭제 -> users_groups에서도 삭제