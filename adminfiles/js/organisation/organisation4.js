$(document).ready(function(){
    	$('#description').maxlength('destroy');
    	 var yearrange = '1900:2037';
    //  var yearrange = '1967:2017';	  
      $('#org_startdate').datepicker({
					showOn:'both',
					yearRange: yearrange,
					dateFormat: 'dd MM yy',
					buttonImage: "/adminfiles/images/cal.jpg",
					buttonImageOnly: true,
					buttonText: "",
					changeMonth: true,
					changeYear: true,
                    showButtonPanel: true ,
					onClose:function(){
                                    if($("#errors-org_startdate").length > 0){
                                       $("#errors-org_startdate").remove();
                                    }
                                    from_to_date_validation_org('org_startdate','date_of_joining',this,'Organization started on should be less than Date of joining.');
                                }
				});
       
      var yearrange = '1900:2037';
	  
     //  var yearrange = '1987:2017';
    $('#date_of_joining').datepicker({
				showOn:'both',
				maxDate: new Date, 
				yearRange: yearrange,
				dateFormat: 'dd MM yy',
				buttonImage: "/adminfiles/images/cal.jpg",
				buttonImageOnly: true,
				buttonText: "",
				changeMonth: true,
				changeYear: true, 
                showButtonPanel: true ,
				onClose:function(){
                            from_to_date_validation_org('org_startdate','date_of_joining',this,'Date of joining should be greater than organization started on.');
					$('#date_of_joining').trigger('blur');
                    }
		});

    		
								
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

		$(".organization").removeClass('inactive');
		$("#organization").removeAttr("onclick");
		$("#organization" ).unbind("click");
										
						
	});//end of ready function