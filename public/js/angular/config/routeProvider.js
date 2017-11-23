
app
    .config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'homeController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($rootScope, $location, $http, config, $cookies) {

        $rootScope.globals = $cookies.getObject('globals') || {};
        if($rootScope.globals.currentUser)
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.auth;

        $rootScope.$on('$locationChangeStart', function(event, next, cur){
            var isRestricted = $.inArray($location.path(), config.UNAUTHORIZED) === -1;
            var hasUser = $rootScope.globals.currentUser;
            if(isRestricted && !hasUser)
                $location.path('/login');
        });
    });