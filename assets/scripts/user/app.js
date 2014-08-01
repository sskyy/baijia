

// 模块依赖
var app = angular.module('app', [
  'ui.router',
  'mobile-angular-ui'
])

// 路由
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/user');

  // 用户
  $stateProvider
    .state('user', {
      url: '/user',
      templateUrl: 'partials/user/user.html'
    })
    .state('user.search', {
      url: '/search',
      templateUrl: 'partials/user/search.html'
    })
    .state('user.map', {
      url: '/map',
      templateUrl: 'partials/user/map.html'
    })
    .state('user.buy', {
      url: '/buy',
      templateUrl: 'partials/user/buy.html'
    });

})

// 初始化运行时设置
app.run(['$rootScope', '$state', '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
])