materialAdmin.run(function ($rootScope, $location, $cookies, $http, $state, AuthenticationService) {

	
	$rootScope.globals = $cookies.getObject('globals') || {};

        if ($rootScope.globals.loggedIn ==1) {
            if ($location.path() =='/'){
                $location.path('/home');
                // $rootScope.logininfo = $cookies.getObject('globals').currentUser.id;
            }else{
               $location.path($location.path()); 
            }
            // $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
           
        }else{
            $location.path('/');
        }

});




materialAdmin.controller('loginController', ['$rootScope','$cookies','$scope', 'Data', '$location', 'AuthenticationService', '$state', '$localStorage', function($rootScope,$cookies,$scope, Data, $location, AuthenticationService, $state, $localStorage){

      $rootScope.globals = $cookies.getObject('globals') || {};
      if ($rootScope.globals.loggedIn ==1) {
        $location.path('/home');
      }

      $scope.wrongpass = false;

	  $scope.submitLogin = function (username, password) {
	  	
	  	AuthenticationService.Login(username, password, function (response) {
                if (response.success == 1) {
                    if(response.configure_data[7]==1){
                      AuthenticationService.SetCredentials(username, password, response.configure_data);
                    
                        $state.go('home');
                        
                        $localStorage.empcode = response.datasets;
                    }
                    else{
                    	
                      $state.go('resetpassword');
                    }
                } else {
                    $scope.wrongpass = true;
                    
                    $state.go('login')
                }
            });
	  }

}]);

materialAdmin.controller('resetPasswordController', ['$scope', 'Data', '$localStorage', '$state', function($scope, Data, $localStorage, $state){

	// console.log($localStorage.empcode[0]['empCode']);

  $scope.resetPassword = function(pass, confirmpass){
    if(pass==confirmpass){
    	Data.resetPassword($localStorage.empcode[0]['empCode'], pass)
    	.success(function(response){
    		$state.go('login');
    	}).error(function(response){
    		$state.go('resetpassword');
    	});

    }else{
    	alert("Sorry!! password does not match!!");
    }
  }

}]);

materialAdmin.controller('homeCtrl', ['$scope', '$cookies', '$rootScope', '$localStorage', 'Data', 'AuthenticationService', '$state', '$location', '$timeout', function($scope, $cookies, $rootScope, $localStorage, Data, AuthenticationService, $state, $location, $timeout){


	$scope.logout = function(){
	
		AuthenticationService.ClearCredentials();
		$timeout(function () {
	        $location.path('/');
	    }, 1000);

        $localStorage.imgsrc = '';

	}
	

	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;

    // console.log($rootScope.logininfo);

	 Data.getImageUrl($localStorage.empcode[0]['empCode'])
    .success(function(response){
        $scope.imagedata = response.datasets;
        $scope.imgsrc = response.datasets[0]['imagePath']+response.datasets[0]['imageName'];
        $localStorage.imgsrc = $scope.imgsrc;
        $scope.shoimageUrl = true;
        $rootScope.img_src = response.datasets[0]['imagePath']+response.datasets[0]['imageName'];
    }).error(function(response){

    });

    
    Data.getBirthDay()
    .success(function(response){
        $scope.birthdaylist = response.configure_data;
        // console.log($scope.birthdaylist);
    }).error(function(response){

	});
	
	$scope.lmanager = $localStorage.empcode[0]['empCode'];

	Data.getAllTask($localStorage.empcode[0]['empCode'])
	.success(function(response){
		$scope.tasklist = response.leaveRequest_data;

		var length=$scope.tasklist.length;
		var dataArray=[];
		
		
		for (var i=0; i<length; i++) {
			var tstatus = '';
			if($scope.tasklist[i]['status']=='open'){
				tstatus = 'Pending';
			}else if($scope.tasklist[i]['status']=='close'){
				tstatus = 'Approved';
			}

				dataArray.push([$scope.tasklist[i]['empCode'], $scope.tasklist[i]['taskCode'], $scope.tasklist[i]['taskType'], tstatus,'<button class="btn btn-info" data-toggle="modal" data-target="#completeConformation" onclick="changeMargin(); getOrder(\''+$scope.tasklist[i]['empCode']+'\');"  type="submit">Complete<\/button>']);
		} 
		
		$('.task_content').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-striped" id="vehicle-table" style="font-size: 12px;"><\/table>' );
		
		$('#vehicle-table').dataTable( {
			"data": dataArray,
			 "colReorder": true,
			 "buttons": ['copy', 'excel', 'pdf','colvis',],
			 "dom": 'Blfrtip',
			 "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],

			 "responsive": true,
			"columns": [
				{ "title": "empCode" },
				{ "title": "taskCode",
				"render": function(data, type, row, meta){

					// data = '<a href="' + data + '" ui-sref="home.task({id: data})">' + data + '</a>';
					
						data = '<a href="/#/task/' + data + '">' + data + '</a>';
					
					return data;
				 } },
				{ "title": "taskType" },
				{ 'title': "Status"},
			]
		});

	}).error(function(response){

	});

	Data.getTaskDetails($state.params.id)
	.success(function(response){
		if(response.taskDetails){
			$scope.taskdetailslist = response.taskDetails;
			console.log($scope.taskdetailslist);
		}else{
			$scope.taskdatalists = response.taskData;
			console.log($scope.taskdatalists);
		}
		
		
		$scope.taskCode = response.taskCode;
		$scope.taskType = response.taskType;
			
	}).error(function(response){

	});


	$scope.overlay = false;
	$scope.omsg = '';

	$scope.ApproveTask = function(){
		
		Data.ApproveTask($state.params.id)
		.success(function(response){
			$scope.overlay = true;
			$scope.omsg = 'Successfully Approved!!';
			$timeout(function () {
				$scope.overlay = false;
				$state.go($state.current, $state.params, {reload: true});
			}, 2000);

		}).error(function(response){

			$scope.overlay = true;
			$scope.omsg = 'Something is Wrong!!';
			$timeout(function () {
				$scope.overlay = false;
			}, 2000);

		});
		
	}

	$scope.cancelTask = function(){
		
		Data.CancelTask($state.params.id)
		.success(function(response){
			$scope.overlay = true;
			$scope.omsg = 'Successfully Rejected!!';
			$timeout(function(){
				$scope.overlay = false;
				$state.go($state.current, $state.params, {reload: true});
			}, 2000);
		}).error(function(response){

			$scope.overlay = true;
			$scope.omsg = 'Something is Wrong!!';
			$timeout(function(){
				$scope.overlay = false;
			}, 2000);

		});
	}

	$scope.withDrawTask = function(){

		Data.WithdrawTask($state.params.id)
		.success(function(response){
			$scope.overlay = true;
			$scope.omsg = 'Successfully Withdrawn!!';
			$timeout(function(){
				$scope.overlay = false;
				$state.go($state.current, $state.params, {reload: true});
			}, 2000);
		}).error(function(response){

			$scope.overlay = true;
			$scope.omsg = 'Something is Wrong!!';
			$timeout(function(){
				$scope.overlay = false;
			}, 2000);

		});

	}

	$scope.showpop = false;

	$scope.showpopup = function(){
		$scope.showpop = true;

	}

	$scope.closepopup = function(){
		$scope.showpop = false;
	}

	$scope.rdistance = '';
	$scope.rttime = '';
	$scope.rtembursed = '';
	$scope.areason = '';

	$scope.reSubmitReimburse = function(){
		var json_data = {
			"taskCode":$state.params.id,
			"tDistance":$scope.rdistance,
			"tTime":$scope.rttime,
			"tReimbursed":$scope.rtembursed,
			"reason":$scope.areason
		}
		Data.ResubmitReimburse(json_data)
		.success(function(reason){
			$scope.showpop = false;
			$scope.overlay = true;
			$scope.omsg = 'Successfully Resubmitted!!';
			$timeout(function(){
				$scope.overlay = false;
				$state.go($state.current, $state.params, {reload: true});
			}, 2000);

		}).error(function(response){
			$scope.showpop = false;
			$scope.overlay = true;
			$scope.omsg = 'Something is Wrong!!';
			$timeout(function(){
				$scope.overlay = false;
			}, 2000);

		});

	}

	$scope.withDrawReimburse = function(){
		Data.WithDrawReimburse($state.params.id)
		.success(function(response){
			$scope.overlay = true;
			$scope.omsg = 'Successfully Withdrawn!!';
			$timeout(function(){
				$scope.overlay = false;
				$state.go($state.current, $state.params, {reload: true});
			}, 2000);

		}).error(function(response){
			$scope.overlay = true;
			$scope.omsg = 'Something is Wrong!!';
			$timeout(function(){
				$scope.overlay = false;
			}, 2000);

		});
	}

	

}]);


materialAdmin.controller('leaveCtrl', ['$scope', '$cookies', '$rootScope', '$localStorage', 'Data', 'AuthenticationService', '$state', '$location', '$timeout', function($scope, $cookies, $rootScope, $localStorage, Data, AuthenticationService, $state, $location, $timeout){
	
	$scope.logout = function(){
	
		AuthenticationService.ClearCredentials();
		$timeout(function () {
			$location.path('/');
		}, 1000);

		$localStorage.imgsrc = '';
	}

	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;
	
	$rootScope.employeeCode = $localStorage.empcode[0]['empCode'];
	
		// console.log($localStorage.empcode[0]['empCode']);
		
	$scope.imgsrc = $localStorage.imgsrc;
	$rootScope.img_src = $localStorage.imgsrc;



	$scope.leavetype = '';
	$scope.leavereason = '';
	$scope.leaveduration = '';
	$scope.startdate = '';
	$scope.enddate = '';
	$scope.reason = '';
	$scope.overlay = false;
	$scope.omsg = '';

	$scope.applyLeave = function(){
		console.log($scope.leavetype+" "+$scope.leavereason+" "+$scope.leaveduration+" "+$scope.startdate+" "+$scope.enddate+" "+$scope.reason);
		var json_data = {
			'empCode': $localStorage.empcode[0]['empCode'],
            'leaveType':$scope.leavetype,
            'reason':$scope.leavereason,
            'duration':$scope.leaveduration,
            'startDate':$scope.startdate,
            'endDate':$scope.enddate,
            'message':$scope.reason,
            'managerComment':''
		}
		Data.ApplyLeave(json_data)
		.success(function(response){
			$scope.overlay = true;
			$scope.omsg = 'Successfully Applied!!';
			$timeout(function(response){
				$scope.overlay = false;
				$state.go($state.current, $state.params, {reload: true});
			}, 2000);
		}).error(function(response){
			$scope.overlay = true;
			$scope.omsg = 'Something is Wrong!!';
			$timeout(function(response){
				$scope.overlay = false;
				$state.go($state.current, $state.params, {reload: true});
			}, 2000);
		});
	}

	Data.getLeaveDetails($localStorage.empcode[0]['empCode'])
	.success(function(response){
		$scope.leavelist = response.task_data;
	}).error(function(response){

	});
	
	}]);

