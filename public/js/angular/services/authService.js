'use strict';

app
    .factory('AuthService', function($http, $rootScope, $cookies, httpService, $location){

        var service = {};

        service.doLogin = function(user, cb){

            var response = {};
            httpService.authByCredentials(user)
                .then(function(response){
                    response.success = data.code == 200?true:false;

                    if(data.code != 200)
                        response.message = data.message;

                    cb(response);
                })
        };


        service.setCredentials = function(username){

            var encodedUser = Base64.encode(username);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    auth: encodedUser
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic' + encodedUser;

            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + config.COOKIE_DURATION);

            $cookies.putObject('globals', $rootScope.globals, {expires: cookieExp});
        };

        service.clearCredentials = function(){
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic'
            $location.path("/login")
        };

        return service;

    });