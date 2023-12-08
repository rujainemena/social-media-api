const { Thought, User } = require('../models');

module.exports = {
//  get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //  get single thought by username
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ username: req.body.username })

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that username.' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create new thought
  async createThought(req, res) {
    try {
      // const postThought = await Thought.create(req.body);

      const postThought = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: { username: req.body.username } } }, // CONFIRM THIS 
        { new: true }
      );

      if (!postThought) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        });
      }

      res.json('Thought created 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // update thought
  async updateThought(req, res) {
    try {
      const changeThought = await Thought.findOneAndUpdate(
        { username: req.body.username },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!changeThought) {
        return res.status(404).json({ message: 'No thought with this username!' });
      }

      res.json(changeThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete thought
  async deleteThought(req, res) {
    try {
      const removeThought = await Thought.findOneAndRemove({ username: req.body.username });

      if (!removeThought) {
        return res.status(404).json({ message: 'No video with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { videos: req.params.videoId }},
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Video created but no user with this id!' });
      }

      res.json({ message: 'Video successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a video response
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.videoId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No reaction with this thought!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove video response
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.videoId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )

      if (!thought) {
        return res.status(404).json({ message: 'No video with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
