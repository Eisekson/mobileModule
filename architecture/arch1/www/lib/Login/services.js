angular.module('starter.services', ['ngMockE2E'])
    .factory('User', function () {
        var email
            , accessToken
            , id;
    })
    .factory('Login', function ($httpBackend, $http, ServerConfig, $state) {
        var email
            , password;
        return {
            //伺服器使用者帳號密碼認證
            /**
             *
             * @param email
             * @param password
             * @param succ
             * @param error
             */
            loginClick: function (email, password, succ, error) {
                $httpBackend.whenGET(ServerConfig.serverIP() + '/test').respond(function (method, url, data, headers) {
                    //return true ? [200, 'data'] : [401];
                    return [200, data];
                });

                $http.get(ServerConfig.serverIP() + '/test')
                    .success(function (data) {
                        succ(data);
                    })
                    .error(function (err) {
                        error(err);
                    })
            }
            , loginWithSocialClick: function (type) {
                switch (type) {
                    case 'Facebook':
                        break;
                    case 'Google':
                        break;
                    default:
                        break;
                }
            }
            , registerClick: function () {
                $state.go('register');
            }
            , register: function (name, email, password, birthday, sex) {

            }
        };
    })
    .filter('Password', function () {

    })

    .factory('Register', function ($http, $httpBackend, ServerConfig) {
        return {
            registerClick: function (registerData) {
                //check required
                for (var i in registerData) {
                    if (registerData[i].required && registerData[i].value.length === 0) {
                        alert('請輸入' + registerData[i].name);
                        return;
                    }
                }


                $httpBackend.whenPOST(ServerConfig.serverIP() + '/register')
                    .respond(function (method, url, data, headers) {
                        //return true ? [200, 'data'] : [401];
                        var response = [];
                        data = JSON.parse(data);
                        for (var i = 0; i < data.length; i++) {
                            response.push(data[i].value);
                        }
                        return [200, response];
                    });

                $http(
                    {
                        method: 'POST'
                        , data: registerData
                        , url: ServerConfig.serverIP() + '/register'
                    }
                )
                    .success(function (data) {
                        alert(JSON.stringify(data));
                    })
                    .error(function (data, err) {
                        alert('error');
                    })
            }
        }
    })


