const router = require("express").Router();

const {
  //Thought actions
  addThought,
  removeThought,
  //Reaction actions
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controllers");

router

  .route("/:thoughtId")

  .post(addThought);

router

  .route("/:userId/:thoughtId")

  .put(addReaction)

  .delete(removeThought);

router

  .route("/:userId/:thoughtId/:reactionId")

  .delete(removeReaction);

module.exports = router;
