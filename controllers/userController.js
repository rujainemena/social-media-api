const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update user info
  async updateUser(req, res) {
    try {
      const userInfo = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!userInfo) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(userInfo);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete user and user thoughts
  async deleteUser(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ username: req.body.username });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this username!' });
      }

      const user = await User.findOneAndRemove(
        { _id: req.params.videoId },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created but no user with this id!' });
      }

      res.json({ message: 'User successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
}