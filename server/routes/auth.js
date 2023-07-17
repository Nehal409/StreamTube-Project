const Path = require('path');

const authController = require(Path.join(
  __dirname,
  '../controllers/auth.ctrl'
));

module.exports = (router) => {
  // POST
  // Create a user
  router.route('/signup').post(authController.signup);

  // POST
  // Login / Signin
  router.route('/signin').post(authController.signin);

  // POST
  // Google authentication
  router.route('/google').post(authController.googleAuth);
};
