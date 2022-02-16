const { default: axios } = require('axios');
const { users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async(req, res) => {
    try{
    const { authorizationCode } = req.body
   
    //   client에서 코드 값 구할 때 필요한 링크, 하단 링크로 화면 렌더해서(window.location.assign??) 로그인 시키고 주소창에 코드값 뽑아내서 서버로 보내기 (서버로 보낼 때 body에 authorizationCode='코드값')
    //   https://accounts.google.com/o/oauth2/auth?client_id=956548166940-5urgkjv390ubtuent2rp26ah8e2jk1rn.apps.googleusercontent.com&redirect_uri=https://localhost:3000&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile

    
    //   client에서 받은 code로 google access_token 요청
    const result = await axios.post(
      `https://oauth2.googleapis.com/token?code=${authorizationCode}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.REDIRECT_URI}&grant_type=authorization_code`,
      {
        headers: { accept: 'application/json'}
      }
    )
    
    // access_token으로 회원정보 요청
    const googleUserInfo = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.data.access_token}`, { 
        headers: { 
          authorization: `token ${result.data.access_token}`, 
          accept: 'application/json' 
        }})
    // 받아온 회원정보 users 테이블에 삽입
    const userInfo = await users.findOrCreate({
      where: {
        email: googleUserInfo.data.email,
        social: 'google'
      },
      defaults: {
        email: googleUserInfo.data.email,
        userId: googleUserInfo.data.name,
        password: '',
        social: 'google'
      }
    })
    // 받아온 회원정보로 almost there 사이트 토큰 발급
    const jwt = generateAccessToken(userInfo[0].dataValues)
    console.log(jwt)
    sendAccessToken(res,jwt)
    return res.status(200).send({ data: userInfo[0].dataValues });
   }catch(err){
    return res.status(500).send({ message: 'server error' });
}

  }
};
