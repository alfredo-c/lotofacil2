var app = angular.module('app', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngMask', 'backand']);

//Update Angular configuration section
app.config(function (BackandProvider) {
    BackandProvider.setAppName('lotofacil2');
    BackandProvider.setSignUpToken('5475a57b-55d2-4c1a-812c-d857cbb48157');
    BackandProvider.setAnonymousToken('5475a57b-55d2-4c1a-812c-d857cbb48157');
})