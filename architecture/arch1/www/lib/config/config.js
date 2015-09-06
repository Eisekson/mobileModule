angular.module('starter.configs', [])
    .config(function ($stateProvider, $httpProvider) {
        $stateProvider.
            state('login', {
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
    .factory('ServerConfig', function (Status) {
        return {
            serverIP: function () {
                if (Status.isOffline()) {
                    return 'localhost:8100'
                }
                else {
                    //return 'localhost:3000';
                    return '192.168.1.101:3000';
                    //return '104.236.187.134:3000';
                }
            }
            , oauthIP: function () {
                if (Status.isOffline()) {
                    return 'localhost:8100'
                }
                else {
                    //return '104.236.187.134:3001';
                    //return 'localhost:3000';
                    return '192.168.1.101:3000';
                }
            }
        }

    })
    .factory('Status', function () {
        var offline = false
            , device = true;

        return {
            isOffline: function () {
                return offline;
            },
            isDevice: function () {
                return device;
            }
        }
    })