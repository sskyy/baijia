'use strict';


var app = angular.module('app');

  // 登陆逻辑
app.controller('loginController', function($scope, $state) {
  $scope.login = function() {

    // success
    if (true) {
      $state.go('search');
    } else {
      // failure
    }
  };
});

app.controller('searchController', function($scope, $state) {
  $scope.search = function() {

    if (true) {
      $state.go('map');
    }
  };
});

app.controller('mapController', function($scope) {
  var map = new BMap.Map("allmap");
  map.centerAndZoom(new BMap.Point(31.201, 121.581), 14);

  map.addControl(new BMap.ZoomControl());          //添加地图缩放控件

  var marker1 = new BMap.Marker(new BMap.Point(31.201, 121.581));  // 创建标注

  map.addOverlay(marker1);              // 将标注添加到地图中

  //创建信息窗口
  var infoWindow1 = new BMap.InfoWindow("普通标注");
  marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});
});

app.controller('buyController', function($scope) {
  console.log('buyController');
});
