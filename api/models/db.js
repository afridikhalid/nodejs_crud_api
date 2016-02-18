var mongoose = require('mongoose');
var db_URI = ('mongodb://localhost/nodecrud');


/*
  =================================================================================================
  * I will be not be uploading this to the heroku so it's how you may do it
  * in case if you want to run it in the heroku. but you must have a verfied account with them to add
  * the addons for the MONGOLAB. i wanted to upload it but leave that part out for the time being.
  ==================================================================================================
*/
/* 
  ======================================================================================
  *       check to see in which env the app is running production or local 
  ======================================================================================
*/
/*
if (process.env.NODE_ENV === 'production') {
     db_URI = process.env.MONGOLAB_URI;
}
*/

mongoose.connect(db_URI);
require('./car_model');

/*
 =====================================================================================
  * I have used mongoose connect directly and will be using a single database
  * in case you want to extent this api and use more databases then you can use
  * mongoose.createConnection function to connect more databases
  ====================================================================================
*/

/*
  =====================================================================================
  * Mongoose EventListeners
  =====================================================================================
*/
mongoose.connection.on('connected', function() {
    console.log('Connection Success to => ' + db_URI);
});
mongoose.connection.on('error', function(err) {
    console.log('Connection Error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Database disconnected');
});


/*
 =====================================================================================
 * Force Shotdown Listeners
 =====================================================================================
*/

var forceShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
      console.log('Database disconnected with following message => ' + msg);
      callback();
  });  
};

process.on('SIGINT', function () {
    forceShutdown('App has been terminated', function() {
        process.exit(0);
    });
});

/*
 ====================================================================================
 * We can go on and listen to more of these SIG events 
 * such as SIGUSR2 for nodemon...
 * for the production app it's a import to listen to listen and close the the database
 ====================================================================================
*/