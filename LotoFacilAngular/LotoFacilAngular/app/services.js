var app = angular.module('app');

app.service('TenService', function ($q, $http, Backand) {
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

    this.GetTenListFromServer = function (total) {
        total = (total == undefined) ? 20 : total;
        var deferred = $q.defer();
        Backand.object.getList("Ten", {
            "pageSize": total,
            "pageNumber": 1,
            "filter": [],
            "sort": []
        })
        .then(function (response) {
            deferred.resolve(response.data);
        })
        .catch(function (_error) {
            deferred.reject(_error);
        });
        return deferred.promise;
    }

    this.CreateTenFromServer = function (novoSorteio) {
        var deferred = $q.defer();
        $http.post(Backand.getApiUrl() + '/1/objects/Ten', novoSorteio, {
            headers: { 'AnonymousToken': '5475a57b-55d2-4c1a-812c-d857cbb48157' }
        })
        .then(function (response) {
            deferred.resolve(response.data);
        })
        .catch(function (_error) {
            deferred.reject(_error);
        });
        return deferred.promise;
    }

    this.DeleteTenFromServer = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: Backand.getApiUrl() + '/1/objects/Ten/' + id,
            headers: { 'AnonymousToken': '5475a57b-55d2-4c1a-812c-d857cbb48157' }
        })
        .then(function (response) {
            deferred.resolve(response.data);
        })
        .catch(function (_error) {
            deferred.reject(_error);
        });


        return deferred.promise;
    }



    this.CreateTenFromServerBatch = function () {

        var tens = [];

        // Adquirir no site : http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_lotfac.zip
        // Utilizar planilha para gerar seguinte mascara!

        tens.push({ 'raffle': '2016-10-07', 'tens': '06 24 09 19 18 03 11 07 20 17 05 08 12 23 14' });
        tens.push({ 'raffle': '2016-10-10', 'tens': '11 16 14 15 07 19 22 05 13 17 23 10 04 24 01' });
        tens.push({ 'raffle': '2016-10-14', 'tens': '02 07 19 08 01 13 12 11 04 22 15 23 16 05 14' });
        tens.push({ 'raffle': '2016-10-17', 'tens': '11 02 20 13 18 25 04 17 05 23 21 10 08 06 09' });
        tens.push({ 'raffle': '2016-10-19', 'tens': '16 09 03 11 04 13 05 14 12 21 01 19 20 08 25' });
        tens.push({ 'raffle': '2016-10-21', 'tens': '10 02 14 16 04 03 18 23 08 12 22 07 15 25 24' });
        tens.push({ 'raffle': '2016-10-24', 'tens': '18 17 15 01 14 16 20 02 25 12 11 22 10 19 07' });
        tens.push({ 'raffle': '2016-10-26', 'tens': '22 13 17 02 06 09 05 18 03 08 21 20 04 25 19' });
        tens.push({ 'raffle': '2016-10-28', 'tens': '15 19 25 20 14 13 16 18 08 09 07 10 05 12 21' });
        tens.push({ 'raffle': '2016-10-31', 'tens': '01 20 04 16 23 08 21 07 22 13 05 25 03 09 15' });
        tens.push({ 'raffle': '2016-11-04', 'tens': '16 14 09 08 19 20 10 23 12 02 01 15 25 07 17' });
        tens.push({ 'raffle': '2016-11-07', 'tens': '25 17 04 24 18 11 23 12 03 01 16 05 20 21 10' });
        tens.push({ 'raffle': '2016-11-09', 'tens': '16 14 23 09 22 06 20 12 15 25 03 07 10 24 18' });
        tens.push({ 'raffle': '2016-11-11', 'tens': '04 13 06 03 05 09 07 22 18 24 23 10 12 19 15' });
        tens.push({ 'raffle': '2016-11-14', 'tens': '04 17 05 20 01 10 06 16 02 19 23 03 09 21 12' });
        tens.push({ 'raffle': '2016-11-16', 'tens': '05 06 19 03 23 24 02 01 08 18 11 22 12 17 15' });
        tens.push({ 'raffle': '2016-11-18', 'tens': '07 09 19 04 06 25 02 08 11 23 14 05 20 13 17' });
        tens.push({ 'raffle': '2016-11-21', 'tens': '01 10 08 21 04 24 11 17 15 14 07 09 20 12 22' });
        tens.push({ 'raffle': '2016-11-23', 'tens': '14 12 11 05 03 15 16 02 22 24 17 19 01 18 13' });
        tens.push({ 'raffle': '2016-11-25', 'tens': '12 03 20 22 17 18 08 10 21 25 14 02 13 24 16' });
        tens.push({ 'raffle': '2016-11-28', 'tens': '22 09 01 16 06 05 04 11 19 10 25 13 23 03 07' });
        tens.push({ 'raffle': '2016-11-30', 'tens': '01 12 15 16 20 11 09 21 03 02 19 13 07 17 04' });
        tens.push({ 'raffle': '2016-12-02', 'tens': '16 10 07 02 17 01 08 14 11 05 24 09 12 15 03' });
        tens.push({ 'raffle': '2016-12-05', 'tens': '24 18 06 10 02 17 04 09 11 20 05 21 14 01 15' });
        tens.push({ 'raffle': '2016-12-07', 'tens': '08 06 15 20 13 04 05 01 18 25 23 16 17 10 22' });
        tens.push({ 'raffle': '2016-12-09', 'tens': '13 22 17 04 21 25 23 20 12 24 01 16 08 07 06' });
        tens.push({ 'raffle': '2016-12-12', 'tens': '25 05 13 17 04 21 19 03 24 12 22 08 11 01 18' });
        tens.push({ 'raffle': '2016-12-14', 'tens': '23 24 05 21 01 19 04 18 06 13 08 03 22 12 16' });
        tens.push({ 'raffle': '2016-12-16', 'tens': '23 07 06 20 04 09 16 08 03 22 11 15 05 01 24' });
        tens.push({ 'raffle': '2016-12-19', 'tens': '13 16 20 05 14 17 08 24 02 19 04 22 01 10 09' });
        tens.push({ 'raffle': '2016-12-21', 'tens': '05 24 03 12 13 14 20 23 25 19 10 21 01 15 02' });
        tens.push({ 'raffle': '2016-12-23', 'tens': '08 25 17 02 10 11 07 14 20 24 13 21 05 15 23' });
        tens.push({ 'raffle': '2016-12-26', 'tens': '02 08 13 15 01 24 19 25 05 23 16 14 21 09 10' });
        tens.push({ 'raffle': '2016-12-28', 'tens': '10 22 01 25 03 18 21 19 13 14 12 04 23 20 07' });
        tens.push({ 'raffle': '2016-12-30', 'tens': '15 23 20 02 17 21 16 14 07 05 19 18 22 08 25' });
        tens.push({ 'raffle': '2017-01-02', 'tens': '08 13 20 06 25 19 15 12 01 07 02 14 24 09 21' });
        tens.push({ 'raffle': '2017-01-04', 'tens': '14 23 08 15 04 02 09 01 18 10 03 13 07 24 11' });
        tens.push({ 'raffle': '2017-01-06', 'tens': '20 11 17 18 07 03 01 22 24 19 09 05 02 23 14' });
        tens.push({ 'raffle': '2017-01-09', 'tens': '12 06 14 16 25 01 18 13 24 04 19 09 17 10 20' });
        tens.push({ 'raffle': '2017-01-11', 'tens': '17 16 11 07 18 14 20 03 21 01 19 05 15 24 25' });
        tens.push({ 'raffle': '2017-01-13', 'tens': '09 10 21 24 05 04 17 02 19 18 25 15 06 23 11' });
        tens.push({ 'raffle': '2017-01-16', 'tens': '09 14 17 12 01 21 03 07 20 04 16 05 25 13 24' });
        tens.push({ 'raffle': '2017-01-18', 'tens': '23 07 11 20 10 04 22 15 06 17 19 13 03 24 14' });
        tens.push({ 'raffle': '2017-01-20', 'tens': '23 11 09 12 16 17 24 13 04 15 14 18 10 01 22' });
        tens.push({ 'raffle': '2017-01-23', 'tens': '24 12 19 10 08 16 23 09 22 21 05 07 20 14 02' });
        tens.push({ 'raffle': '2017-01-25', 'tens': '10 12 03 06 14 11 24 02 21 23 19 20 25 22 04' });
        tens.push({ 'raffle': '2017-01-27', 'tens': '09 10 25 20 19 22 12 21 06 04 01 05 24 11 23' });
        tens.push({ 'raffle': '2017-01-30', 'tens': '20 19 05 13 12 03 23 08 24 21 18 14 06 11 02' });
        tens.push({ 'raffle': '2017-02-01', 'tens': '05 16 06 03 08 11 07 09 02 13 20 19 18 01 17' });
        tens.push({ 'raffle': '2017-02-03', 'tens': '14 21 23 03 12 18 24 07 22 15 20 13 11 08 02' });
        tens.push({ 'raffle': '2017-02-06', 'tens': '08 18 13 04 10 07 15 06 22 11 02 21 20 01 24' });
        tens.push({ 'raffle': '2017-02-08', 'tens': '14 18 08 10 04 24 22 13 07 12 02 05 23 03 21' });
        tens.push({ 'raffle': '2017-02-10', 'tens': '20 04 08 07 12 14 25 22 23 16 05 10 01 09 24' });
        tens.push({ 'raffle': '2017-02-13', 'tens': '08 20 07 01 18 15 14 02 13 19 21 05 10 11 25' });
        tens.push({ 'raffle': '2017-02-15', 'tens': '24 15 18 13 02 20 03 01 21 09 06 10 25 12 05' });
        tens.push({ 'raffle': '2017-02-17', 'tens': '04 14 19 09 10 13 16 07 25 21 02 06 12 05 22' });
        tens.push({ 'raffle': '2017-02-20', 'tens': '21 23 07 04 05 02 10 03 01 12 22 15 17 06 18' });
        tens.push({ 'raffle': '2017-02-22', 'tens': '06 21 12 15 25 19 07 10 17 11 02 24 16 05 18' });
        tens.push({ 'raffle': '2017-02-24', 'tens': '13 15 18 22 03 09 17 05 23 06 14 20 16 02 11' });
        tens.push({ 'raffle': '2017-03-01', 'tens': '06 25 16 10 12 22 11 20 01 07 13 21 17 15 19' });
        tens.push({ 'raffle': '2017-03-03', 'tens': '25 11 23 07 02 20 18 08 09 03 24 21 17 19 05' });
        tens.push({ 'raffle': '2017-03-06', 'tens': '12 23 07 02 09 08 11 24 01 04 15 10 19 05 14' });
        tens.push({ 'raffle': '2017-03-08', 'tens': '06 03 20 05 17 21 09 15 14 13 11 07 23 04 22' });
        tens.push({ 'raffle': '2017-03-10', 'tens': '17 02 06 18 22 07 21 19 03 25 04 01 09 12 10' });
        tens.push({ 'raffle': '2017-03-13', 'tens': '05 24 17 01 11 02 15 23 13 18 03 25 09 19 08' });
        tens.push({ 'raffle': '2017-03-15', 'tens': '22 09 08 18 14 12 02 21 25 04 05 10 23 20 19' });
        tens.push({ 'raffle': '2017-03-17', 'tens': '21 15 03 19 25 05 22 06 04 12 01 02 11 10 16' });
        tens.push({ 'raffle': '2017-03-20', 'tens': '19 23 21 11 25 24 10 06 20 05 12 01 04 13 16' });
        tens.push({ 'raffle': '2017-03-22', 'tens': '25 12 14 22 20 19 02 07 09 15 23 04 08 10 13' });
        tens.push({ 'raffle': '2017-03-24', 'tens': '05 22 19 04 20 15 11 09 18 07 03 01 14 08 13' });
        tens.push({ 'raffle': '2017-03-27', 'tens': '20 14 02 13 23 09 19 11 05 07 25 06 24 04 22' });
        tens.push({ 'raffle': '2017-03-29', 'tens': '15 03 05 25 08 04 19 18 12 10 16 24 07 17 02' });
        tens.push({ 'raffle': '2017-03-31', 'tens': '10 19 14 24 25 21 02 13 20 11 16 23 05 15 08' });
        tens.push({ 'raffle': '2017-04-03', 'tens': '02 09 13 11 03 20 19 04 25 15 10 22 12 17 01' });
        tens.push({ 'raffle': '2017-04-05', 'tens': '13 23 24 05 03 22 10 02 18 04 14 25 08 01 12' });
        tens.push({ 'raffle': '2017-04-07', 'tens': '07 13 09 25 23 17 03 10 02 19 06 20 15 11 12' });
        tens.push({ 'raffle': '2017-04-10', 'tens': '22 05 12 07 11 02 19 14 13 18 23 17 01 15 16' });
        tens.push({ 'raffle': '2017-04-12', 'tens': '16 25 14 17 07 23 10 05 15 18 11 04 21 08 24' });
        tens.push({ 'raffle': '2017-04-15', 'tens': '15 23 12 02 04 05 03 14 13 24 18 08 07 01 19' });
        tens.push({ 'raffle': '2017-04-17', 'tens': '03 13 02 22 07 15 20 05 10 01 17 11 18 12 19' });
        tens.push({ 'raffle': '2017-04-19', 'tens': '10 01 08 06 13 25 09 21 22 07 11 17 16 24 18' });
        tens.push({ 'raffle': '2017-04-22', 'tens': '04 18 22 03 17 13 15 11 24 02 12 05 20 07 01' });
        tens.push({ 'raffle': '2017-04-24', 'tens': '22 12 07 03 16 17 02 21 20 25 18 23 15 01 24' });
        tens.push({ 'raffle': '2017-04-26', 'tens': '11 25 24 21 18 19 23 07 08 17 01 12 14 05 04' });
        tens.push({ 'raffle': '2017-04-28', 'tens': '07 25 16 02 24 19 20 11 03 01 06 14 22 18 17' });
        tens.push({ 'raffle': '2017-05-03', 'tens': '03 13 05 08 22 10 19 09 14 17 24 04 21 18 20' });
        tens.push({ 'raffle': '2017-05-05', 'tens': '05 14 10 11 17 04 19 13 24 03 01 08 23 02 21' });
        tens.push({ 'raffle': '2017-05-08', 'tens': '07 23 03 22 14 09 24 11 19 10 08 17 01 21 12' });
        tens.push({ 'raffle': '2017-05-10', 'tens': '22 02 24 03 17 14 15 19 07 08 06 13 01 18 09' });
        tens.push({ 'raffle': '2017-05-12', 'tens': '15 03 07 11 13 12 18 24 10 04 08 09 22 01 19' });
        tens.push({ 'raffle': '2017-05-15', 'tens': '23 09 12 11 24 02 08 21 20 10 05 04 19 15 13' });
        tens.push({ 'raffle': '2017-05-17', 'tens': '03 21 22 16 17 15 13 12 19 02 06 04 24 10 11' });
        tens.push({ 'raffle': '2017-05-19', 'tens': '18 06 16 24 04 09 11 22 10 03 13 12 21 14 07' });
        tens.push({ 'raffle': '2017-05-22', 'tens': '11 21 20 08 19 16 03 04 24 05 13 15 12 17 07' });
        tens.push({ 'raffle': '2017-05-24', 'tens': '03 01 19 12 09 05 13 11 17 20 16 23 08 18 02' });
        tens.push({ 'raffle': '2017-05-26', 'tens': '18 11 24 14 12 01 16 02 23 19 10 22 07 20 06' });
        tens.push({ 'raffle': '2017-05-29', 'tens': '25 03 18 23 05 12 11 02 08 21 15 24 10 14 20' });
        tens.push({ 'raffle': '2017-05-31', 'tens': '12 02 07 03 11 20 24 04 14 17 25 16 05 22 08' });
        tens.push({ 'raffle': '2017-06-02', 'tens': '23 18 24 21 17 22 01 16 06 20 13 08 04 14 25' });
        tens.push({ 'raffle': '2017-06-05', 'tens': '16 13 12 04 19 08 14 25 02 09 17 01 24 18 10' });

        return tens;

    }


});