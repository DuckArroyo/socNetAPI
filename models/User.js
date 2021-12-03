const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: "You must select a username!",
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: "You must enter an email!",
      match: [/.+@.+\..+/, "Please enter a valid e-mail address!"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// !Virtual friendsCount
UserSchema.virtual("friendsCount").get(function () {
  return this.friends.length;
});

// Create User model
const User = model("User", UserSchema);

module.exports = User;
