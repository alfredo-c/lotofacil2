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

    this.formatDateToServer = function (dt) {
        var day = dt.getDate();
        if (day.toString().length == 1)
            day = "0" + day;
        var month = dt.getMonth() + 1;
        if (month.toString().length == 1)
            month = "0" + month;
        var year = dt.getFullYear();
        return year + '-' + month + '-' + day;
    }

    this.isValidDate = function (dt) {
        var ret = false;
        if (Object.prototype.toString.call(dt) === "[object Date]") {
            if (!isNaN(dt.getTime())) { 
                ret = true;
            }
        }
        return ret;
    }


});