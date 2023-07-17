const jwt = require('jsonwebtoken');

const genrateJWT = (user) => {
  const expiresInMs = 3600000;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: expiresInMs,
  });

  return token;
};

module.exports = { genrateJWT };
