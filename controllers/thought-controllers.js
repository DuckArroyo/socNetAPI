const { Thought, User } = require("../models/Thought");

const thoughtController = {
  addThought({ params }, res) {
    console.log(params);
    console.log(body);

    Thought.create(body)

      .then(({ _id }) => {
        console.log(_id);
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thought: id } },
          { new: true, runValidators: true }
        );
      })

      .then((dbAddThought) => {
        if (!dbAddThought) {
          res
            .status(404)
            .json({ message: "Did not find thought with this ID" });
          return;
        }

        res.json(dbAddThought);
      })
      .catch((err) => res.json(err));
  },

  addReaction({ params, body }, res) {
    console.log(params);
    console.log(body);

    Thought.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { reaction: body } },
      { new: true, runValidators: true }
    )

      .then((dbAddReaction) => {
        if (!dbAddReaction) {
          res
            .status(404)
            .json({ message: "Did not find reaction with this ID" });
          return;
        }

        res.json(dbAddReaction);
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

    Thought.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { reaction: { reactionId: params.reactionId } } },
      { new: true }
    )

      .then((dbRemoveReaction) => {
        if (!dbRemoveReaction) {
          res
            .status(404)
            .json({ message: "Did not find reaction with this ID" });
          return;
        }

        res.json(dbRemoveReaction);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
