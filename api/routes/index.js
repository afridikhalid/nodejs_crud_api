var express = require('express'),
    router = express.Router(),
    car_get_ctrl = require('../controllers/car_get_controller');

/*
  =====================================================================================
  * here will try to fetch the requested data from car_controller
  =====================================================================================
*/
router.get('/cars', car_get_ctrl.getAllCars);
router.get('/cars/:carid', car_get_ctrl.getCarbyId);



module.exports = router;