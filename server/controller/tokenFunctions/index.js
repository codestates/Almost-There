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
    const token = cookie.split(/[=;]/)[1];
    try {
      return verify(token1, process.env.ACCESS_SECRET, (err, result) => {
        if (err) return null;
        else return result;
      });
    } catch (err) {
      return null;
    }
  }
};
