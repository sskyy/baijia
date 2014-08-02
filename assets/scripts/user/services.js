

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

app.factory('locationService', function() {

  var getLocation = function() {

    var geolocation = {};

    clouda.device.geolocation.get({

      onsuccess: function(data) {
        geolocation = {
          "lng": data.longitude,
          "lat": data.latitude
        };

        console.log("ok =>", geolocation);
        return geolocation;
      },

      onfail: function(err) {
        geolocation = {
          "lng": 121.5810737,
          "lat": 31.201464299999998
        };
        console.log("error =>", geolocation);
        return geolocation;
      }
    });
  };

  return {
    getLocation: getLocation
  };

});
