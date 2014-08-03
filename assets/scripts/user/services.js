'use strict';

var app = angular.module('app');

app.factory('assetService', function($http, $q) {

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

    var search = function(keyword) {
      var deferred = $q.defer();

      $http({
        url: '/asset/search',
        method: 'POST',
        data: {
          'keyword': keyword
        }
      })
      .success(deferred.resolve)
      .error(deferred.reject);

      return deferred.promise;
    };


    return {
      search: search,
      list: list
    };
  });

