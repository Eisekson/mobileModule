angular.module('starter.controllers', [])
    .controller('RegisterCtrl', function ($scope, Register) {
        $scope.data = {};
        $scope.structure = [
            {
                'type': 'Name'
                , 'name': '姓名'
                , 'value': ''
                , "regularExpression": /^\s*\w*\s*$/
                , 'patternError': '格式不符合'
                , 'requiredError': '必填'
                , 'required': true
            }
            , {
                'type': 'NickName'
                , 'name': '暱稱'
                , 'value': ''
                , "regularExpression": /^\s*\w*\s*$/
                , 'patternError': '格式不符合'
                , 'requiredError': '必填'
                , 'required': true
            }
            , {
                'type': 'Sex'
                , 'name': '性別'
                , 'value': ''
                , "regularExpression": /^\s*\w*\s*$/
                , 'patternError': '格式不符合'
                , 'requiredError': '必填'
                , 'required': true
            }
            , {
                'type': 'Birthday'
                , 'name': '生日'
                , 'value': ''
                , "regularExpression": /^\s*\w*\s*$/
                , 'patternError': '格式不符合'
                , 'requiredError': '必填'
                , 'required': true
            }
            , {
                'type': 'Email'
                , 'name': '信箱'
                , 'value': ''
                , "regularExpression": /^\s*\w*\s*$/
                , 'patternError': '格式不符合'
                , 'requiredError': '必填'
                , 'required': true
            }
            , {
                'type': 'Password'
                , 'name': '密碼'
                , 'value': ''
                , "regularExpression": /^\s*\w*\s*$/
                , 'patternError': '格式不符合'
                , 'requiredError': '必填'
                , 'required': true
            }
            , {
                'type': 'Submit'
                , 'name': '送出'
            }

        ];

        console.log('g');
        $scope.submit = function (register) {
            Register.registerClick(register);
        };

    })

    .controller('LoginCtrl', function ($scope, Login) {
        $scope.data = {};
        $scope.structure = [
            {
                'type': 'Email'
                , 'name': '信箱'
                , 'value': ''
                , "regularExpression": /^\s*\w*\s*$/
                , 'patternError': '格式不符合'
                , 'requiredError': ''
                , 'required': true
            }
            , {
                'type': 'Password'
                , 'name': '密碼'
                , 'value': ''
                , "regularExpression": /^\s*\w*\s*$/
                , 'patternError': '格式不符合'
                , 'requiredError': ''
                , 'required': true
            }
            , {
                'type': 'Submit'
                , 'name': '登入'
            }
            , {
                'type': 'Register'
                , 'name': '註冊'
            }
        ];
        $scope.socialLoginStructure = [
            {
                "type": "Google"
                , "name": "Google Login"
            }
            , {
                "type": "Facebook"
                , "name": "Facebook Login"
            }

        ];
        $scope.goRegisterClick = function () {
            Login.registerClick();
        };
        $scope.submit = function (data) {
            Login.loginClick(data.email, data.password, function (data) {
                    alert(data);
                }
                , function (err) {
                    alert(JSON.stringify(err));
                });
        }
    })
    .controller('DashCtrl', function ($scope, Login, $ionicLoading) {
        $ionicLoading.show();
        Login.login(function (data) {
            $ionicLoading.hide();
        }, function (err) {
            $ionicLoading.hide();
            alert(err);
        });
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
