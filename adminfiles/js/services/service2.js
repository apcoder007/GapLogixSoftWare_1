$(document).ready(function(){
	$("[id^=description]").maxlength();
	var counter = 0;
								
	$(".manage_modules").removeClass('inactive').addClass('completed inactive');
	$(".manage_menu").removeClass('progress').addClass('completed_show');
	$(".manage_menu").html('Completed');
	$(".site_config").removeClass('inactive').addClass('completed inactive');
	$(".config_site").removeClass('progress').addClass('completed_show');
	$(".config_site").html('Completed');
	$(".organization").removeClass('inactive').addClass('completed inactive');
	$(".config_organization").removeClass('progress').addClass('completed_show');
	$(".config_organization").html('Completed');
	$(".servicerequest").removeClass('inactive').addClass('completed inactive');
	$(".config_request").removeClass('progress').addClass('completed_show');
	$(".config_request").html('Completed');									
	$(".servicerequest").removeClass('inactive');
	$("#service_request").removeAttr("onclick");
	$( "#service_request" ).unbind( "click");
										
	});