'use strict';

/* Controllers */

angular.module('nggl')
.controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.logout = function() {
        Auth.logout(function() {
            $location.path('/login');
        }, function() {
            $rootScope.error = "Failed to logout";
        });
    };
}]);

angular.module('nggl')
.controller('LoginCtrl',
['$rootScope', '$scope', '$location', '$window', 'Auth', function($rootScope, $scope, $location, $window, Auth) {

    $scope.rememberme = true;
    $scope.login = function() {
        Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberme: $scope.rememberme
            },
            function(res) {
                $location.path('/');
            },
            function(err) {
                $rootScope.error = "Failed to login";
            });
    };

    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
}]);

angular.module('nggl')
.controller('HomeCtrl',
['$rootScope', function($rootScope) {

}]);

angular.module('nggl')
.controller('RegisterCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;

    $scope.register = function() {
        Auth.register({
                username: $scope.username,
                password: $scope.password,
                role: $scope.role
            },
            function() {
                $location.path('/');
            },
            function(err) {
                $rootScope.error = err;
            });
    };
}]);

angular.module('nggl')
.controller('PrivateCtrl',
['$rootScope', function($rootScope) {
}]);


angular.module('nggl')
.controller('AdminCtrl',
['$rootScope', , 'Users', 'Auth', function($rootScope, $scope, Users, Auth) {
    $scope.loading = true;
    $scope.userRoles = Auth.userRoles;

    Users.getAll(function(res) {
        $scope.users = res;
        $scope.loading = false;
    }, function(err) {
        $rootScope.error = "Failed to fetch users.";
        $scope.loading = false;
    });

}]);

angular.module('nggl')
.controller('JinliaoCtrl',
[        '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
        $scope.myvalid = false;

        $scope.isSelected = 0;    

        $scope.jinliaoAction = function(action) {
        
        $scope.isSelected = action;


                       
        console.log("now isSelected =  true" + action);
        
        $scope.myvalid=function(e){               
               return false;
       };

    var jsondata = '{"cmd":"set","action":"' + action + '"}';
    socket.emit('send:jinliao' , jsondata);
    }
}]);

angular.module('nggl')
.controller('ChuzhaCtrl',
[        '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {

    $scope.isSelected = 0;

    $scope.chuzhaAction = function(action) {
        $scope.isSelected = action;
        var jsondata = '{"cmd":"set","action":"' + action + '"}';
        socket.emit('send:chuzha' , jsondata);
    }
}]);

angular.module('nggl')
.controller('YinfengjiCtrl',
[        '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
   
    $scope.isSelected = 0;
    $scope.yinfengjiAction = function(action) {
        $scope.isSelected = action;
        var jsondata = '{"cmd":"set","action":"' + action + '"}';
        socket.emit('send:yinfengji' , jsondata);
    }

   $scope.value1 = 42;
   $scope.value2 = 68;

    setInterval(function(){
        $scope.$apply(function() {
            $scope.value1 = getRandomInt(10, 90);
            $scope.value2 = getRandomInt(1, 99);
        });
    }, 1000);
}]);

angular.module('nggl')
.controller('ShuibengCtrl',
[   '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
    $scope.isSelected = 0;
    $scope.shuibengAction = function(action) {
        $scope.isSelected = action;
        var jsondata = '{"cmd":"set","action":"' + action + '"}';
        socket.emit('send:shuibeng' , jsondata);
    }
}]);


