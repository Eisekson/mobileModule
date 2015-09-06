/**
 *
 * Created by eisekson on 2015/9/6.
 */


angular.module('starter.controllers', [])
    .controller('RegisterCtrl', function ($scope, Register, $ionicLoading) {
        $scope.data = {};
        $scope.structure = [
            {
                'type': 'LastName'
                , 'name': '姓'
                , 'value': ''
                , "regularExpression": /^\s*\w*\s*$/
                , 'patternError': '格式不符合'
                , 'requiredError': '必填'
                , 'required': true
            }

            , {
                'type': 'FirstName'
                , 'name': '名'
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

        $scope.submit = function (register) {
            $ionicLoading.show();
            Register.registerClick(register
                , function (message) {
                    console.log(message);
                    alert(JSON.stringify(message));
                    $ionicLoading.hide();
                }
                , function (message) {

                    console.log(message);
                    alert(JSON.stringify(message));
                    $ionicLoading.hide();
                });
        };

    })

    .controller('LoginCtrl', function ($scope, Login, $ionicLoading) {
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
        $scope.socialLoginClick = function (type) {
            // show loading
            $ionicLoading.show();

            Login.loginWithSocialClick(type, function (message) {
                console.log(message);
                alert(JSON.stringify(message));
                $ionicLoading.hide();
            }, function (message) {
                console.log(message);
                alert(JSON.stringify(message));
                $ionicLoading.hide();
            });
        };
        $scope.submit = function (data) {
            // show loading
            $ionicLoading.show();

            Login.loginClick(data.Email, data.password, function (message) {
                    console.log(message);
                    alert(message);
                    $ionicLoading.hide();
                }
                , function (message) {
                    console.log(message);
                    alert(JSON.stringify(message));
                    $ionicLoading.hide();
                });
        }
    })

