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
      auth && auth.status === 'success' ? $state.go('dashboard') : onError(auth);
    }, onError);

    function onError (error) {
      // error handler
      console.log(error);
    }
  };
});

app.controller('dashboardController', function($scope, $state, orderService) {

  orderService.list()
    .then(
      function(data) {
        $scope.orders = data;
      },
      function(error) {
        console.log('error:' + error);
      }
    );

});

app.controller('orderController', function($scope) {
  console.log('orderController');
});

app.controller('mapController', function($scope) {

});

app.controller('storeController', function($scope, storeService) {
  storeService.list()
    .then(
      function(data) {
        $scope.assets = data;
      }
    );

  $scope.add = function() {

  };

  $scope.del = function() {

  };
});

app.controller('addStoreController', function($scope, qrService) {

  $scope.add = function() {

    // 调用条形码扫码功能
    qrService.openQr().then(function(res){

    });

  }

});

app.controller('deliverController', function($scope) {
  console.log('deliverController');
});
