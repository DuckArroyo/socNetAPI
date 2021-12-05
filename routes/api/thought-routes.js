const router = require("express").Router();

const {
  //Thought actions
  getAllThought,
  getThoughtById,
  addThought,
  removeThought,
  //Reaction actions
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controllers");

router

  .route("/")

  .get(getAllThought)

  .post(addThought);

router

  .route("/:id")

  .get(getThoughtById);

router

  .route("/:userId/:thoughtId")

  .put(addReaction)

  .delete(removeThought);

router

  .route("/:userId/:thoughtId/:reactionId")

  .delete(removeReaction);

module.exports = router;
