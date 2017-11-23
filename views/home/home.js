'use strict';

app
    .controller('homeController', function($scope, $rootScope, httpService, $location, AuthService){

        $scope.username = $rootScope.globals.currentUser.username;
        $scope.data = null;

        $scope.loadUsers = function(){
            httpService
                .getUsersAsList()
                .then(function (response){
                    $scope.users = response.data;
                });
        };

        $scope.loadUsers();

        $scope.deleteUser = function(userId){
            httpService
                .deleteUser(userId)
                .then(function(response){
                    if(response.code == 200)
                        $scope.loadUsers();
                })
        };

        $scope.editUser = function(userId){
            $location.path('/edit/' + userId);
        }

        $scope.logout = function(){
            AuthService.clearCredentials();
        }

    });