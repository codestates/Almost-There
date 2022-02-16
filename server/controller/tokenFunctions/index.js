require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1d' });
  },
  sendAccessToken: (res, jwt) => {
    res.cookie('jwt', jwt, {
      httpOnly: true,
      sameSite: 'None',
      secure: true
    });
  },
  isAuthorized: (req) => {
    const cookie = req.headers.cookie;
    if (!cookie) {
      return null;
    }
    const token = cookie.split('jwt=')[1].split('; ')[0];
    try {
      return verify(token, process.env.ACCESS_SECRET, (err, result) => {
        if (err) return null;
        else return result;
      });
    } catch (err) {
      return null;
    }
  }
};