materialAdmin.controller('directoryCtrl', ['$scope', '$cookies', '$rootScope', '$localStorage', 'Data', 'AuthenticationService', '$state', '$location', '$timeout', 'empDetailsList', function($scope, $cookies, $rootScope, $localStorage, Data, AuthenticationService, $state, $location, $timeout, empDetailsList){
	
	$scope.logout = function(){
	
		AuthenticationService.ClearCredentials();
		$timeout(function () {
			$location.path('/');
		}, 1000);

		$localStorage.imgsrc = '';
	}

	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;
	
	$rootScope.employeeCode = $localStorage.empcode[0]['empCode'];
	
		// console.log($localStorage.empcode[0]['empCode']);
		
	$scope.imgsrc = $localStorage.imgsrc;
	$rootScope.img_src = $localStorage.imgsrc;


	$scope.empdetailslist = empDetailsList.data.configure_data;

		
	}]);

	materialAdmin.controller('travelexpenseCtrl', ['$scope', '$cookies', '$rootScope', '$localStorage', 'Data', 'AuthenticationService', '$state', '$location', '$timeout', function($scope, $cookies, $rootScope, $localStorage, Data, AuthenticationService, $state, $location, $timeout){
		
		$scope.logout = function(){
		
			AuthenticationService.ClearCredentials();
			$timeout(function () {
				$location.path('/');
			}, 1000);
	
			$localStorage.imgsrc = '';
		}
	
		$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;
		
		$rootScope.employeeCode = $localStorage.empcode[0]['empCode'];
		
			// console.log($localStorage.empcode[0]['empCode']);

		$scope.imgsrc = $localStorage.imgsrc;
		$rootScope.img_src = $localStorage.imgsrc;
	
			
	}]);

	materialAdmin.controller('travelexpenselistCtrl', ['$scope', '$cookies', '$rootScope', '$localStorage', 'Data', 'AuthenticationService', '$state', '$location', '$timeout', 'tripList', function($scope, $cookies, $rootScope, $localStorage, Data, AuthenticationService, $state, $location, $timeout, tripList){

		$scope.tripdetailslist = tripList.data.trip_data;

		$localStorage.triplist = '';
		$scope.tripDetails = function(triplist){
			$localStorage.triplist = triplist;
			$state.go('travelexpense.details');
		}
	
			
	}]);

	materialAdmin.controller('travelexpensedetailsCtrl', ['$scope', '$cookies', '$rootScope', '$localStorage', 'Data', 'AuthenticationService', '$state', '$location', '$timeout', function($scope, $cookies, $rootScope, $localStorage, Data, AuthenticationService, $state, $location, $timeout){
		
		
		// console.log($localStorage.triplist);
		$scope.triplist = $localStorage.triplist;
		$scope.overlay = false;

		Data.getLocation($scope.triplist.startLat, $scope.triplist.startLang)
		.success(function(response){
			$scope.startaddress = JSON.parse(response.response).display_name;
		}).error(function(response){

		});

		Data.getLocation($scope.triplist.endLang, $scope.triplist.endLat)
		.success(function(response){
			$scope.endaddress = JSON.parse(response.response).display_name;
		}).error(function(response){

		});
		
		$scope.reasontype = 'Client Meeting';
		$scope.date = $scope.triplist.dateNow;
		$scope.distance = $scope.triplist.tDistance;
		$scope.time = $scope.triplist.time;
		$scope.reason = '';
		$rootScope.employeeCode = $localStorage.empcode[0]['empCode'];
		

		$scope.updateTravel = function(){
			// console.log($scope.reasontype+" "+$scope.date+" "+$scope.distance+" "+$scope.time+" "+$scope.reason);
			
			var json_data = {
				'empCode': $rootScope.employeeCode,
				'tDistance': $scope.distance, 
				'tTime': $scope.time,
				'tripId': $scope.triplist.tripId, 
				'reason': $scope.reasontype
			}
			
			Data.updateTravel(json_data)
			.success(function(response){
				$scope.overlay = true;
				$scope.omsg = 'Successfully updated travel!!';
				$timeout(function(){
					$scope.overlay = false;
					$state.go($state.current, $state.params, { reload: true });
				},2000);
			}).error(function(response){
				$scope.overlay = true;
				$scope.omsg = 'Something is wrong!!';
				$timeout(function(){
					$scope.overlay = false;
					$state.go($state.current, $state.params, { reload: true });
				},2000);
			});
		}
			
		
	}]);

materialAdmin.controller("pagesCtrl", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage, $timeout, $location){

    $rootScope.logout = function(){
        $localStorage.imgsrc = '';
        AuthenticationService.ClearCredentials();
        $timeout(function () {
            $location.path('/');
        }, 1000);

	}
	
	$rootScope.employeeCode = $localStorage.empcode[0]['empCode'];
    
    $scope.imgsrc = $localStorage.imgsrc;
    $rootScope.img_src = $localStorage.imgsrc;


 }]);


materialAdmin.controller("profileCtrl", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage){

    $scope.imgsrc = $localStorage.imgsrc;
    $rootScope.img_src = $localStorage.imgsrc;

    $scope.shoimageUrl = false;

    if($localStorage.imgsrc){
        $scope.shoimageUrl = true;
    }


	$rootScope.employeeCode = $localStorage.empcode[0]['empCode'];

 	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;
 	$scope.uploadFile = function(){

        var filename = event.target.files[0].name;
        	// console.log(event.target.files);

            Data.updateImageUrl($localStorage.empcode[0]['empCode'], filename)
            .success(function(response){

            }).error(function(response){

            });

            // console.log(event.target.files[0]);
            Data.uploadImage(event.target.files)
            .success(function(response){

                 Data.getImageUrl($localStorage.empcode[0]['empCode'])
                .success(function(response){
                    $scope.imagedata = response.datasets;
                    $scope.imgsrc = response.datasets[0]['imagePath']+response.datasets[0]['imageName'];
                    $localStorage.imgsrc = $scope.imgsrc;
                    $scope.shoimageUrl = true;
                    $rootScope.img_src = response.datasets[0]['imagePath']+response.datasets[0]['imageName'];
                    $state.go($state.current, $state.params, { reload: true });
                }).error(function(response){

                });

            }).error(function(response){

            });

    	};

 }]);

// materialAdmin.controller('profController', ['$scope', '$rootScope', 'Data', '$localStorage', '$cookies', '$timeout', '$location' function($scope, $rootScope, Data, $localStorage, $cookies, $timeout, $location){

//      $rootScope.logout = function(){
//         $localStorage.imgsrc = '';
//         AuthenticationService.ClearCredentials();
//         $timeout(function () {
//             $location.path('/');
//         }, 1000);

//     }



//     $scope.shoimageUrl = false;

//     if($localStorage.imgsrc){
//         $scope.shoimageUrl = true;
//     }

//     $rootScope.imgsrc = $localStorage.imgsrc;
//     $rootScope.img_src = $localStorage.imgsrc;
//     $rootScope.logininfo = $cookies.getObject('globals').currentUser.id;

// }]);


materialAdmin.controller('employeeCtrl', ['$scope', '$rootScope', 'Data', '$localStorage', '$cookies', function($scope, $rootScope, Data, $localStorage, $cookies){

    $scope.shoimageUrl = false;

    if($localStorage.imgsrc){
        $scope.shoimageUrl = true;
    }

    $rootScope.imgsrc = $localStorage.imgsrc;
    $rootScope.img_src = $localStorage.imgsrc;
    $rootScope.logininfo = $cookies.getObject('globals').currentUser.id;

}]);

materialAdmin.controller('pastEmpCtrl', ['$scope', '$rootScope', 'Data', '$localStorage', '$cookies', '$state', function($scope, $rootScope, Data, $localStorage, $cookies, $state){

	$scope.pastemp 		= '';
	$scope.companyname 	= '';
	$scope.empcode 		= '';
	$scope.title 		= '';
	$scope.startdate 	= '';
	$scope.enddate 		= '';
	$scope.role 		= '';
	$scope.emptype 		= '';

	$scope.editInfo = 0;

	$scope.editBasic = function(){
		$scope.editInfo = 1;
	}

	$scope.closeBasic = function(){
		$scope.editInfo = 0;
	}

	
	Data.getpastEmpDetails($localStorage.empcode[0]['empCode'])
    .success(function(response){
       
		$scope.pastemp 		= response.configure_data[0];
		$scope.companyname 	= $scope.pastemp['companyName'];
		$scope.empcode 		= $scope.pastemp['empCode'];
		$scope.title 		= $scope.pastemp['title'];
		$scope.startdate 	= $scope.pastemp['startDate'];
		$scope.enddate 		= $scope.pastemp['endDate'];
		$scope.role 		= $scope.pastemp['role'];
		$scope.emptype 		= $scope.pastemp['empType'];
    }).error(function(response){

	});
	
	$scope.updatePersonalInfo = function(companyname, empcode, title, startdate, enddate, role, emptype){
		// console.log(companyname+" "+empcode+" "+title+" "+startdate+" "+enddate+" "+role+" "+emptype);

		var json_data = {
			"empCode":$localStorage.empcode[0]['empCode'],
			"companyName":companyname,
			"pastEmpCode":empcode,
			"title":title,
			"startDate":startdate,
			"endDate":enddate,
			"role":role,
			"empType":emptype
		}

		Data.updatePersonalInformation(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload: true})
		}).error(function(response){

		});
	}

}]);

materialAdmin.controller('employeeEduCtrl', ['$scope', '$rootScope', 'Data', '$localStorage', '$cookies', '$state', function($scope, $rootScope, Data, $localStorage, $cookies, $state){

	// console.log($localStorage.empcode[0]['empCode']);

	$scope.course 		= '';
	$scope.level		= '';
	$scope.institute	= '';
	$scope.board		= '';
	$scope.subject		= '';
	$scope.gpa			= '';
	$scope.startdate	= '';
	$scope.enddate		= '';
	
	$scope.editInfo = 0;
	
	$scope.editBasic = function(){
		$scope.editInfo = 1;
	}

	$scope.closeBasic = function(){
		$scope.editInfo = 0;
	}

    Data.getEducationDetails($localStorage.empcode[0]['empCode'])
    .success(function(response){
		$scope.educationdetail 	= response.Education_data[0];
		$scope.course 			= $scope.educationdetail['course'];
		$scope.level			= $scope.educationdetail['educationlevel'];
		$scope.institute		= $scope.educationdetail['instituteName'];
		$scope.board			= $scope.educationdetail['boardUniversity'];
		$scope.subject			= $scope.educationdetail['subOfSpecialization'];
		$scope.gpa				= $scope.educationdetail['gpaPercentage'];
		$scope.startdate		= $scope.educationdetail['startDate'];
		$scope.enddate			= $scope.educationdetail['endDate'];
    }).error(function(response){

	});
	
	$scope.updateEducationInfo = function(course, level, institute, board, subject, gpa, startdate, enddate){
		// console.log(course+" "+level+" "+institute+" "+board+" "+subject+" "+gpa+" "+startdate+" "+enddate);
		var json_data = {
			"empCode":$localStorage.empcode[0]['empCode'],
			"course"				:course,
			"educationLevel"		:level,
			"instituteName"			:institute,
			"boardUniversity"		:board,
			"subOfSpecialization"	:subject,
			"gpaPercentage"			:gpa,
			"startDate"				:startdate,
			"endDate"				:enddate
		}

		Data.updateEducationInformation(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload: true})
		}).error(function(response){

		});
	}

}]);

materialAdmin.controller('bankCtrl', ['$scope', '$rootScope', 'Data', '$localStorage', '$cookies', '$state', function($scope, $rootScope, Data, $localStorage, $cookies, $state){

	// console.log($localStorage.empcode[0]['empCode']);

	$scope.bank			= '';
	$scope.account		= ''; 
	$scope.acctype		= ''; 
	$scope.branch		= ''; 
	$scope.address		= '';
	$scope.ifsc			= ''; 
	$scope.accholder	= ''; 
	$scope.reinacc		= ''; 
	$scope.salaryacc	= '';
	
	$scope.editInfo = 0;
	
	$scope.editBasic = function(){
		$scope.editInfo = 1;
	}

	$scope.closeBasic = function(){
		$scope.editInfo = 0;
	}

    Data.getBankDetails($localStorage.empcode[0]['empCode'])
    .success(function(response){
		// console.log(response.bank_data);
		$scope.bankdetail 	= response.bank_data[0];
		$scope.bank			= $scope.bankdetail['bankName'];
		$scope.account		= $scope.bankdetail['accNo']; 
		$scope.acctype		= $scope.bankdetail['accType']; 
		$scope.branch		= $scope.bankdetail['branchName']; 
		$scope.address		= $scope.bankdetail['branchAddr'];
		$scope.ifsc			= $scope.bankdetail['ifscCode']; 
		$scope.accholder	= $scope.bankdetail['accHolder']; 
		$scope.reinacc		= $scope.bankdetail['reimbursementAcc']; 
		$scope.salaryacc	= $scope.bankdetail['salaryAcc'];
    }).error(function(response){

	});
	
	$scope.updateBankInfo = function(bank, account, acctype, branch, address, ifsc, accholder, reinacc, salaryacc){
		// console.log(bank+' '+account+' '+acctype+' '+branch+' '+ifsc+' '+accholder+' '+reinacc+' '+salaryacc);
		var json_data = {
			"empCode": $localStorage.empcode[0]['empCode'],
			"bankName":bank,
			"accNo":account,
			"accType":acctype,
			"branchName":branch,
			"branchAddr":address,
			"ifscCode":ifsc,
			"accHolder":accholder,
			"branchAddr":"",
			"reimbursementAcc":reinacc,
			"salaryAcc":salaryacc
		}

		Data.updateBankInformation(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload: true});
		}).error(function(response){

		});
	}

}]);


