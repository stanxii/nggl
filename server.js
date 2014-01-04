var express =       require('express')
    , cons =        require('consolidate')
    , http =        require('http')
    , passport =    require('passport')
    , path =        require('path')
    , User =        require('./server/models/User.js');
var socketioservice = require('./server/routes/socketio.js');



var app = module.exports = express();
// assign the swig engine to .html files
app.engine('html', cons.ect);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/client/views');

//app.set('views', __dirname + '/client/views');
//app.set('view engine', 'jade');

app.use(express.logger('dev'))
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.cookieSession(
    {
        secret: process.env.COOKIE_SECRET || "Superdupersecret"
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.localStrategy);
//passport.use(User.twitterStrategy());  // Comment out this line if you don't want to enable login via Twitter
//passport.use(User.facebookStrategy()); // Comment out this line if you don't want to enable login via Facebook
passport.use(User.googleStrategy());   // Comment out this line if you don't want to enable login via Google
//passport.use(User.linkedInStrategy()); // Comment out this line if you don't want to enable login via LinkedIn

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

require('./server/routes.js')(app);

app.set('port', process.env.PORT || 8000);

var hserver = http.createServer(app);

hserver.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(hserver);

io.sockets.on('connection', socketioservice.socketioservice);

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
