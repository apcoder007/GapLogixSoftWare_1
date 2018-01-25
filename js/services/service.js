materialAdmin.service("Data", function($http, $localStorage){
	
	// this.submitLogin = function(username, password){
	// 	var json_data = {
	// 		'username':username,
	// 		'password' : password
	// 	}
	// 	return $http({
	// 		method:'POST',
	// 		data:json_data,
	// 		url:'https://gapapi-100.appspot.com/api/post/login/'
	// 	});
	// }

	this.resetPassword = function(empcode, pass){
		var json_data = {
			'empCode' : empcode,
			'password' : pass
		}

		return $http({
			method:'POST',
			data: json_data,
			url : 'https://gapapi-100.appspot.com/api/user/forgot/'
		});
	}

	this.getBirthDay = function(){
		return $http({
			method:'post',
			url:'https://gapapi-100.appspot.com/api/birthday/deatils/'
		});
	}

	this.getImageUrl = function(empcode){
		var json_data = {
			'empCode' : empcode
		}


		return $http({
			method:'POST',
			data : json_data,
			url: 'https://gapapi-100.appspot.com/api/get/profile/image/'
		});
	}

	this.updateImageUrl = function(empcode, imagename){
		var json_data = {
			'empCode': empcode,
			'image_name':imagename
		}

		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/save/image/info/'
		});
	}
	this.uploadImage = function(files){
		var form_data = new FormData();
    	form_data.append('file', files[0]);
		
		
		return $http({
			method:'POST',
			data:form_data,
			headers:{
				'Content-Type': undefined
			},
			transformRequest:angular.identity, 
			url:'https://gapapi-100.appspot.com/api/profile/upload/'
		});
	}

	this.empList = function(){
		return $http({
			method:'GET',
			url : 'https://gapapi-100.appspot.com/api/get/employee/list/'
		}).success(function(response){
			return response.configure_data;
		}).error(function(response){
			console.log("Error in getting countrylist");
		});
	}

	this.l1Manager = function(){
		return $http({
			method:'GET',
			url:'https://gapapi-100.appspot.com/api/get/lmanager1/list/'
		}).success(function(response){
			return response.configure_data;
		}).error(function(response){

		});
	}

	this.l2Manager = function(){
		return $http({
			method:'GET',
			url:'https://gapapi-100.appspot.com/api/get/lmanager2/list/'
		}).success(function(response){
			return response.configure_data;
		}).error(function(response){

		});
	}

	this.hrManager = function(){
		return $http({
			method:'GET',
			url:'https://gapapi-100.appspot.com/api/get/hrmanager/list/'
		}).success(function(response){
			return response.configure_data;
		}).error(function(response){

		});
	}

	this.Designation = function(){
		return $http({
			method:'GET',
			url:'https://gapapi-100.appspot.com/api/get/designation/list/'
		}).success(function(response){
			return response.configure_data;
		}).error(function(response){

		});
	}


	this.addEmp = function(json_data){
		return $http({
			method:'POST',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/add/employee/'
		});
	}

	this.addContact = function(json_data){
		return $http({
			method:'POST',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/add/contact/'
		});
	}

	this.addEmegencyContact = function(json_data){
		return $http({
			method:'POST',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/add/emergencycontact/'
		});
	}

	this.addEmployeeFamily = function(json_data){
		return $http({
			method:'POST',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/add/family/'
		});
	}

	this.addPastEmpDetails = function(json_data){
		return $http({
			method:'POST',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/add/pastemployee/details/'
		});
	}

	this.addEducation = function(json_data){
		return $http({
			method:'POST',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/add/employee/education/'
		});
	}

	this.addEmpBankDetails = function(json_data){
		return $http({
			method:'POST',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/add/employee/bank/'
		});
	}

	this.addEmpId = function(json_data){
		return $http({
			method:'POST',
			data:json_data,
			url: 'https://gapapi-100.appspot.com/api/add/employee/id/'
		});
	}

	this.addSalary = function(json_data){
		return $http({
			method:'POST',
			data:json_data,
			url: 'https://gapapi-100.appspot.com/api/add/employee/salary/'
		});
	}

	this.getAllContact= function(){
		return $http({
			method:'GET',
			url:'https://gapapi-100.appspot.com/api/get/employee/contact/'
		});
	}

	this.getAllEmergencyContact = function(){
		return $http({
			method:'GET',
			url : 'https://gapapi-100.appspot.com/api/get/employee/emergency/contact/'
		});
	}

	this.getAllEmployeeFamily = function(){
		return $http({
			method:'GET',
			url:'https://gapapi-100.appspot.com/api/get/employee/family/'
		});
	}

	this.getBasicInformation = function(empid){
		var json_data = {
			'empCode' : empid 
		}
		return $http({
			method:'POST',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/employee/basicinfo/'
		});
	}

	// https://gapapi-100.appspot.com/api/employee/basicinfo/

	this.getContactInfo = function(empid){
		var json_data = {
			'empCode' : empid 
		}
		return $http({
			method:'POST',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/employee/contactinfo/'
		});
	}

	this.getEmergencyContactInfo = function(empid){
		var json_data = {
			'empcode' : empid 
		}
		return $http({
			method:'POST',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/employee/emergency/contactinfo/'
		});
	}

	this.getPositionInfo = function(empid){
		var json_data = {
			'empCode' : empid 
		}
        console.log(json_data);
		return $http({
			method:'POST',
			data:json_data,
			// url:'https://gapapi-100.appspot.com/api/post/positioninfo/'
            url: 'https://gapapi-100.appspot.com/api/post/position/details'
		});
	}

	this.getFamilyInfo = function(empid){
		var json_data = {
			'empcode' : empid 
		}
		return $http({
			method:'POST',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/employee/familyinfo/'
		});
	}

	this.getAttendanceCheck = function(empcode){
        json_data = {
            'empCode' : empcode
        }

        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/check/attendance/'
        });
    }

    this.punchInTime = function(json_data){

        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/attendance/punchin/'
        });
    }

    this.punchOutTime = function(json_data){

        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/attendance/punchout/'
        });
    }

    this.getpastEmpDetails = function(empcode){
    	var json_data = {
    		'empCode':empcode
    	}

    	return $http({
    		method:'post',
    		data:json_data,
    		url:'https://gapapi-100.appspot.com/api/past/employeeinfo/'
    	});
    }

    this.getEducationDetails = function(empcode){
    	var json_data = {
    		'empCode':empcode
    	}

    	return $http({
    		method:'post',
    		data:json_data,
    		url:'https://gapapi-100.appspot.com/api/basic/educationinfo/'
    	});
    }

    this.getBankDetails = function(empcode){
    	var json_data = {
    		'empCode':empcode
    	}

    	return $http({
    		method:'post',
    		data:json_data,
    		url:'https://gapapi-100.appspot.com/api/basic/bankinfo/'
    	});
    }

    this.getidDetails = function(empcode){
    	var json_data = {
    		'empCode':empcode
    	}

    	return $http({
    		method:'post',
    		data:json_data,
    		url:' https://gapapi-100.appspot.com/api/basic/Idinfo/'
    	});
    }

    this.getRegularizeData = function(empcode){
    	var json_data = {
    		'empCode':empcode
    	}

    	return $http({
    		method:'post',
    		data:json_data,
    		url:'https://gapapi-100.appspot.com/api/post/regularinfo/'
    	});
    }

    this.regAttendPopup = function(regcode){
    	var json_data = {
    		'regularizationCode':regcode
    	}

    	return $http({
    		method:'post',
    		data:json_data,
    		url:'https://gapapi-100.appspot.com/api/attendance/regularinfo/'
    	});
    }

    this.getAllAttendance = function(json_data){
    	

    	return $http({
    		method:'post',
    		data:json_data,
    		url:'https://gapapi-100.appspot.com/api/employee/attendance/'
    	});
    }

    this.updateBasicInformation1 = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/employeeData/update/'
        });
    }

    this.updateBasicInformation2 = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/employeeContact/update/'
        });
    }

    this.updateBasicInformation3 = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/employeeId/update/'
        });
    }

    this.updatepositionInformation = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/positionInfo/update/'
        });
	}
	
	this.updatepositionInformation1 = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/positionInfo/sec/update/'
        });
	}
	
	this.updatepositionInformation2 = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/positionInfo/third/update/'
        });
	}
	
	this.updateContactInformation = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/employee/contact/update/'
        });
	}
	
	this.updateContactInformation1 = function(json_data){
        return $http({
            method:'post',
            data:json_data,
            url:'https://gapapi-100.appspot.com/api/employee/sec/contact/update/'
        });
	}
	
	this.updateEmargencyContactInfo = function(json_data){
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/employee/emergency/contact/update/'
		});
	}

	this.updateFamilyInfo = function(json_data){
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/employee/family/update/'
		});
	}

	this.updateFamilyInfo1 = function(json_data){
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/employee/sec/family/update/'
		});
	}

	this.updateIdInformation = function(json_data){
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/update/Id/'
		});
	}

	this.updateBankInformation = function(json_data){
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/update/bank_data/'
		});
	}

	this.updateEducationInformation = function(json_data){
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/update/educationdata/'
		});
	}

	this.updatePersonalInformation = function(json_data){
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/past/employee/'
		});
	}

	this.postRegularize = function(json_data){
		var j_data = {
			'data':json_data
		}
		
		return $http({
			method:'post',
			data:j_data,
			url:'https://gapapi-100.appspot.com/api/regularise/attendance/app/'
		});

	}

	this.getAllTask = function(empcode){
		var json_data = {
			'empCode':empcode
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/task/requestinfo/'
		});
	}

	this.getTaskDetails = function(id){
		var json_data = {
			'taskCode':id
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/task/request/details/'
		});
	}

	this.ApproveTask = function(id){
		var json_data = {
			'taskCode':id
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/update/taskRequest/'
		});
	}

	this.CancelTask = function(id){
		var json_data = {
			'taskCode':id
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/cancel/taskRequest/'
		});
	}

	this.WithdrawTask = function(id){
		var json_data = {
			'taskCode':id
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/withdraw/leave/'
		});
	}

	this.RetryTask = function(id){
		var json_data = {
			'taskCode':id
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/resubmit/leave/'
		});
	}

	this.ApplyLeave = function(json_data){
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/add/leave/request/'
		})
	}

	this.getLeaveDetails = function(empcode){
		var json_data = {
			'empCode':empcode
		}
		return $http({
			method:'post',
			data:json_data,
			url:' https://gapapi-100.appspot.com/api/leave/requestinfo/'
		});
	}

	this.ResubmitReimburse = function(json_data){
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/resubmit/Reimbursment/'
		});
	}

	this.WithDrawReimburse = function(id){
		var json_data = {
			'taskCode':id
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/withdraw/Reimbursment/'
		});
	}

	this.getEmpWithImageList = function(){
        return $http({
            method:'get',
            url:'https://gapapi-100.appspot.com/api/get/employee/imagelist/'
        }).success(function(response){
            return response.configure_data;
        }).error(function(response){
            
        });
	}
	
	this.getTravelExpense = function(){
		var json_data = {
			'empCode':$localStorage.empcode[0]['empCode']
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/get/tripImage/'
		});
	}

	this.getLocation = function(lat,long){
		return $http({
			method:'get',
			url:'https://locationapi-100.appspot.com/location/reverse?lat='+lat+'&lon='+long
		}).success(function(response){
			return response.response;
		}).error(function(response){

		});
	}

	this.updateTravel = function(json_data){
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/request/update/trip/'
		});
	}

	this.getPayDeatils = function(){
		var json_data = {
			'empCode':$localStorage.empcode[0]['empCode']
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/employee/payslip/'
		}).success(function(response){
			return response;
		}).error(function(response){

		})
	}

	this.getFbpDetails = function(){
		var json_data = {
			'empCode':$localStorage.empcode[0]['empCode']
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/fbp/planeer/'
		}).success(function(response){
			return response;
		}).error(function(response){
			
		})
	}

	this.getTaxData = function(){
		var json_data = {
			'empCode':$localStorage.empcode[0]['empCode']
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/tax/declair/'
		}).success(function(response){
			return response;
		}).error(function(response){
			
		})
	}

	this.getpayrollattendance = function(month){
		var json_data = {
			'month':month
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/pyroll/attendance/'
		});
	}

	this.getsalaryReport = function(month){
		var json_data = {
			'month':month
		}
		return $http({
			method:'post',
			data:json_data,
			url:' https://gapapi-100.appspot.com/api/payroll/salary/'
		});
	}

	this.getsalaryDetail = function(empcode){
		var json_data = {
			'empCode':empcode
		}
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/payroll/empInfo/'
		});
	}

	this.saveSalary = function(json_data){
		return $http({
			method:'post',
			data:json_data,
			url:'https://gapapi-100.appspot.com/api/update/employee/salary/'
		});
	}

	this.ctcclaimData = function(){
		 return $http({
			method:'post',
			url:'https://gapapi-100.appspot.com/api/payroll/revisedSalary/'
		}).success(function(response){
			return response.emp_data;
		}).error(function(response){

		})
	}

});








(function () {
    'use strict';
 
    angular
        .module('materialAdmin')
        .factory('AuthenticationService', AuthenticationService);
 
    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout) {
        var service = {};
 
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
 
        return service;
 
        function Login(username, password, callback) {
 
             var json_data = {
				'username':username,
				'password' : password
			}

            $http.post('https://gapapi-100.appspot.com/api/post/login/', { json_data })
               .success(function (response) {
                   callback(response);
               });
 
        }
 
        function SetCredentials(username, password, id) {
            var authdata = Base64.encode(username + ':' + password);
 
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    id: id,
                    authdata: authdata
                },
                loggedIn : 1
            };
 
            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
 
            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 1);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        }
 
        function ClearCredentials() {
        	var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 1);
            $rootScope.globals = {loggedIn : 0};
            $cookies.remove('globals');
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
            // $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }
 
    // Base64 encoding service used by AuthenticationService
    var Base64 = {
 
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
 
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
})();