'use strict';

var app = angular.module('app');

app.factory('assetService', function($http, $q) {

    var search = function(keyword) {
      var deferred = $q.defer();

      $http({
        url: '/asset/search',
        method: 'GET',
        params: keyword
      })
      .success(deferred.resolve)
      .error(deferred.reject);

      return deferred.promise;
    };


    return {
      search: search
    };
  });

/* 百度map接口说明：
 * map.Point(lng:Number, lat:Number)
 *
 */

app.factory('mapService', function($http, $q) {



  function getCustomPoints(map){
    /*
     * 数据格式说明：
     * [{ name: 'xxx', 'id': '', point: obj }]
     */
    var dataList = [];
    var bounds = map.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var lngSpan = Math.abs(sw.lng - ne.lng);
    var latSpan = Math.abs(ne.lat - sw.lat);

    for (var i = 0; i < 15; i ++) {
      var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
      dataList.push({
        name: '拉拉拉拉啦',
        desc: '拉拉拉拉拉拉拉拉我是desc。。。。。你来咬我呀～',
        id: 1,
        point: point
      });
    }
    return dataList;
  }

  function createPointsOnMap(map){
    var dataList = getCustomPoints(map);
    for(var i=0;i<dataList.length;i++){
      var marker = new BMap.Marker(dataList[i].point); //创建标注
      map.addOverlay(marker);// 将标注添加到地图

      //创建信息窗口
      (function(item){
        var html = [
          '<div id="J_markerTip"">'+
              '<div class="tipbox">'+
                  '<h4>'+item.name+'</h4>'+
                  '<p>'+item.desc+'</p>'+
                  '<p><a href="###">查看详情</a></p>'+
              '</div>'+
          '</div>'
        ].join('');
        console.log(html)
        var infoWindow = new BMap.InfoWindow(html);
        marker.addEventListener("click", function(){this.openInfoWindow(infoWindow);});
      })(dataList[i]);
    }
  }

  function initMap(me_point) {
    var map = new BMap.Map("J_mymap");
    var me_point = new BMap.Point(121.581, 31.201);
    map.centerAndZoom(me_point, 11);
    map.addControl(new BMap.ZoomControl()); //添加地图缩放控件
    createPointsOnMap(map);
  }

  return {
    initMap: initMap
  };
});

app.factory('locationService', function($http, $q) {


  var getLocation = function() {

    var geolocation = {};
    var deferred = $q.defer();

    clouda.device.geolocation.get({

      onsuccess: function(data) {
        geolocation = {
          "lng": data.longitude,
          "lat": data.latitude
        };
        deferred.resolve(geolocation);
        console.log("ok =>", geolocation);
        return geolocation;
      },

      onfail: function(err) {
        geolocation = {
          "lng": 121.581,
          "lat": 31.201
        };
        deferred.resolve(geolocation);
        console.log("error =>", geolocation);
        return geolocation;
      }
    });

    return deferred.promise;
  };

  return {
    getLocation: getLocation
  };

});
