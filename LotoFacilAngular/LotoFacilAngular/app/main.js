var app = angular.module('app', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngMask', 'backand']);

//Update Angular configuration section
app.config(function (BackandProvider) {
    BackandProvider.setAppName('lotofacil');
    BackandProvider.setSignUpToken('9e3d4db6-6fd2-4103-9a15-7eea60c6026a');
    BackandProvider.setAnonymousToken('9e3d4db6-6fd2-4103-9a15-7eea60c6026a');
})