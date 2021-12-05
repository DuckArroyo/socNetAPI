const { User, Thought } = require("../models");

const userController = {
  getAllUser(req, res) {
    User.find()
      .populate({ path: "thoughts" })
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

  createUser(req, res) {
    console.log(req.body);
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.satus(400).json(err));
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

  removeUserFriends({ params }, res) {
    console.log("params.userId: ", params.userId);
    console.log("params.friendId: ", params.friendId);

    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
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

  updateUser({ params, body }, res) {
    console.log("params: ", params.id);
    console.log("body.userName: ", body.userName);
    console.log("body.email: ", body.email);

    User.findOneAndUpdate(
      { _id: params.id },
      { userName: body.userName, email: body.email },
      {
        new: true,
        runValidators: true,
      }
    )
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
    console.log("params.id: ", params.id);
    console.log("params.thoughts: ", params.thoughts);

    //! Not working
    //!Thought.deleteMany({ _id: params.id, thoughts: params.thoughts });

    User.findOneAndDelete({ _id: params.id })

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
