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


  });