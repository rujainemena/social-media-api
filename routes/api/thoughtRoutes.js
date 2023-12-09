const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// http://localhost:3001/api/thoughts
router.route('/').get(getThoughts).post(createThought);

// http://localhost:3001/api/thoughts/username
router
  .route('/username')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// // http://localhost:3001/api/thoughts/username/reactions
router.route('/username/reactions').post(addReaction);

// // http://localhost:3001/api/thoughts/username/reactions/:reactionId
router.route('/username/reactions/:reactionId').delete(removeReaction);

module.exports = router;
