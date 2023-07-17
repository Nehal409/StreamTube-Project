const Path = require('path');
const bunyan = require('bunyan');
const bcrypt = require('bcryptjs');
const { createError } = require('../utils/customError');

const { User } = require(Path.join(__dirname, '../models/'));
const log = bunyan.createLogger({ name: 'user' });

module.exports = {
  update: async (req, res, next) => {
    if (req.params.id === req.user.id) {
      try {
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        res.status(200).json(updateUser);
      } catch (err) {
        next(err);
      }
    } else {
      return next(createError(403, 'You can update only your account'));
    }
  },

  deleteUser: async (req, res, next) => {
    if (req.params.id === req.user.id) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');
      } catch (err) {
        next(err);
      }
    } else {
      return next(createError(403, 'You can delete only your account'));
    }
  },

  getUser: async (req, res, next) => {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json('No user found');
      }

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  subscribe: async (req, res, next) => {
    // Note: Channel and user are same entity
    const loggedInUser = req.user.id;
    // id of the channel/user that user will subscribe.
    const channelId = req.params.id;
    try {
      const channelExists = await User.findById(loggedInUser);

      if (channelExists.length === 0) {
        return res.status(404).json('Channel not found');
      }

      if (channelExists.subscribedUsers.includes(channelId)) {
        return res
          .status(409)
          .json('You are already subscribed to this channel');
      }

      // Save the channelId of the channel that the user will subscribe
      await User.findByIdAndUpdate(loggedInUser, {
        $push: { subscribedUsers: channelId },
      });

      // Increase the subscriber count of the channel/user that is being subscribed
      await User.findByIdAndUpdate(channelId, {
        $inc: { subscribers: 1 },
      });

      res.status(200).json('Subscribed successfully');
    } catch (err) {
      next(err);
    }
  },

  unsubscribe: async (req, res, next) => {
    const loggedInUser = req.user.id;
    const channelId = req.params.id;

    try {
      const user = await User.findById(loggedInUser);
      // Check if user have actually subscribed to the channel
      if (!user.subscribedUsers.includes(channelId)) {
        return res.status(409).json('You are not subscribed to this channel');
      }

      await User.findByIdAndUpdate(loggedInUser, {
        $pull: { subscribedUsers: channelId },
      });

      await User.findByIdAndUpdate(channelId, {
        $inc: { subscribers: -1 },
      });

      res.status(200).json('You have Unsubscribed');
    } catch (err) {
      next(err);
    }
  },

  like: async (req, res, next) => {
    try {
    } catch (err) {}
  },
  dislike: async (req, res, next) => {
    try {
    } catch (err) {}
  },
};
