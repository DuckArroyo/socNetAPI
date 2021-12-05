const { Thought, User } = require("../models");

const thoughtController = {
  addThought(req, res) {
    Thought.create(req.body)

      .then((dbThoughtData) => {
        console.log("=================", req.body);

        return User.findOneAndUpdate(
          { _id: dbUserData._id },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })

      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "Could not find user with this ID!" });
          return;
        }

        res.json({ message: "Thought was successfully created!" });
      })
      .catch((err) => res.json(err));
  },

  addReaction({ params, body }, res) {
    console.log(params);
    console.log(body);

    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      //Possibly body needs to be more specific
      { $push: { reaction: body } },
      { new: true, runValidators: true }
    )

      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "Did not find reaction with this ID" });
          return;
        }

        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  removeThought({ params }, res) {
    console.log(body);

    Thought.findOneAndDelete({ _id: params.thoughtId })

      .then((dbRemoveThought) => {
        if (!dbRemoveThought) {
          res
            .status(404)
            .json({ message: "Did not find thought with this ID" });
          return;
        }

        res.json(dbRemoveThought);
      })

      .catch((err) => res.json(err));
  },

  removeReaction({ params }, res) {
    console.log(body);

    Thought.findOneAndRemove(
      { _id: params.thoughtId },
      { $pull: { reaction: { reactionId: params.reactionId } } },
      { new: true }
    )

    User.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reaction: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "Did not find reaction with this ID" });
          return;
        }

        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
