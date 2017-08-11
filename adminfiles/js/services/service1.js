function addRequestTypeDiv()
{
	var divcount = $("#multi_dept_div > div").length;
	var idcount = parseInt($('#idcount').val());
	if(divcount < 5)
	{	
		idcount = idcount + 1;
		var html = '';
	
		html+="<div id='parent_"+idcount+"' class='add_request'>";
		html+="<div class='form-ui'>";
		html+="<label class='required'>Request Type</label>";
		html+="<input type='text' maxlength='100' value='' id='requesttype_"+idcount+"' name='requesttype[]' class='cls_service_request_name' onblur='validateTextInput(this,\"request type\")' onkeyup='validateTextInput(this,\"request type\")'>";
		html+="</div>";
		html+="<div class='form-ui form-ui-textarea'>";
		html+="<label>Description</label>";
		html+="<textarea maxlength='100' cols='50' rows='10' id='description_"+idcount+"' name='description[]' class='cls_address' ></textarea>";
		html+="</div>";
		html+="<span class='sprite remove-new remove-entry' title='Remove' onclick='removeDiv("+idcount+")'></span>";
		html+="</div>";
	
		//$('#multi_dept_div').append(html);
		$('#add-candidate').before(html);
		$('#idcount').val(idcount);
		$("[id^=description]").maxlength();
	}else
	{
		jAlert('You can add only 5 service requests at a time.');
	}
	
}

function validateRequestTypeOnSubmit(ele)
{
    var parentdivlength = $('div[id^=parent]').length;
    var re = /^[a-zA-Z0-9\- ]+$/;
    var errorcount = 0;
    var categoryId = $('#category_id').val();
    $('#errors-category_id').remove();
	if(parentdivlength > 0)
    {                    
        $('.add_request').each(function(i){                            
            var ele= $(this).find('.cls_service_request_name');                            
            var elementid = $(ele).attr('id');
            var reqValue = $(ele).val();
            $('#errors-'+elementid).remove();
            if($(ele).val() == '')
            {
                $(ele).parent().append("<span class='errors' id='errors-"+elementid+"'>Please enter request type.</span>");
                errorcount++;
            }
            else if(!re.test(reqValue))
            {
                $(ele).parent().append("<span class='errors' id='errors-"+elementid+"'>Please enter valid request type.</span>");
                errorcount++;
            }
            else
            {
            	$('#errors-'+elementid).remove();
            }

        });
    }
    if(categoryId == '')
    {
        $('#category_id').parent().append("<span class='errors' id='errors-category_id'>Please select category.</span>");
    }
    else
    {
        $('#errors-category_id').remove();
    }

    if(errorcount == 0 && categoryId !='')
    {
        $.blockUI({ width:'50px',message: $("#spinner").html() });
        document.getElementById("wizard_category_settings").submit();
    }
}

function saveCategory()
{
	var category = $("#category").val();
	var description = $("#description").val();
	var errorcount = 0;
	var re = /^[a-zA-Z0-9\- ]+$/;
	$("#errors-category").remove();
	$("#errors-description").remove();
	$('#error_message').html('');
		if(category == '')
		{
			$("#category").parent().append("<span class='errors' id='errors-category'>Please enter category.</span>");
			errorcount++;
		}
		else if(!re.test(category))
		{
			$("#category").parent().append("<span class='errors' id='errors-category'>Please enter valid category.</span>");
			errorcount++;
		}
		
		if(errorcount==0)
		{
			$.ajax({
		     	url: base_url+"/wizard/savecategory/format/json",
		     	type : 'POST',	
				data : 'category='+category+'&description='+description,
				dataType: 'json',
				beforeSend: function () {
					$.blockUI({ width:'50px',message: $("#spinner").html() });
				},
				success : function(response){	
					$.unblockUI();
					if(response['msg'] == 'success')
					{
						$("#category_id").append("<option value='"+response['id']+"'>"+response['service_desk_name']+"</option>");
						$("#contentdiv").hide();
						$("#successdiv").show();
						setTimeout(function(){
							closeDialogPopup('categorydiv');
						},3000);
						
					}else
					{
						$("#category").parent().append("<span class='errors' id='errors-category'>"+response['msg']+"</span>");
					}	
				}
			});
		
		}
}
