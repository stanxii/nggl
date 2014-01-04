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
['$rootScope', function($rootScope) {
}]);

angular.module('angular-client-side-auth')
.controller('ChuzhaCtrl',
['$rootScope', function($rootScope) {
}]);

angular.module('angular-client-side-auth')
.controller('YinfengjiCtrl',
['$rootScope', '$scope', function($rootScope, $scope) {
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
['$rootScope', function($rootScope) {
}]);


angular.module('angular-client-side-auth')
.controller('WenduCtrl',
['$rootScope', '$scope', 'socket', function($rootScope, $scope, socket) {


    socket.on('init', function (data) {
        $scope.lutang = data.name;
        $scope.users = data.users;
     });

    socket.on('send:alarm', function (data) {
        console.log(data);
        $scope.lutang = data.template;
        $scope.lukou = data.template;
    });

   $scope.lutang = 32;  
   $scope.lukou = 34;  
   $scope.ranshi2ru = 38;  
   $scope.ranshi2chu = 42;  
   $scope.budairu = 44;  
   $scope.budaichu = 50;  

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
}]);

angular.module('angular-client-side-auth')
.controller('GufengjiCtrl',
['$rootScope', function($rootScope) {
}]);
