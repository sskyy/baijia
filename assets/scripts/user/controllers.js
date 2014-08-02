'use strict';


var app = angular.module('app');

  // 登陆逻辑
app.controller('loginController', function($scope, $state) {
  $scope.login = function() {

    // success
    if (true) {
      $state.go('search');
    } else {
      // failure
    }
  };
});

app.controller('searchController', function($scope, $state) {
  $scope.search = function() {

    if (true) {
      $state.go('map');
    }
  };
});

app.controller('mapController', function($scope, $state, locationService) {

  //首先输入轻应用的ak
  clouda.lightInit({
    ak:"M0FwSH3hiXGRu7GXNty5NVuq",
    module:["geolocation"]
  });

  $scope.openMap = function() {

    locationService.getLocation();

  };

});

app.controller('buyController', function($scope) {
  console.log('buyController');
});