materialAdmin.controller('idDetailsCtrl', ['$scope', '$rootScope', 'Data', '$localStorage', '$cookies', '$state', function($scope, $rootScope, Data, $localStorage, $cookies, $state){

	//  console.log($localStorage.empcode[0]['empCode']);

	$scope.idtype		= '';
	$scope.number		= ''; 
	$scope.issuedate	= '';
	$scope.issueplace	= '';
	$scope.authority	= ''; 
	$scope.name			= '';

	
	$scope.editInfo = 0;
	
	$scope.editBasic = function(){
		$scope.editInfo = 1;
	}

	$scope.closeBasic = function(){
		$scope.editInfo = 0;
	}

    Data.getidDetails($localStorage.empcode[0]['empCode'])
    .success(function(response){
		$scope.iddetail 	= response.id_data[0];
		$scope.idtype		= $scope.iddetail['idType'];
		$scope.number		= $scope.iddetail['number']; 
		$scope.issuedate	= $scope.iddetail['dateOfIssue'];
		$scope.issueplace	= $scope.iddetail['placeOfIssue'];
		$scope.authority	= $scope.iddetail['issueingAuthority']; 
		$scope.name			= $scope.iddetail['nameOnDocument'];
    }).error(function(response){

	});
	
	$scope.updateIdInfo = function(idtype, number, issuedate, issueplace, authority, name){
		// console.log(idtype+' '+number+' '+issuedate+' '+issueplace+' '+authority+' '+name);
		var json_data = {
			"empCode":$localStorage.empcode[0]['empCode'],
			"idType":idtype,
			"number":number,
			"dateOfIssue":issuedate,
			"placeOfIssue":issueplace,
			"issueingAuthority":authority,
			"nameOnDocument":name
		}
		Data.updateIdInformation(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, { reload: true });
		}).error(function(response){

		});
	}


}]);

materialAdmin.controller('profileaboutCtrl', ['$scope', 'Data', '$cookies', '$localStorage', '$state', function($scope, Data, $cookies, $localStorage, $state){
	
	$scope.editId = 0;
	$scope.editInfo = 0;
	$scope.editcontactdata = 0;

	$scope.basicinfo = '';
	$scope.title = '';
	$scope.fullName = '';
	$scope.employeecode = '';
	$scope.startdate = '';
	$scope.enddate = '';
	$scope.emptype = '';
	$scope.mobileNumber = '';
	$scope.emailAddress = '';
	$scope.pan = '';
	$scope.uan = '';
	$scope.pf = '';
	$scope.aadhar = '';
	$scope.esi = '';
	$scope.voter = '';


 	$scope.editIdForm = function(){
 		$scope.editId = 1;
 	}
 	$scope.editBasic = function(){
 		$scope.editInfo = 1;
 	}
 	$scope.editContact = function(){
 		$scope.editcontactdata = 1;
 	}

 	$scope.closeEditIdForm = function(){
 		$scope.editId = 0;
 	}
 	$scope.closeBasic = function(){
 		$scope.editInfo = 0;
 	}
 	$scope.closeContact = function(){
 		$scope.editcontactdata = 0;
 	}

 	// console.log($cookies.getObject('globals').currentUser.id);
    // console.log($localStorage.empcode);

	Data.getBasicInformation($localStorage.empcode[0]['empCode'])
	.success(function(response){
		$scope.basicinfo = response.configure_data;

        $scope.title = $scope.basicinfo[0].title;
        $scope.fullName = $scope.basicinfo[0].firstName+" "+$scope.basicinfo[0].lastName;
        $scope.employeecode = $scope.basicinfo[0].empCode;
        $scope.startdate = $scope.basicinfo[0].startDate;
        $scope.enddate = $scope.basicinfo[0].endDate;
        $scope.emptype = $scope.basicinfo[0].empType;
        $scope.mobileNumber = $scope.basicinfo[0].mobile;
        $scope.emailAddress = $scope.basicinfo[0].personalEmail;
        $scope.pan = $scope.basicinfo[0].panNo;
        $scope.uan = $scope.basicinfo[0].uanNo;
        $scope.pf = $scope.basicinfo[0].pfAccount;
        $scope.aadhar = $scope.basicinfo[0].adharNo;
        $scope.esi = $scope.basicinfo[0].esiNo;
        $scope.voter = $scope.basicinfo[0].voterId;
        
	}).error(function(response){

	});

    $scope.updateBasicInfo1 = function(title, fullName, employeecode, startdate, enddate, emptype){
        
        var json_data = {
            "empCode":$localStorage.empcode[0]['empCode'],
            "firstName":fullName.split(" ")[0],
            "lastName":fullName.split(" ")[1],
            "dateOfJoining":startdate,
            "relievingDate":enddate,
            "title":title,
            "empType":emptype
        }
        Data.updateBasicInformation1(json_data)
        .success(function(response){
            $state.go($state.current, $state.params, { reload: true });
        }).error(function(response){

        });
       
    }

    $scope.updateBasicInfo2 = function(mobileNumber, emailAddress){
        var json_data = {
            "empCode":$localStorage.empcode[0]['empCode'],
            "mobile":mobileNumber,
            "personalEmail":emailAddress
        }

        Data.updateBasicInformation2(json_data)
        .success(function(response){
            $state.go($state.current, $state.params, { reload: true });
        }).error(function(response){

        });
    }

    $scope.updateBasicInfo3 = function(pan, uan, pf, aadhar, esi, voter){
        // console.log(pan+" "+uan+" "+pf+" "+aadhar+" "+esi+" "+voter);
        var json_data = {
            "empCode":$localStorage.empcode[0]['empCode'],
            "panNo":pan,
            "uanNo":uan,
            "pfAccount":pf,
            "adharNo":aadhar,
            "esiNo":esi,
            "voterId":voter
        }

        Data.updateBasicInformation3(json_data)
        .success(function(response){
            $state.go($state.current, $state.params, {reload: true });
        }).error(function(response){

        });
    }

}]);

materialAdmin.controller("profileTimelineCtrl", ['$scope', 'Data', '$state', '$stateParams', '$cookies', '$localStorage', function($scope, Data, $state, $stateParams, $cookies, $localStorage){


	$scope.empcode =        '';
	$scope.doj =            '';
	$scope.officialemail =  '';
	$scope.grade =          '';
	$scope.designation =    '';
	$scope.l2manager =      '';

	$scope.l1manager =      '';
	$scope.empstatus =      '';
	$scope.hrmanager =      '';
	$scope.notice =         '';
	$scope.emptype =        '';

	$scope.confduedate =    '';
	$scope.confstatus =     '';
	$scope.reldate =        '';
	$scope.department =     '';

 	$scope.editInfo = 0;
 	$scope.editContact = 0;
	 $scope.editmanager = 0;
	 

 	$scope.editInfoForm = function(){
 		$scope.editInfo = 1;
 	}
 	$scope.editContactForm = function(){
 		$scope.editContact = 1;
 	}
 	$scope.editManagerForm = function(){
 		$scope.editmanager = 1;
 	}
 	


 	$scope.closeInfoForm = function(){
 		$scope.editInfo = 0;
 	}
 	$scope.closeContactForm = function(){
 		$scope.editContact = 0;
 	}
 	$scope.closeManagerForm = function(){
 		$scope.editmanager = 0;
 	}


 	Data.getPositionInfo($localStorage.empcode[0]['empCode'])
 	.success(function(response){
 		$scope.positioninfo = response.configure_data;
 		// console.log($scope.positioninfo);
        $scope.empcode =        response.configure_data[0].empCode;
        $scope.doj =            response.configure_data[0].dateOfJoining;
        $scope.officialemail =  response.configure_data[0].officealEmail;
        $scope.grade =          response.configure_data[0].grade;
        $scope.designation =    response.configure_data[0].designation;
        $scope.l2manager =      response.configure_data[0].l2Manager;

        $scope.l1manager =      response.configure_data[0].l1Manager;
        $scope.empstatus =      response.configure_data[0].empStatus;
        $scope.hrmanager =      response.configure_data[0].hrManager;
        $scope.notice =         response.configure_data[0].noticePeriod;
        $scope.emptype =        response.configure_data[0].empType;

        $scope.confduedate =    response.configure_data[0].confDueDate;
        $scope.confstatus =     response.configure_data[0].confirmationStatus;
        $scope.reldate =        response.configure_data[0].relievingDate;
        $scope.department =     response.configure_data[0].department;
 	}).error(function(response){
 		console.log("Error in getting contact information");
 	});


    $scope.updatepositionInfo = function(empcode, doj, officialemail, grade, designation, l2manager){
        console.log(empcode+" "+doj+" "+officialemail+" "+grade+" "+designation+" "+l2manager);
        var json_data = {
            "empCode":$localStorage.empcode[0]['empCode'],
            "dateOfJoining":doj,
            "officealEmail":officialemail,
            "grade":grade,
            "designation":designation,
            "l2Manager":l2manager
        }
        Data.updatepositionInformation(json_data)
        .success(function(response){
            $state.go($state.current, $state.params, {reload: true });
        }).error(function(response){

        });
    }

    $scope.updatepositionInfo1 = function(l1manager, empstatus, hrmanager, notice, emptype){
		
		var json_data = {
			"empCode":$localStorage.empcode[0]['empCode'],
			"l1manager":l1manager,
			"empstatus":empstatus,
			"hrmanager":hrmanager,
			"notice":notice,
			"emptype":emptype
		}
		Data.updatepositionInformation1(json_data)
        .success(function(response){
            $state.go($state.current, $state.params, {reload: true });
        }).error(function(response){

        });
    }

    $scope.updatepositionInfo2 = function(confduedate, confstatus, reldate, department){
		console.log(confduedate+" "+confstatus+" "+reldate+" "+department);
		
		var json_data = {
			"empCode":$localStorage.empcode[0]['empCode'],
			"confduedate":confduedate,
			"confstatus":confstatus,
			"reldate":reldate,
			"department":department
		}

		Data.updatepositionInformation2(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload: true });
		}).error(function(response){

		})
    }
 	

 }]);

