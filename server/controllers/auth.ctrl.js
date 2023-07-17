const Path = require('path');
const bunyan = require('bunyan');
const bcrypt = require('bcryptjs');
const { authSchema } = require('../utils/validateUserSchema');
const { genrateJWT } = require('../utils/jwtUtils');

const { User } = require(Path.join(__dirname, '../models/'));
const log = bunyan.createLogger({ name: 'auth' });

module.exports = {
  signup: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(result.password, salt);

      const newUser = new User({
        name: result.name,
        email: result.email,
        password: hash,
      });

      await newUser.save();
      res.status(200).json('User created successfully');
    } catch (err) {
      if (err.isJoi === true) err.status = 422;
      // Showing error from error middleware
      next(err);
    }
  },

  signin: async (req, res, next) => {
    try {
      const { name, password } = req.body;
      const user = await User.findOne({ name });

      if (!user) {
        return res.status(404).send({ error: 'No user found' });
      }

      const iscorrect = await bcrypt.compare(password, user.password);

      if (!iscorrect) {
        return res.status(404).send({ error: 'Invalid Password' });
      }

      const token = genrateJWT(user);

      res
        .cookie('accessToken', token, {
          httpOnly: true,
        })
        .status(200)
        .json({ user: user });
      
    } catch (error) {
      next(error);
    }
  },

  googleAuth: (req, res, next) => {
    res.status(200).json('Hello Nehal');
  },
};
