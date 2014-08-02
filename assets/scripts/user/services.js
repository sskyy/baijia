

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

/* 百度map接口说明：
 * map.Point(lng:Number, lat:Number)
 *
 */

app.factory('mapService', function($http, $q) {



  function getCustomPoints(map){
    /*
     * {  }
     */
    var points = [];
    var bounds = map.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var lngSpan = Math.abs(sw.lng - ne.lng);
    var latSpan = Math.abs(ne.lat - sw.lat);

    for (var i = 0; i < 15; i ++) {
      var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
      points.push(point);
    }
    return points;
  }

  function createPointsOnMap(map){
    var points = getCustomPoints(map); // 获取随机坐标，用来创建点数据
    for(var i=0;i<points.length;i++){
      var marker = new BMap.Marker(points[i]);  // 创建标注
      map.addOverlay(marker);// 将标注添加到地图中
      //创建信息窗口
      (function(i){
        var infoWindow = new BMap.InfoWindow('<div>拉拉拉拉'+i+'</div>');
        marker.addEventListener("click", function(){this.openInfoWindow(infoWindow);});
      })(i);
    }

  }

  function initMap() {
    var me_point = new BMap.Point(121.581, 31.201); //用户当前位置坐标点
    var map = new BMap.Map("J_mymap");
    map.centerAndZoom(me_point, 11);
    map.addControl(new BMap.ZoomControl()); //添加地图缩放控件
    createPointsOnMap(map);
  }

  return {
    initMap: initMap
  };
};

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
