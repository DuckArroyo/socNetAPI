const { Schema, model } = require("mongoose");

const User = new User({
  userName: {
    type: String,
    required: "You must select a username!",
    //Declare unique
    trim: true,
  },
  email: {
    type: String,
    required: "You must enter an email!",
    match: [/.+@.+\..+/, "Please enter a valid e-mail address!"],
  },
  thoughts: [],
  // !Array of _id values referencing the Thought model
  friends: [],
  // !Array of _id must reference User model (self-reference)
});

module.exports = User;
