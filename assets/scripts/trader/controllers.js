'use strict';


var app = angular.module('app');

  // 登陆逻辑
app.controller('traderController', function($scope, $state) {
  console.log('traderController');
});

app.controller('dashboardController', function($scope, $state) {

  $scope.orders = ['a', 'b', 'c'];

});

app.controller('orderController', function($scope) {
  console.log('orderController');
});

app.controller('storeController', function($scope) {
  console.log('storeController');
});

app.controller('deliverController', function($scope) {
  console.log('deliverController');
});