
'use strict';

// 模块依赖
var app = angular.module('app', [
  'ui.router',
  'ngAnimate',
  'mobile-angular-ui'
]);

// 路由
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/trader');

  // 商户
  $stateProvider
    .state('trader', {
      url: '/trader',
      templateUrl: 'partials/trader/trader.html',
      controller: 'traderController'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'partials/trader/dashboard.html',
      controller: 'dashboardController'
    })
    .state('order', {
      url: '/order',
      templateUrl: 'partials/trader/order.html',
      controller: 'orderController'
    })
    .state('store', {
      url: '/store',
      templateUrl: 'partials/trader/store.html',
      controller: 'storeController'
    })
    .state('addStore', {
      url: '/addStore',
      templateUrl: 'partials/trader/addStore.html',
      controller: 'addStoreController'
    })
    .state('deliver', {
      url: '/deliver',
      templateUrl: 'partials/trader/deliver.html',
      controller: 'deliverController'
    });

});

// 初始化运行时设置
app.run(['$rootScope', '$state', '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
]);
