$(document).ready(function(){

  var listarea = $("#perm_country");

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://gapapi-100.appspot.com/api/country/details/", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  empl = JSON.parse(xhttp.responseText);
  employee = empl.country_data;

  $.each(employee, function(index, value) {
    var optinons = new Option(value['country_name']);
    optinons.setAttribute('value', value['id']);
    optinons.setAttribute('label', value['country_name']);
    listarea.append(optinons);
  });


  var employee_code = $("#employee_code");

  var defaulthttp = new XMLHttpRequest();
  defaulthttp.open("GET", "https://gapapi-100.appspot.com/api/main/identity/", false);
  defaulthttp.setRequestHeader("Content-type", "application/json");
  defaulthttp.send();
  defaultdata = JSON.parse(defaulthttp.responseText);
  idata = defaultdata.identity_data;
  // console.log(idata[0]['employee_code']);
  employee_code.val(idata[0]['employee_code']);


  var defaultCountry = new XMLHttpRequest();
  defaultCountry.open("GET", "https://gapapi-100.appspot.com/api/main/country/", false);
  defaultCountry.setRequestHeader("Content-type", "application/json");
  defaultCountry.send();
  defaultCountrydata = JSON.parse(defaultCountry.responseText);

  var countrydata = defaultCountrydata.identity_data;
  var statedata = defaultCountrydata.state_lst;
  var citydata = defaultCountrydata.city_db;
 
  var perm_state = $("#perm_state");
  $.each(statedata, function(index, value) {
    var optinons = new Option(value['state']);
    optinons.setAttribute('value', value['id']);
    optinons.setAttribute('label', value['state']);
    perm_state.append(optinons);
  });

  var perm_city = $("#perm_city");
  $.each(citydata, function(index, value) {
    var optinons = new Option(value['cityName']);
    optinons.setAttribute('value', value['cityId']);
    optinons.setAttribute('label', value['cityName']);
    perm_city.append(optinons);
  });
  
  
  $("#perm_country option").filter(function() {
      //may want to use $.trim in here
      return $(this).val() == countrydata[0]['country']; 
  }).attr('selected', true);

  $("#perm_state option").filter(function() {
      //may want to use $.trim in here
      return $(this).val() == countrydata[0]['state']; 
  }).attr('selected', true);

  $("#perm_city option").filter(function() {
      //may want to use $.trim in here
      return $(this).val() == countrydata[0]['city']; 
  }).attr('selected', true);


  var confighttp = new XMLHttpRequest();
  confighttp.open("GET", "https://gapapi-100.appspot.com/api/site/configuration/", false);
  confighttp.setRequestHeader("Content-type", "application/json");
  confighttp.send();
  configdata = JSON.parse(confighttp.responseText).configure_data;

  $("#currencyname option").filter(function(){
    return $(this).val()==configdata[0]['currencyid'];
  }).attr('selected', true);

  $("#dateformatid option").filter(function(){
    return $(this).val()==configdata[0]['dateformatid'];
  }).attr('selected', true);

  $("#timeformatid option").filter(function(){
    return $(this).val()==configdata[0]['timeformatid'];
  }).attr('selected', true);

  $("#timezoneid option").filter(function(){
    return $(this).val()==configdata[0]['timezoneid'];
  }).attr('selected', true);

  $("#passwordid option").filter(function(){
    return $(this).val()==configdata[0]['passwordid'];
  }).attr('selected', true);

  });









// $(window).load(function(){
//   var country = document.getElementById('perm_country').value;
 
//   var sendData = {
//     "countryId":country
//   };

//   var listarea = $("#perm_state");

//   var xhttp = new XMLHttpRequest();
//   xhttp.open("POST", "https://gapapi-100.appspot.com/api/country/states/", false);
//   xhttp.setRequestHeader("Content-type", "application/json");
//   xhttp.send(JSON.stringify(sendData));
//   empl = JSON.parse(xhttp.responseText);
//   employee = empl.state_data;

//   $.each(employee, function(index, value) {
//     var optinons = new Option(value['state']);
//     optinons.setAttribute('value', value['id']);
//     optinons.setAttribute('label', value['state']);
//     listarea.append(optinons);
//   });


//   var defaultCountry = new XMLHttpRequest();
//   defaultCountry.open("GET", "https://gapapi-100.appspot.com/api/main/country/", false);
//   defaultCountry.setRequestHeader("Content-type", "application/json");
//   defaultCountry.send();
//   defaultCountrydata = JSON.parse(defaultCountry.responseText);
//   var countrydata = defaultCountrydata.identity_data;

//   $("#perm_state option").filter(function() {
//       //may want to use $.trim in here
//       return $(this).val() == countrydata[0]['state']; 
//   }).attr('selected', true);

// });