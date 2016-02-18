var mongoose = require('mongoose'),
    _ = require('underscore'),
    car_mod = mongoose.model('Car');

/*
  ============================================================================================
  * This is a simple helper function which send our json content responses
  ============================================================================================
*/
var responseWithJson = function(res, status, jsonContent) {
    res.status(status);
    res.json(jsonContent);
};

module.exports.getAllCars = function(req, res) {
    car_mod.find(function(err, cars) {
        if (err) {
            responseWithJson(res, 404, {"message": err});
        } else {
            responseWithJson(res, 200, cars);
        }
    });
};



/*
  ======================================================================================
 * here we will be looking for a single object from our model and send it back as a json
  ======================================================================================
*/
module.exports.getCarbyId = function(req, res) {
    // check for the id if one exist in the our request params
    if (req.params && req.params.carid) {
        // search the db if we have a doc with the same id
        car_mod.findById(req.params.carid).exec(function(err, car) {
            if (!car) {
                responseWithJson(res, 404, {"message": "Ops no car with that id please check if you have the right id"});
                console.log("A request with following invalid id has been made => " + req.params.crid);
                return;
            } else if (err) {
                responseWithJson(res, 404, err);
                console.log("mangoose error => " + err);
                return;
            }
            // if we get down to this line then it mean's a 200 which is all well
            responseWithJson(res, 200, car);
        });
    } else {
        // if we are here so it means there's no id has been provide
        responseWithJson(res, 404, {"message": "Ops No carid was provided"});
    }
};