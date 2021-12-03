const { Schema, model, Types } = require("mongoose");

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: "You must select a reaction must be at least 1 character minimum!",
    validate: [({ length }) => length >= 1, "Your reaction needs a message"],

  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ThoughtSchema = new Schema(
  {
    thoughtText: {},
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// !Vitual reaction count
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Crate Comment model
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
