const config = require('../config/vars.ts');

async function verify_token (req, res, next) {
  try {
    const { token } = req.query;

    if (!token) {
      throw new Error('Login to access this feature');
    }

    const request_headers = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await fetch(config.KEYCLOAK.USERINFO, request_headers);
    req.userInfo = await response.json();

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { verify_token }