$(document).ready(function(){
                    $('#dateformatid').change(function(){
                       var val = $(this).val();
                       $('#id_date_format_example').html('');
                       var example = $('#dateformatid option[value="'+val+'"]').attr('example');
                       if(example!='')
                       $('#id_date_format_example').html("Example: "+example);
                    });

                    $('#timeformatid').change(function(){
                       var val = $(this).val();
                       $('#id_time_format_example').html('');
                       var example = $('#timeformatid option[value="'+val+'"]').attr('example');
                       if(example!='')
                       $('#id_time_format_example').html("Example: "+example);
                    });

                    $('#dateformatid').trigger('change');
                    $('#timeformatid').trigger('change');
                    $('#passwordid').trigger('change');

                           
                                               
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
                                                       
                                                           $(".site_config").removeClass('inactive');
                                       $("#site_config").removeAttr("onclick");
                                       $("#site_config" ).unbind( "click");
                                                       
                                   });

                    var workcodename = '1,3,4,5,6';
                    var errorMsg = "";
                    var workcodenameArr = workcodename.split(",");
                    var workcodenameData = document.getElementById('workcodename');
                    for(var j = 0 ; j <= workcodenameArr.length ; j++)
                    {   
                    for(var i = 0 ; i <= workcodenameData.length ; i++)
                    {
                       if(workcodenameData.options[i] !== undefined)
                       {
                           if(workcodenameData.options[i].value === workcodenameArr[j]) 
                           {
                               if(errorMsg != '' && errorMsg != 'undefined')
                               workcodenameData.options[i].selected = false;
                               else workcodenameData.options[i].selected = true;
                               break;
                           }
                       }
                    }
                    }