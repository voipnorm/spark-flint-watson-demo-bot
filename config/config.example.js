(function() {
    "use strict";
    //rename file to config.js to implement project
    exports.botToken = process.env.BOTTOKEN || "Your Spark access token";
    exports.watsonPassword = process.env.WASTSONPASSWORD || "Your IBM watson API password";
    exports.watsonUserName = process.env.WATSONUSERNAME || "Your IBM watson user code";
    exports.watsonWorkSpaceID = process.env.WATSONWORKSPACEID || "Work space ID created from conversation workspace";
    exports.cloud9URL = process.env.CLOUD9URL || "https://yourProject-username.c9users.io";
})();