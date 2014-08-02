'use strict';


var app = angular.module('app');

  // 登陆逻辑
app.controller('traderController', function($scope, $state) {

  $scope.login = function() {
    $state.go('dashboard');
  };
});

app.controller('dashboardController', function($scope, $state, orderService) {

  $scope.orders = ['a', 'b', 'c'];

  orderService.list()
    .then(
      function(data) {
        console.log(data);
      },
      function(error) {
        console.log('error:' + error);
      }
    );

});

app.controller('orderController', function($scope) {
  console.log('orderController');
});

app.controller('storeController', function($scope) {
  console.log('storeController');
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
