const Path = require('path');

const comment = require(Path.join(__dirname, './comment'));
const auth = require(Path.join(__dirname, './auth'));
const user = require(Path.join(__dirname, './user'));
const video = require(Path.join(__dirname, './video'));

module.exports = (router) => {
  comment(router), auth(router), user(router), video(router);
};
