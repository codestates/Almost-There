require('dotenv').config();
const { users } = require('../../models');
const axios = require('axios');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');
const clientID = process.env.NAVER_CLIENT_ID;
const clientSecret = process.env.NAVER_CLIENT_SECRET;

module.exports = {
  post: async (req, res) => {
    // token -> 유저 정보 업데이트 -> jwt 토큰 -> cookie
    try {
      console.log('naver login start');
      // ! 인증한 코드 이용하여 접근 토큰 발급
      const [code, state] = [req.body.code, req.body.state];
      console.log(req.body);
      console.log(code, state);
      const tokenURL = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientID}&client_secret=${clientSecret}&code=${code}&state=${state}`;
      const result = await axios.get(tokenURL);
      const accessToken = result.data.access_token;
      // token_type: bearer, expires_in: 3600

      // ! 발급한 토큰으로 회원정보 조회
      if (!accessToken) { return res.status(400).send({ message: 'Bad Request' }); } else {
        const result = await axios.get('https://openapi.naver.com/v1/nid/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        // ! 소셜 로그인한 회원정보 조회 또는 추가(users 모델)
        if (!result.data) { return res.status(404).send({ message: 'Not Found' }); } else {
          const [userInfo] = await users.findOrCreate({
            where: { userId: result.data.response.email },
            defaults: {
              userId: result.data.response.email,
              name: result.data.response.nickname,
              email: result.data.response.email,
              social: 'naver'
            }
          });
          console.log(userInfo.dataValues);

          // ! jwt 토큰 발급
          delete userInfo.dataValues.password;
          const jwt = generateAccessToken(userInfo.dataValues);
          sendAccessToken(res, jwt);
          // console.log(res.get('Set-cookie'))
          return res.send({
            data: userInfo.dataValues
          });
        }
      }
    } catch (err) {
      return res.status(500).send({ message: 'server error' });
    }
  }
};