angular.module('nggl')
.controller('WenduCtrl',
[            '$rootScope', '$scope', 'socket', 
     function($rootScope, $scope, socket) {

    $scope.lutangup = 32;  
    $scope.lutangmid = 32;  
    $scope.lutangdown = 32;  
   $scope.ranshi2ru = 34;  
   $scope.ranshi2chu = 38;
   $scope.xidi1 = 33;     
   $scope.xidi2 = 33;     
   $scope.xidi3 = 33;     
   $scope.budairu = 44;  
   $scope.budaichu = 50; 

    socket.on('init', function (data) {
        $scope.lutangup = data.name;
        $scope.users = data.users;
     });

    socket.on('send:lutangup', function (data) {
         console.log("recive lutangup" + data);
         $scope.lutangup = data.temp;
    });
    socket.on('send:lutangmid', function (data) {
         console.log("recive lutangmid" + data);
         $scope.lutangmid = data.temp;
    });
    socket.on('send:lutangdown', function (data) {
         console.log("recive lutangdown" + data);
         $scope.lutangdown = data.temp;
    });    
    socket.on('send:ranshi2ru', function (data) {
         console.log("recive ranshi2ru" + data);
         $scope.ranshi2ru = data.temp;
    });
    socket.on('send:ranshi2chu', function (data) {
         console.log("recive ranshi2chu" + data);
         $scope.ranshi2chu = data.temp;
    });
    socket.on('send:budairu', function (data) {
         console.log("recive budairu" + data);
         $scope.budairu = data.temp;
    });
    socket.on('send:budaichu', function (data) {
         console.log("recive budaichu" + data);
         $scope.budaichu = data.temp;
    });
    socket.on('send:xidi1', function (data) {
         console.log("recive xidi1" + data);
         $scope.xidi1 = data.temp;
    });
    socket.on('send:xidi2', function (data) {
         console.log("recive xidi2" + data);
         $scope.xidi2 = data.temp;
    });
    socket.on('send:xidi3', function (data) {
         console.log("recive xidi3" + data);
         $scope.xidi3 = data.temp;
    });

/*
    socket.on('send:alarm', function (data) {
        console.log("recive alarm" + data);
        $scope.lutang = data.temp;
        $scope.lukou = data.temp;
        $scope.ranshi2ru = data.temp;
        $scope.ranshi2chu = data.temp;
        $scope.budairu = data.temp;
        $scope.budaichu = data.temp;
    });

    socket.on('send:trap', function (data) {
        console.log("receive trap" + data);
        $scope.lutang = data.temp;
        $scope.lukou = data.temp;
        $scope.ranshi2ru = data.temp;
        $scope.ranshi2chu = data.temp;
        $scope.budairu = data.temp;
        $scope.budaichu = data.temp;
    });
*/

   

   /*
    setInterval(function(){
        $scope.$apply(function() {
        $scope.lutang = getRandomInt(10, 90);
        $scope.lukou = getRandomInt(10, 90);
        $scope.ranshi2ru = getRandomInt(10, 90);
        $scope.ranshi2chu = getRandomInt(10, 90);
        $scope.budairu = getRandomInt(10, 90);
        $scope.budaichu = getRandomInt(10, 90);

           
        });
    }, 1000);

    */
}]);

angular.module('nggl')
.controller('GufengjiCtrl',
[   '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
    $scope.isSelected = 0;
    $scope.gufengjiAction = function(action) {
        $scope.isSelected = action;
        var jsondata = '{"cmd":"set","action":"' + action + '"}';
        socket.emit('send:gufengji' , jsondata);
    }
}]);

angular.module('nggl')
.controller('GlobalconfigCtrl',
[   '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
    $scope.globalconfigAction = function(action) {
        var jsondata = '{"cmd":"config","action":"' + action + '"}';
        socket.emit('send:config' , jsondata);
    }
}]);

angular.module('nggl')
.controller('AlarmsCtrl',
[   '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {   


   

   
    $scope.salarm = {
        //Dt: Date.now(),       
        startdate: new Date(new Date()-24*60*60*1000),
        enddate: new Date(),
        level: "high",
        temp: 200,
        orderProp: "alarmtime",
    };

    //var jsondata = '{"_id":"gufengji","action":"' + action + '"}';

    var v = {};
       v.startdate = $scope.salarm.startdate.getTime();
       v.enddate = $scope.salarm.enddate.getTime();
       v.level = $scope.salarm.level;      
       v.orderProp = $scope.salarm.orderProp;


    socket.emit('send:alarms.list' , v);

    //for list 
    $scope.search = function(salarm) {
       var jsondata = {};
       jsondata.startdate = salarm.startdate.getTime();
       jsondata.enddate = salarm.enddate.getTime();
       jsondata.level = salarm.level;      
       jsondata.orderProp = salarm.orderProp;

       console.log("Action == salarm=" + JSON.stringify(jsondata));
        socket.emit('send:alarms.list' , jsondata);
    }


    socket.on('send:alarms.list.res', function (data) {
         console.log("send:alarms.list.res alarms list" + JSON.stringify(data));
         $scope.alarms = data;
    });
}]);


