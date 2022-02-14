require('dotenv').config();

const clientID = process.env.NAVER_CLIENT_ID;
const clientSecret = process.env.NAVER_CLIENT_SECRET;
// const axios = require('axios');

module.exports = async (req, res) => {
//   console.log(req.body)
//   // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
//   // TODO : 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청
//   // 을 보냅니다. 다음 링크를 참고하세요.
//   // https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps#2-users-are-redirected-back-to-your-site-by-github
  
//   // POST https://github.com/login/oauth/access_token
//   const body = {
//     client_id: clientID,
//     client_secret: clientSecret,
//     code: req.body.authorizationCode
//   };
//   const token = await axios.post('https://github.com/login/oauth/access_token', body);
//   let result;
//   if (!token.data.access_token) {
//     result = token.data.split('=')[1].split('&')[0];
//   }
//   res.status(200).json({
//     accessToken: token.data.access_token || result
//   });
}