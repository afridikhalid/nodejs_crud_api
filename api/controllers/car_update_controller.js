var mongoose = require('mongoose'),
    _ = require('underscore'),
    car_mod = mongoose.model('Car'),
    validation_helper = require('./validation_helper')


/*
  ============================================================================================
  * This is a simple helper function which send our json content responses
  ============================================================================================
*/
var responseWithJson = function(res, status, jsonContent) {
    res.status(status);
    res.json(jsonContent);
};


module.exports.paramlessupdate = function(req, res) {
  responseWithJson(res, 404, {"message": "Ops you must enter a car id to update it"});  
};

module.exports.updateCar = function(req, res) {
    
    
    if (req.params && req.params.carid) {

        car_mod.findById(req.params.carid).exec(function(err, car) {
            if (!car) {
                responseWithJson(res, 404, {"message": "Ops can not find the carid"});
                // again if no car with this id just exit by returning
                return;
            } else if (err) {
                responseWithJson(res, 400, err);
                // here will exit with status of 400 and return the error
                return;
            }

            if (validation_helper.validateBodyRequest(req, res)) {

                var body = _.pick(req.body, 'make', 'model', 'year', 'color', 'condition', 'gearbox', 
                      'fuel', 'price', 'mileage', 'vehicletype', 'generalinfo');

                // here we know it's good to go and update our doc with new values
                car.make = body.make.trim();
                car.model = body.model.trim();
                car.color = body.color.trim();
                car.condition = body.condition.trim();
                car.gearbox = body.gearbox.trim();
                car.fullname = body.make.trim() + ' ' + body.model.trim();
                car.fuel = body.fuel.trim();
                car.vehicletype = body.vehicletype.trim();
                car.generalinfo = body.generalinfo.trim();
                car.price = parseInt(body.price);
                car.mileage = parseInt(body.mileage);
                car.year = parseInt(body.year);
                
            }

            car.save(function(err, car) {
                if (err) {
                    // if update was not successfull will send back the error
                    responseWithJson(res, 404, err);
                } else {
                    // here will send back the updated car with the new values
                    responseWithJson(res, 200, car);
                }
            });

        });

    } else {
        responseWithJson(res, 404, {"message": "Not found 404"});
    }
    

};