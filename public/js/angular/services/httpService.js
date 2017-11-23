'use strict';

app
    .factory('httpService', function($http, config){
        var service = {};

        service.authByCredentials = function(user){
            var self = this;
            var userData = $http({
                    url: config.BASE_URL + 'user',
                    method: 'GET',
                    params: {
                        'username': user.username,
                        'password': user.password
                    }
                })
                .then(function(response){
                    angular.extend(self, response.data);
                });

            return userData;
        };

        return service;
    });