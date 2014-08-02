

var app = angular.module('app');

app.factory('dataService', function($http, $q) {

    var getxxdata = function(type) {
      var deferred = $q.defer();

      $http({
        url: '/aaaa',
        method: 'GET',
        params: type
      })
      .success(deferred.resolve)
      .error(deferred.reject);

      return deferred.promise;
    };


    return {
      getxxdata: getxxdata
    };
  });