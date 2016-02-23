var _ = require('underscore');


var responseWithJson = function(res, status, jsonContent) {
    res.status(status);
    res.json(jsonContent);
};


module.exports.validateBodyRequest = function(req, res, bool) {

    // validate the year field so it should not be too old car or a year which is in future. 
    
    var current_year = new Date().getFullYear();
    var validated_date = current_year - parseInt(req.body.year);

    if (validated_date > -1 && validated_date <= 46) {
        
    } else {
        responseWithJson(res, 400, {"message": "Ops vehicle year must contain proper year no text and must be between 1970 and " + current_year});
         return;
    }
    
    // these if statements are extra validations before we  pass the data to database 
    // however mongoose has it's own validation as well but be safe than sorry. 
    if (!_.isString(req.body.make) || req.body.make.trim().length === 0) {
        responseWithJson(res, 400, {"messsage": "Ops make can not be a number or empty string see the example: make = Toyota"});
        return;
    }
    if (!_.isString(req.body.model) || req.body.model.trim().length === 0) {
        responseWithJson(res, 400, {"message": "Ops model can not be a number or empty string see the example: model = corolla"});
        return;
    }
    
    if (!_.isString(req.body.color) || req.body.color.trim().length === 0) {
        responseWithJson(res, 400, {"message": "Ops color can not be a number or empty string see the example: color = black"});
        return;
    }
    
    
    if (!_.isString(req.body.condition) || req.body.condition.trim().length === 0) {
        responseWithJson(res, 400, {"message": "Ops condition can not be a number or empty string see the example: condition = used"});
        return;
    }
    
    if (!_.isString(req.body.gearbox) || req.body.gearbox.trim().length === 0) {
        responseWithJson(res, 400, {"message": "Ops gearbox can not be a number or empty string see the example: gearbox = automat"});
        return;
    }
    
    if (!_.isString(req.body.fuel) || req.body.fuel.trim().length === 0) {
        responseWithJson(res, 400, {"message": "Ops fuel field can not be a number or empty string see the example: fuel = desiel"});
        return;
    }
    
    if (!_.isString(req.body.vehicletype) || req.body.vehicletype.trim().length === 0) {
        responseWithJson(res, 400, {"message": "Ops vehicletype field can not be a number or empty string see the example: vehicletype = suv"});
        return;
    }
    
    if (!_.isString(req.body.generalinfo) || req.body.generalinfo.trim().length === 0) {
        responseWithJson(res, 400, {"message": "Ops generalinfo field  can not be a number or empty string see the example: generalinfo = some information about the vehicle"});
        return;
    }

    
    if (_.isNaN(parseInt(req.body.mileage)) || _.isNaN(parseInt(req.body.price))) {
        responseWithJson(res, 400, {"message": "Ops please see if you have the following fields rightly filled or they are not left empty a number shouldn't be rapped in quotes",
                                    "mileage": "should be a number",
                                    "price": "should be a number"});
        return;
    }
    
    return bool = true; 
    
};