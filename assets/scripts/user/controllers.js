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
      username: this.username
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

app.controller('searchController', function($scope, $state,$http) {
  $scope.switchToMap = function() {
    if (true) {
      $state.go('map');
    }
  };

  $scope.keyword = ''
  $scope.search = function(){

      $http('/asset/search',{keyword:$scope.keyword})
      .success(function( data ){
        $scope.searchResults = data
      })
      .error(function(){
        //fake data
        $scope.searchResults = []
      })
  }

});

app.controller('mapController', function($scope, mapService, locationService) {
  locationService.getLocation().then(function(res){
    mapService.initMap(new BMap.Point(res.lng, res.lat));
    console.log('map start');
  });
});

app.controller('buyController', function($scope) {
  console.log('buyController');
});
