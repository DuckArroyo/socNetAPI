const { User } = require("../models");

const userController = {
  getAllUser(req, res) {
    User.find()
      .populate({
        path: "thoughts",
      })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.satus(400).json(err);
      });
  },

  getUserById({ params }, res) {
    console.log(params);
    User.findOne({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.satus(400).json(err);
      });
  },

  addUserFriends({ params }, res) {
    console.log("id", params.userId);
    console.log("friendId", params.friendId);

    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .populate({
        path: "friends",
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        } 
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.satus(400).json(err);
      });
  },

  removeUserFriends(req, res) {
    console.log(req);

    User.findOneAndUpdate(
      { _id: req.id },
      { $pull: { friends: req.body.friendId } },
      { new: true }
    )

      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.satus(400).json(err);
      });
  },

  createUser(req, res) {
    console.log(req.body);
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.satus(400).json(err));
  },

  //Update Thoughts
  //Update Friends or should it be separate?
  updateUser({ params, body }, res) {
    console.log(params);
    console.log(body);
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      //!runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    console.log(params);
    User.findOneAndDelete({ _id: params.id })
      //! then find and delete thought
      //! Could I call
      //! removeThought()
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
