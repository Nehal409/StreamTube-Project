const Path = require('path');
const bunyan = require('bunyan');

const { Comment } = require(Path.join(__dirname, '../models/'));
const log = bunyan.createLogger({ name: 'comment' });

module.exports = {
  testing: (req, res, next) => {
    res.status(200).json('Hello Nehal');
  },
};
