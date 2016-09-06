var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var config = require('../config/config');

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

var mylog = function(d) {
  log_file.write(util.format(d) + '\n');
};


var conversation = new ConversationV1({
  username: config.watsonUserName,
  password: config.watsonPassword,
  version_date: '2016-07-01'
});

exports.watsonConversation = function(inputMessage, callback){
    mylog(inputMessage)
    conversation.message({
  input: {
    "text": inputMessage
  },
  workspace_id: 'eebd97b1-8f9e-4719-9d4f-df04df690c2a'
 }, function(err, response) {
     if (err) {
       console.error(err);
       mylog(err.input);
     } else {
       var sparkResponse = JSON.stringify(response.output.text, null, 2).replace(/]|[[]/g, '').replace(/"/g,'');
       mylog(response);
       callback(sparkResponse);
     }
});
    
};

