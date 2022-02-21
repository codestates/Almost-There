const { _groups } = require('../../models');
const { users_groups } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  post: async(req, res) => {
    try{
      // 토큰으로 회원 검증 => userId 뽑아내서 leaderId로 넣어주기
      const userInfo = isAuthorized(req)
      if(!userInfo){
        return res.status(400).send({ message: 'bad request' })
      } else {
      const { name, time, place, inviteId } = req.body  
      const { userId } = userInfo
      // 클라이언트에서 받은 body정보로 그룹 생성
      const group = await _groups.create({
        name: name,
        time: time,
        place:place,
        leaderId: userId
      })

      if(!group){
        return res.status(500).send({ message: 'server error' })
      }else{
        await users_groups.create({
          userId: userId,
          groupId: group.dataValues.id
        })
      // 반복문 돌려서 초대 인원만큼 users_groups 테이블에 groupId, userId 추가
        for(let i = 0; i < inviteId.length; i ++){
          await users_groups.create({
            groupId:group.dataValues.id,
            userId: inviteId[i]
          })
        }
      }    
      return res.status(201).send({ message: "ok" })
      }

    }catch(err){
      console.log('err!!!!!!!')
    }
  }
};
