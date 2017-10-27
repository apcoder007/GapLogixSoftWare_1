function addDepartmentDiv()
{
	var divcount = $("#multi_dept_div > div").length;
	var idcount = parseInt($('#idcount').val());
	if(divcount < 5)
	{	
		idcount = idcount + 1;
		var html = '';
		html+="<div id='parent_"+idcount+"' class='add_request'>";
		html+="<div class='form-ui'>";
		html+="<label class='required'>Department</label>";
		html+="<input type='text' maxlength='100' value='' id='department_"+idcount+"' name='department[]' class='cls_service_request_name' onblur='validateTextInput(this,\"department\")' onkeyup='validateTextInput(this,\"department\")'>";
		html+="</div>";
		html+="<div class='form-ui form-ui-textarea'>";
		html+="<label class='required'>Street Address</label>";
		html+="<textarea cols='50' rows='10' id='address_"+idcount+"' name='address[]' class='cls_address' onkeyup='validateTextArea(this,\"street address\")' onblur='validateTextArea(this,\"street address\")'></textarea>";
		html+="</div>";
		html+="<span class='sprite remove-new remove-entry' title='Remove' onclick='removeDiv("+idcount+")'></span>";
		html+="</div>";
	
		//$('#multi_dept_div').append(html);
		$('#add-candidate').before(html);
		$('#idcount').val(idcount);
		$("[id^=description]").maxlength();
	}else
	{
		jAlert('You can add only 5 departments at a time.');
	}
	
}

function validateDepartmentOnSubmit(ele)
{
    var parentdivlength = $('div[id^=parent]').length;
    var re = /^[a-zA-Z0-9\- ]+$/;
    var errorcount = 0;
    var bunitid = $('#bunit_id').val();
    $('#errors-bunit_id').remove();
	if(parentdivlength > 0)
    {                    
        $('.add_request').each(function(i){                            
            var ele= $(this).find('.cls_service_request_name');                            
            var elementid = $(ele).attr('id');

            var addressEle= $(this).find('.cls_address');                            
            var addresseleid = $(addressEle).attr('id');

            var reqValue = $(ele).val();
            $('#errors-'+elementid).remove();
            $('#errors-'+addresseleid).remove();
            if($(ele).val() == '')
            {
                $(ele).parent().append("<span class='errors' id='errors-"+elementid+"'>Please enter department name.</span>");
                errorcount++;
            }
            else if(!re.test(reqValue))
            {
                $(ele).parent().append("<span class='errors' id='errors-"+elementid+"'>Please enter valid department name.</span>");
                errorcount++;
            }
            else
            {
            	$('#errors-'+elementid).remove();
            }

            if($(addressEle).val() == '')
            {
                $(addressEle).parent().append("<span class='errors' id='errors-"+addresseleid+"'>Please enter street address.</span>");
                errorcount++;
            }
            else
            {
            	$('#errors-'+addresseleid).remove();
            }
        });
    }
    if(bunitid == '')
    {
        $('#bunit_id').parent().append("<span class='errors' id='errors-bunit_id'>Please select business unit.</span>");
    }
    else
    {
        $('#errors-bunit_id').remove();
    }

    if(errorcount == 0 && bunitid !='')
    {
        $.blockUI({ width:'50px',message: $("#spinner").html() });
        document.getElementById("wizard_unit_department").submit();
    }
}

function saveBusinessUnit()
{
	var bunit = $("#unit_id").val();
	var streetAddress = $("#street_address").val();
	var errorcount = 0;
	var re = /^[a-zA-Z0-9\- ]+$/;
	$("#errors-unit_id").remove();
	$("#errors-street_address").remove();
	$('#error_message').html('');
		if(streetAddress == '')
		{
			$("#street_address").parent().append("<span class='errors' id='errors-street_address'>Please enter street address.</span>");
			errorcount++;
		}
		if(bunit == '')
		{
			$("#unit_id").parent().append("<span class='errors' id='errors-unit_id'>Please enter name.</span>");
			errorcount++;
		}
		else if(!re.test(bunit))
		{
			$("#unit_id").parent().append("<span class='errors' id='errors-unit_id'>Please enter valid name.</span>");
			errorcount++;
		}
		
		if(errorcount==0)
		{
			$.ajax({
		     	url: base_url+"/wizard/savebusinessunit/format/json",
		     	type : 'POST',	
				data : 'bunit='+bunit+'&streetAddress='+streetAddress,
				dataType: 'json',
				beforeSend: function () {
					$.blockUI({ width:'50px',message: $("#spinner").html() });
				},
				success : function(response){	
					$.unblockUI();
					if(response['msg'] == 'success')
					{
						$("#bunit_id").append("<option value='"+response['id']+"'>"+response['unitname']+"</option>");
						$("#contentdiv").hide();
						$("#successdiv").show();
						setTimeout(function(){
							closeDialogPopup('bunitdiv');
						},3000);
						
					}else
					{
						$("#unit_id").parent().append("<span class='errors' id='errors-unit_id'>"+response['msg']+"</span>");
					}	
				}
			});
		
		}
}