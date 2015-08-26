angular.module('starter.configs', [])
    .config(function ($stateProvider) {
        $stateProvider.
            state('Login', {
                url: '/login'
                , templateUrl: 'templates/Login/login.html'
                , controller: 'LoginCtrl'
            })
            .state('register', {
                url: '/register'
                , templateUrl: 'templates/Login/register.html'
                , controller: 'RegisterCtrl'
            })
    })
    .factory('ServerConfig', function () {
        return {
            serverIP: function () {
                return 'http://localhost:8100'
            }
        }

    })