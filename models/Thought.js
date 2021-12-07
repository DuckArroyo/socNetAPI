const { Schema, model, Types } = require("mongoose");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: "You must select a reaction must less than 280 characters!",
      //minlength and maxlength can be added as separate lines
      minlegth: 1,
      maxlength: 280,
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
      //!create a formatter file for the date
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required:
        "You must select a thought must be at least 1 character minimum!",
      //minlength and maxlength can be added as separate lines
      minlegth: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
      //!create a formatter file for the date
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// !Vitual reaction count
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create Comment model
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
