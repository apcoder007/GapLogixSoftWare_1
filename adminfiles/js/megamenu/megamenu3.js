var checkmenu  = '';
                    $(document).ready(function() {

                                   checkmenu += '5,';
                               $('#menu_5').parent().removeClass('bc-inactive');
                               $('#menu_5').parent().addClass('bc-active');
                                   checkmenu += '8,';
                               $('#menu_8').parent().removeClass('report-inactive');
                               $('#menu_8').parent().addClass('report-active');
                                   checkmenu += '19,';
                               $('#menu_19').parent().removeClass('resources-inactive');
                               $('#menu_19').parent().addClass('resources-active');
                                   checkmenu += '130,';
                               $('#menu_130').parent().removeClass('times-inactive');
                               $('#menu_130').parent().addClass('times-active');
                               checkmenu += '143,';
                           $('#menu_143').parent().removeClass('service-request-inactive');
                           $('#menu_143').parent().addClass('service-request-active');
                                   checkmenu += '149,';
                               $('#menu_149').parent().removeClass('performance-inactive');
                               $('#menu_149').parent().addClass('performance-active');
                       $('#chk_menu').val(checkmenu);
                    $('#menu_7').on('click',function() {
                           if($('#menu_7').parent().hasClass('compli-active')) 
                           {               
                               checkmenu = checkmenu.replace(/7,/,"");     
                               $('#chk_menu').val(checkmenu);
                               $('#menu_7').parent().removeClass('compli-active');
                               $('#menu_7').parent().addClass('compli-inactive');
                           }else if($('#menu_7').parent().hasClass('compli-inactive')) 
                           {
                               checkmenu = checkmenu+'7,';             
                               $('#chk_menu').val(checkmenu);              
                               $('#menu_7').parent().removeClass('compli-inactive');
                               $('#menu_7').parent().addClass('compli-active');
                           }
                    });
                    $('#menu_8').on('click',function() {
                           if($('#menu_8').parent().hasClass('report-active')) 
                           {               
                               checkmenu = checkmenu.replace(/8,/,"");             
                               $('#chk_menu').val(checkmenu);
                               $('#menu_8').parent().removeClass('report-active');
                               $('#menu_8').parent().addClass('report-inactive');
                           }else if($('#menu_8').parent().hasClass('report-inactive')) 
                           {
                               checkmenu = checkmenu+'8,';             
                               $('#chk_menu').val(checkmenu);
                               $('#menu_8').parent().removeClass('report-inactive');
                               $('#menu_8').parent().addClass('report-active');
                           }
                    });
                    $('#menu_130').on('click',function() {  
                           if($('#menu_130').parent().hasClass('times-active')) 
                           {
                               checkmenu = checkmenu.replace(/130,/,"");               
                               $('#chk_menu').val(checkmenu);
                               $('#menu_130').parent().removeClass('times-active');
                               $('#menu_130').parent().addClass('times-inactive');
                           }else if($('#menu_130').parent().hasClass('times-inactive')) 
                           {
                               checkmenu = checkmenu+'130,';               
                               $('#chk_menu').val(checkmenu);
                               $('#menu_130').parent().removeClass('times-inactive');
                               $('#menu_130').parent().addClass('times-active');
                           }
                    });
                    $('#menu_15').on('click',function() {   
                           if($('#menu_15').parent().hasClass('benefits-active')) 
                           {
                               checkmenu = checkmenu.replace(/15,/,"");                
                               $('#chk_menu').val(checkmenu);
                               $('#menu_15').parent().removeClass('benefits-active');
                               $('#menu_15').parent().addClass('benefits-inactive');
                           }else if($('#menu_15').parent().hasClass('benefits-inactive')) 
                           {
                               checkmenu = checkmenu+'15,';                
                               $('#chk_menu').val(checkmenu);
                               $('#menu_15').parent().removeClass('benefits-inactive');
                               $('#menu_15').parent().addClass('benefits-active');
                           }           
                    });
                    $('#menu_149').on('click',function() {
                           if($('#menu_149').parent().hasClass('performance-active')) 
                           {
                               checkmenu = checkmenu.replace(/149,/,"");               
                               $('#chk_menu').val(checkmenu);
                               $('#menu_149').parent().removeClass('performance-active');
                               $('#menu_149').parent().addClass('performance-inactive');
                           }else if($('#menu_149').parent().hasClass('performance-inactive')) 
                           {
                               checkmenu = checkmenu+'149,';               
                               $('#chk_menu').val(checkmenu);
                               $('#menu_149').parent().removeClass('performance-inactive');
                               $('#menu_149').parent().addClass('performance-active');
                           }
                    });
                    $('#menu_19').on('click',function() {
                           if($('#menu_19').parent().hasClass('resources-active')) 
                           {
                               checkmenu = checkmenu.replace(/19,/,"");                
                               $('#chk_menu').val(checkmenu);
                               $('#menu_19').parent().removeClass('resources-active');
                               $('#menu_19').parent().addClass('resources-inactive');
                           }else if($('#menu_19').parent().hasClass('resources-inactive')) 
                           {
                               checkmenu = checkmenu+'19,';                
                               $('#chk_menu').val(checkmenu);
                               $('#menu_19').parent().removeClass('resources-inactive');
                               $('#menu_19').parent().addClass('resources-active');
                           }
                    });

                    $('#menu_5').on('click',function() {
                       if($('#menu_5').parent().hasClass('bc-active')) 
                       {   
                           checkmenu = checkmenu.replace(/5,/,"");             
                           $('#chk_menu').val(checkmenu);
                           $('#menu_5').parent().removeClass('bc-active');
                           $('#menu_5').parent().addClass('bc-inactive');
                       }else if($('#menu_5').parent().hasClass('bc-inactive')) 
                       {
                           checkmenu = checkmenu+'5,';             
                           $('#chk_menu').val(checkmenu);
                           $('#menu_5').parent().removeClass('bc-inactive');
                           $('#menu_5').parent().addClass('bc-active');
                       }
                    });
                    $('#menu_6').on('click',function() {
                           if($('#menu_6').parent().hasClass('staffing-active')) 
                           {
                               checkmenu = checkmenu.replace(/6,/,"");             
                               $('#chk_menu').val(checkmenu);
                               $('#menu_6').parent().removeClass('staffing-active');
                               $('#menu_6').parent().addClass('staffing-inactive');
                           }else if($('#menu_6').parent().hasClass('staffing-inactive')) 
                           {
                               checkmenu = checkmenu+'6,';             
                               $('#chk_menu').val(checkmenu);
                               $('#menu_6').parent().removeClass('staffing-inactive');
                               $('#menu_6').parent().addClass('staffing-active');
                           }
                           
                       });

                    $('#menu_143').on('click',function() {
                       if($('#menu_143').parent().hasClass('service-request-active')) 
                       {   
                           checkmenu = checkmenu.replace(/143,/,"");               
                           $('#chk_menu').val(checkmenu);
                           $('#menu_143').parent().removeClass('service-request-active');
                           $('#menu_143').parent().addClass('service-request-inactive');
                       }else if($('#menu_143').parent().hasClass('service-request-inactive')) 
                       {
                           checkmenu = checkmenu+'143,';               
                           $('#chk_menu').val(checkmenu);
                           $('#menu_143').parent().removeClass('service-request-inactive');
                           $('#menu_143').parent().addClass('service-request-active');
                       }
                    });

                    $('[id^="menu"]').on('click',function() {
                       
                       $('#savebuttondiv').show();
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
                                                       
                                                           $(".manage_modules").removeClass('inactive');
                                       $("#manage_modules").removeAttr("onclick");
                                       $( "#manage_modules" ).unbind( "click");
                                                       
                                   });