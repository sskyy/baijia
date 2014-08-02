'use strict';

var app = angular.module('app');

app.factory('orderService', function($http, $q) {

    var list = function(type) {
      var deferred = $q.defer();

      $http({
        url: '/order/list',
        method: 'GET'
      })
      .success(deferred.resolve)
      .error(deferred.reject);

      return deferred.promise;
    };


    return {
      list: list
    };
  });


app.factory('storeService', function($http, $q) {

    var list = function(type) {
      var deferred = $q.defer();

      $http({
        url: '/asset',
        method: 'GET'
      })
      .success(deferred.resolve)
      .error(deferred.reject);

      return deferred.promise;
    };


    return {
      list: list
    };
  });