materialAdmin.controller("profilephotoCtrl", ['$scope', 'Data', '$state', '$stateParams', '$cookies', '$localStorage', function($scope, Data, $state, $stateParams, $cookies, $localStorage){

	
	$scope.addrtype =   '';
	$scope.whenavail =  '';
	$scope.addrline1 =  '';
	$scope.addrline2 =  '';

	$scope.country =    '';
	$scope.state =      '';
	$scope.city =       '';
	$scope.pin =        '';

	$scope.contactname =            '';
	$scope.contactrelationship =    '';
	$scope.mobileno =               '';
	$scope.officenumber =           '';
	$scope.email =                  '';
	$scope.contactaddress =         '';
	
	$scope.editInfo = 0;
 	$scope.editContact = 0;
 	$scope.editmanager = 0;

 	$scope.editInfoForm = function(){
 		$scope.editInfo = 1;
 	}
 	$scope.editContactForm = function(){
 		$scope.editContact = 1;
 	}
 	$scope.editManagerForm = function(){
 		$scope.editmanager = 1;
 	}
 	


 	$scope.closeInfoForm = function(){
 		$scope.editInfo = 0;
 	}
 	$scope.closeContactForm = function(){
 		$scope.editContact = 0;
 	}
 	$scope.closeManagerForm = function(){
 		$scope.editmanager = 0;
 	}

 	Data.getContactInfo($localStorage.empcode[0]['empCode'])
 	.success(function(response){
		 $scope.contactinfo = response.configure_data;
		 
		 if($scope.contactinfo[0]){
			$scope.addrtype =   response.configure_data[0].addrType;
			$scope.whenavail =  response.configure_data[0].whenAvail;
			$scope.addrline1 =  response.configure_data[0].addrLine_1;
			$scope.addrline2 =  response.configure_data[0].addrLine_2;
	
			$scope.country =    response.configure_data[0].country;
			$scope.state =      response.configure_data[0].state;
			$scope.city =       response.configure_data[0].city;
			$scope.pin =        response.configure_data[0].pinCode;
		}

 	}).error(function(response){
 		console.log("Error in getting contact information");
 	});

 	Data.getEmergencyContactInfo($localStorage.empcode[0]['empCode'])
 	.success(function(response){
		 $scope.emergencycontactinfo = response.configure_data;
		 
		 console.log(response);

		 if($scope.emergencycontactinfo[0]){
			$scope.contactname =            response.configure_data[0].name;
			$scope.contactrelationship =    response.configure_data[0].relationship;
			$scope.mobileno =               response.configure_data[0].mobile;
			$scope.officenumber =           response.configure_data[0].officeNo;
			$scope.email =                  response.configure_data[0].email;
			$scope.contactaddress =         response.configure_data[0].address;
		}

 	}).error(function(response){
 		console.log("Error in getting contact information");
	 });
	 
	 $scope.updateContactInfo = function(addrtype, whenavail, addrline1, addrline2){
		
		var json_data = {
			"empCode":$localStorage.empcode[0]['empCode'],
			"addrtype":addrtype,
			"whenavailable":whenavail,
			"addrline1":addrline1,
			"addrline2":addrline2
		}

		Data.updateContactInformation(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload: true });
		}).error(function(response){

		});
    }

    $scope.updateContactInfo1 = function(country, state, city, pin){
		
		var json_data = {
			"empCode": $localStorage.empcode[0]['empCode'],
			"country":country,
			"state":state,
			"city":city,
			"pin":pin
		}

		Data.updateContactInformation1(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload: true});
		}).error(function(response){

		});
    }

    $scope.updateEmargencyContact = function(contactname, contactrelationship, mobileno, officenumber, email, contactaddress){
		console.log(contactname+" "+contactrelationship+" "+mobileno+" "+officenumber+" "+email+" "+contactaddress);
		
		var json_data = {
			"empCode":$localStorage.empcode[0]['empCode'],
			"contactname":contactname,
			"contactrelationship":contactrelationship,
			"mobileno":mobileno,
			"officenumber":officenumber,
			"email":email,
			"contactaddress":contactaddress
		}

		Data.updateEmargencyContactInfo(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload:true});
		}).error(function(response){

		});

    }

 }]);

