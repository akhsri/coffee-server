const express = require("express");
var cors = require("cors");

var bodyParser = require("body-parser");
const app = express();
const port = 3001;
var morgan = require("morgan");
var passport = require("passport");

// allow CORS
app.use(cors());

app.use(morgan("combined"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

require("./config/passport");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// ........
app.use(passport.initialize());

// Require Beverages routes
require("./app/routes/beverage.routes.js")(app);

// Require Users routes
require("./app/routes/user.routes.js")(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Not part of project

// var users = [];

// // To get all data by client
// app.get('/users', (req, res) => {
//     res.status(200).json({
//         "users": users
//     });
// });

// // To get some data by client
// app.get('/users/:id', (req, res) => {
//     let userRequested;
//     console.log(req.params.id);
//     users.forEach((user) => {
//         if (user.email === req.params.id) {
//             userRequested = user;
//         }
//     });
//     if (userRequested) {
//         res.status(200).json({
//             "user": userRequested
//         });
//     } else {
//         res.status(404).json({
//             "error": "User not found"
//         });
//     }
// });

// // To create some data on server by client
// app.post('/users', (req, res) => {
//     users.push(req.body);
//     res.status(200).json({
//         "message": "New user created"
//     });
// });

// // To edit some previously created data  ->  when all properties of a resource is changes or accepted from client
// app.put('/users/:id', (req, res) => {
//     console.log(req.body);
//     res.status(200).json({
//         "message": "User edited"
//     });
// });

// // To edit some previously created data  ->  when a single property of a resource is changes or accepted from client
// app.patch('/', (req, res) => {
//     console.log(req.body);
//     res.status(200).json({
//         "message": "User edited by patch"
//     });
// });

// // To delete some previously created data
// app.delete('/', (req, res) => {
//     console.log(req.body);
//     res.status(200).json({
//         "message": "User deleted"
//     });
// });
