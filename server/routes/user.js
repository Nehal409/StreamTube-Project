const Path = require('path');
const { verifyToken } = require('../utils/verifyToken');

const userController = require(Path.join(
  __dirname,
  '../controllers/user.ctrl'
));

module.exports = (router) => {
  // PUT
  // Update user
  router.route('/user/:id').put(verifyToken, userController.update);

  // DELETE
  // Delete a user
  router.route('/user/:id').delete(verifyToken, userController.deleteUser);

  // GET
  // Find a user
  router.route('/user/find/:id').get(userController.getUser);

  // PUT
  // Subscribe a channel/user because username is channel-name
  router.route('/sub/:id').put(verifyToken, userController.subscribe);

  // PUT
  // Unsubscribe
  router.route('/unsub/:id').put(verifyToken, userController.unsubscribe);

  // PUT
  // Like a video
  router.route('/like/:videoId').put(verifyToken, userController.like);

  // PUT
  // Dislike a video
  router.route('/dislike/:videoId').put(verifyToken, userController.dislike);
};
