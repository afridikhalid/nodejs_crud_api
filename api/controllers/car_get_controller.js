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
    var query_params = req.query;
    var selectFields = '';
    var query = car_mod.find();
    
    if (query_params.hasOwnProperty('offset') && query_params.offset.trim().length > 0) {
        var offset = parseInt(query_params.offset.trim(), 10);
        if (!isNaN(offset)) {
            
            if (offset < 1) {
                responseWithJson(res, 400, {"message": "Ops you have to provide a number greater than 0 for offset so we can process your request"});
                return;
            } else {
                query.skip(offset);
            }
        } else {
            responseWithJson(res, 400, {"message": "Ops you have provided text for offset. try to provide a number e.g offset=10"});
            return;
        }
    }
    
    /*
      ========================================================================================
      * query and show only the selected fields
      ========================================================================================
    */
    if (query_params.hasOwnProperty('makefield') && query_params.mkef.toLowerCase() === 'make') {
        selectFields = query_params.makefield.toLowerCase() + ' ';
    }
    if (query_params.hasOwnProperty('modelfield') && query_params.mdlf.toLowerCase() === 'model') {
        selectFields = selectFields + query_params.modelfield.toLowerCase() + ' ';
    }
    if (query_params.hasOwnProperty('fullnamefield') && query_params.cpnf.toLowerCase() === 'fullname') {
        selectFields = selectFields + query_params.fullnamefield.toLowerCase() + ' ';
    }
    if (query_params.hasOwnProperty('colorfield') && query_params.colf.toLowerCase() === 'color') {
        selectFields = selectFields + query_params.colorfield.toLowerCase() + ' ';
    }
    if (query_params.hasOwnProperty('conditionfield') && query_params.conf.toLowerCase() === 'condition') {
        selectFields = selectFields + query_params.conditionfield.toLowerCase() + ' ';
    }
    if (query_params.hasOwnProperty('gearboxfield') && query_params.grbf.toLowerCase() === 'gearbox') {
        selectFields = selectFields + query_params.gearboxfield.toLowerCase() + ' ';
    }
    if (query_params.hasOwnProperty('pricefield') && query_params.prcf.toLowerCase() === 'price') {
        selectFields = selectFields + query_params.pricefield.toLowerCase() + ' ';
    }
    if (query_params.hasOwnProperty('mileagefield') && query_params.milf.toLowerCase() === 'mileage') {
        selectFields = selectFields + query_params.mileagefield.toLowerCase() + ' ';
    }
    if (query_params.hasOwnProperty('generalinfofield') && query_params.gnif.toLowerCase() === 'generalinfo') {
        selectFields = selectFields + query_params.generalinfo.toLowerCase() + ' ';
    }
    if (query_params.hasOwnProperty('postedonfield') && query_params.pstf.toLowerCase() === 'postedon') {
        selectFields = selectFields + query_params.postedonfield.toLowerCase() + ' ';
    }
    if (query_params.hasOwnProperty('vehicletypefield') && query_params.vtpf.toLowerCase() === 'vehicletype') {
        selectFields = selectFields + query_params.vehicletypefield.toLowerCase() + ' ';
    }
    
    /*
      ===========================================================================================
      * query and show all the matches based on the query ex. red will show all red cars if exist
      * here for the search case insensitive i am using regex but in bigger projects it's not
      * recommended as we can not search based on index alos it will be slower 
      * I think best choice would be to have 2 fields in the doc so one with lowercase
      ===========================================================================================
    */
    
    var paramVar;
    if (query_params.hasOwnProperty('make') && query_params.make.trim().length > 0) {
        paramVar = new RegExp(query_params.make.trim(), "i");
        query.where('make').equals(paramVar);
    }
    if (query_params.hasOwnProperty('condition') && query_params.condition.trim().length > 0) {
        paramVar = new RegExp(query_params.condition.trim(), "i");
        query.where('condition').equals(paramVar);
    }
    if (query_params.hasOwnProperty('gearbox') && query_params.gearbox.trim().length > 0) {
        paramVar = new RegExp(query_params.gearbox.trim(), "i");
        query.where('gearbox').equals(paramVar);
    }
    if (query_params.hasOwnProperty('color') && query_params.color.trim().length > 0) {
        paramVar = new RegExp(query_params.color.trim(), "i");
        query.where('color').equals(paramVar);
    }
    if (query_params.hasOwnProperty('model') && query_params.color.trim().length > 0) {
        paramVar = new RegExp(query_params.model.trim(), "i");
        query.where('model').equals(paramVar);
    }
    if (query_params.hasOwnProperty('vehicletype') && query_params.vehicletype.trim().length > 0) {
        paramVar = new RegExp(query_params.vehicletype.trim(), "i");
        query.where('vehicletype').equals(paramVar);
    }
    if (query_params.hasOwnProperty('fuel') && query_params.fuel.trim().length > 0) {
        paramVar = new RegExp(query_params.fuel.trim(), "i");
        query.where('fuel').equals(paramVar);
    }
    if (query_params.hasOwnProperty('limit') && query_params.limit.trim().length > 0) {
        var limitNumber = parseInt(query_params.limit.trim(), 10);
        if (!isNaN(limitNumber)) {
            
            if (limitNumber < 1) {
                responseWithJson(res, 400, {"message": "Ops you have to provide a number greater than 0 for so we can process your request"});
                return;
            } else {
                query.limit(limitNumber);
            }
        } else {
            responseWithJson(res, 400, {"message": "Ops you have provided text for limit. try to provide a number e.g limit=50"});
            return;
        }
    }
    
    
    selectFields.trim()
    if (selectFields.length > 0) {
        console.log("You have made the following field query => " + selectFields);
        query.select(selectFields);
    }
    
    query.exec(function(err, cars) {
        if (err) {
            responseWithJson(res, 404, {"messge": err});
        } else {
            if(_.isEmpty(cars)) {
                responseWithJson(res, 200, {"message": "Ops sorry no object available based on your query or database is empty"});
            } else {
                responseWithJson(res, 200, cars);
            }
            
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