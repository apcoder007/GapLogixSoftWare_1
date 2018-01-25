materialAdmin.service("Data", function($http){
  this.User = function(username, password){
    var sendData={
      'username':username,
      'password':password
    }
    return $http({
      method: 'POST',
      data: sendData,
      url: '/api/getlogin/'
      
    });
  }
//start session handle

this.isLoggedIn = function(){
    if($window.localStorage.loggedin){
      return true;
    }else{
      return false;
    }
  }



  this.sessionCreate = function(username,id){

    var sendData={
      'username':username,
      'userid':id
    }
    return $http({
      method: 'POST',
      data: sendData,
      url: '/api/rest/session/'
    });

  }

  this.checkUser = function(){
    return $http({
      method: 'GET',
      url: '/api/rest/check/status/'
    });
  }



//session handling end
  // this.UserDetail = function(id){
  //   var sendData={
  //     'id':id
  //   }
  //   return $http({
  //     method: 'POST',
  //     data:sendData,
  //     url: 'http://web.cafe-indica-163107.appspot.com/api/getusersdetails/'
  //   });
  // }

  

  

});


materialAdmin.service('dataservice', function($http){
  this.doLoginProcess = function(user, password){
    var sendData = {
      'username':user,
      'password':password
    }
    alert(user+" "+password);
    return $http({
      method:'POST',
      data:sendData,
      url:'/api/getlogin/'
    });
  }
});





//////////////////////////////////////////////share Data Services//////////////////////////////


// materialAdmin.service('dataservice',function($http){
//       return {
//           doLoginProcess: doLoginProcess,
//           doLogoutProcess: doLogoutProcess,
//           SetCredentials : SetCredentials,
//       	  ClearCredentials :ClearCredentials
//       };

//       function doLoginProcess(username,password) {
//         console.log(username,password)
//     	  var sendData={
//     		      'username':username,
//     		      'password':password
//     		    }
    	  
//     	  return $http({
//     	      method: 'POST',
//     	      data: sendData,
//     	      url: '/api/getlogin/'
    	      
//     	    }).then(loginSuccess)
//             .catch(loginFailed);;
         

//           function loginSuccess(response) {
//               return response;
//               console.log('response'+response);
//           }

//           function loginFailed(error) {
//               console.log('XHR Failed for getAvengers.' + error);
//           }
//       }

//       function doLogoutProcess(){

//         return $http.post('/api/logout/session/')
//               .then(getLogoutComplete)
//               .catch(getLogoutFailed);

//           function getLogoutComplete(response) {
//               return response;
//           }

//           function getLogoutFailed(error) {
//               console.log('XHR Failed for getAvengers.' + error);
//           }

//       }
      
//       function SetCredentials(username, password) {
//           var authdata = Base64.encode(username + ':' + password);

//           $rootScope.globals = {
//               currentUser: {
//                   username: username,
//                   authdata: authdata
//               }
//           };

//           // set default auth header for http requests
//           $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

//           // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
//           var cookieExp = new Date();
//           cookieExp.setDate(cookieExp.getDate() + 7);
//           $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
//       }

//       function ClearCredentials() {
//           $rootScope.globals = {};
//           $cookies.remove('globals');
//           $http.defaults.headers.common.Authorization = 'Basic';
//       }
//   })
