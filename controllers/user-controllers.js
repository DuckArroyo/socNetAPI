const { User } = require("../models/User");

const userController = {
  getAllUser(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.satus(400).json(err);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No Uer found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.satus(400).json(err);
      });
  },

  createUser({ body }, res) {
    console.log(body);
    User.create(body)
      .then((dbCreateUser) => res.json(dbCreateUser))
      .catch((err) => res.satus(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUpdateUser) => {
        if (!dbUpdateUser) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }
        res.json(dbUpdateUser);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbRemoveUser) => {
        if (!dbRemoveUser) {
          res.status(404).json({ message: "No User found with this ID!" });
          return;
        }
        res.json(dbRemoveUser);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
