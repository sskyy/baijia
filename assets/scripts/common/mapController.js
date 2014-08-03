'use strict';

var app = angular.module('app');

app.controller('user_map_assets', function(locationService,mapService2,assetService) {
  locationService.getLocation().then(function(cur_point) {
    assetService.list().then(function(_dataList){
      console.log(_dataList);
      mapService2.renderMap({
        user_point: cur_point,
        dataList: _dataList
      });
    });
  });
});

app.controller('user_map_trader', function(locationService,mapService2,$http) {

  locationService.getLocation().then(function(cur_point) {
    $http.get('/user?type=trader').success(function(_dataList){
        console.log(_dataList);
        mapService2.renderMap({
          user_point: cur_point,
          dataList: _dataList
        });
    });
  });

});

app.controller('trader_map_use', function(locationService, mapService2, $http) {

  locationService.getLocation().then(function(cur_point) {
    $http.get('/user').success(function(_dataList){
        console.log(_dataList);
        mapService2.renderMap({
          user_point: cur_point,
          dataList: _dataList
        });
    });
  });

});

app.controller('trader_map_order', function(locationService,mapService2,$http) {

  locationService.getLocation().then(function(cur_point) {
    $http.get('/order').success(function(_dataList){
        console.log(_dataList);
        mapService2.renderMap({
          user_point: cur_point,
          dataList: _dataList
        });
    });
  });

});

app.controller('mapController', function($rootScope, $scope, $q, mapService2, assetService, locationService) {

  var dataList = $rootScope.searchResults;

  locationService.getLocation().then(function(cur_point) {

    if(dataList) { //有数据
      console.log('---->有数据,显示地图');
      mapService2.renderMap({
        user_point: cur_point,
        dataList: dataList
      });
    } else { //没数据
      console.log('---->没数据,加载数据')
      assetService.list().then(function(_dataList){
        mapService2.renderMap({
          user_point: cur_point,
          dataList: _dataList
        });
      });
    }

  });

  console.log('map start');
});
