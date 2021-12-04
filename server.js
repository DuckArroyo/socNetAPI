// Require express
const express = require("express");

// Require mongoose
const mongoose = require("mongoose");

// Require the route and pass below
const routes = require("./routes");

// Declare app for express
const app = express();

// Declare port
const PORT = process.env.PORT || 3006;

// Middleware
app.use(express.json());
//manages payload
app.use(express.urlencoded({ extended: true }));
//Connects to routes dir
app.use(routes);

// Mongoose functions/connection to social-media db
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social-media",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  }
);

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

// App.listen
app.listen(PORT, () =>
  console.log(`Connection stablished, serving em beets on: ${PORT}`)
);
