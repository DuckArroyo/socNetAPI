const { Schema, model, Types } = require("mongoose");

const ReactionsSchema = new Schema();

const ThoughtSchema = new Schema(
  {
    thoughtText: {},
    createdAt: {},
    username: {},
    reactions: [],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

module.exports = Thought;
