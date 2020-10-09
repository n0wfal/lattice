const DOMAIN = process.env.DOMAIN || 'AUHT0_DOMAIN';

const CLIENT_ID = process.env.CLIENT_ID || 'AUHT0_CLIENT_ID';
const CLIENT_SECRET = process.env.CLIENT_SECRET || 'AUTH0_CLIENT_SECRET';
const TOKEN_AUDIENCE = process.env.TOKEN_AUDIENCE || 'AUHT0_TOKEN_AUDIENCE';
const TOKEN_GRANT_TYPE = process.env.TOKEN_GRANT_TYPE || 'AUHT0_TOKEN_GRANT_TYPE';
const PASSWORD_GRANT_TYPE = process.env.PASSWORD_GRANT_TYPE || 'AUTH0_PASSWORD_GRANT_TYPE';
module.exports = {
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  TOKEN_AUDIENCE,
  TOKEN_GRANT_TYPE,
  PASSWORD_GRANT_TYPE,
};
