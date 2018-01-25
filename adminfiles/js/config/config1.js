var domain_data = "http://192.168.1.25/gaplogix/";
var base_url = "http://localhost:8080/admin";
function checkisactivestatus()
{   
    $.ajax({
        type:"post",    
        url:"https://gapapi-100.appspot.com/api/checkisactivestatus/",
        dataType:'json',
        success: function(response)
        {
            if(response['result'] == 'false')
            {
                window.location.href = base_url+'/index/';
            }
        }
    });
}

function configlater()
{
  var URL = '';
      URL = base_url+'/wizard/updatewizardcompletion';
    
  $.ajax({
        type:"post",    
        url:URL,
        dataType:'json',
        beforeSend: function () {
          $.blockUI({ width:'50px',message: $("#spinner").html() });
    },
        success: function(response)
        {
            if(response['result'] == 'success')
            {
                window.location.href = base_url+'/welcome/';
            }
            else
            {
              $.unblockUI();
                jAlert('Something went wrong.');
            }    
        }
    });
  
}

function displayPopup(id,title)
{
  apply_select2();
  $("#unit_id").val('');
  $("#street_address").val('');
  $("#errors-unit_id").html('');
  $("#errors-street_address").remove();
  $("#successdiv").hide();
  $("#contentdiv").show();
  $("#errors-holidaygroup").remove();
  $("#errors-category_name").remove();
  $("#errors-category").remove();
  //var title = $("#"+id).html();
  $("#category_name").val('');
  $("#holidaygroup").val('');
  $("#category").val('');
  $("#description").val('');
  $("#"+id).dialog({
    draggable:false, 
    resizable: false,
    width: 500,
    title: title,
    modal: true,
    close: function() {
      closeDialogPopup('bunitdiv');
    }
  });
}

function closeDialogPopup(id) {
  $("#"+id).dialog('close');
}