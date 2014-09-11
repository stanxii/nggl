

var moment = require('moment');


var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

var doMongodbOpt = function(jsondata) {
	MongoClient.connect('mongodb://127.0.0.1:27017/huanbao', function(err, db) {
    if(err) throw err;

	//convert temp from string to number
	jsondata.temp = Number(jsondata.temp);

	

    var collection = db.collection('alarms');
    collection.insert(jsondata, {w:1}, function(err, docs) {

      collection.count(function(err, count) {
        console.log(format("count = %s", count));
      });

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        console.dir(results);
        // Let's close the db
        db.close();
      });
    });
  })
}


var doWorkingData = function(io,jsondata, cmd){
	if( jsondata.cmd == "trap"){
		//console.log("fucking.....data="+jsondata);
		io.sockets.emit(cmd, jsondata);
	}
	else if(jsondata.cmd == "alarm"){
			//alarm will save to redis and es
			//console.log("fuck.......mongo")
;			//doMongodbOpt(jsondata);
			io.sockets.emit(cmd, jsondata);
	}
}


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
		var jsondata = JSON.parse(msg);

		jsondata.ip = rinfo.address;
		//jsondata.alarmtime = new Date().getTime();
		jsondata.alarmtime = moment().format();
		
		console.log("Now change datetime=" + new Date(jsondata.alarmtime));

					
		switch(rinfo.address){
			case "192.168.1.192":
			    var cmd = 'send:lutangup';
				//doWorkingData(io, jsondata, cmd);
				io.sockets.emit('send:lutangup',jsondata);
				break;
			case "192.168.1.193":
				io.sockets.emit('send:lutangmid',jsondata);
				break;
			case "192.168.1.194":
				io.sockets.emit('send:lutangdown',jsondata);
				break;
			case "192.168.1.195":
				io.sockets.emit('send:ranshi2ru',jsondata);
				break;		
			case "192.168.1.196":
				io.sockets.emit('send:ranshi2chu',jsondata);
				break;
			case "192.168.1.197":
				io.sockets.emit('send:xidi1',jsondata);
				break;
			case "192.168.1.198":
				io.sockets.emit('send:xidi2',jsondata);
				break;
			case "192.168.1.199":
				io.sockets.emit('send:xidi3',jsondata);
				break;		
			case "192.168.1.200":
				io.sockets.emit('send:budairu',jsondata);
				break;
			case "192.168.1.201":
				io.sockets.emit('send:budaichu',jsondata);
				break;			
		}

	});

	server.on("listening", function () {
		var address = server.address();
		console.log("server listening " +
			address.address + ":" + address.port);
	});

	server.bind(12345);
	// server listening 0.0.0.0:41234

}