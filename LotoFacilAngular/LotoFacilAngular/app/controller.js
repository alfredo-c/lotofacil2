﻿
var app = angular.module('app');

app.controller('ReadTens', function ReadTensController($scope, TenService) {
    $scope.error = '';
    $scope.min = 1;
    $scope.TenService = TenService;
    $scope.valido = true;
    $scope.tens = [
      {
          raffle: '01/02/2017',
          tens: '01 02 03 06 10 11 17 18 19 20 21 22 23 24 25'
      },
      {
          raffle: '01/03/2017',
          tens: '11 17 18 19 20 21 22 23 24 25 01 02 03 06 10 '
      },
      {
          raffle: '01/04/2017',
          tens: '01 02 17 18 19 20 21 03 06 10 11 22 23 24 25'
      }
    ];

    $scope.incluir = function () {
        var sc = this;
        sc.error = '';
        sc.valido = true;
        var valid = TenService.validateTen(sc.ten);
        if (valid != '') {
            sc.error = valid;
            sc.valido = false;
        }

    };

});

app.controller('DatepickerPopupDemoCtrl', function ($scope) {

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.format = 'dd/MM/yyyy';

    $scope.popup1 = {
        opened: false
    };
});