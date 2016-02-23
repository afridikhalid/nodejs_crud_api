var mongoose = require('mongoose'),
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

module.exports.paramlessdelete = function(req, res) {
  responseWithJson(res, 404, {"message": "ops please provide a car id the action can not be completed. try again with a car id"});  
};

module.exports.deleteCar = function(req, res) {
    
    if (req.params.carid) {
        car_mod.findByIdAndRemove(req.params.carid).exec(function(err, car) {
            if (err) {
                responseWithJson(res, 404, err);
                return;
            }
            console.log('The object has been successfully deleted');
            responseWithJson(res, 204, null);
        });
    } else {
        responseWithJson(res, 404, {"message": "ops no car with the provided id  please check the id and try again"});
    }
};