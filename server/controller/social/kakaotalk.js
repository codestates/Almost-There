const { users } = require('../../models');
const { default: axios } = require('axios');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = {
  post: async(req, res) => {
    try{
      const { authorizationCode } = req.body
      
    //   client에서 코드 값 구할 때 필요한 링크, 하단 링크로 화면 렌더해서(window.location.assign??) 로그인 시키고 주소창에 코드값 뽑아내서 서버로 보내기 (서버로 보낼 때 body에 authorizationCode='코드값')
    //   https://kauth.kakao.com/oauth/authorize?client_id=b970094488545e537ca59bdbb9c5ce65&redirect_uri=https://localhost:3000&response_type=code
      
    //   client에서 받은 code로 google access_token 요청
      const result = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&code=${authorizationCode}`
      )
 
    //   access_token으로 회원정보 요청
      const kakaoUserInfo = await axios.get(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: {
            Authorization: `Bearer ${result.data.access_token}`,
          },
        }
      )
      console.log(result.data.access_token)
    //   받아온 회원정보 users테이블에 추가
      const userInfo = await users.findOrCreate({
        where: {
          email:kakaoUserInfo.data.kakao_account.email,
          social: 'kakao'
        },
        defaults: {
          email: kakaoUserInfo.data.kakao_account.email,
          userId: kakaoUserInfo.data.kakao_account.profile.nickname,
          password: '',
          social:'kakao'
        }
      })
    //   받아온 회원정보로 almost there 사이트 토큰 발급
      console.log(userInfo[0].dataValues)
      const jwt = generateAccessToken(userInfo[0].dataValues)
      console.log(jwt)
      sendAccessToken(res,jwt)
      return res.status(200).send({ data: userInfo[0].dataValues });
    }
    catch(err){
      return res.status(500).send({ message: 'server error' });
    }
  }
};
