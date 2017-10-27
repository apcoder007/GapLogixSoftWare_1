// var btnUpload = $('#org_image');
// 			new AjaxUpload(btnUpload, {	
// 				action :  base_url+'/organisationinfo/uploadpreview',
// 				name   : 'profile_photo',  //we can rename it 
// 				dataType: 'json',
// 				onSubmit: function(file,ext){		
// 				if($("#errors-org_image_value").is(":visible"))
// 				  $("#errors-org_image_value").hide();	
// 				  $("#orgloaderimg").show();												 
// 				},
// 				onComplete: function(file, response){				
// 					var result = JSON.parse(response);
// 					if(result.result == 'success')
// 					{						
// 						$('#errors-org_image_value').html('');
// 						$('#imgerr').val(result.result);						
// 						$("#imgerrmsg").val(result.msg);	
// 						$("#errors-org_image_value").css('display','block');
// 						$("#org_image_value").val(result.img);
// 						$('.org-img').html('<img src="'+base_url+'/public/uploads/preview/'+result.img+'" /><div id="org_image" class="caption uploadbut-org" style="top: -35px; display: none;">Upload Logo</div>');
// 						$("#orgloaderimg").hide();						
							
	
// 					}
// 					else
// 					{
// 						$('.uploaderror').show();
// 						$("#errors-org_image_value").css('display','block');
// 						$('#errors-org_image_value').html(result.msg);
// 						$('#imgerr').val(result.result);
// 						$("#imgerrmsg").val(result.msg);
// 						$("#orgloaderimg").hide();
// 						setTimeout(function()
// 						{
// 						$('.uploaderror').fadeOut('slow');
// 						},3000);
// 					}
// 				}
// 			},'json');
	
// 			var domains = '28';
// 			var errorMsg = "";
// 			var domainsArr = domains.split(",");
// 			var domainData = document.getElementById('domain');
// 			for(var j = 0 ; j <= domainsArr.length ; j++)
// 			{	
// 				for(var i = 0 ; i <= domainData.length ; i++)
// 				{
// 					if(domainData.options[i] !== undefined)
// 					{
// 						if(domainData.options[i].value === domainsArr[j]) 
// 						{
// 							if(errorMsg != '' && errorMsg != 'undefined')
// 							domainData.options[i].selected = false;
// 							else domainData.options[i].selected = true;
// 							break;
// 						}
// 					}
// 				}
// 			}