const { Thought, User } = require("../models");

const thoughtController = {
  getAllThought(req, res) {
    console.log("=================Get all Thought");

    Thought.find()
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById({ params }, res) {
    console.log("=================Get Thought by Id");
    console.log("=================params: ", params);

    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No Thought was found with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  addThought(req, res) {
    console.log("req.body=================", req.body);

    Thought.create(req.body)

      .then((dbThoughtData) => {
        console.log(dbThoughtData);

        User.findOneAndUpdate(
          { userName: dbThoughtData.userName },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        ).then((dbUserData) => {
          console.log(dbUserData);
          if (!dbUserData) {
            res
              .status(404)
              .json({ message: "Could not find user with this ID!" });
            return;
          }

          res.json({ message: "Thought was successfully created!" });
        });
      })

      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    console.log("params=================", params);
    console.log("body=================", body);

    Thought.findOneAndUpdate(
      { _id: params.id },
      { thoughtText: body.thoughtText },
      { new: true }
    )

      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "Did not find thought with this ID" });
          return;
        }

        res.json(dbThoughtData);
      })

      .catch((err) => res.json(err));
  },

  removeThought({ params }, res) {
    console.log("=================params.id: ", params.id);

    Thought.findOneAndDelete({ _id: params.id })

      .then((dbThoughtData) => {
        console.log("@findOneAndDelete: ", dbThoughtData);

        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "Did not find thought with this ID" });
          return;
        }

        console.log("===============afterIf");
        console.log(
          "===============dbUSerData.thoughtId: ",
          dbUserData.thoughtId
        );

        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  addReaction({ params, body }, res) {
    console.log("=================Add Reaction");

    console.log("params=================", params.thoughtId);
    console.log("body=================", body);

    Thought.findOneAndUpdate(
      { id: params.thoughtId },
      //Possibly body needs to be more specific
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )

      .then((dbThoughtData) => {
        console.log(dbThoughtData);
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "Did not find thought with this ID" });
          return;
        }

        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  //Cant verify posting
  removeReaction({ params }, res) {
    console.log("=================remove Reaction");

    console.log("thoughtId=================", params.thoughtId);
    console.log("reactionId=================", params.reactionId);

    Thought.findOneAndUpdate(
      { id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
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
