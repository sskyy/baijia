

// 模块依赖
var app = angular.module('app', [
  'ui.router',
  'mobile-angular-ui'
])

// 路由
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('route1', {
      url: '/route1',
      templateUrl: 'partials/a.html'
    })
    .state('route2', {
      url: '/route2',
      templateUrl: 'partials/b.html'
    });
})

// 初始化运行时设置
app.run(['$rootScope', '$state', '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
])