materialAdmin.controller("loginProfileConnectionCtrl", ['$scope', 'Data', '$state', '$stateParams', '$cookies', '$localStorage', function($scope, Data, $state, $stateParams, $cookies, $localStorage){

	$scope.dname =      '';
	$scope.relation =   '';
	$scope.gender =     '';
	$scope.dob =        '';

	$scope.marital =    '';
	$scope.blood =      '';
	$scope.addr =       '';
	$scope.mobile =     '';

 	$scope.editInfo = 0;
 	$scope.editContact = 0;

 	$scope.editInfoForm = function(){
 		$scope.editInfo = 1;
 	}
 	$scope.editContactForm = function(){
 		$scope.editContact = 1;
 	}
 	


 	$scope.closeInfoForm = function(){
 		$scope.editInfo = 0;
 	}
 	$scope.closeContactForm = function(){
 		$scope.editContact = 0;
 	}


 	Data.getFamilyInfo($localStorage.empcode[0]['empCode'])
 	.success(function(response){
 		$scope.familyinfo = response.configure_data;
		 
		 if($scope.familyinfo[0]){
			$scope.dname =      response.configure_data[0].dependentName;
			$scope.relation =   response.configure_data[0].relationship;
			$scope.gender =     response.configure_data[0].gender;
			$scope.dob =        response.configure_data[0].dob;
	
			$scope.marital =    response.configure_data[0].maritalStatus;
			$scope.blood =      response.configure_data[0].bloodGroup;
			$scope.addr =       response.configure_data[0].address;
			$scope.mobile =     response.configure_data[0].mobileNo;
		   }

 	}).error(function(response){
 		console.log("Error in getting contact information");
	 });
	 
	 $scope.updateFamily = function(dname, relation, gender, dob){
		
		var json_data = {
			'empCode':$localStorage.empcode[0]['empCode'],
			'dname':dname,
			'relation':relation,
			'gender':gender,
			'dob':dob
		}

		Data.updateFamilyInfo(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload:true});
		}).error(function(response){

		});
    }

    $scope.updateFamily1 = function(marital, blood, addr, mobile){
		console.log(marital+" "+blood+" "+addr+" "+mobile);
		
		var json_data = {
			"empCode":$localStorage.empcode[0]['empCode'],
			"marital":marital,
			"blood":blood,
			"addr":addr,
			"mobile":mobile
		}

		Data.updateFamilyInfo1(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload:true});
		}).error(function(response){

		});
    }
 	

 }]);




 materialAdmin.controller("employeelistCtrl", ['$scope', 'Data', 'empList', '$localStorage', function($scope, Data, empList, $localStorage){

 	$scope.countrylist = '';
 	$scope.quantity = 5;
    // $localStorage.empbyidcode = '';

	$scope.employeelist = empList.data.configure_data;
	console.log($scope.employeelist);

	$scope.lmanagercode = $localStorage.empcode[0]['empCode'];
	console.log($scope.lmanagercode);

	var length=$scope.employeelist.length;
	var dataArray=[];
	

	for (var i=0; i<length; i++) {
		if(($scope.lmanagercode == $scope.employeelist[i]['l1manager'])||($scope.lmanagercode == $scope.employeelist[i]['hrManager'])){
			dataArray.push([$scope.employeelist[i]['id'], $scope.employeelist[i]['firstname']+" "+$scope.employeelist[i]['lastname'], $scope.employeelist[i]['personalEmail'], $scope.employeelist[i]['empCode'], $scope.employeelist[i]['empCode'], '<button class="btn btn-info" data-toggle="modal" data-target="#completeConformation" onclick="changeMargin(); getOrder(\''+$scope.employeelist[i]['empCode']+'\');"  type="submit">Complete<\/button>']);
		}
			
	} 
	
	$('.emplist').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-striped" id="vehicle-table" style="font-size: 12px; width:98%"><\/table>' );
	
	$('#vehicle-table').dataTable( {
		"data": dataArray,
		 "colReorder": true,
		 "buttons": ['copy', 'excel', 'pdf','colvis',],
		 "dom": 'Blfrtip',
		 "lengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],

		 "responsive": true,
		"columns": [
			{ "title": "Id" },
			{ "title": "Name" },
			{ 'title': "Email"},
			{ 'title': 'Employee Code'},
			{ "title": "Action",
			"render": function(data, type, row, meta){

				// data = '<a href="' + data + '" ui-sref="home.task({id: data})">' + data + '</a>';
				
					data = '<a href="/#/prof/employee-list/employee-list-edit/' + data + '/basic">' + data + '</a>';
				
				return data;
			 } }
			
		]
	});
	


 }]);

 materialAdmin.controller("employeeEditCtrl", ['$scope', 'Data', '$state', '$stateParams', '$rootScope', '$localStorage', function($scope, Data, $state, $stateParams, $rootScope, $localStorage){

 	var empid = $stateParams.id;
    $scope.shoimageUrl = true;
    $scope.imgsrc = '';

 	Data.getBasicInformation(empid)
 	.success(function(response){
		 $scope.basicinfo = response.configure_data;
		 
		 console.log(response.configure_data);

        Data.getImageUrl(response.configure_data[0]['empCode'])
        .success(function(response){
			$scope.imagedata = response.datasets;
			
           
           if(response.datasets[0]['imagePath']&&response.datasets[0]['imageName']){
                $scope.imgsrc = response.datasets[0]['imagePath']+response.datasets[0]['imageName'];
			}
            
            $scope.shoimageUrl = true;
            // $rootScope.img_src = response.datasets[0]['imagePath']+response.datasets[0]['imageName'];
        }).error(function(response){

        });


 	}).error(function(response){
 		console.log("Error in getting basic information");
	 });
	 
	 $scope.uploadFile = function(){
		
				var filename = event.target.files[0].name;
					// console.log(event.target.files);

		
					Data.updateImageUrl(empid, filename)
					.success(function(response){
		
					}).error(function(response){
		
					});
		
					// console.log(event.target.files[0]);
					Data.uploadImage(event.target.files)
					.success(function(response){
		
						 Data.getImageUrl(empid)
						.success(function(response){
							$scope.imagedata = response.datasets;
							$scope.imgsrc = response.datasets[0]['imagePath']+response.datasets[0]['imageName'];
							
							$scope.shoimageUrl = true;
							
							$state.go($state.current, $state.params, { reload: true });
						}).error(function(response){
		
						});
		
					}).error(function(response){
		
					});
		
				};
		



 }]);

 materialAdmin.controller("employeeBasicEditCtrl", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', '$localStorage', function($scope, $rootScope, Data, $state, $stateParams, $localStorage){


 	$scope.basicinfo = '';
	var empid = $stateParams.id;
	 
	$scope.basicinfo = '';
	$scope.title = '';
	$scope.fullName = '';
	$scope.employeecode = '';
	$scope.startdate = '';
	$scope.enddate = '';
	$scope.emptype = '';
	$scope.mobileNumber = '';
	$scope.emailAddress = '';
	$scope.pan = '';
	$scope.uan = '';
	$scope.pf = '';
	$scope.aadhar = '';
	$scope.esi = '';
	$scope.voter = '';

 	$scope.editId = 0;
	$scope.editInfo = 0;
	$scope.editcontactdata = 0;


 	$scope.editIdForm = function(){
 		$scope.editId = 1;
 	}
 	$scope.editBasic = function(){
 		$scope.editInfo = 1;
 	}
 	$scope.editContact = function(){
 		$scope.editcontactdata = 1;
 	}

 	$scope.closeEditIdForm = function(){
 		$scope.editId = 0;
 	}
 	$scope.closeBasic = function(){
 		$scope.editInfo = 0;
 	}
 	$scope.closeContact = function(){
 		$scope.editcontactdata = 0;
 	}
 	
 	Data.getBasicInformation(empid)
 	.success(function(response){
 		$scope.basicinfo = response.configure_data;
        $scope.title = $scope.basicinfo[0].title;
 		$scope.fullName = $scope.basicinfo[0].firstName+" "+$scope.basicinfo[0].lastName;
 		$scope.employeecode = $scope.basicinfo[0].empCode;
 		$scope.startdate = $scope.basicinfo[0].startDate;
 		$scope.enddate = $scope.basicinfo[0].endDate;
 		$scope.emptype = $scope.basicinfo[0].empType;
        $scope.mobileNumber = $scope.basicinfo[0].mobile;
        $scope.emailAddress = $scope.basicinfo[0].personalEmail;
        $scope.pan = $scope.basicinfo[0].panNo;
        $scope.uan = $scope.basicinfo[0].uanNo;
        $scope.pf = $scope.basicinfo[0].pfAccount;
        $scope.aadhar = $scope.basicinfo[0].adharNo;
        $scope.esi = $scope.basicinfo[0].esiNo;
        $scope.voter = $scope.basicinfo[0].voterId;
 	}).error(function(response){
 		console.log("Error in getting basic information");
 	});

    // console.log($localStorage.empcode[0]['empCode']);
    var empcode = $stateParams.id;

 	$scope.updateBasicInfo1 = function(title, fullName, employeecode, startdate, enddate, emptype){
        
        var json_data = {
            "empCode":empcode,
            "firstName":fullName.split(" ")[0],
            "lastName":fullName.split(" ")[1],
            "dateOfJoining":startdate,
            "relievingDate":enddate,
            "title":title,
            "empType":emptype
        }
        Data.updateBasicInformation1(json_data)
        .success(function(response){
            $state.go($state.current, $state.params, { reload: true });
        }).error(function(response){

        });
       
    }

    $scope.updateBasicInfo2 = function(mobileNumber, emailAddress){
        var json_data = {
            "empCode":empcode,
            "mobile":mobileNumber,
            "personalEmail":emailAddress
        }

        Data.updateBasicInformation2(json_data)
        .success(function(response){
            $state.go($state.current, $state.params, { reload: true });
        }).error(function(response){

        });
    }

    $scope.updateBasicInfo3 = function(pan, uan, pf, aadhar, esi, voter){
        // console.log(pan+" "+uan+" "+pf+" "+aadhar+" "+esi+" "+voter);
        var json_data = {
            "empCode":empcode,
            "panNo":pan,
            "uanNo":uan,
            "pfAccount":pf,
            "adharNo":aadhar,
            "esiNo":esi,
            "voterId":voter
        }

        Data.updateBasicInformation3(json_data)
        .success(function(response){
            $state.go($state.current, $state.params, {reload: true });
        }).error(function(response){

        });
    }


 }]);

 materialAdmin.controller("employeeProfileEditCtrl", ['$scope', 'Data', '$state', '$stateParams', function($scope, Data, $state, $stateParams){

	 var empid = $stateParams.id;
	 
	$scope.empcode =        '';
	$scope.doj =            '';
	$scope.officialemail =  '';
	$scope.grade =          '';
	$scope.designation =    '';
	$scope.l2manager =      '';

	$scope.l1manager =      '';
	$scope.empstatus =      '';
	$scope.hrmanager =      '';
	$scope.notice =         '';
	$scope.emptype =        '';

	$scope.confduedate =    '';
	$scope.confstatus =     '';
	$scope.reldate =        '';
	$scope.department =     '';


 	$scope.editInfo = 0;
 	$scope.editContact = 0;
 	$scope.editmanager = 0;

 	$scope.editInfoForm = function(){
 		$scope.editInfo = 1;
 	}
 	$scope.editContactForm = function(){
 		$scope.editContact = 1;
 	}
 	$scope.editManagerForm = function(){
 		$scope.editmanager = 1;
 	}
 	


 	$scope.closeInfoForm = function(){
 		$scope.editInfo = 0;
 	}
 	$scope.closeContactForm = function(){
 		$scope.editContact = 0;
 	}
 	$scope.closeManagerForm = function(){
 		$scope.editmanager = 0;
 	}

 	Data.getPositionInfo(empid)
 	.success(function(response){
 		$scope.positioninfo =   response.configure_data;
 		$scope.empcode =        response.configure_data[0].empCode;
        $scope.doj =            response.configure_data[0].dateOfJoining;
        $scope.officialemail =  response.configure_data[0].officealEmail;
        $scope.grade =          response.configure_data[0].grade;
        $scope.designation =    response.configure_data[0].designation;
        $scope.l2manager =      response.configure_data[0].l2Manager;

        $scope.l1manager =      response.configure_data[0].l1Manager;
        $scope.empstatus =      response.configure_data[0].empStatus;
        $scope.hrmanager =      response.configure_data[0].hrManager;
        $scope.notice =         response.configure_data[0].noticePeriod;
        $scope.emptype =        response.configure_data[0].empType;

        $scope.confduedate =    response.configure_data[0].confDueDate;
        $scope.confstatus =     response.configure_data[0].confirmationStatus;
        $scope.reldate =        response.configure_data[0].relievingDate;
        $scope.department =     response.configure_data[0].department;

 	}).error(function(response){
 		console.log("Error in getting contact information");
 	});

    $scope.updatepositionInfo = function(empcode, doj, officialemail, grade, designation, l2manager){
       
        var json_data = {
            "empCode":empcode,
            "dateOfJoining":doj,
            "officealEmail":officialemail,
            "grade":grade,
            "designation":designation,
            "l2Manager":l2manager
        }
        Data.updatepositionInformation(json_data)
        .success(function(response){
            $state.go($state.current, $state.params, {reload: true });
        }).error(function(response){

        });
    }

    $scope.updatepositionInfo1 = function(l1manager, empstatus, hrmanager, notice, emptype){
		
		var json_data = {
			"empCode":empid,
			"l1manager":l1manager,
			"empstatus":empstatus,
			"hrmanager":hrmanager,
			"notice":notice,
			"emptype":emptype
		}
		Data.updatepositionInformation1(json_data)
        .success(function(response){
            $state.go($state.current, $state.params, {reload: true });
        }).error(function(response){

        });
    }

    $scope.updatepositionInfo2 = function(confduedate, confstatus, reldate, department){
		console.log(confduedate+" "+confstatus+" "+reldate+" "+department);
		
		var json_data = {
			"empCode":empid,
			"confduedate":confduedate,
			"confstatus":confstatus,
			"reldate":reldate,
			"department":department
		}

		Data.updatepositionInformation2(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload: true });
		}).error(function(response){

		})
    }
 	

 }]);

 materialAdmin.controller("employeeContactEditCtrl", ['$scope', 'Data', '$state', '$stateParams', function($scope, Data, $state, $stateParams){

	 var empid = $stateParams.id;
	 
	$scope.addrtype =   '';
	$scope.whenavail =  '';
	$scope.addrline1 =  '';
	$scope.addrline2 =  '';
	$scope.country =    '';
	$scope.state =      '';
	$scope.city =       '';
	$scope.pin =        '';

	$scope.contactname =            '';
	$scope.contactrelationship =    '';
	$scope.mobileno =               '';
	$scope.officenumber =           '';
	$scope.email =                  '';
	$scope.contactaddress =         '';

 	$scope.editInfo = 0;
 	$scope.editContact = 0;
 	$scope.editmanager = 0;

 	$scope.editInfoForm = function(){
 		$scope.editInfo = 1;
 	}
 	$scope.editContactForm = function(){
 		$scope.editContact = 1;
 	}
 	$scope.editManagerForm = function(){
 		$scope.editmanager = 1;
 	}
 	


 	$scope.closeInfoForm = function(){
 		$scope.editInfo = 0;
 	}
 	$scope.closeContactForm = function(){
 		$scope.editContact = 0;
 	}
 	$scope.closeManagerForm = function(){
 		$scope.editmanager = 0;
	 }
	 

 	
 	Data.getContactInfo(empid)
 	.success(function(response){

		 $scope.contactinfo = response.configure_data;

        if($scope.contactinfo[0]){
			$scope.addrtype =   response.configure_data[0].addrType;
			$scope.whenavail =  response.configure_data[0].whenAvail;
			$scope.addrline1 =  response.configure_data[0].addrLine_1;
			$scope.addrline2 =  response.configure_data[0].addrLine_2;
	
			$scope.country =    response.configure_data[0].country;
			$scope.state =      response.configure_data[0].state;
			$scope.city =       response.configure_data[0].city;
			$scope.pin =        response.configure_data[0].pinCode;
		}


 	}).error(function(response){
 		console.log("Error in getting contact information");
 	});

 	Data.getEmergencyContactInfo(empid)
 	.success(function(response){
 		$scope.emergencycontactinfo = response.configure_data;
		
		 console.log(response);

        if($scope.emergencycontactinfo[0]){
			$scope.contactname =            response.configure_data[0].name;
			$scope.contactrelationship =    response.configure_data[0].relationship;
			$scope.mobileno =               response.configure_data[0].mobile;
			$scope.officenumber =           response.configure_data[0].officeNo;
			$scope.email =                  response.configure_data[0].email;
			$scope.contactaddress =         response.configure_data[0].address;
		}

 	}).error(function(response){
 		console.log("Error in getting contact information");
 	});


    $scope.updateContactInfo = function(addrtype, whenavail, addrline1, addrline2){
		
		var json_data = {
			"empCode":empid,
			"addrtype":addrtype,
			"whenavailable":whenavail,
			"addrline1":addrline1,
			"addrline2":addrline2
		}

		Data.updateContactInformation(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload: true });
		}).error(function(response){

		});
    }

    $scope.updateContactInfo1 = function(country, state, city, pin){
		
		var json_data = {
			"empCode": empid,
			"country":country,
			"state":state,
			"city":city,
			"pin":pin
		}

		Data.updateContactInformation1(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload: true});
		}).error(function(response){

		});
    }

    $scope.updateEmargencyContact = function(contactname, contactrelationship, mobileno, officenumber, email, contactaddress){
		console.log(contactname+" "+contactrelationship+" "+mobileno+" "+officenumber+" "+email+" "+contactaddress);
		
		var json_data = {
			"empCode":empid,
			"contactname":contactname,
			"contactrelationship":contactrelationship,
			"mobileno":mobileno,
			"officenumber":officenumber,
			"email":email,
			"contactaddress":contactaddress
		}

		Data.updateEmargencyContactInfo(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload:true});
		}).error(function(response){

		});

    }

 }]);

 materialAdmin.controller("employeeConnectionEditCtrl", ['$scope', 'Data', '$state', '$stateParams', function($scope, Data, $state, $stateParams){

	 var empid = $stateParams.id;
	 
	 $scope.dname =      '';
	 $scope.relation =   '';
	 $scope.gender =     '';
	 $scope.dob =        '';

	 $scope.marital =    '';
	 $scope.blood =      '';
	 $scope.addr =       '';
	 $scope.mobile =     '';

 	$scope.editInfo = 0;
 	$scope.editContact = 0;

 	$scope.editInfoForm = function(){
 		$scope.editInfo = 1;
 	}
 	$scope.editContactForm = function(){
 		$scope.editContact = 1;
 	}
 	


 	$scope.closeInfoForm = function(){
 		$scope.editInfo = 0;
 	}
 	$scope.closeContactForm = function(){
 		$scope.editContact = 0;
 	}

 	Data.getFamilyInfo(empid)
 	.success(function(response){
		 $scope.familyinfo = response.configure_data;

 		
       if($scope.familyinfo[0]){
		$scope.dname =      response.configure_data[0].dependentName;
        $scope.relation =   response.configure_data[0].relationship;
        $scope.gender =     response.configure_data[0].gender;
        $scope.dob =        response.configure_data[0].dob;

        $scope.marital =    response.configure_data[0].maritalStatus;
        $scope.blood =      response.configure_data[0].bloodGroup;
        $scope.addr =       response.configure_data[0].address;
        $scope.mobile =     response.configure_data[0].mobileNo;
	   }

 	}).error(function(response){
 		console.log("Error in getting contact information");
 	});

    $scope.updateFamily = function(dname, relation, gender, dob){
		
		var json_data = {
			'empCode':empid,
			'dname':dname,
			'relation':relation,
			'gender':gender,
			'dob':dob
		}

		Data.updateFamilyInfo(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload:true});
		}).error(function(response){

		});
    }

    $scope.updateFamily1 = function(marital, blood, addr, mobile){
		console.log(marital+" "+blood+" "+addr+" "+mobile);
		
		var json_data = {
			"empCode":empid,
			"marital":marital,
			"blood":blood,
			"addr":addr,
			"mobile":mobile
		}

		Data.updateFamilyInfo1(json_data)
		.success(function(response){
			$state.go($state.current, $state.params, {reload:true});
		}).error(function(response){

		});
    }
 	

 }]);

 materialAdmin.controller("addEmpMainCtrl", ['$scope', 'Data', '$state', '$localStorage', function($scope, Data, $state, $localStorage){



 }]);


 materialAdmin.controller("addEmployeeController", ['$scope', 'Data', '$state', '$localStorage', 'l1managerList', 'l2managerList', 'hrmanagerList', 'designationList', function($scope, Data, $state, $localStorage, l1managerList, l2managerList, hrmanagerList, designationList){

 	// employee code
 	// $localStorage.empcode = '';

 	$scope.sirname = '';
 	$scope.firstname = '';
 	$scope.middlename = '';
 	$scope.lastname = '';
 	$scope.fathername = '';
 	$scope.dob = '';
 	$scope.gender = '';
 	$scope.maritalstatus = '';
 	$scope.mobile = '';
 	$scope.pemail = '';
 	$scope.pannumber = '';
 	$scope.uannumber = '';
 	$scope.pfaccount = '';
 	$scope.adharno = '';
 	$scope.esinumber = '';
 	$scope.voterid = '';
 	$scope.nationality = '';
 	$scope.blood = '';
 	$scope.empcode = '';
 	$scope.officialemail = '';
 	$scope.doj = '';
 	$scope.grade = '';
 	$scope.grade = '';
 	$scope.grade = '';
 	$scope.designation = '';
 	$scope.l1_manager = '';
 	$scope.l2_manager = '';
 	$scope.hrmanager = '';
 	$scope.employeetype = '';
 	$scope.empstatus = '';
 	$scope.prob_period = '';
 	$scope.notice_period = '';
 	$scope.confirmstatus = '';
 	$scope.confirm_date = '';
 	$scope.relieve_date = '';
 	$scope.department = '';
	$scope.country = '';

	var file = '';
	var imgname = '';

	var selectl1manager = document.getElementById("l1mnager");
	var selectl2manager = document.getElementById("l2manager");
	var selecthrmanager = document.getElementById("hrmanager");
	var selectdesignation = document.getElementById("designation");

	var l1managerList = l1managerList.data.configure_data;
	var l2managerList = l2managerList.data.configure_data;
	var hrmanagerList = hrmanagerList.data.configure_data;
	var designationList = designationList.data.configure_data;
	
	angular.forEach(l1managerList, function(value, key) {
		var option = document.createElement("option");
		option.text = value.firstName+" "+value.lastName;
		option.value = value.empCode;
		selectl1manager.appendChild(option);
	  });

	angular.forEach(l2managerList, function(value, key){
		var option = document.createElement("option");
		option.text = value.firstName+" "+value.lastName;
		option.value = value.empCode;
		selectl2manager.appendChild(option);
	});

	angular.forEach(hrmanagerList, function(value, key){
		var option = document.createElement("option");
		option.text = value.firstName+" "+value.lastName;
		option.value = value.empCode;
		selecthrmanager.appendChild(option);
	});

	angular.forEach(designationList, function(value, key){
		var option = document.createElement("option");
		option.text = value.designation;
		option.value = value.designation;
		selectdesignation.appendChild(option);
	});



 	$scope.basicInput = function(){

 		$localStorage.empcode = $scope.empcode;
 		
 		var json_data = {
 			"image":'',
 			"sirname":$scope.sirname,
 			"firstname":$scope.firstname,
 			"middlename":$scope.middlename,
 			"lastname":$scope.lastname,
 			"fathername":$scope.fathername,
 			"dob":$scope.dob,
 			"gender":$scope.gender,
 			"maritalstatus":$scope.maritalstatus,
 			"mobile":$scope.mobile,
 			"pemail":$scope.pemail,
 			"pannumber":$scope.pannumber,
 			"uannumber":$scope.uannumber,
 			"pfaccount":$scope.pfaccount,
 			"adharno":$scope.adharno,
 			"esinumber":$scope.esinumber,
 			"voterid":$scope.voterid,
 			"nationality":$scope.nationality,
 			"blood":$scope.blood,
 			"empcode":$scope.empcode,
 			"officialemail":$scope.officialemail,
 			"doj":$scope.doj,
 			"grade":$scope.grade,
 			"designation":$scope.designation,
 			"l1_manager":$scope.l1_manager,
 			"l2_manager":$scope.l2_manager,
 			"hrmanager":$scope.hrmanager,
 			"employeetype":$scope.employeetype,
 			"empstatus":$scope.empstatus,
 			"prob_period":$scope.prob_period,
 			"notice_period":$scope.notice_period,
 			"confirmstatus":$scope.confirmstatus,
 			"confirm_date":$scope.confirm_date,
 			"relieve_date":$scope.relieve_date,
 			"department":$scope.department,
 			"country":$scope.country
		 }
		 
		 file = document.getElementById('file-input').files[0];

 		Data.addEmp(json_data)
 		.success(function(){

			if(file){
				imgname = file.name; 
	
				Data.updateImageUrl($scope.empcode,imgname)
				.success(function(response){
					$state.go($state.current, $state.params, { reload: true });
				}).error(function(response){
		
				});
			 }else{
				$state.go($state.current, $state.params, { reload: true });
			 }

 		}).error(function(){
 			console.log("Error in enployee adding");
		 });


		 
 		
 	}


 }]);


 materialAdmin.controller("contactEmployeeController", ['$scope', 'Data', '$state', '$localStorage', function($scope, Data, $state, $localStorage){

 	// contact details
 	$scope.addresstype = '';
 	$scope.whenavail = '';
 	$scope.address1 = '';
 	$scope.address2 = '';
 	$scope.country = '';
 	$scope.state = '';
 	$scope.city = '';
 	$scope.pincode = '';
 	$scope.mobile = '';
 	$scope.correspondaddress = '';

 	// emergency contact
 	$scope.contactname = '';
 	$scope.relationship = '';
 	$scope.emergencymobile = '';
 	$scope.officenumber = '';
 	$scope.contactaddress = '';
 	$scope.landlinenumber = '';
 	$scope.emergencyemail = '';

 	$scope.addContact = function(){
 		var jsonData = {
 			'addresstype' : $scope.addresstype,
 			'whenavail' : $scope.whenavail,
 			'address1' : $scope.address1,
 			'address2' : $scope.address2,
 			'country' : $scope.country,
 			'state' : $scope.state,
 			'city' : $scope.city,
 			'pincode' : $scope.pincode,
 			'mobile' : $scope.mobile,
 			'correspondaddress' : $scope.correspondaddress,
 			'empcode' : $localStorage.empcode
 		}

 		Data.addContact(jsonData)
 		.success(function(response){
 			console.log("Adding contact details");
 			$state.go($state.current, $state.params, { reload: true });
 		}).error(function(response){
 			console.log("Error in adding contacts");
 		});
 	}

 	$scope.addEmergencyContact = function(){
 		var jsonData = {
 			'contactname' : $scope.contactname,
 			'relationship' : $scope.relationship,
 			'emergencymobile' : $scope.emergencymobile,
 			'officenumber' : $scope.officenumber,
 			'contactaddress' : $scope.contactaddress,
 			'landlinenumber' : $scope.landlinenumber,
 			'emergencyemail' : $scope.emergencyemail,
 			'empcode' : $localStorage.empcode
 		}

 		
 		Data.addEmegencyContact(jsonData)
 		.success(function(response){
 			console.log("Adding emergency contact");
 			$state.go($state.current, $state.params, { reload: true });
 		}).error(function(response){
 			console.log("Error in adding emergency contact");
 		});
 	}

 	$scope.contactlist = '';

 	Data.getAllContact()
 	.success(function(response){
 		console.log("getting contact list");
 		$scope.contactlist = response.configure_data;
 	}).error(function(response){
 		console.log("Error in getting contact list");
 	});
;
 	$scope.emergencycontactlist = '';

 	Data.getAllEmergencyContact()
 	.success(function(response){
 		$scope.emergencycontactlist = response.configure_data
 		console.log("getting all emergency contact");
 	}).error(function(response){
 		console.log("Error in getting emergency contact list");
 	});

 }]);


