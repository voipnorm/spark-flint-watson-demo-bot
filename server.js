
//https://github.com/nmarus/flint
//Make sure to upgrade express if using cloud 9
var Flint = require('node-flint');
var webhook = require('node-flint/webhook');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ibmapi = require('./myutils/ibmapi');
var app = express();

app.use(bodyParser.json());


// flint options
var config = {
  webhookUrl: 'https://tcdisruptsf-voipnorm.c9users.io/flint',
  token: 'YWNiZGJiMDMtYjBlYS00ZWQzLTkwMWItMjQ3ZmUzMTNlZWViNGJiNzQ5ZDktOTM3',
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

// add flint event listeners
flint.on('message', function(bot, trigger, id) {
  flint.debug('"%s" said "%s" in room "%s"', trigger.personEmail, trigger.text, trigger.roomTitle);
});

flint.on('initialized', function() {
  flint.debug('initialized %s rooms', flint.bots.length);
});

//set translation bot per room settings
flint.hears(/(^| )TCDisruptSF( |.|$)/i, function(bot, trigger) {
  var text = trigger.text;
  var request = text.replace("TCDisruptSF ",'');
  ibmapi.watsonConversation(request, function(response){
    bot.say(response);
  })
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