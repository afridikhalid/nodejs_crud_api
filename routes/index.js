var express = require('express');
var router = express.Router();
var controller = require('../controllers/main_controller');


/* Get home from controller */
router.get ('/', controller.index);


/* Get home page. */
/*
router.get('/', function(req, res) {
    res.render('index', {title: "Cars"});
});
*/

module.exports = router;