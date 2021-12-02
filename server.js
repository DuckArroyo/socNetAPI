// Require express
const express = require('express');

// Require mongoose
const mongoose = require ('mongoose');

// Declare app for express
const app = express();

// Declare port
const PORT = process.env.PORT || 3006

// Middleware
app.use(express.json());
//manages payload
app.use(express.urlencoded({ extended: true }));
//Connects to routes dir
//!Turned off until routes are created.
//!app.use(require("./routes"));

// Mongoose functions/connection to social-media db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

// App.listen
app.listen(PORT, () => console.log(`Connection stablished, serving em beets on: ${PORT}`));