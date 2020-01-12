module.exports = app => {
  const users = require("../controllers/user.controller");

  // Create a new user
  app.post("/users", users.register);

  // Retrieve all Users
  app.get("/users", users.findAll);
};
