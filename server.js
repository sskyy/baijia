var argv = require('optimist').argv

argv.port = 18080

require('sails').lift();