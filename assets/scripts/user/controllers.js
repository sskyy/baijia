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

app.controller('searchController', function($scope, $state, $http, locationService) {
  $scope.switchToMap = function() {
    if (true) {
      $state.go('map');
    }
  };

  $scope.search = function(){

    $http({
      url: '/asset/search',
      method: 'post',
      data: {
        "keyword": $scope.keyword
      }
    })
    .success(function(data){
      $scope.searchResults = injectDistance(data);
    })
    .error(function(){
      //fake data
      $scope.searchResults = []
    });

    function injectDistance(data) {

      locationService.getLocation().then(function(res){
        var uLat = res.lat;
        var uLng = res.lng;

        data.forEach(function(i){
          var sLat = i.owner.points.lat;
          var sLng = i.owner.points.lng;
          var distance = locationService.getDistance(uLat, uLng, sLat, sLng);
          i.distance = distance;
        });

        console.log("asset 添加了位置 =>", data);
        return data;

      });

    }

  };


});

app.controller('mapController', function($scope) {
  console.log('map');
});

app.controller('buyController', function($scope) {
  console.log('buyController');
});
