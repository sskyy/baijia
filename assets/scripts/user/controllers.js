'use strict';


var app = angular.module('app');

  // 登陆逻辑
  app.controller('loginController', function($scope) {

    $scope.login = function() {
      alert('login');
    };
  });