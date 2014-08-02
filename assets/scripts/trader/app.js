
'use strict';

// 模块依赖
var app = angular.module('app', [
  'ui.router',
  'ngAnimate',
  'mobile-angular-ui',
  'ngResource'
]);

// 路由
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');

  // 商户
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'partials/trader/trader.html',
      controller: 'authController',
      data: {
        action: 'login'
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'partials/trader/trader.html',
      controller: 'authController',
      data: {
        action: 'register'
      }
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
    .state('map', {
      url: '/map',
      templateUrl: 'partials/trader/map.html',
      controller: 'mapController'
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

    Blend.lightInit({
      ak: "IGocXScqzBIwbEHWpqDyWh6c",//从百度开放云平台获取
      module:["geolocation", "qr", "media"]//根据勾选的模块生成
    });
  }

]);
