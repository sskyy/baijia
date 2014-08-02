'use strict';


var app = angular.module('app');

  // 登陆逻辑
app.controller('loginController', function($scope, $state) {
  $scope.login = function() {
    alert('login');

    // success
    if (true) {
      $state.go('search');
    } else {

    }
  };
});