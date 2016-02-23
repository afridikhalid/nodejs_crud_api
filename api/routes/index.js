var express = require('express'),
    router = express.Router(),
    car_get_ctrl = require('../controllers/car_get_controller'),
    car_post_ctrl = require('../controllers/car_post_controller'),
    car_update_ctrl = require('../controllers/car_update_controller');

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
/*
  =====================================================================================
  * it's the update route which will just handing over to car_update_controller
  =====================================================================================
*/
router.put('/cars/:carid', car_update_ctrl.updateCar);
// this route is only in case if the params is empty
router.put('/cars', car_update_ctrl.paramlessupdate);


module.exports = router;