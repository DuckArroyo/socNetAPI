const router = require("express").Router();

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user-controllers");

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

module.exports = router;
