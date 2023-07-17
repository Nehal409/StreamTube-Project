const Path = require('path');

const commentController = require(Path.join(__dirname, '../controllers/comment.ctrl'));

module.exports = (router) => {
  // GET
  // testing
  router.route('/test').get(commentController.testing);
};