materialAdmin.controller("familyEmployeeController", ['$scope', 'Data', '$state', '$localStorage', function($scope, Data, $state, $localStorage){

	$scope.dependentname = '';
	$scope.relationship = '';
	$scope.gender = '';
	$scope.dob = '';
	$scope.maritalstatus = '';
	$scope.blood_group = '';
	$scope.address = '';
	$scope.mobile = '';
	$scope.isdependent = '';

	$scope.addFamilyDetails = function(){
		var jsonData = {
			'dependentname':$scope.dependentname,
			'relationship':$scope.relationship,
			'gender':$scope.gender,
			'dob':$scope.dob,
			'maritalstatus':$scope.maritalstatus,
			'blood_group':$scope.blood_group,
			'address':$scope.address,
			'mobile':$scope.mobile,
			'isdependent':$scope.isdependent,
			'empcode' : $localStorage.empcode
		}
		// console.log(jsonData);
		Data.addEmployeeFamily(jsonData)
		.success(function(response){
			console.log("Adding employee's family");
			$state.go($state.current, $state.params, { reload: true });
		}).error(function(response){
			console.log("Error in adding employee's family");
		});
	}

	$scope.employeefamilylist = '';
	Data.getAllEmployeeFamily()
	.success(function(response){
		$scope.employeefamilylist = response.configure_data;
		console.log($scope.employeefamilylist);
	}).error(function(response){
		console.log("Error in getting family list");
	});

}]);

materialAdmin.controller("addPastEmployeeController", ['$scope', 'Data', '$state', '$localStorage', function($scope, Data, $state, $localStorage){

	$scope.companyname = '';
	$scope.employeecode = '';
	$scope.title = '';
	$scope.role = '';
	$scope.sctr = '';
	$scope.jobtype = '';
	$scope.startdate = '';
	$scope.enddate = '';


	$scope.addPastEmployeeDetails = function(){
		var jsonData = {
			'companyname':$scope.companyname,
			'employeecode':$scope.employeecode,
			'title':$scope.title,
			'role':$scope.role,
			'sctr':$scope.sctr,
			'jobtype':$scope.jobtype,
			'startdate':$scope.startdate,
			'enddate':$scope.enddate,
			'empcode' : $localStorage.empcode
		}

		Data.addPastEmpDetails(jsonData)
		.success(function(response){
			console.log("Adding past employee details");
			$state.go($state.current, $state.params, { reload: true });
		}).error(function(response){
			console.log("Error in adding past employee details");
		});
	}


}]);


materialAdmin.controller("employeeEducationController", ['$scope', 'Data', '$state', '$localStorage', function($scope, Data, $state, $localStorage){

	$scope.educationlevel = '';
	$scope.course = '';
	$scope.specialization = '';
	$scope.institute = '';
	$scope.university = '';
	$scope.coursetype = '';
	$scope.result = '';
	$scope.percentage = '';
	$scope.startdate = '';
	$scope.enddate = '';

	$scope.addEducationDetails = function(){
		var jsonData = {
			'educationlevel' : $scope.educationlevel,
			'course' : $scope.course,
			'specialization' : $scope.specialization,
			'institute' : $scope.institute,
			'university' : $scope.university,
			'coursetype' : $scope.coursetype,
			'result' : $scope.result,
			'percentage' : $scope.percentage,
			'startdate' : $scope.startdate,
			'enddate' : $scope.enddate,
			'empcode' : $localStorage.empcode
		}

		console.log(jsonData);

		Data.addEducation(jsonData)
		.success(function(response){
			console.log("Adding employee education");
			$state.go($state.current, $state.params, { reload: true });
		}).error(function(response){
			console.log("Error in adding employee education");
		});

	}
	
}]);


