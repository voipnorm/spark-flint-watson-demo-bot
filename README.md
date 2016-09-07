# Spark Demo Bot Skeleton

## Required accounts
* Spark user/developer account
* Spark bot account
* IBM Watson credentials
* Cloud 9 hosting (optional)

## IBM Watson Conversation API's

* IBM Watson Conversation API provides a natural language interface to help automate interactions for chatbots. 
* IBM provides a web interface to help create Intents, Entities and Dialogs along with an extensive nodejs module which is used in this skeleton.
* API calls are made to the Watson service via the Nodejs Watson module.
* [Great demo from IBM Watson Team](https://www.youtube.com/watch?v=MTCc4d-RXP0)

## Cloud 9 hosting by Amazon

* Cloud 9 is a cloud IDE/hosting platform
* [Cloud 9 hosting documents](https://docs.c9.io/docs)
* [Cloud 9 Introduction Video](https://www.youtube.com/watch?v=hqzOwM8aXdI)
* Ensure to upgrade the default version of Express if using Cloud 9 per the dependencies below which is also in the package.json file.


## Dependencies -
* "async": "~0.2.8",
* "body-parser": "^1.15.2",
* "express": "^4.14.0",
* "fs": "0.0.1-security",
* "node-flint": "^4.1.1",
* "path": "^0.12.7",
* "watson-developer-cloud": "^2.2.0"

## Use -

Easy to setup and use Spark bot skeleton based on Flint bot Framework by Nick Marus with integration to IBM Watson Conversation API.


## Running the server 

**DEBUG=flint,bot,sparky node server.js**

## Configuration -
    1. Clone repository by creating a new workspace on cloud9 using clone option
    2. Create Spark Bot account at developer.ciscospark.com
    3. Setup IBM Watson conversation API per IBM instructions
    4. Rename config.example to config.js and add keys, username and ID's
    5. Start server

## Helpful Links

* [Cisco Spark Bot SDK Framework](https://github.com/nmarus/flint)
* [Cisco Spark Developer](https://developer.cisco.com)
* [IBM Watson Conversation](https://www.ibmwatsonconversation.com/)
* [IBM Watson NodeJS Module](https://github.com/watson-developer-cloud/node-sdk#conversation)
* [Cloud9 by Amazon](https://c9.io/)
