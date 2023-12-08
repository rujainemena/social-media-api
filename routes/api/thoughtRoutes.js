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

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/videos/username
router
  .route('/username')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/videos/username/reactions
router.route('/username/reactions').post(addReaction);

// /api/videos/:videoId/responses/:reactionId
router.route('/username/reactions/:reactionId').delete(removeReaction);

module.exports = router;
