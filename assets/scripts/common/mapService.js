

var app = angular.module('app');

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