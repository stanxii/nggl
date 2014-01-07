
var alarms = require('../ioservices/alarms/alarms.js');
var actions = require('../ioservices/actions/actions.js');


exports.socketioservice = function(socket) {

        alarms.alarms(socket);
        actions.actions(socket);
};

