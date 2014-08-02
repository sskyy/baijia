
'use strict';

// 模块依赖
var app = angular.module('app', [
  'ui.router',
  'mobile-angular-ui',
  'ngResource'
]);

// 路由
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/user');

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
    .state('search', {
      url: '/search',
      templateUrl: 'partials/user/search.html',
      controller: 'searchController'
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
  }
]);
