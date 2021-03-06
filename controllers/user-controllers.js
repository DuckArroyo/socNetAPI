const { User, Thought } = require("../models");

const userController = {
  getAllUser(req, res) {
    User.find()
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.satus(400).json(err);
      });
  },

  getUserById({ params }, res) {
    console.log(params);
    User.findOne({ _id: params.id })
      .populate({ path: "thoughts", path: "friends", select: "-__v" })
      .select("-__v")
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
        select: "-__v",
      })
      .select("-__v")

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

      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")

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

      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")

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

    User.findOneAndDelete({ _id: params.id })

      .then((dbUserData) => {
        console.log("@findOneAndDelete: ", dbUserData);

        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }

        console.log("===============afterIf");
        console.log(
          "===============dbUSerData.thoughtId: ",
          dbUserData.thoughtId
        );

        Thought.deleteMany(
          { _id: dbUserData.thoughts },
          { $pull: { thoughts: { thoughtId: dbUserData.thoughts } } }
        );

        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
