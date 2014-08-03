'use strict';

var app = angular.module('app');

// 登陆逻辑
app.controller('authController', function($scope, $state, $resource, $rootScope) {
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
      name: this.userId
    };

    var auth = Authorization.save(credentials, function() {
      if (auth && auth.status === 'success') {
        $rootScope.user = auth;
        $state.go('search');
      } else {
        onError(auth);
      }
    }, onError);

    function onError (error) {
      // error handler
      console.log(error);
    }
  };
});

app.controller('manageController', function ($scope, $state, $http, $cookieStore, md5) {
  var options = {
    'bucket': 'baidu-baijia',
    'expiration': new Date().getTime() + 60,
    'save-key': '/' + getRandomName() + '.jpg'
  };

  var policy = window.btoa(JSON.stringify(options));
  var signature = md5.createHash(policy + '&' + 'LXryECyP3BodcZLRQ555IfalbZg=');

  $scope.policy = policy;
  $scope.signature = signature;
  $scope.upload = function () {
    $http.put('/user', {
      id: $cookieStore.get('userid') || 0,
      avatar: 'http://baidu-baijia.b0.upaiyun.com/avatar.jpg'
    }).success(showResult).error(showResult);
  };
  $scope.setName = function () {
    $http.put('/user', {
      id: $cookieStore.get('userid') || 0,
      name: this.username
    }).success(showResult).error(showResult);
  };

  function showResult (data) {
    console.log(data);
  }

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


//用户 搜索首页
app.controller('searchController', function($scope, $rootScope, $state, $http, locationService, assetService) {

  // btn 文案
  $scope.searchBtnText = '搜索';

  // 搜索事件
  $scope.search = function() {

    // 搜索商品
    assetService.search('xxxxx')
      .then(
        function(data) {

          // 未找到的情况
          if (data.length === 0) {
            $scope.notFound = true;

            // 修改文案
            $scope.searchBtnText = '添加需求';
          }
        }
      );
  };
});

app.controller('discoveryController', function($scope, $rootScope, $state, $http, locationService, assetService) {

    var currentLocation

    locationService.getLocation().then(function(res){
        currentLocation = res
        var uLat = res.lat;
        var uLng = res.lng;

        $http('/user?type=trader').success(function( traders){
            traders.forEach(function(i){
                var sLat = i.points.lat;
                var sLng = i.points.lng;
                var distance = locationService.getDistance(uLat, uLng, sLat, sLng);
                i.distance = distance;
            });
            console.log("asset 添加了位置 =>", data);
            $scope.traders = data;
        })
    });
});

app.controller('requirementsController', function($scope,$http) {

//    $scope.requires = [{
//        name : '冰红茶',
//        providers : [{
//            name : "新新超市",
//            price : 25
//        }]
//    },{
//        name : '冰绿茶',
//        providers : []
//    }]

    $http('/require').success(function(data){
        $scope.requires = data
    })

});

app.controller('addReqController', function($scope) {
  console.log('addReqController');
});

app.controller('assetsController',function($scope){
    //$rootScope.searchResults
    //$rootScope.searchKeyword

    var currentLocation

    locationService.getLocation().then(function(res){
        currentLocation = res
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
            data : {tid : asset.owner.id, name: asset.name, user : $rootScope.user,point:currentLocation}
        }).success(function(){
            asset.orderred = true
        })
    }


})




app.controller('buyController', function($scope) {
  console.log('buyController');
});
