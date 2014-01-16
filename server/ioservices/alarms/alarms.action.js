var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    var doMongodbOpt = function(socket, action, jsondata) {
      MongoClient.connect('mongodb://127.0.0.1:27017/huanbao', function(err, db) {
        if(err) throw err;

        

        var collection = db.collection('alarms');

///////////////////////////////////////case begin
        if(action == "list"){
          //list the alarm whith condition json data  
          // send:alarms.list rev:{"startdate":"1/14/2014 10:02:54 AM",
          //"enddate":"1/15/2014 10:02:54 AM",
          //"level": "high",
          //"orederprop":"alarmtime"}  
          var orederprop = jsondata.orederprop;      
          collection.find({"alarmtime":{$gte:jsondata.startdate},
            "alarmtime":{$lte: jsondata.enddate},             
            "level": jsondata.level })
          .limit(100)
          .sort({ orederprop : -1} )
          .toArray(function(err, results) {
          	if(err){
          		socket.emit('send:alarms.list.res', {"result": "failed"});            
          	}else{
          		socket.emit('send:alarms.list.res', results);            
          	}
          	db.close();
          }); 

        	       
        }
        else if(action == "newest"){
           
        }
        else if(action == "interesting"){
         
        }else if(action == "interesting"){
         
        }else if(action == "featured"){
          
        }else if(action == "hot"){
          
        }else if(action == "week"){
          
        }else if(action == "month"){
          
        }
///////////////////////////////////////case end
        
      });
    }

exports.alarmsAction = function(socket) {

        socket.on('send:alarms.list', function(data) {
            console.log("send:alarms.list rev:" + JSON.stringify(data));
            doMongodbOpt(socket, "list",data);
        });
};
