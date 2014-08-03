
'use strict';

// 模块依赖
var app = angular.module('app', [
  'ui.router',
  'mobile-angular-ui',
  'ngAnimate',
  'ngResource',
  'ngCookies',
  'angular-md5'
]);

// 路由
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');

  // 用户
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'partials/user/user.html',
      controller: 'authController',
      data: {
        action: 'login'
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'partials/user/user.html',
      controller: 'authController',
      data: {
        action: 'register'
      }
    })

    // 用户地图路由
    .state('user_map_assets', {
      url: '/user_map_assets',
      templateUrl: 'partials/user/map.html',
      controller: 'user_map_assets'
    })
    .state('user_map_trader', {
      url: '/user_map_trader',
      templateUrl: 'partials/user/map.html',
      controller: 'user_map_trader'
    })

    .state('manage', {//用户设置
      url: '/manage',
      templateUrl: 'partials/user/manage.html',
      controller: 'manageController'
    })
    .state('search', {//用户首页  带插图
      url: '/search',
      templateUrl: 'partials/user/search.html',
      controller: 'searchController'
    })
    .state('discovery', {//发现商家
      url: '/discovery',
      templateUrl: 'partials/user/discovery.html',
      controller: 'discoveryController'
    })
    .state('requirements', {//我的需求
      url: '/requirements',
      templateUrl: 'partials/user/requirements.html',
      controller: 'requirementsController'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'partials/user/map.html',
      controller: 'mapController'
    })
      .state('assets', {//搜索得到的商品列表
          url: '/assets',
          templateUrl: 'partials/user/assets.html',
          controller: 'assetsController'
      })

});

// 初始化运行时设置
app.run(['$rootScope', '$state', '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // 初始化轻应用
    Blend.lightInit({
      ak: "IGocXScqzBIwbEHWpqDyWh6c",//从百度开放云平台获取
      module:["geolocation", "qr","media"]//根据勾选的模块生成
    });
  }
]);
