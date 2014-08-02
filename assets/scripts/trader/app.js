
'use strict';

// 模块依赖
var app = angular.module('app', [
  'ui.router',
  'mobile-angular-ui'
]);

// 路由
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/trader');

  // 商户
  $stateProvider
    .state('trader', {
      url: '/trader',
      templateUrl: 'partials/trader/trader.html'
    })
    .state('buis.dashboard', {
      url: '/dashboard',
      templateUrl: 'partials/busi/dashboard.html'
    })
    .state('buis.dashboard.order', {
      url: '/order',
      templateUrl: 'partials/busi/dashboard-order.html'
    })
    .state('buis.dashboard.store', {
      url: '/store',
      templateUrl: 'partials/busi/dashboard-store.html'
    });

});

// 初始化运行时设置
app.run(['$rootScope', '$state', '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
]);
