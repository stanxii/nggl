'use strict';

/* Controllers */

angular.module('angular-client-side-auth')
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

angular.module('angular-client-side-auth')
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

angular.module('angular-client-side-auth')
.controller('HomeCtrl',
['$rootScope', function($rootScope) {

}]);

angular.module('angular-client-side-auth')
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

angular.module('angular-client-side-auth')
.controller('PrivateCtrl',
['$rootScope', function($rootScope) {
}]);


angular.module('angular-client-side-auth')
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

angular.module('angular-client-side-auth')
.controller('JinliaoCtrl',
[        '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
    $scope.jinliaoAction = function(action) {
        var jsondata = '{"cmd":"jinliao", "action":"' + action + '"}';
        socket.emit('send:jinliao' , jsondata);
    }
}]);

angular.module('angular-client-side-auth')
.controller('ChuzhaCtrl',
[        '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
    $scope.chuzhaAction = function(action) {
        var jsondata = '{"cmd":"chuzha", "action":"' + action + '"}';
        socket.emit('send:chuzha' , jsondata);
    }
}]);

angular.module('angular-client-side-auth')
.controller('YinfengjiCtrl',
[        '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
   
    $scope.yinfengjiAction = function(action) {
        var jsondata = '{"cmd":"yinfengji", "action":"' + action + '"}';
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

angular.module('angular-client-side-auth')
.controller('ShuibengCtrl',
[   '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
    $scope.shuibengAction = function(action) {
        var jsondata = '{"cmd":"shuibeng", "action":"' + action + '"}';
        socket.emit('send:shuibeng' , jsondata);
    }
}]);


angular.module('angular-client-side-auth')
.controller('WenduCtrl',
[            '$rootScope', '$scope', 'socket', 
     function($rootScope, $scope, socket) {


    socket.on('init', function (data) {
        $scope.lutang = data.name;
        $scope.users = data.users;
     });

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

   $scope.lutang = 32;  
   $scope.lukou = 34;  
   $scope.ranshi2ru = 38;  
   $scope.ranshi2chu = 42;  
   $scope.budairu = 44;  
   $scope.budaichu = 50;  

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

angular.module('angular-client-side-auth')
.controller('GufengjiCtrl',
[   '$rootScope', '$scope', 'socket', 
function($rootScope, $scope, socket) {
    $scope.gufengjiAction = function(action) {
        var jsondata = '{"cmd":"gufengji", "action":"' + action + '"}';
        socket.emit('send:gufengji' , jsondata);
    }
}]);
