const { _groups } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  post: async(req, res) => {
    try{
      const { name, time, place } = req.body
      const userInfo = isAuthorized(req)
      console.log(userInfo)
      if(!userInfo){
        return res.status(400).send({ message: 'bad request' })
      }
      const { userId } = userInfo
      if(!(name && time && place)){
        return res.status(400).send({ message: "bad request" })
      }
      const group = await _groups.create({
        name: name,
        time: time,
        place:place,
        leaderId: userId
      })

      return res.status(201).send({ message: "ok" })
      
    }catch(err){
      console.log('err!!!!!!!')
    }
  }
};
