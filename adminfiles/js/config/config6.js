function configData(){
	var empcode = document.getElementById('employee_code').value;
	var currency = document.getElementById('currencyname').value;
	var dateformat = document.getElementById('dateformatid').value;
	var timeformat = document.getElementById('timeformatid').value;
	var timezone = document.getElementById('timezoneid').value;
	var country = document.getElementById('perm_country').value;
	var state = document.getElementById('perm_state').value;
	var city = document.getElementById('perm_city').value;
	var password = document.getElementById('passwordid').value;
	var workcode = document.getElementById('workcodename').value;
	// alert(empcode+" "+dateformat+" "+currency+" "+timeformat+" "+country+" "+state+" "+city+" "
	// 	+" "+timezone+" "+password);
	//return window.location.reload();


	var sendData = {
		"employeeCode":empcode,
		"dateformatId":dateformat,
		"timeformatId":timeformat,
		"timezoneId":timezone,
		"currencyId":currency,
		"stateId":state,
		"cityId":city,
		"oldempCode":"PTL",
		"passwordId":password,
		"countryId":country
	};


	 
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://gapapi-100.appspot.com/api/configure/update/", false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(JSON.stringify(sendData));
	returndata = JSON.parse(xhttp.responseText);
	result = empl.datasets;
}



