var app = angular.module('app');

app.service('TenService', function () {
    this.randomTen = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    this.validateTen = function (ten) {
        if (ten == undefined)
            return 'Insira 15 dezenas válidas!';

        var values = ten.split(' ');
        if (values.length != 15)
            return 'Insira 15 dezenas válidas!';

        var validNumber = true;
        angular.forEach(values, function (value, key) {
            if (value > 25) {
                validNumber = false;
                return;
            }
        });
        if (!validNumber)
            return 'Insira 15 dezenas de até 25!';

        return '';
    };


});