materialAdmin.controller('employeeBankController', ['$scope', 'Data', '$state', '$localStorage', function($scope, Data, $state, $localStorage){

	$scope.bankname = '';
	$scope.holdername = '';
	$scope.accountnumber = '';
	$scope.accounttype = '';
	$scope.branchname = '';
	$scope.branchaddress = '';
	$scope.ifsc_code = '';
	$scope.salaryaccount = '';
	$scope.reimbursement_account = '';

	$scope.addBankDetails = function(){
		var jsonData = {
			'bankname' : $scope.bankname,
			'holdername' : $scope.holdername,
			'accountnumber' : $scope.accountnumber,
			'accounttype' : $scope.accounttype,
			'branchname' : $scope.branchname,
			'branchaddress' : $scope.branchaddress,
			'ifsc_code' : $scope.ifsc_code,
			'salaryaccount' : $scope.salaryaccount,
			'reimbursement_account' : $scope.reimbursement_account,
			'empcode' : $localStorage.empcode
		}

		console.log(jsonData);

		Data.addEmpBankDetails(jsonData)
		.success(function(response){
			console.log("Adding bank details");
			$state.go($state.current, $state.params, { reload: true });
		}).error(function(response){
			console.log("Error in adding bank details");
		});
	}

}]);



materialAdmin.controller('employeeIdController', ['$scope', 'Data', '$state', '$localStorage', function($scope, Data, $state, $localStorage){

	$scope.idtype = '';
	$scope.idunmber = '';
	$scope.documentname = '';
	$scope.issuedate = '';
	$scope.validtill = '';
	$scope.authority = '';
	$scope.issueplace = '';

	$scope.addEmployeeId = function(){
		var jsonData = {
			'idtype' : $scope.idtype,
			'idunmber' : $scope.idunmber,
			'documentname' : $scope.documentname,
			'issuedate' : $scope.issuedate,
			'validtill' : $scope.validtill,
			'authority' : $scope.authority,
			'issueplace' : $scope.issueplace,
			'empcode' : $localStorage.empcode
		}

		console.log(jsonData);

		Data.addEmpId(jsonData)
		.success(function(response){
			console.log("Adding employee id");
			$state.go($state.current, $state.params, { reload: true });
		}).error(function(response){
			console.log("Error in adding employee id");
		});
	}

}]);


materialAdmin.controller('employeeSalaryController', ['$scope', 'Data', '$state', '$localStorage', function($scope, Data, $state, $localStorage){

	// salary components form
	$scope.salarycomponent = '';

	// formulabased, free text form
	$scope.currency = '';
	$scope.paystructure = '';
	$scope.ctc = '';
	$scope.guaranteedctc = '';
	$scope.nonguaranteedctc = '';
	$scope.effectivedate = '';
	$scope.fbpassigned = '';

	// salary components form function
	$scope.salaryFunc = function(){
		$scope.salarycomponentstatus = $scope.salarycomponent;
	}

	// formula based form function
	$scope.formulaSalary = function(){
		var jsonData = {
			'currency' : $scope.currency,
			'paystructure' : $scope.paystructure,
			'ctc' : $scope.ctc,
			'guaranteedctc' : $scope.guaranteedctc,
			'nonguaranteedctc' : $scope.nonguaranteedctc,
			'effectivedate' : $scope.effectivedate,
			'fbpassigned' : $scope.fbpassigned,
			'empcode' : $localStorage.empcode
		}
		console.log(jsonData);

		Data.addSalary(jsonData)
		.success(function(response){
			console.log("Adding formula based salary");
			$state.go($state.current, $state.params, { reload: true });
		}).error(function(response){
			console.log("Error in adding formula based salary");
		});
	}

	$scope.textSalary = function(){
		var jsonData = {
			'currency' : $scope.currency,
			'paystructure' : $scope.paystructure,
			'ctc' : $scope.ctc,
			'guaranteedctc' : $scope.guaranteedctc,
			'nonguaranteedctc' : $scope.nonguaranteedctc,
			'effectivedate' : $scope.effectivedate,
			'fbpassigned' : $scope.fbpassigned,
			'empcode' : $localStorage.empcode
		}

		console.log(jsonData);

		Data.addSalary(jsonData)
		.success(function(response){
			console.log("Adding formula based salary");
			$state.go($state.current, $state.params, { reload: true });
		}).error(function(response){
			console.log("Error in adding formula based salary");
		});
	}


}]);

materialAdmin.controller("leaveController", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies){

 	$scope.logout = function(){
    
        AuthenticationService.ClearCredentials();
        $timeout(function () {
            $location.path('/');
        }, 1000);

        $localStorage.imgsrc = '';

    }


 	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;

 }]);

materialAdmin.controller("punchController", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage, $timeout, $location){

    $rootScope.img_src = $localStorage.imgsrc;

    $rootScope.logout = function(){
        $localStorage.imgsrc = '';
        AuthenticationService.ClearCredentials();
        $timeout(function () {
            $location.path('/');
        }, 1000);

	}
	
	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;

}]);




 materialAdmin.controller("attendanceController", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage){

 	$scope.logout = function(){
    
        AuthenticationService.ClearCredentials();
        $timeout(function () {
            $location.path('/');
        }, 1000);

        $localStorage.imgsrc = '';

    }


 	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;

    var empcode = $localStorage.empcode[0]['empCode'];

    var time = new Date();
    
    var punchtime = ("0" + time.getHours()).slice(-2)   + ":" + ("0" + time.getMinutes()).slice(-2);

    var month = time .getMonth() + 1;
    var day = time .getDate();
    var year = time .getFullYear();
    
    if(month.toString().length==1){
        month = '0'+month.toString();
    }

    if(day.toString().length==1){
        day = '0'+day.toString();
    }

    var punchdate =  month + "/" + day + "/" + year;

    // location map with city

    var cityaddress = '';


    Data.getAttendanceCheck(empcode)
    .success(function(response){
        console.log(response);
        $scope.attendance_data = response.Attendance_data;
        
    }).error(function(response){

    });


    // navigator.geolocation.getCurrentPosition(success, error);

        // function success(position) {
        //     // console.log(position.coords.latitude)
        //     // console.log(position.coords.longitude)

        //     var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';

        //     $.getJSON(GEOCODING).done(function(location) {
        //         // console.log(location.results[0]['formatted_address']);
                

        //         $scope.puncIn = function(){

        //             json_data = {
        //                 'empCode' : empcode,
        //                 'reportInTime': punchtime,
        //                 'reportInAddress' : '',
        //                 'inAddrInGeoFans': '',
        //                 'date': punchdate
        //             }

        //             Data.punchInTime(json_data)
        //             .success(function(response){
        //                 $state.go($state.current, $state.params, { reload: true });
        //             }).error(function(response){

        //             });
                    
        //         }

        //         $scope.punchOut = function(){

        //             json_data = {
        //                 'empCode' : empcode,
        //                 'reportOutTime': punchtime,
        //                 'reportOutAddress' : '',
        //                 'outAddrOutGeoFans': ''
        //             }

        //             Data.punchOutTime(json_data)
        //             .success(function(response){
        //                 $state.go($state.current, $state.params, { reload: true });
        //             }).error(function(response){

        //             });
                    
        //         }



        //     })

        // }

        // function error(err) {
        //     console.log(err)
        // }

        $scope.puncIn = function(){

                    json_data = {
                        'empCode' : empcode,
                        'reportInTime': punchtime,
                        'reportInAddress' : '',
                        'inAddrInGeoFans': '',
                        'date': punchdate
                    }

                    Data.punchInTime(json_data)
                    .success(function(response){
                        $state.go($state.current, $state.params, { reload: true });
                    }).error(function(response){

                    });
                    
                }

            $scope.punchOut = function(){

                    json_data = {
                        'empCode' : empcode,
                        'reportOutTime': punchtime,
                        'reportOutAddress' : '',
                        'outAddrOutGeoFans': ''
                    }

                    Data.punchOutTime(json_data)
                    .success(function(response){
                        $state.go($state.current, $state.params, { reload: true });
                    }).error(function(response){

                    });
                    
                }


    
 }]);

materialAdmin.controller("regularizeCtrl", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage){

    $scope.logout = function(){
    
        AuthenticationService.ClearCredentials();
        $timeout(function () {
            $location.path('/');
        }, 1000);

        $localStorage.imgsrc = '';

    }


    var empcode = $localStorage.empcode[0]['empCode'];

    Data.getRegularizeData(empcode)
    .success(function(response){
        
        $scope.regularizelist = response.regularize_data;
    }).error(function(response){

    });

    $scope.hidpopup = true;

    $scope.regAttendance = function(regcode){
        $scope.hidpopup = false;

        Data.regAttendPopup(regcode)
        .success(function(response){
            console.log(response.regularize_data);
            $scope.reglists = response.regularize_data;
        }).error(function(response){

        });
    }

    $scope.hidepopup = function(){
        $scope.hidpopup = true;
    }

 }]);

materialAdmin.controller("myattendanceCtrl", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', 'commonservice', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage, commonservice){

    $scope.logout = function(){
    
        AuthenticationService.ClearCredentials();
        $timeout(function () {
            $location.path('/');
        }, 1000);

        $localStorage.imgsrc = '';

	}

	var time = new Date();

	var month = time .getMonth() + 1;
    var day = time .getDate();
    var year = time .getFullYear();
    
    if(month.toString().length==1){
        month = '0'+month.toString();
    }

    if(day.toString().length==1){
        day = '0'+day.toString();
	}
	var lastDayOfMonth = new Date(time.getFullYear(), time.getMonth()+1, 0);

    var punchdate =  month + "/" + day + "/" + year;
	
	var startdate = month+"/"+"01"+"/"+year;
	var enddate = month+"/"+lastDayOfMonth.getDate()+"/"+year;

	var empcode = $localStorage.empcode[0]['empCode'];
	
	var json_data = {
		"empCode":empcode,
		"startDate":startdate,
		"endDate":punchdate		
	}

    Data.getAllAttendance(json_data)
    .success(function(response){
		$scope.attendancelist = response.attendance_data;
		console.log($scope.attendancelist);
    }).error(function(response){

	});

	$scope.autmaticdate = true;
	$scope.fromdate = '';
	$scope.todate = '';
	console.log($scope.autmaticdate);
	

	$scope.getDateStatus = function(){
		$scope.autmaticdate = false;
		var json_data = {
			"empCode":empcode,
			"startDate":$scope.fromdate,
			"endDate":$scope.todate		
		}

		Data.getAllAttendance(json_data)
		.success(function(response){
			$scope.attendancelist = response.attendance_data;
			console.log($scope.attendancelist);
		}).error(function(response){
	
		});

	}

	
	$scope.selectedList = {};
	$scope.createRegularization = function(){
		commonservice.setData($scope.selectedList);
		$state.go('photo-gallery.myregularization');
	}

    
 }]);


materialAdmin.controller('myregularizationCtrl', ['$scope', '$timeout', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', 'commonservice', function($scope, $timeout, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage, commonservice){
	// console.log(commonservice.getData());

	$scope.regulardata = [];
	$scope.datein = [];
	$scope.intime = [];
	$scope.outtime = [];
	$scope.message = [];

	angular.forEach(commonservice.getData(), function(value, key){
		console.log(key);
		$scope.regulardata.push(key);
	});

	$scope.showalert = false;
	
	
		$scope.submitRegularize = function(){
			// console.log($scope.timein+" "+$scope.datein+" "+$scope.timeout+" "+$scope.dateout);
			var i = 0;
			var listjsondata = [];
			angular.forEach(commonservice.getData(), function(value, key) {
				var json_data = {
					'empCode':$localStorage.empcode[0]['empCode'],
					'date':key,
					'reportInTime':$scope.intime[i],
					'reportOutTime':$scope.outtime[i],
					'remark':$scope.message[i]
				}
				
				listjsondata[i] =json_data;
				i++;
	
			});

			Data.postRegularize(listjsondata)
			.success(function(response){
			  $scope.showalert = true;
			   $scope.alertmessage = 'Successfully Submitted Request!!';
  
			   $timeout(function () {
				  $state.go('home');
			  }, 2000);
  
			}).error(function(response){
			  $scope.showalert = true;
			  $scope.alertmessage = 'something wrong!!';
  
			  $timeout(function () {
				  $state.go($state.current, $state.params, { reload: true });
			  }, 2000);
  
			});
		}

}]);



