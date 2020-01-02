module.exports = (app) => {
    const beverages = require('../controllers/beverage.controllers');

    // Create a new Beverage
    app.post('/beverages', beverages.create);

    // Retrieve all Beverages
    app.get('/beverages', beverages.findAll);

    // Retrieve a single Beverage with beverageId
    app.get('/beverages/:beverageId', beverages.findOne);

    // Update a Beverage with beverageId
    app.put('/beverages/:beverageId', beverages.update);

    // Delete a Beverage with beverageId
    app.delete('/beverages/:beverageId', beverages.delete);
}