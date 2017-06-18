
var app = angular.module('app');

app.controller('ReadTens', function ReadTensController($scope, $filter, $http, Backand, TenService) {

    // Funcoes

    $scope.limparAvisos = function () {
        $scope.mostrarSucesso = false;
        $scope.mostrarErro = false;
        $scope.dt = '';
        $scope.ten = '';
    };

    $scope.CalcularDezena = function () {
        var myPromise = TenService.GetTenListFromServer(200000);
        myPromise.then(function (resolve) {

            // Iniciar variavel
            $scope.tens = [];
            $scope.tens10 = [];
            $scope.tens20 = [];

            // order por data
            resolve.sort(function (a, b) {
                var dateB = new Date(b.raffle.split('-')[0], b.raffle.split('-')[1] - 1, b.raffle.split('-')[2]);
                var dateA = new Date(a.raffle.split('-')[0], a.raffle.split('-')[1] - 1, a.raffle.split('-')[2]);
                return dateB - dateA;
            });

            // Preparar todas dezenas
            angular.copy(resolve, $scope.tens);

            // as 10 ultimas
            angular.copy(resolve, $scope.tens10);
            $scope.tens10 = $scope.tens10.splice(0, 10);

            // as 20 ultimas
            angular.copy(resolve, $scope.tens20);
            $scope.tens20 = $scope.tens20.splice(10, 10);

            $scope.frequenciaTodas = [];
            $scope.frequencia10 = [];
            $scope.frequencia20 = [];
            $scope.frequencia1020 = [];
            $scope.mapaGeral = [];

            for (var i = 1; i <= 25; i++) {
                $scope.frequenciaTodas.push(countTen($scope.tens, i));
            }

            for (var i = 1; i <= 25; i++) {
                $scope.frequencia10.push(countTen($scope.tens10, i));
            }

            for (var i = 1; i <= 25; i++) {
                $scope.frequencia20.push(countTen($scope.tens20, i));
            }

            var soma1020 = $scope.tens10.concat($scope.tens20);
            for (var i = 1; i <= 25; i++) {
                $scope.frequencia1020.push(countTen(soma1020, i));
            }

            function countTen(list, tenFilter, result) {
                var filterTen = (tenFilter < 10) ? '0' + tenFilter : '' + tenFilter;
                var count = 0;
                angular.forEach(list, function (item) {
                    if (item.tens.indexOf(filterTen) >= 0) count++;
                });
                var d = { Dezena: tenFilter, Vezes: count };
                return d;
            }

            $scope.mapaGeral = [];
            for (var i = 1; i <= 25; i++) {
                var dFilter10 = $filter('filter')($scope.frequencia10, { Dezena: i })[0];
                var dFilter20 = $filter('filter')($scope.frequencia20, { Dezena: i })[0];
                var dFilter1020 = $filter('filter')($scope.frequencia1020, { Dezena: i })[0];
                var dFilterTodas = $filter('filter')($scope.frequenciaTodas, { Dezena: i })[0];
                var item = { Dezena: i, d10: dFilter10.Vezes, d20: dFilter20.Vezes, d1020: dFilter1020.Vezes, dTodas: dFilterTodas.Vezes }
                $scope.mapaGeral.push(item);
            }

            // Finalização

            // Ordenar pelo d10, d20, d1020, Todas.
            var cmp = function (x, y) {
                return x > y ? 1 : x < y ? -1 : 0;
            };
            $scope.mapaGeral.sort(function (a, b) {
                return cmp(
                    [-cmp(a.d10, b.d10), -cmp(a.d20, b.d20), -cmp(a.d1020, b.d1020), -cmp(a.dTodas, b.dTodas)],
                    [-cmp(b.d10, a.d10), -cmp(b.d20, a.d20), -cmp(b.d1020, a.d1020), -cmp(b.dTodas, a.dTodas)]
                );
            });

            // Descartar as 5 dezenas menos provaveis.
            $scope.mapaGeralMenos5Menos = [];
            angular.copy($scope.mapaGeral, $scope.mapaGeralMenos5Menos);
            $scope.mapaGeralMenos5Menos = $scope.mapaGeralMenos5Menos.splice(0, 20);

            // Reordenar ??.

            // Considerar as 15 mais provaveis
            $scope.mapaGeralMais13Provavel = [];
            angular.copy($scope.mapaGeralMenos5Menos, $scope.mapaGeralMais13Provavel);
            $scope.mapaGeralMais13Provavel = $scope.mapaGeralMais13Provavel.splice(0, 13);

            // Considerar as 13... Ja fiz na ultima..

            // Exibir as 13 dezenas!
            $scope.Ten13Valida = [];
            $scope.Ten13ValidaExibir = [];
            angular.forEach($scope.mapaGeralMais13Provavel, function (item) {
                $scope.Ten13Valida.push(item.Dezena);
                // var filterTen = (item.Dezena < 10) ? '0' + item.Dezena : '' + item.Dezena;
            });
            $scope.Ten13Valida = $scope.mapaGeralMais13Provavel.sort(function (a, b) {
                return a.Dezena - b.Dezena;
            });
            angular.forEach($scope.Ten13Valida, function (item) {
                var dezena = (item.Dezena < 10) ? '0' + item.Dezena : '' + item.Dezena;
                $scope.Ten13ValidaExibir = $scope.Ten13ValidaExibir + dezena + ' ';
            });

        }, function (reject) {
            $scope.error = reject;
        });
    };

    $scope.incluirTenValido = function (novoSorteio, adequarAvisos) {
        var myPromise = TenService.CreateTenFromServer(novoSorteio);
        myPromise.then(function (resolve) {
            var novoId = resolve.__metadata.id;
            if (novoId > 0) {
                $scope.dt = null;
                $scope.sucesso = 'Dezena ' + novoId + ' incluída com sucesso.';
                if (!adequarAvisos)
                    $scope.limparAvisos();
                $scope.mostrarSucesso = true;
                novoSorteio.id = novoId;
                $scope.tens.push(novoSorteio);
            }
        }, function (reject) {
            $scope.error = reject;
            $scope.mostrarErro = true;
        });
    };

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
                $scope.incluirTenValido(novoSorteio);
            }
        }
    };

    $scope.deletar = function (ten, adequarAvisos) {
        if (!adequarAvisos)
            $scope.limparAvisos();
        var myPromise = TenService.DeleteTenFromServer(ten.id);
        myPromise.then(function (resolve) {
            var novoId = resolve.__metadata.id;
            if (novoId > 0) {
                $scope.dt = null;
                $scope.sucesso = 'Dezena ' + novoId + ' excluída com sucesso.';
                if (!adequarAvisos)
                    $scope.limparAvisos();
                $scope.mostrarSucesso = true;
                $scope.tens.splice($scope.tens.indexOf(ten), 1);
            }
        }, function (reject) {
            $scope.error = reject;
            $scope.mostrarErro = true;
        });

    };

    $scope.deletarTodas = function () {
        var myPromise = TenService.GetTenListFromServer(200000);
        myPromise.then(function (resolve) {
            angular.forEach(resolve, function (value) {
                $scope.deletar(value, true);
            });
        }, function (reject) {
            $scope.error = reject;
        });
    }

    $scope.reset = function (todas) {
        // $scope.deletarTodas();
        var tens = TenService.CreateTenFromServerBatch(todas);
        angular.forEach(tens, function (ten) {
            $scope.incluirTenValido(ten, true);
        });
    }

    // Acoes
    $scope.error = '';
    $scope.min = 1;
    $scope.TenService = TenService;
    $scope.limparAvisos();
    $scope.CalcularDezena();

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