materialAdmin.filter("dateFilter", function() {
       return function datefilter(attendancelist, fromdate, todate) {
       var result = [];
       angular.forEach(attendancelist, function(value){
           if (Date.parse(value.date) > Date.parse(fromdate) && Date.parse(todate) > Date.parse(value.date))  {
               result.push(value);
            }
        });
        return result;
        };
	});
	
materialAdmin.controller("payCtrl", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', '$timeout', '$location', 'payDetails', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage, $timeout, $location, payDetails){

 	$rootScope.logout = function(){
    
        AuthenticationService.ClearCredentials();
        $timeout(function () {
            $location.path('/');
        }, 1000);

        $localStorage.imgsrc = '';

	}
	
	$rootScope.img_src = $localStorage.imgsrc;


	 $rootScope.logininfo = $cookies.getObject('globals').currentUser.id;
	 
	 $scope.empcode = $localStorage.empcode[0]['empCode'];

	$rootScope.paydetails = payDetails.data.pay_data[0];


 }]);



materialAdmin.controller("payrollController", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage){

 	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;

 }]);

 materialAdmin.controller("salaryController", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', 'empDetailsList', '$timeout', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage, empDetailsList, $timeout){

	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;

	var select = document.getElementById("empcodelist");

	$scope.overlay = false;

	$scope.full_basic = "0.00";
	$scope.full_hra = "0.00";
	$scope.full_conv = "0.00";
	$scope.full_da = "0.00";
	$scope.full_sp_all = "0.00";
	$scope.m_ctc = "0.00";
	$scope.a_ctc = "0.00";
	$scope.midic_mo_ent = "0.00";

	var emplist = empDetailsList.data.configure_data;
	angular.forEach(emplist, function(value, key){
		var option = document.createElement("option");
		option.text = value.empCode;
		option.value = value.empCode;
		select.appendChild(option);
	});

	$scope.changeFun = function(){
		Data.getsalaryDetail($scope.selecteditem)
		.success(function(response){
			if(response.emp_data[0]){
				$scope.empname = response.emp_data[0]['name'];
				$scope.joiningdate = response.emp_data[0]['dateOfJoining'];
				$scope.designation = response.emp_data[0]['designation'];
				$scope.salary = response.emp_data[0]['Salary'];

				$scope.full_conv = "1,600.00";
				$scope.midic_mo_ent = "1,250.00";
			}else{
				$scope.empname = '';
				$scope.joiningdate = '';
				$scope.designation = '';
				$scope.salary = '';

				$scope.full_basic = "0.00";
				$scope.full_hra = "0.00";
				$scope.full_conv = "0.00";
				$scope.full_da = "0.00";
				$scope.full_sp_all = "0.00";
				$scope.m_ctc = "0.00";
				$scope.a_ctc = "0.00";
				$scope.midic_mo_ent = "0.00";
			}
		}).error(function(){

		});
	}

	$scope.changeSalary = function(){
		$scope.full_basic = parseInt($scope.salary * 0.0333);
		$scope.full_hra = parseInt($scope.salary * 0.0133);
		$scope.full_conv = 1600.00;
		$scope.full_da =  ($scope.full_basic+$scope.full_hra)-$scope.full_conv;
		$scope.full_sp_all = 0;
		$scope.m_ctc = $scope.salary/12;
		$scope.a_ctc = "0.00";
		$scope.midic_mo_ent = 1250;
	}

	$scope.saveSalary = function(){
		if($scope.selecteditem){
			var json_data = {
				"empCode":$scope.selecteditem,
				"basic":$scope.full_basic,
				"houseRent":"1200",
				"netSalary":$scope.m_ctc,
				"cca":$scope.full_da,
				"fullDA":$scope.full_da,
				"specialAllowance":$scope.full_sp_all,
				"monthlyCtc":$scope.m_ctc,
				"annualCtc":$scope.salary,
				"medical":$scope.midic_mo_ent,
				"effectiveForm":$scope.effectivedate,
				"payoutMonth":$scope.paymonth,
				"remarks":$scope.remarks
			}
			Data.saveSalary(json_data)
			.success(function(response){
				$scope.overlay = true;
				$scope.omsg = "successfully claimed";
				$timeout(function(){
					$scope.overlay = false;
				},2000);
				
			}).error(function(response){
				$scope.overlay = true;
				$scope.omsg = "Something is wrong!!"
				$timeout(function(){
					$scope.overlay = false;
				},2000);
			});
		}else{
			alert('please input employee code');
		}
	}


}]);

materialAdmin.controller("ctcclaimCtrl", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', 'claimData', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage, claimData){

	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;

	
		$scope.tasklist = claimData.data.emp_data;

		var length=$scope.tasklist.length;
		var dataArray=[];
		
		
		for (var i=0; i<length; i++) {
				dataArray.push(['<input class="selectemp" type="checkbox" value="'+$scope.tasklist[i]['empCode']+'">',$scope.tasklist[i]['empCode'], $scope.tasklist[i]['name'], $scope.tasklist[i]['revisedSalary'], $scope.tasklist[i]['effectiveForm'], $scope.tasklist[i]['PayoutDate'], $scope.tasklist[i]['payoutMonth'], $scope.tasklist[i]['Status']]);
		} 
		
		$('.form_content_inner').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-striped" id="vehicle-table" style="font-size: 12px;"><\/table>' );
		
		$('#vehicle-table').dataTable( {
			"data": dataArray,
			 "colReorder": true,
			//  "buttons": ['copy', 'excel', 'pdf','colvis',],
			 "dom": 'Blfrtip',
			 "lengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]],
			 "responsive": true,
			"columns": [
				{ "title": "Select" },
				{ "title": "empCode" },
				{ "title": "name"},
				{ "title": "revisedSalary"},
				{ "title": "effectiveFrom"},
				{ "title": "payoutDate" },
				{ "title": "payoutMonth" },
				{ 'title': "status"}
			]
		});

	var selectedemp = [];
	
	$('.selectemp').on("change", function(){
		selectedemp.push(this.value);
	});

	$scope.approveSalary = function(){
		console.log(selectedemp);
	}


}]);

materialAdmin.controller("fbpCtrl", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', 'fbpDetails', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage, fbpDetails){

	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;

	$scope.fbpdetails = fbpDetails.data.fbp_data;

	console.log($scope.fbpdetails);

}]);

materialAdmin.controller("investCtrl", ['$scope', '$rootScope', 'Data', '$state', '$stateParams', 'AuthenticationService', '$cookies', '$localStorage', 'taxdata', function($scope, $rootScope, Data, $state, $stateParams, AuthenticationService, $cookies, $localStorage, taxdata){

	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;

	$scope.taxdata = taxdata.data.tax_data;

	console.log($scope.taxdata);

}]);

materialAdmin.controller('reportCtrl', ['$scope', '$cookies', '$rootScope', '$localStorage', 'Data', 'AuthenticationService', '$state', '$location', '$timeout', function($scope, $cookies, $rootScope, $localStorage, Data, AuthenticationService, $state, $location, $timeout){
	
	$rootScope.logininfo = $cookies.getObject('globals').currentUser.id;
	
	$rootScope.employeeCode = $localStorage.empcode[0]['empCode'];
	
		// console.log($localStorage.empcode[0]['empCode']);
		
	$scope.imgsrc = $localStorage.imgsrc;
	$rootScope.img_src = $localStorage.imgsrc;

		
	}]);

materialAdmin.controller('payreportCtrl', ['$scope', '$cookies', '$rootScope', '$localStorage', 'Data', 'AuthenticationService', '$state', '$location', '$timeout', function($scope, $cookies, $rootScope, $localStorage, Data, AuthenticationService, $state, $location, $timeout){

	$scope.overlay = true;
	$scope.paytable = false;

	function daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	}

	var dt = new Date();
	
	

	// $scope.months = '';
	$scope.selectMonth = function(months){
		$scope.overlay = false;
		$scope.paytable = true;
		
		var days = daysInMonth(months, dt.getFullYear());
		
		Data.getpayrollattendance(months)
		.success(function(response){
			$scope.tasklist = response.attendance_data;

			var length=$scope.tasklist.length;
			var dataArray=[];
			
			
			for (var i=0; i<length; i++) {

					dataArray.push([$scope.tasklist[i]['empCode'], days, $scope.tasklist[i]['presentDay'], $scope.tasklist[i]['takenCI'], $scope.tasklist[i]['takenPI'], $scope.tasklist[i]['takenSI']]);
			} 
			
			$('.reportcontent').html('<table cellpadding="0" cellspacing="0" border="0" class="display table table-striped" id="vehicle-table" style="font-size: 12px;"><\/table>' );
			
			$('#vehicle-table').dataTable( {
				"data": dataArray,
				"colReorder": true,
				"buttons": ['copy', 'excel', 'pdf','colvis',],
				"dom": 'Blfrtip',
				"lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],

				"responsive": true,
				"columns": [
					{ "title": "empCode" },
					{ "title": "WorkingDays" },
					{ "title": "PresentDay" },
					{ 'title': "CL"},
					{ "title": "PL" },
					{ 'title': "SL"}
				]
			});

		}).error(function(response){

		});
	}

	
}]);

materialAdmin.controller('salaryreportCtrl', ['$scope', '$cookies', '$rootScope', '$localStorage', 'Data', 'AuthenticationService', '$state', '$location', '$timeout', function($scope, $cookies, $rootScope, $localStorage, Data, AuthenticationService, $state, $location, $timeout){

	$scope.overlay = true;
	$scope.paytable = false;

	function daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	}

	var dt = new Date();
	
	

	// $scope.months = '';
	$scope.selectMonth = function(months){
		$scope.overlay = false;
		$scope.paytable = true;
		
		var days = daysInMonth(months, dt.getFullYear());
		
		Data.getsalaryReport(months)
		.success(function(response){
			$scope.tasklist = response.salary_data;

			var length=$scope.tasklist.length;
			var dataArray=[];
			
			
			for (var i=0; i<length; i++) {

					dataArray.push([$scope.tasklist[i]['empCode'], $scope.tasklist[i]['ctc'], $scope.tasklist[i]['netSalary'], $scope.tasklist[i]['bonus'], $scope.tasklist[i]['basic'], $scope.tasklist[i]['cca'], $scope.tasklist[i]['Accurate'], $scope.tasklist[i]['houseRent'], $scope.tasklist[i]['medical'], days, $scope.tasklist[i]['PresentDay'], $scope.tasklist[i]['takenCl'], $scope.tasklist[i]['takenPI'], $scope.tasklist[i]['takenSI']]);
			} 
			
			$('.reportcontent').html('<table cellpadding="0" cellspacing="0" width="100%" border="0" class="display table table-striped" id="vehicle-table" style="font-size: 12px;"><\/table>' );
			
			$('#vehicle-table').dataTable( {
				"scrollX": true,
				"data": dataArray,
				"colReorder": true,
				"buttons": ['copy', 'excel', 'pdf','colvis',],
				"dom": 'Blfrtip',
				"lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
				"responsive": true,
				"columns": [
					{ "title": "empCode" },
					{ "title": "ctc" },
					{ "title": "netSalary" },
					{ "title": "bonus" },
					{ "title": "basic" },
					{ "title": "cca" },
					{ "title": "accurate" },
					{ "title": "houserent" },
					{ "title": "medical" },
					{ "title": "WorkingDays" },
					{ "title": "PresentDay" },
					{ 'title': "CL"},
					{ "title": "PL" },
					{ 'title': "SL"}
				]
			});

		}).error(function(response){

		});
	}

	
}]);

