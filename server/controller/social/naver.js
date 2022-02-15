require('dotenv').config();
const axios = require('axios');

const clientID = process.env.NAVER_CLIENT_ID;
const clientSecret = process.env.NAVER_CLIENT_SECRET;
const state = Math.floor((Math.random() * (99999 - 10000)) + 10000); // RAMDOM_STATE
const redirectURI = encodeURI('http://localhost:3000');

module.exports = {
    post: async (req, res) => {
      try {
          console.log('naver login')
        // ! 네이버 API로 로그인 인증
        // 네이버 로그인 버튼을 누르면 로그인 인증 요청
        let loginURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientID}&state=${state}&redirect_uri=${redirectURI}`;
        res.redirect(302, loginURL);
        // res.end("<a href='"+ loginURL + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");

        // ! 인증한 코드 이용하여 접근 토큰 발급 -> 데이터베이스에 없으면 그 회원정보 저장(users 모델)
        // app.get('/callback', function (req, res) {
        //       code = req.query.code;
        //       state = req.query.state;
        //       api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        //        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
        //       var request = require('request');
        //       var options = {
        //           url: api_url,
        //           headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
        //        };
        //       request.get(options, function (error, response, body) {
        //         if (!error && response.statusCode == 200) {
        //           res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        //           res.end(body);
        //         } else {
        //           res.status(response.statusCode).end();
        //           console.log('error = ' + response.statusCode);
        //         }
        //       });
        //     });
      } catch (err) {
        return res.status(500).send({ message: 'server error' });
      }
    }
  };
  

// ! 발급한 토큰으로 회원정보 조회(user/info로 가능한지 확인)

        

//  module.exports = async (req, res) => {
//     console.log(req.body)
//     // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
//     // TODO : 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청
//     // 을 보냅니다. 다음 링크를 참고하세요.
//     // https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps#2-users-are-redirected-back-to-your-site-by-github
    
//     // POST https://github.com/login/oauth/access_token
//     const body = {
//       client_id: clientID,
//       client_secret: clientSecret,
//       code: req.body.authorizationCode
//     };
//     const token = await axios.post('https://github.com/login/oauth/access_token', body);
//     let result;
//     if (!token.data.access_token) {
//       result = token.data.split('=')[1].split('&')[0];
//     }
//     res.status(200).json({
//       accessToken: token.data.access_token || result
//     });
//   }
  