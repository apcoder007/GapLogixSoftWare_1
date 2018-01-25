$(document).ready(function(){

                        $('#organisationname').blur(function(){                                   
                            $('#errors-organisationname').remove();                                    
                            if($.trim($(this).val()) == '')
                             { 
							    $(this).parent().append("<span class='errors' id='errors-organisationname'>Please enter organization name.</span>");
                                
                                $(this).val('');								
                             }
                             else 
                             {
                                 $('#errors-organisationname').remove();   
                                 
                                  $('#organisationname').trigger('keyup');
                                $('#organisationname').trigger('change'); 
                             }
                             
                            });
							
							
                           
                              
                        $('#organisationname').keyup(function(){
						     var expr = /^[a-zA-Z0-9.\- ?]+$/;
                             $('#errors-organisationname').remove(); 
                             $('.errors-organisationname').remove(); 
                            
                             if($(this).val() != '')
                             { 
                                 if(!expr.test($(this).val()))
                                  {
                                      $('#errors-organisationname').remove();                                    
                                      $(this).parent().append("<span class='errors' id='errors-organisationname'>Please enter valid organization name.</span>");
                                      
                                  }
                             }
                             else
                             {
                                 $('#errors-organisationname').remove();                                    
                             }
                        }); 
                        
                      

                        $('#website').blur(function(){                                   
                            $('#errors-website').remove();                                    
                            if($.trim($(this).val()) == '')
                             { 
							    $(this).parent().append("<span class='errors' id='errors-website'>Please enter website.</span>");
                                
                                $(this).val('');								
                             }
                             else 
                             {
                                 $('#errors-website').remove();   
                                 
                                $('#website').trigger('change'); 
                             }
                             
                            });
							
							
                           
                              
                        $('#website').blur(function(){                                                               
                            var expr = /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/;
                            if($.trim($(this).val()) != '')
                             {                                                            
                                 $('#errors-website').remove();                                                                 
                                 if(!expr.test($(this).val()))                             
                                    $(this).parent().append("<span class='errors' id='errors-website'>Please enter valid URL.</span>");
                             }                             
                        });                           
            
	
                        $('#s2id_totalemployees').blur(function(){ 
                            $('#errors-totalemployees').remove();
                            
                            if($.trim($('#totalemployees').val()) == '')
                             {

                                // To place error messages after Add Link
                                $('#totalemployees').after("<span class='errors' id='errors-totalemployees'>Please enter total employees.</span>");
                             }
                             else 
                             {
                                 $('#errors-totalemployees').remove();   

                             }
                            });
						
                           
        					
                           $('#phonenumber').blur(function(){
                         
					        if($.trim($(this).val()) != '')
                             {
							    var minlength = 10;
						        var maxlength = 15;	  
							    var label = $(this).parent().parent().find('label').text();	
								label = $.trim(label);
								
								if(label== 'Secondary Phone') 
								  label = 'Secondary phone number';
								if(label== 'Mobile') 
								   label = 'Mobile number';
								if(label == 'Primary Phone') 
								   label = 'Primary phone number';
								   
						        label = label.substr(0, 1).toUpperCase() + label.substr(1,label.length).toLowerCase();
								
							    if(minlength != '')
								{
									if($.trim($(this).val().length) < minlength)
									{ 								
													 
										$('#errors-phonenumber').remove();                                                                 
										$(this).parent().append("<span class='errors' id='errors-phonenumber'>"+label+" must contain at least "+minlength+" characters.</span>");
									}
								}
                                if(maxlength != '')
								{ 								
									if($.trim($(this).val().length) > maxlength)
									{
										$('#errors-phonenumber').remove();                                                                 
										$(this).parent().append("<span class='errors' id='errors-phonenumber'>"+label+" must contain at most "+maxlength+" characters.</span>");
									} 
                                }									
                             } 
						});	 
                      
                        $('#phonenumber').keyup(function(){
						     var expr = /^[0-9-]+$/i;
                             $('#errors-phonenumber').remove(); 
                             $('.errors-phonenumber').remove(); 
                            
                             if($(this).val() != '')
                             { 
                                 if(!expr.test($(this).val()))
                                  {
                                      $('#errors-phonenumber').remove();                                    
                                      $(this).parent().append("<span class='errors' id='errors-phonenumber'>Please enter valid phone number.</span>");
                                      
                                  }
                             }
                             else
                             {
                                 $('#errors-phonenumber').remove();                                    
                             }
                        }); 
                        
					
                           $('#secondaryphone').blur(function(){
                         
					        if($.trim($(this).val()) != '')
                             {
							    var minlength = 10;
						        var maxlength = 15;	  
							    var label = $(this).parent().parent().find('label').text();	
								label = $.trim(label);
								
								if(label== 'Secondary Phone') 
								  label = 'Secondary phone number';
								if(label== 'Mobile') 
								   label = 'Mobile number';
								if(label == 'Primary Phone') 
								   label = 'Primary phone number';
								   
						        label = label.substr(0, 1).toUpperCase() + label.substr(1,label.length).toLowerCase();
								
							    if(minlength != '')
								{
									if($.trim($(this).val().length) < minlength)
									{ 								
													 
										$('#errors-secondaryphone').remove();                                                                 
										$(this).parent().append("<span class='errors' id='errors-secondaryphone'>"+label+" must contain at least "+minlength+" characters.</span>");
									}
								}
                                if(maxlength != '')
								{ 								
									if($.trim($(this).val().length) > maxlength)
									{
										$('#errors-secondaryphone').remove();                                                                 
										$(this).parent().append("<span class='errors' id='errors-secondaryphone'>"+label+" must contain at most "+maxlength+" characters.</span>");
									} 
                                }									
                             } 
						});	 
                      
                        $('#secondaryphone').keyup(function(){
						     var expr = /^[0-9-]+$/i;
                             $('#errors-secondaryphone').remove(); 
                             $('.errors-secondaryphone').remove(); 
                            
                             if($(this).val() != '')
                             { 
                                 if(!expr.test($(this).val()))
                                  {
                                      $('#errors-secondaryphone').remove();                                    
                                      $(this).parent().append("<span class='errors' id='errors-secondaryphone'>Please enter valid phone number.</span>");
                                      
                                  }
                             }
                             else
                             {
                                 $('#errors-secondaryphone').remove();                                    
                             }
                        }); 
                        
					
                           $('#faxnumber').blur(function(){
                         
					        if($.trim($(this).val()) != '')
                             {
							    var minlength = 10;
						        var maxlength = 15;	  
							    var label = $(this).parent().parent().find('label').text();	
								label = $.trim(label);
								
								if(label== 'Secondary Phone') 
								  label = 'Secondary phone number';
								if(label== 'Mobile') 
								   label = 'Mobile number';
								if(label == 'Primary Phone') 
								   label = 'Primary phone number';
								   
						        label = label.substr(0, 1).toUpperCase() + label.substr(1,label.length).toLowerCase();
								
							    if(minlength != '')
								{
									if($.trim($(this).val().length) < minlength)
									{ 								
													 
										$('#errors-faxnumber').remove();                                                                 
										$(this).parent().append("<span class='errors' id='errors-faxnumber'>"+label+" must contain at least "+minlength+" characters.</span>");
									}
								}
                                if(maxlength != '')
								{ 								
									if($.trim($(this).val().length) > maxlength)
									{
										$('#errors-faxnumber').remove();                                                                 
										$(this).parent().append("<span class='errors' id='errors-faxnumber'>"+label+" must contain at most "+maxlength+" characters.</span>");
									} 
                                }									
                             } 
						});	 
                      
                        $('#faxnumber').keyup(function(){
						     var expr = /^[0-9-]+$/i;
                             $('#errors-faxnumber').remove(); 
                             $('.errors-faxnumber').remove(); 
                            
                             if($(this).val() != '')
                             { 
                                 if(!expr.test($(this).val()))
                                  {
                                      $('#errors-faxnumber').remove();                                    
                                      $(this).parent().append("<span class='errors' id='errors-faxnumber'>Please enter valid fax number.</span>");
                                      
                                  }
                             }
                             else
                             {
                                 $('#errors-faxnumber').remove();                                    
                             }
                        }); 
                        
            
	
                        $('#s2id_country').blur(function(){ 
                            $('#errors-country').remove();
                            
                            if($.trim($('#country').val()) == '')
                             {

                                // To place error messages after Add Link
                                $('#country').after("<span class='errors' id='errors-country'>Please select country.</span>");
                             }
                             else 
                             {
                                 $('#errors-country').remove();   

                             }
                            });
						
                           
                    
	
                        $('#s2id_state').blur(function(){ 
                            $('#errors-state').remove();
                            
                            if($.trim($('#state').val()) == '')
                             {

                                // To place error messages after Add Link
                                $('#state').after("<span class='errors' id='errors-state'>Please select state.</span>");
                             }
                             else 
                             {
                                 $('#errors-state').remove();   

                             }
                            });
						
                           
                    
	
                        $('#s2id_city').blur(function(){ 
                            $('#errors-city').remove();
                            
                            if($.trim($('#city').val()) == '')
                             {

                                // To place error messages after Add Link
                                $('#city').after("<span class='errors' id='errors-city'>Please select city.</span>");
                             }
                             else 
                             {
                                 $('#errors-city').remove();   

                             }
                            });
						
                           
                              
                        $('#designation').keyup(function(){
						     var expr = /^[a-zA-Z.\- ?]+$/;
                             $('#errors-designation').remove(); 
                             $('.errors-designation').remove(); 
                            
                             if($(this).val() != '')
                             { 
                                 if(!expr.test($(this).val()))
                                  {
                                      $('#errors-designation').remove();                                    
                                      $(this).parent().append("<span class='errors' id='errors-designation'>Please enter valid designation.</span>");
                                      
                                  }
                             }
                             else
                             {
                                 $('#errors-designation').remove();                                    
                             }
                        }); 
                        
        }); //end of ready function.