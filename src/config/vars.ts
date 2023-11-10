module.exports = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  KEYCLOAK: {
    USERINFO: `${process.env.KEYCLOAK_SERVER_URL}realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`
  },
};