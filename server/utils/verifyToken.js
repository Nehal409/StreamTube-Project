const jwt = require('jsonwebtoken');
const { createError } = require('./customError');

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, 'You are not authorized'));

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid'));
    req.user = user;
  });

  next();
};

module.exports = { verifyToken };
