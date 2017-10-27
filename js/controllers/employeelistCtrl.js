materialAdmin.controller('myAppController', ['$scope', 'myAppFactory', function ($scope, myAppFactory) {

        $scope.gridOptions = {
            data: [],
            urlSync: false
        };
        myAppFactory.getData().then(function (responseData) {
            $scope.gridOptions.data = responseData.data;
            console.log(responseData.data);
        })

    }]);

materialAdmin.factory('myAppFactory', function ($http) {
        return {
            getData: function () {
                return $http({
                    method: 'GET',
                    url: 'https://angular-data-grid.github.io/demo/data.json'
                });
            }
        }
    });


materialAdmin.controller('addItemController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
  'use strict';

  this.cancel = $mdDialog.cancel;
  
  function success(dessert) {
    $mdDialog.hide(dessert);
  }
  
  this.addItem = function () {
    $scope.item.form.$setSubmitted();
    
    if($scope.item.form.$valid) {
      $nutrition.desserts.save({dessert: $scope.dessert}, success);
    }
  };
  
}]);


materialAdmin.controller('deleteController', ['$authorize', 'desserts', '$mdDialog', '$nutrition', '$scope', '$q', function ($authorize, desserts, $mdDialog, $nutrition, $scope, $q) {
  'use strict';
  
  this.cancel = $mdDialog.cancel;
  
  function deleteDessert(dessert, index) {
    var deferred = $nutrition.desserts.remove({id: dessert._id});
    
    deferred.$promise.then(function () {
      desserts.splice(index, 1);
    });
    
    return deferred.$promise;
  }
  
  function onComplete() {
    $mdDialog.hide();
  }
  
  function error() {
    $scope.error = 'Invalid secret.';
  }
  
  function success() {
    $q.all(desserts.forEach(deleteDessert)).then(onComplete);
  }
  
  this.authorizeUser = function () {
    $authorize.get({secret: $scope.authorize.secret}, success, error);
  };
  
}]);



materialAdmin.controller('nutritionController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
  'use strict';
  
  var bookmark;
  
  $scope.selected = [];
  
  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    filter: '',
    limit: '5',
    order: 'nameToLower',
    page: 1
  };
  
  function success(desserts) {
    $scope.desserts = desserts;
  }
  
  $scope.addItem = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addItemController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'http://danielnagy.me/md-data-table/templates/add-item-dialog.html',
    }).then($scope.getDesserts);
  };
  
  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { desserts: $scope.selected },
      templateUrl: 'http://danielnagy.me/md-data-table/templates/delete-dialog.html',
    }).then($scope.getDesserts);
  };
  
  $scope.getDesserts = function () {
    $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
    // console.log($nutrition.desserts.get($scope.query, success).$promise);
  };
  
  $scope.removeFilter = function () {
    $scope.filter.show = false;
    $scope.query.filter = '';
    
    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };
  
  $scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }
    
    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }
    
    if(!newValue) {
      $scope.query.page = bookmark;
    }
    
    $scope.getDesserts();
  });
}]);


materialAdmin.factory('$authorize', ['$resource', function ($resource) {
  'use strict';

  return $resource('https://infinite-earth-4803.herokuapp.com/authorize/:secret');
}]);

materialAdmin.factory('$nutrition', ['$resource', function ($resource) {
  'use strict';

  return {
    desserts: $resource('data/jit.json/:id')
    // desserts: $resource('https://infinite-earth-4803.herokuapp.com/nutrition/desserts/:id')
  };
}]);