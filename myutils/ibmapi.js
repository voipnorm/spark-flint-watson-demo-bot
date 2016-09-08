//Module for Watson Conversation API

var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var myconfig = require('../config/config');

//Logging to file for troubleshooting
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

//debug logs to file for varying responses can be removed if not required
var mylog = function(d) {
  log_file.write(util.format(d) + '\n');
};

//Create Watson conversation object
var conversation = new ConversationV1({
  username: myconfig.watsonUserName,
  password: myconfig.watsonPassword,
  version_date: '2016-07-01'
});

exports.watsonConversation = function(inputMessage, callback){
    mylog(inputMessage)
    conversation.message({
  input: {
    "text": inputMessage
  },
  workspace_id: myconfig.watsonWorkSpaceID
 }, function(err, response) {
     if (err) {
       console.error(err);
       mylog(err);
     } else {
         //format spark response before passing to callback
       var sparkResponse = JSON.stringify(response.output.text).replace(/]|[[]/g, '').replace(/"/g,'');
       //mylog(response);
       callback(sparkResponse);
     }
});
    
};

