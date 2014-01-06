


module.exports = function(io) {
	
	//create udp server
	var dgram = require("dgram");

	var server = dgram.createSocket("udp4");

	server.on("error", function (err) {
		console.log("server error:\n" + err.stack);
		server.close();
	});

	server.on("message", function (data, rinfo) {
		console.log("server got: " + data + " from " +
			rinfo.address + ":" + rinfo.port);

		var msg = data.toString();
		console.log('msg=' + msg);
		
		io.sockets.emit('send:alarm',JSON.parse(msg));

	});

	server.on("listening", function () {
		var address = server.address();
		console.log("server listening " +
			address.address + ":" + address.port);
	});

	server.bind(12345);
	// server listening 0.0.0.0:41234

}