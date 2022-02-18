const group = require('.');
const { _groups } = require('../../models');
const users_groups = require('../../models/users_groups');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  post: async(req, res) => {
    try{
      // 토큰에서 userId 뽑아서 받은 그룹아이디로 해당 그룹에서 일치하는 userId찾아서 overtime 추가하기 
      const { id, overtime } = req.body
      const userInfo = isAuthorized(req)
      console.log(userInfo)
      if(!userInfo){
        return res.status(400).send({ message: 'bad request' })
      }
      console.log('123123')
      const result = await users_groups.findOne({
        where: { groupId: id}
      })
      console.log('456456')
      if(!result){
        return res.status(400).send({ message: 'bad request2 '})
      } else {
        const updateInfo = {
          overtime: overtime
        }
        await result.update(updateInfo, {
          where: { id }
        })
        return res.status(200).send({ message: "ok" })
      }
      
      
    }catch(err){
      console.log('error')
    }
  }
};
