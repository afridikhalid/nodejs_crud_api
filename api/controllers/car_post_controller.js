var mongoose = require('mongoose'),
    _ = require('underscore'),
    car_mod = mongoose.model('Car'),
    validation_helper = require('./validation_helper');

/*
  ============================================================================================
  * This is a simple helper function which send our json content responses
  ============================================================================================
*/
var responseWithJson = function(res, status, jsonContent) {
    res.status(status);
    res.json(jsonContent);
};



module.exports.createCar = function(req, res) {
    
    
    if (validation_helper.validateBodyRequest(req, res)) {
        // picking only the fields that we are interested in
        var body = _.pick(req.body, 'make', 'model', 'year', 'color', 'condition', 'gearbox', 
                      'fuel', 'price', 'mileage', 'vehicletype', 'generalinfo');
        
        // pushing the final results to the database
        car_mod.create({
            make: body.make.trim(),
            model: body.model.trim(),
            completename: body.make.trim() + ' ' + body.model.trim(),
            year: parseInt(body.year),
            color: body.color.trim(),
            condition: body.condition.trim(),
            gearbox: body.gearbox.trim(),
            fuel: body.fuel.trim(),
            price: parseInt(body.price),
            mileage: parseInt(body.mileage),
            vehicletype: body.vehicletype.trim(),
            generalinfo: body.generalinfo.trim()
        }, function(err, car) {
            if (err) {
                responseWithJson(res, 404, err);
                return;
            } 
            console.log('Success: object added to the database');
            responseWithJson(res, 200, car);
        });

        
    } 
 
};