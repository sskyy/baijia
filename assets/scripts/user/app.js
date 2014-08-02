
'use strict';

// 模块依赖
var app = angular.module('app', [
  'ui.router',
  'mobile-angular-ui',
  'ngAnimate',
  'ngResource',
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
    .state('manage', {
      url: '/manage',
      templateUrl: 'partials/user/manage.html',
      controller: 'manageController'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'partials/user/search.html',
      controller: 'searchController'
    })
    .state('discovery', {
      url: '/discovery',
      templateUrl: 'partials/user/discovery.html',
      controller: 'discoveryController'
    })
    .state('requirements', {
      url: '/requirements',
      templateUrl: 'partials/user/requirements.html',
      controller: 'requirementsController'
    })
    .state('addReq', {
      url: '/addReq',
      templateUrl: 'partials/user/addReq.html',
      controller: 'addReqController'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'partials/user/map.html',
      controller: 'mapController'
    })
    .state('buy', {
      url: '/buy',
      templateUrl: 'partials/user/buy.html',
      controller: 'buyController'
    });

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
