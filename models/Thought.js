const { Schema, model, Types } = require("mongoose");

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: "You must select a reaction must less than 280 characters!",
    validate: [({ length }) => length <= 280, "Your reaction cannot exceed 280 characters"],

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
    thoughtText: {
      type: String,
      required: "You must select a thought must be at least 1 character minimum!",
      validate: [({ length }) => length >= 1, "Your thought needs a message"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
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

// Create Comment model
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
