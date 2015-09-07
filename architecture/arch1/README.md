


使用方式：

確定有加入以下套件
    Cordova Plugin
        1.OAuth

    JS Library
        1.angular-mocks
        2.ngCordova


加入資料夾
    1.www/lib/Login
    2.www/lib/Config
    3.www/templates/Login


於www/index.html加入JS include

    <!-- ionic/angularjs js -->
    <script src="lib/ionic/js/ionic.bundle.js"></script>
    <script src="lib/angular-mocks/angular-mocks.js"></script>

    <!-- cordova script (this will be a 404 during development) -->
    <script src="lib/ngCordova/dist/ng-cordova.js"></script>
    <script src="cordova.js"></script>

    <!-- your app's js -->
    <script src="js/app.js"></script>
    <script src="js/controllers.js"></script>
    <script src="js/services.js"></script>

    <script src="lib/Login/services.js"></script>
    <script src="lib/Login/controllers.js"></script>
    <script src="lib/Config/config.js"></script>


於app.js的angular module include 以下模組
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngMockE2E', 'starter.configs', 'ngCordova'])

