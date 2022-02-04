// get all core modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// Some routes
const authRoute = require('./routes/auth.js');
const postRoute = require('./routes/posts.js');
const userRoute = require('./routes/users.js');
const profileRoute = require('./routes/profile.js');

// get the configuration
const { SERVER_PORT, MONGO_URL } = require("./config.js");

// initialize the express app
const app = express();

// DB connectivity
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { console.log("MongoDB Connected"); },
  (error) => { console.log("MongoDB Not Connected"); }
);

// bodyParser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.json());

//static folder
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Passport Middleware
app.use(passport.initialize());
// Passport config
require('./passport')(passport);

// API Middleware
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);

// for checking the server
app.get('/', (req, res) => {
  return res.json('Server is working perfectly');
});

// create the server for listening
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || SERVER_PORT}`);
});