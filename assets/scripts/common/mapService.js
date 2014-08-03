

var app = angular.module('app');
/* 百度map接口说明：
 * map.Point(lng:Number, lat:Number)
 *
 */

app.factory('mapService', function($http, $q, $rootScope) {



  function getCustomPoints(){
    /*
     * 数据格式说明：
     * [{ name: 'xxx', 'id': '', point: obj }]
     */
    var dataList = $rootScope.searchResults;

    /* 如果没有搜索直接进来，全部显示 */
    if(!dataList) {
      return;
    }

    for (var i = 0; i < dataList.length; i ++) {
      dataList[i].point = new BMap.Point( dataList[i].owner.points.lng, dataList[i].owner.points.lat);
    }
    return dataList;
  }

  function createPointsOnMap(map){
    var dataList = getCustomPoints(map);

    /* 如果没有搜索直接进来，全部显示 */
    if(!dataList) {
      return;
    }

    for(var i=0;i<dataList.length;i++){
      var marker = new BMap.Marker(dataList[i].point); //创建标注
      map.addOverlay(marker);// 将标注添加到地图

      //创建信息窗口
      (function(item){
        var html = [
          '<div id="J_markerTip"">'+
              '<div class="tipbox">'+
                  '<h4>'+item.name+'</h4>'+
                  '<p>'+item.desc+'<span class="price">'+item.price+'</span></p>'+
                  '<p><a href="###">查看详情</a></p>'+
              '</div>'+
          '</div>'
        ].join('');
        var infoWindow = new BMap.InfoWindow(html);
        marker.addEventListener("click", function(){this.openInfoWindow(infoWindow);});
      })(dataList[i]);
    }
  }

  function initMap(me_pos) {
    var map = new BMap.Map("J_mymap");
    var me_point = new BMap.Point(me_pos.lng, me_pos.lat);
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

    Blend.device.geolocation.get({

      onsuccess: function(data) {
        geolocation = {
          "lng": data.longitude,
          "lat": data.latitude
        };
        deferred.resolve(geolocation);
        console.log("获取个人位置 =>", geolocation);
      },

      onfail: function(err) {
        geolocation = {
          "lng": 121.581,
          "lat": 31.201
        };
        deferred.resolve(geolocation);
      }
    });

    return deferred.promise;
  };

  /**
   * getDistance of two point
   * return xx km
   */
  var getDistance = function(lat1, lng1, lat2, lng2) {

    var EARTH_RADIUS = 6378.137; //地球半径

    var rad = function (d) {
      return d * Math.PI / 180.0;
    };

    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = radLat1 - radLat2;
    var b = rad(lng1) - rad(lng2);

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
  };

  return {
    getLocation: getLocation,
    getDistance: getDistance
  };

});

app.factory('mapDataService', function($q, $http) {

  var deferred = $q.defer();

  function getMapData() {

    deferred.resolve(dataList);
  }

  return {
    getMapData: getMapData
  }

});

app.factory('mapService2', function() {

  //创建地图标点点击后Tip提示信息窗口
  function createPointTip(item, marker) {
    var html = [
      '<div id="J_markerTip"">'+
          '<div class="tipbox">'+
              '<h4>'+item.name+'</h4>'+
              '<p>'+item.owner.name +'<span class="price">'+item.price+'</span></p>'+
              '<p><a href="###">查看详情</a></p>'+
          '</div>'+
      '</div>'
    ].join('');
    var infoWindow = new BMap.InfoWindow(html);
    marker.addEventListener("click", function(){this.openInfoWindow(infoWindow);});
  }
  //创建坐标在地图上
  function createPointsOnMap(map, dataList){
    for(var i=0;i<dataList.length;i++){
      var point;
      if(dataList[i].owner){
        point = dataList[i].owner.points;
      }else{
        dataList[i].owner= {name:''};
        dataList[i].price = '';
        point = dataList[i].points
      }
      var marker = new BMap.Marker(new BMap.Point(point.lng, point.lat)); //实例化一个标注
      map.addOverlay(marker);// 将标注添加到地图
      createPointTip(dataList[i],marker); // 创建提示信息
    }
  }
  //创建地图
  function createMap(options) {
    var map = new BMap.Map("J_mymap");
    var user_point = options.user_point;
    var me_point = new BMap.Point(user_point.lng, user_point.lat); //当前用户坐标点
    map.centerAndZoom(me_point, 11); //以当前用户坐标位置为中心显示地图区域
    map.addControl(new BMap.ZoomControl()); //添加地图缩放控件
    return map;
  }

  /* options 参数说明：
    options = {
      user_point: {},
      dataList: [
        {
          xx:xx,
          xx:xx,
          point: BK
        }
      ]
    }
  */

  //展现地图
  function renderMap(options) {
    var map = createMap(options);
    createPointsOnMap(map, options.dataList);
  }

  return {
    renderMap: renderMap
  }
});

