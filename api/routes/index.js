var express = require('express'),
    router = express.Router(),
    car_get_ctrl = require('../controllers/car_get_controller')
    car_post_ctrl = require('../controllers/car_post_controller');

/*
  =====================================================================================
  * here will try to fetch the requested data from car_get_controller
  =====================================================================================
*/
router.get('/cars', car_get_ctrl.getAllCars);
router.get('/cars/:carid', car_get_ctrl.getCarbyId);

/*
  =====================================================================================
  * it's the post route which will just handing over to car_post_controller
  =====================================================================================
*/
router.post('/cars', car_post_ctrl.createCar);


module.exports = router;