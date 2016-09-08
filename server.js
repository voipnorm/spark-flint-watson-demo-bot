
//Flint framework reference - https://github.com/nmarus/flint
//Make sure to upgrade express if using cloud 9
//Running the project with full debug console logging: DEBUG=flint,bot,sparky node server.js
//Ensure to rename config.example to config.js with applicable keys, usernames and ID's
//Bot has example slash commands below with hello and roomid. 
//Event listeners work from top to bottom so make sure any new slash commands are exempted from later flint.hears methods using the match example.
var Flint = require('node-flint');
var webhook = require('node-flint/webhook');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ibmapi = require('./myutils/ibmapi');
var myconfig = require('./config/config');
var app = express();

app.use(bodyParser.json());


// flint options
var config = {
  webhookUrl: myconfig.cloud9URL+'/flint',
  token: myconfig.botToken,
  port: 8080,
  removeWebhooksOnStart: false,
  maxConcurrent: 5,
  minTime: 50
};

// init flint
var flint = new Flint(config);
flint.start();

// say hello
flint.hears('/hello', function(bot, trigger) {
  bot.say('Hello %s!', trigger.personDisplayName);
});
//respond with room id
flint.hears('/roomid', function(bot, trigger) {
  bot.say('This is your room ID', trigger.roomId);
});

// add flint event listeners
flint.on('message', function(bot, trigger, id) {
  flint.debug('"%s" said "%s" in room "%s"', trigger.personEmail, trigger.text, trigger.roomTitle);
});

flint.on('initialized', function() {
  flint.debug('initialized %s rooms', flint.bots.length);
});

//Welcome message when a new room or 1:1 is spawned with the bot
flint.on('spawn', function(bot) {
  flint.debug('new bot spawned in room: %s', bot.room.id);
  
  //presents different messages based on room or 1:1 
  if(bot.isGroup){
     bot.say("Hi! To get started just type @TCDisrupt hello.");
  }else{
    bot.say("Hi! To get started just type hello.");
  }; 
  bot.repeat;
});

//set bot to listen to incoming webhooks
flint.hears(/(^| )TCDisruptSF|.*( |.|$)/i, function(bot, trigger) {
  var text = trigger.text;
  
  //@ mention removed before further processing for group conversations
  var request = text.replace("TCDisruptSF ",'');
  
  //match method stops slash commands being passed to Watson
  if(request.match(/(^| )\/hello|\/roomid( |.|$)/i)){
    flint.debug('IBM Watson call cancelled: slash command used')
  }else{
  ibmapi.watsonConversation(request, function(response){
    bot.say(response);
  })
  }
});

// define express path for incoming webhooks
app.post('/flint', webhook(flint));

// start express server
var server = app.listen(config.port, function () {
  flint.debug('Flint listening on port %s', config.port);
});

// gracefully shutdown (ctrl-c)
process.on('SIGINT', function() {
  flint.debug('stoppping...');
  server.close();
  flint.stop().then(function() {
    process.exit();
  });
});