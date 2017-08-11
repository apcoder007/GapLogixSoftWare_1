materialAdmin.controller('loginController', ['$scope', 'dataservice', '$location', '$state', function($scope, dataservice, $location, $state){
      
        $scope.user={}
        $scope.submitLogin = function(form){
            alert("Admin");
            console.log($scope.user);
            // $scope.dataLoading = true;
            dataservice.doLoginProcess($scope.user.username, $scope.user.password, function(response) {
                if(response.success) {
                    dataservice.SetCredentials($scope.username, $scope.password);
                    $location.path('#/home');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
           
          }   
    

}]);



