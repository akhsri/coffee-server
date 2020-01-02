const Beverage = require("../models/beverage.js");

// Create and Save a new Beverage
exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Beverage name required"
    });
  }

  if (!req.body.cost) {
    return res.status(400).send({
      message: "Beverage cost required"
    });
  }

  // Create a Beverage
  const beverage = new Beverage({
    name: req.body.name,
    cost: req.body.cost,
    description: req.body.description,
    imageLink: req.body.imageLink
  });

  // Save Beverage in the database
  beverage
    .save()
    .then(data => {
      res.status(201).json({
        beverage: data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Beverage."
      });
    });
};

// Retrieve and return all beverages from the database.beverages
exports.findAll = (req, res) => {
  Beverage.find()
    .then(beverages => {
      res.status(200).json(beverages);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving beverages."
      });
    });
};

// Find a single beverage with a beverageId
exports.findOne = (req, res) => {
  console.log(req.params);
  Beverage.findById(req.params.beverageId)
    .then(beverage => {
      if (!beverage) {
        return res.status(404).send({
          message: "Beverage not found with id " + req.params.beverageId
        });
      }
      res.send(beverage);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Beverage not found with id " + req.params.beverageId
        });
      }
      return res.status(500).send({
        message: "Error retrieving beverage with id " + req.params.beverageId
      });
    });
};

// Update a beverage identified by the beverageId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Beverage content can not be empty"
    });
  }
  if (!req.body.cost) {
    return res.status(400).send({
      message: "Beverage cost required"
    });
  }

  // Find beverage and update it with the request body
  Beverage.findByIdAndUpdate(
    req.params.beverageId,
    {
      name: req.body.name,
      cost: req.body.cost
    },
    { new: true }
  )
    .then(beverage => {
      if (!beverage) {
        return res.status(404).send({
          message: "Beverage not found with id " + req.params.beverageId
        });
      }
      res.send(beverage);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Beverage not found with id " + req.params.beverageId
        });
      }
      return res.status(500).send({
        message: "Error updating beverage with id " + req.params.beverageId
      });
    });
};

// Delete a beverage with the specified beverageId in the request
exports.delete = (req, res) => {
  Beverage.findByIdAndRemove(req.params.beverageId)
    .then(beverage => {
      // if(!beverage) {
      //     return res.status(404).send({
      //         message: "Beverage not found with id " + req.params.beverageId
      //     });
      // }
      res.send({ message: "Beverage deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Beverage not found with id " + req.params.beverageId
        });
      }
      return res.status(500).send({
        message: "Could not delete beverage with id " + req.params.beverageId
      });
    });
};
