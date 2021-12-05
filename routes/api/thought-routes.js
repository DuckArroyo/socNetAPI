const router = require("express").Router();

const {
  //Thought actions
  getAllThought,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  //Reaction actions
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controllers");

router

  .route("/")

  .get(getAllThought)

  //Add a thought to user
  .post(addThought);

router

  .route("/:id")

  .get(getThoughtById)
  
  .put(updateThought);

router

  .route("/:userId/:thoughtId")


  .put(addReaction)

  .delete(removeThought);

router

  .route("/:userId/:thoughtId/:reactionId")

  .delete(removeReaction);

module.exports = router;
