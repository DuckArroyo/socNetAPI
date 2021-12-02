const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: "You must select a username!",
      //!Declare unique
      trim: true,
    },
    email: {
      type: String,
      required: "You must enter an email!",
      match: [/.+@.+\..+/, "Please enter a valid e-mail address!"],
    },
    thoughts: [
      {
        type: String,
        ref: "Thought",
      },
    ],
    // !Array of _id values referencing the Thought model
    friends: [],
    // !Array of _id must reference User model (self-reference)
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
