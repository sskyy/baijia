'use strict';

var app = angular.module('app');

// 登陆逻辑
app.controller('authController', function($scope, $state, $resource) {
  var actionTextMap = {
    login: '登录',
    register: '注册'
  };

  var action = $state.current.data.action;
  var Authorization = $resource('/user/:action', { action: action });

  $scope.action = action;
  $scope.actionText = actionTextMap[action];
  $scope.authorize = function () {
    var credentials = {
      userId: this.userId,
      password: this.password,
      username: this.userId
    };

    var auth = Authorization.save(credentials, function() {
      auth && auth.status === 'success' ? $state.go('search') : onError(auth);
    }, onError);

    function onError (error) {
      // error handler
      console.log(error);
    }
  };
});

app.controller('manageController', function ($scope, $state, md5) {
  var options = {
    'bucket': 'baidu-baijia',
    'expiration': new Date().getTime() + 60,
    'save-key': '/' + getRandomName() + '.jpg'
  };

  var policy = window.btoa(JSON.stringify(options));
  var signature = md5.createHash(policy + '&' + 'LXryECyP3BodcZLRQ555IfalbZg=');

  $scope.policy = policy;
  $scope.signature = signature;

  function getRandomName() {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var name = '';

    for (var i = 0; i < 32; i++) {
      name += chars.charAt(Math.floor(Math.random() * maxPos));
    }

    return name;
  }
});

app.controller('searchController', function($scope, $rootScope, $state, $http, locationService, assetService) {
  $scope.searchBtnText = '搜索';
      // assetService.search($scope.keyword)
      //   .then(
      //     function(data) {
      //       $scope.injectDistance(data);
      //     },
      //     function() {
      //       $scope.assets = [];
      //     }
      //   );
  $scope.search = function() {

    if (true) {
      $scope.notFound = true;
      $scope.searchBtnText = '添加需求';
    }
  };
});

app.controller('discoveryController', function($scope, $rootScope, $state, $http, locationService, assetService) {



});

app.controller('requirementsController', function($scope) {

    $scope.requires = [{
        name : '冰红茶',
        providers : [{
            name : "新新超市",
            price : 25
        }]
    },{
        name : '冰绿茶',
        providers : []
    }]

});

app.controller('addReqController', function($scope) {
  console.log('addReqController');
});

app.controller('assetsController',function($scope){
    //$rootScope.searchResults
    //$rootScope.searchKeyword

    locationService.getLocation().then(function(res){
        var uLat = res.lat;
        var uLng = res.lng;

        $scope.searchResults.forEach(function(i){
            var sLat = i.owner.points.lat;
            var sLng = i.owner.points.lng;
            var distance = locationService.getDistance(uLat, uLng, sLat, sLng);
            i.distance = distance;
        });
        console.log("asset 添加了位置 =>", data);
        $scope.assets = $scope.searchResults;
    });

    $scope.order = function( asset ){
        $http({
            url : '/order',
            method : 'post',
            data : {tid : asset.owner.id, name: asset.name}
        }).success(function(){
            asset.orderred = true
        })
    }

    $
})

app.controller('mapController', function($scope, $q, mapService2, dataService, locationService) {
  var deferred = $q.defer();
  // deferred.resolve()
  // .then(function(res){
  //   mapService.initMap(new BMap.Point(res.lng, res.lat));
  //   console.log('map start');
  // });
  deferred.when(locationService.getLocation(), dataService.getMapData())
  .then(function(cur_point, dataList){
    mapService2.renderMap({
      user_point: cur_point,
      dataList: dataList
    })
  })
});

app.controller('buyController', function($scope) {
  console.log('buyController');
});
