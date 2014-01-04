
exports.alarms = function(socket) {

        socket.on('send:search.alarm', function(data) {
               console.log("server rev:" + JSON.stringify(data));

                socket.emit('send:search.alarm.res', '{"result": "ok"}');
           

        });
};
