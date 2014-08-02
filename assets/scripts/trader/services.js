'use strict';

var app = angular.module('app');

app.factory('orderService', function($http, $q) {

    var list = function(type) {
      var deferred = $q.defer();

      $http({
        url: '/order',
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

app.factory('qrService',function($http, $q){

  var deferred = $q.defer();

  function openQr() {

    alert(Blend.device.qr.startCapture);
    Blend.device.qr.startCapture({

      type: Blend.device.QR_TYPE.BARCODE,

      onsuccess: function(data){
        deferred.resolve(data);
      },

      onfail: function(){
        deferred.reject();
      }

    });

    return deferred.promise;
  }

  return {
    openQr: openQr
  };

});

app.factory('captureMediaService',function($http, $q){

  var deferred = $q.defer();

  function upImage() {

    Blend.device.qr.startCapture({

      mediaType: Blend.device.MEDIA_TYPE.IMAGE,

      onsuccess: function(data){
        deferred.resolve(data);
      },

      onfail: function(){
        deferred.resolve('fail');
      }

    });

    return deferred.promise;
  }

  return {
    upImage: upImage
  };

})


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
