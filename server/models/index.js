const Path = require('path');

const User = require(Path.join(__dirname, './User'));
const Video = require(Path.join(__dirname, './Video'));
const Comment = require(Path.join(__dirname, './Comment'));


module.exports = {
    User,
    Video,
    Comment,
};
