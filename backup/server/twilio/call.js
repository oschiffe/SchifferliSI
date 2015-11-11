var client = require('./client');
var logger = require('../logger/log');
 
var call = {};
 
call.triggerCall = function(to, callback) {
  //Place a phone call, and respond with TwiML instructions from the given URL
  client.makeCall({
 
    to: to, // Any number Twilio can call
    from: '+18627666277',
    url: 'http://a9ebd395.ngrok.io/call/' + (Math.ceil((Math.random() * 10) % 2)) // the endpoint is made dynamic
    // Math.ceil((Math.random()*10) % 2) -> generates either 1 or 2 
    // The endpoints are made dynamic so that we can handle each response uniquely
  }, function(error, response) {
 
    // Log the response to DiskDB to auditing purposes
    if (error) {
      logger.logCall({
        "status": "error",
        "error": error
      });
    } else {
      logger.logCall({
        "status": "success",
        "response": response
      });
    }
    callback(error, response);
 
  });
 
};
 
module.exports = call;