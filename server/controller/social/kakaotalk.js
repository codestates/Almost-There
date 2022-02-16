const { users } = require('../../models');
const axios = require('axios')

module.exports = {
  post: async(req, res) => {
    try{
      const CLIENT_ID = process.env.KAKAO_CLIENT_ID
      const REDIRECT_URI = process.env.REDIRECT_URI
      const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    
      const result = await axios.get(KAKAO_AUTH_URL)
      console.log(result)
    //console.log(result.config.url) //code가 나오는 리다이렉트 된 페이지 
    //console.log(result.request.res.responseUrl + "11") //카카오 로그인 창 주소
    }
    catch(err){
      console.log('server error')
    }
  }
};
