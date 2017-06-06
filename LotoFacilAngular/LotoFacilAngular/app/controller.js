
var app = angular.module('app');

app.controller('ReadTens', function ReadTensController($scope, $http, Backand, TenService) {
    
    $scope.error = '';
    $scope.min = 1;
    $scope.TenService = TenService;
    $scope.limparAvisos = function () {
        $scope.mostrarSucesso = false;
        $scope.mostrarErro = false;
        $scope.dt = '';
        $scope.ten = '';
    };
    $scope.limparAvisos();

    var myPromise = TenService.GetTenListFromServer();
    myPromise.then(function (resolve) {
        $scope.tens = resolve;
    }, function (reject) {
        $scope.error = reject;
    });

    $scope.incluir = function () {
        $scope.limparAvisos();
        var sc = this;
        sc.error = '';
        var valid = TenService.validateTen(sc.ten);
        if (valid != '') {
            sc.error = valid;
            $scope.mostrarErro = true;
        } else {
            if (!TenService.isValidDate(sc.dt)) {
                sc.error = 'Data inválida';
                $scope.mostrarErro = true;
            } else {
                var novoSorteio = {
                    "raffle": TenService.formatDateToServer(sc.dt),
                    "tens": sc.ten
                };
                var myPromise = TenService.CreateTenFromServer(novoSorteio);
                myPromise.then(function (resolve) {
                    var novoId = resolve.__metadata.id;
                    if (novoId > 0) {
                        $scope.dt = null;
                        $scope.sucesso = 'Dezena ' + novoId + ' incluída com sucesso.';
                        $scope.limparAvisos();
                        $scope.mostrarSucesso = true;
                        novoSorteio.id = novoId;
                        $scope.tens.push(novoSorteio);
                    }
                }, function (reject) {
                    $scope.error = reject;
                    $scope.mostrarErro = true;
                });
            }
        }
    };

    $scope.deletar = function (ten) {
        $scope.limparAvisos();
        var myPromise = TenService.DeleteTenFromServer(ten.id);
        myPromise.then(function (resolve) {
            var novoId = resolve.__metadata.id;
            if (novoId > 0) {
                $scope.dt = null;
                $scope.sucesso = 'Dezena ' + novoId + ' excluída com sucesso.';
                $scope.limparAvisos();
                $scope.mostrarSucesso = true;
                $scope.tens.splice($scope.tens.indexOf(ten), 1);
            }
        }, function (reject) {
            $scope.error = reject;
            $scope.mostrarErro = true;
        });

    };

});

app.controller('DatepickerPopupDemoCtrl', function ($scope) {

    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
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

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.format = 'dd/MM/yyyy';

    $scope.popup1 = {
        opened: false
    };
});