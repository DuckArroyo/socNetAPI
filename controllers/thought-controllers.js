const { Thought, User } = require("../models");

const thoughtController = {
  getAllThought(req, res) {
    console.log("=================Get all Thought");

    Thought.find()
      // .populate({ path: "user" })
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

  //!Posting but not connecting to User
  addThought(req, res) {
    console.log("req.body=================", req.body);

    Thought.create(req.body)

      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { userName: dbUserData.userName },
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

  //! Delete associated reactions
  //!https://mongoosejs.com/docs/subdocs.html#adding-subdocs-to-arrays
  removeThought({ params }, res) {
    console.log("params=================", params);

    Thought.findOneAndDelete({ _id: params.id })
      //! Delete associated reactions
      //Not tested becaue there are no reactions yet.
      //.remove(reactions)

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

  //!Not connecting the date to Thought
  //It is posting
  addReaction({ params, body }, res) {
    console.log("=================Add Reaction");

    console.log("params=================", params.thoughtId);
    console.log("body=================", body.reactionBody);

    Thought.findOneAndUpdate(
      { id: params.thoughtId },
      //Possibly body needs to be more specific
      { $push: { reactions: body.reactionBody } },
      { new: true, runValidators: true }
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

  //Cant verify posting
  removeReaction({ params }, res) {
    console.log("=================remove Reaction");

    console.log("thoughtId=================", params.thoughtId);
    console.log("reactionId=================", params.reactionId);

    Thought.findOneAndUpdate(
      { id: params.thoughtId },
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
