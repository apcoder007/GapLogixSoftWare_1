$(document).ready(function() {
	var defaultCountry = new XMLHttpRequest();
	defaultCountry.open("GET", "https://gapapi-100.appspot.com/api/main/country/", false);
	defaultCountry.setRequestHeader("Content-type", "application/json");
	defaultCountry.send();
	defaultCountrydata = JSON.parse(defaultCountry.responseText);
	var countrydata = defaultCountrydata.country_lst;
	var statedata = defaultCountrydata.state_lst;
	var citydata = defaultCountrydata.city_db;
	// console.log(countrydata);
	var perm_country = $("#country");
	$.each(countrydata, function(index, value) {
		var optinons = new Option(value['country_name']);
		optinons.setAttribute('value', value['id']);
		optinons.setAttribute('label', value['country_name']);
		perm_country.append(optinons);
	});
	var perm_state = $("#state");
	$.each(statedata, function(index, value) {
		var optinons = new Option(value['state']);
		optinons.setAttribute('value', value['id']);
		optinons.setAttribute('label', value['state']);
		perm_state.append(optinons);
	});
	var perm_city = $("#city");
	$.each(citydata, function(index, value) {
		var optinons = new Option(value['cityName']);
		optinons.setAttribute('value', value['cityId']);
		optinons.setAttribute('label', value['cityName']);
		perm_city.append(optinons);
	});
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://gapapi-100.appspot.com/api/get/organisation/info", false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
	orgdata = JSON.parse(xhttp.responseText).organisation_data;
	$("#organisationname").val(orgdata[0]['organisationname']);
	$("#website").val(orgdata[0]['website']);
	$("#org_startdate").val(orgdata[0]['org_startdate']);
	$("#totalemployees option").filter(function() {
		return $(this).val() == orgdata[0]['totalemployees'];
	}).attr('selected', true);
	$("#phonenumber").val(orgdata[0]['phonenumber']);
	$("#secondaryphone").val(orgdata[0]['secondaryphone']);
	$("#faxnumber").val(orgdata[0]['faxnumber']);
	$("#address1").val(orgdata[0]['address1']);
	$("#address2").val(orgdata[0]['address2']);
	$("#address3").val(orgdata[0]['address3']);
	$("#orgdescription").val(orgdata[0]['orgdescription']);
	$("#country option").filter(function() {
		return $(this).val() == orgdata[0]['country'];
	}).attr('selected', true);
	$("#state option").filter(function() {
		return $(this).val() == orgdata[0]['state'];
	}).attr('selected', true);
	$("#city option").filter(function() {
		return $(this).val() == orgdata[0]['city'];
	}).attr('selected', true);
	// var orgSubmit = function(){
	// 	alert("jgkjh");
	// 	var orgname = $("#organisationname").val();
	// 	var web = $("#website").val();
	// 	var orgdate = $("#org_startdate").val();
	// 	var totalemp = $("#totalemployees").val();
	// 	var ppn = $("#phonenumber").val();
	// 	var spn = $("#secondaryphone").val();
	// 	var faxno = $("#faxnumber").val();
	// 	var country = $("#country").val();
	// 	var state = $("#state").val();
	// 	var city = $("#city").val();
	// 	var address1 = $("#address1").val();
	// 	var address2 = $("#address2").val();
	// 	var address3 = $("#address3").val();
	// 	var orgdescription = $("#orgdescription").val();
	// 	var dom = $("#domain").val();
	// 	console.log(orgname);
	// 	console.log(web);
	// 	console.log(orgdate);
	// 	console.log(totalemp);
	// 	console.log(ppn);
	// 	console.log(spn);
	// 	console.log(faxno);
	// 	console.log(country);
	// 	console.log(state);
	// 	console.log(city);
	// 	console.log(address1);
	// 	console.log(address2);
	// 	console.log(address3);
	// 	console.log(orgdescription);
	// 	console.log(dom);
	// };
});
// $(window).load(function(){
// });
// var function = onSubmitForm(){
// }
;
(function($) {
	// DOM Ready
	$(function() {
		// Binding a click event
		// From jQuery v.1.7.0 use .on() instead of .bind()
		$('.step_form').bind('submit', function(e) {
			// Prevents the default action to be triggered. 
			e.preventDefault();
			var returndata = '';
			var orgname = $("#organisationname").val();
			var web = $("#website").val();
			var orgdate = $("#org_startdate").val();
			var totalemp = $("#totalemployees").val();
			var ppn = $("#phonenumber").val();
			var spn = $("#secondaryphone").val();
			var faxno = $("#faxnumber").val();
			var country = $("#country").val();
			var state = $("#state").val();
			var city = $("#city").val();
			var address1 = $("#address1").val();
			var address2 = $("#address2").val();
			var address3 = $("#address3").val();
			var orgdescription = $("#orgdescription").val();
			var files = $("#file-input")[0].files[0];
			var dom = $("#domain").val();
			var webdomain = dom.join();
			var sendData = {
				'organisationName': orgname,
				'domain': webdomain,
				'website': web,
				'orgdescription': orgdescription,
				'totalEmployeeId': totalemp,
				'orgStartDate': orgdate,
				'phoneNumber': ppn,
				'secondaryPhone': spn,
				'faxNumber': faxno,
				'countryId': country,
				'stateId': state,
				'cityId': city,
				'address_1st': address1,
				'address_2nd': address2,
				'address_3rd': address3,
				'description': '',
				'designation': ''
			}
			console.log(sendData);
			console.log(orgname);
			console.log(web);
			console.log(orgdate);
			console.log(totalemp);
			console.log(ppn);
			console.log(spn);
			console.log(faxno);
			console.log(country);
			console.log(state);
			console.log(city);
			console.log(address1);
			console.log(address2);
			console.log(address3);
			console.log(orgdescription);
			console.log(webdomain);
			var imagepath = 'Logo';
			if (files) {
				var filename = files.name;
				var fdata = new FormData();
				fdata.append('file', files);
				fdata.append('path', imagepath);
				$.ajax({
					url: 'https://gapapi-100.appspot.com/api/logo/upload/',
					data: fdata,
					enctype: 'multipart/form-data',
					processData: false, // do not process the data as url encoded params
					contentType: false, // by default jQuery sets this to urlencoded string
					type: 'POST',
					success: function(data) {
						alert(data);
					}
				});
			} else {
				console.log("no files");
			}
			var xhttp = new XMLHttpRequest();
			xhttp.open("POST", "https://gapapi-100.appspot.com/api/update/org/info/", false);
			xhttp.setRequestHeader("Content-type", "application/json");
			xhttp.send(JSON.stringify(sendData));
			returndata = JSON.parse(xhttp.responseText).success;
			if (returndata) {
				// Triggering bPopup when click event is fired
				$('#element_to_pop_up').bPopup({
					easing: 'easeOutBack', //uses jQuery easing plugin
		            speed: 450,
		            transition: 'slideDown'
		            //autoClose: 2000
				});
			}
		});
	});
})(jQuery);