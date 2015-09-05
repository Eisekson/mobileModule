angular.module('starter.services', ['ngMockE2E'])
    .factory('User', function () {
        var email
            , accessToken
            , refreshToken
            , id
            , IMEI = "12345"
            , hasToken = function () {
                if (accessToken == null) {
                    return false;
                }
                if (refreshToken == null) {
                    return false;
                }
            };

        return {
            setToken: function (access, refresh) {
                accessToken = access;
                refreshToken = refresh;
            }
            , IMEI: IMEI
        }
    })
    .factory('Login', function ($httpBackend, $http, ServerConfig, $state, Status, $ionicPlatform, $cordovaOauth, User) {
        var email
            , password;
        return {
            //伺服器使用者帳號密碼認證
            /**
             *
             * @param email
             * @param password
             * @param succFun
             * @param errorFun
             */
            loginClick: function (email, password, succFun, errorFun) {
                $httpBackend.whenPOST('http://' + ServerConfig.oauthIP() + '/whatsinlogin')
                    .respond(function (method, url, data, headers) {
                        return [200, {accessToken: "accessTokenMock", refreshToken: "refreshTokenMock"}];
                    });

                try {
                    $http({
                        method: 'post',
                        url: 'http://' + ServerConfig.oauthIP() + '/whatsinlogin'
                        //, data: "grant_type=password&username=johndoe&password=A3ddj3w"
                        , data: "grant_type=password&username=" + email + "&password=" + password + "&IMEI=" + User.IMEI
                        , headers: {
                            "Authorization": "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW"
                            , "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }).success(function (data) {
                        if (data != null && typeof(data) == 'object') {
                            if ('status' in data && 'message' in data) {
                                if (data.status == 'success') {
                                    if ('refreshToken' in data && 'accessToken' in data) {
                                        User.setToken(data.accessToken, data.refreshToken);
                                        alert(data.accessToken);
                                        alert(data.refreshToken);
                                        succFun("登入成功");
                                    }
                                    else {
                                        errorFun("No token");
                                    }
                                }
                                else if (data.status == 'loginError') {
                                    errorFun("帳號或密碼錯誤，請重新登入。");
                                }
                                else {
                                    errorFun("資料回傳錯誤，請重新登入。");
                                }
                            }
                        }
                        else {
                            errorFun("資料回傳錯誤，請重新登入。")
                        }

                    })
                        .error(function (err) {
                            errorFun(err);
                        });

                } catch (err) {
                    errorFun("catch error" + err);
                }
            }
            , loginWithSocialClick: function (type, succFun, errorFun) {

                $httpBackend.whenGET('http://' + ServerConfig.serverIP() + '/socialLogin')
                    .respond(function (method, url, data, headers) {
                        return [200, {
                            accessToken: "accessTokenSocialLogin"
                            , refreshToken: "refreshTokenSocialLogin"
                        }];
                    });


                var isDevice = Status.isDevice();
                try {
                    switch (type) {
                        case 'Facebook':
                            if (isDevice) {
                                $ionicPlatform.ready(function () {
                                    $cordovaOauth.facebook("1466669486951099", ["email", "public_profile"])
                                        .then(function (result) {
                                            try {
                                                if ("access_token" in result) {
                                                    $http({
                                                        method: "get"
                                                        ,
                                                        url: "http://" + ServerConfig.serverIP() + "/socialLogin/" + type + "/" + result.access_token + "/" + User.IMEI
                                                    }).success(function (data) {
                                                        if (data.status === 'success') {
                                                            if ("accessToken" in data && "refreshToken" in data) {
                                                                User.setToken(data.accessToken, data.refreshToken);
                                                                succFun(type + " 登入成功");
                                                            }
                                                            else {
                                                                errorFun(type + " 登入失敗，請重新登入。");
                                                            }
                                                        }
                                                    }).error(function (err) {
                                                        // http get error
                                                        errorFun(err);
                                                    });
                                                }
                                                else {
                                                    // access_token is not in result
                                                    errorFun("access_token is not in result" + JSON.stringify(result))
                                                }
                                            } catch (error) {
                                                //catch unknown error
                                                errorFun('catch unknow error'+error.name);
                                            }
                                        }, function (error) {
                                            // Facebook get OAuth error
                                            errorFun(error);
                                        });
                                });
                            }
                            else {
                                errorFun("暫不提供非手機的使用者登入。")
                            }
                            break;
                        case 'Google':
                            if (isDevice) {
                                $ionicPlatform.ready(function () {
                                    $cordovaOauth.google("408441298681.apps.googleusercontent.com", ["email", "profile", "openid"]).then(function (result) {
                                        try {
                                            if ("access_token" in result) {
                                                $http({
                                                    method: "get"
                                                    ,
                                                    url: "http://" + ServerConfig.serverIP() + "/socialLogin/" + type + "/" + result.access_token +"/"+User.IMEI
                                                }).success(function (data) {
                                                    if (data.status === 'success') {
                                                        if ("accessToken" in data && "refreshToken" in data) {
                                                            User.setToken(data.accessToken, data.refreshToken);
                                                            succFun(type + " 登入成功");
                                                        }
                                                        else {
                                                            errorFun(type + " 登入失敗，請重新登入。");
                                                        }
                                                    }
                                                }).error(function (err) {
                                                    // http get error
                                                    errorFun(err);
                                                });
                                            }
                                            else {
                                                // access_token is not in result
                                                errorFun("access_token is not in result" + JSON.stringify(result))
                                            }
                                        } catch (error) {
                                            //catch unknown error
                                            errorFun(error);
                                        }
                                    }, function (error) {
                                        // Google get OAuth error
                                        errorFun(error);
                                    });
                                });
                            }
                            else {
                                errorFun("暫不提供非手機的使用者登入。")
                            }
                            break;
                        default:
                            errorFun("不提供" + type + "的登入");
                            break;
                    }
                } catch (err) {
                    errorFun(err);
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

    .factory('Register', function ($http, $httpBackend, ServerConfig, $state) {
        return {
            registerClick: function (registerData, succFun, errorFun) {


                //check required
                try {
                    for (var i in registerData) {
                        if (registerData[i].required && registerData[i].value.length === 0) {
                            alert('請輸入' + registerData[i].name);
                            return;
                        }
                    }
                } catch (error) {
                    errorFun("註冊失敗，請重新開啟App。");
                    return;
                }


                $httpBackend.whenPOST('http://' + ServerConfig.serverIP() + '/register')
                    .respond(function (method, url, data, headers) {
                        //return true ? [200, 'data'] : [401];

                        //todo-yh 資料檢驗，正規運算。
                        //todo-yh 送入資料庫註冊。
                        var response = [];
                        data = JSON.parse(data);
                        return [200, {'status': 'success'}];
                    });


                try {
                    $http(
                        {
                            method: 'POST'
                            , data: registerData
                            , url: 'http://' + ServerConfig.serverIP() + '/register'
                        }
                    )
                        .success(function (data) {
                            if (data['status'] === 'success') {
                                succFun("註冊成功，請收信驗證。");
                                $state.go('login');
                            }
                            else {
                                errorFun("註冊失敗，請重新註冊。");
                            }
                        })
                        .error(function (data, err) {
                            alert('error');
                        })
                } catch (err) {
                    errorFun(err);
                }

            }
        }
    })


