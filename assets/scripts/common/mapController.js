'use strict';

var app = angular.module('app');

app.controller('user_map_assets', function() {
  alert(1);
});

app.controller('user_map_trader', function() {

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