const router = require("express").Router();

const {
  getAllUser,
  getUserById,
  addUserFriends,
  createUser,
  updateUser,
  deleteUser,
  removeUserFriends,
} = require("../../controllers/user-controllers");

//Routes that do not require id
router

  .route("/")

  .get(getAllUser)

  .post(createUser);

//Routes that use an id
router

  .route("/:id")

  .get(getUserById)

  .put(updateUser)

  .delete(deleteUser);

router

  .route("/:userId/friends/:friendId")

  .post(addUserFriends)

  .delete(removeUserFriends);

module.exports = router;
