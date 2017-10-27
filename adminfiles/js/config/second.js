$(function() {
 setTimeout('hideMessg()',3000);
});

function hideMessg() {
   if($("#dispmsgmenu").is(":visible"))
     $('#dispmsgmenu').fadeOut('slow','swing');
}

// defining the project name for using in js files
var projectPath =  '/Gaplogix/';
var application_name = 'Gaplogix';

$(document).ready(function(){
     
/* Making window responsive*/

 var window_width = $(window).width();
 
 var content_inners_width = window_width*(99/100);
 $('.content_inners').css("width", content_inners_width);
 $('.wrapperdivleft').css("width", "250");
 $('.wrapperdivright').css("width", (content_inners_width-250));
           
       
function checkmainWidth(){
   var window_width = $(window).width();
   var content_inners_width = window_width*(99/100);
   $('.content_inners').css("width", content_inners_width);

   $('.wrapperdivleft').css("width", "250");
   $('.wrapperdivright').css("width", (content_inners_width-250));     
}   

$(window).resize(function(){       
   checkmainWidth();

$("#scroller").simplyScroll({
              auto: false,
              speed: 10
      });
  });
/* End of Making window responsive */         
       
});//end of ready function

$(document).ready(function(e){
  // $("#submitbutton").click(function(){ 
  //        $.blockUI({ width:'50px',message: $("#spinner").html() });
  //    });   
  $("#prev,#next,#backtosite,.logo").click(function(e){ 
         if(parseFloat($.trim(e.which)) != 2 && !e.ctrlKey)
         { 
             $.blockUI({ width:'50px',message: $("#spinner").html() });
         } 
         if(parseFloat($.trim(e.which)) == 2 || parseFloat($.trim(e.which)) == 0)
         {
             $.unblockUI();
         } 
     }); 

  $(".wrapper ul li").click(function(e){ 
     if(parseFloat($.trim(e.which)) != 2 && !e.ctrlKey){ 
         $.blockUI({ width:'50px',message: $("#spinner").html() });
     } 
     if(parseFloat($.trim(e.which)) == 2 || parseFloat($.trim(e.which)) == 0){
         $.unblockUI();
     } 
 });   
              
       
   $(document).ajaxStart(function(){       
       checkisactivestatus();
   }); 

   $(document).ajaxSuccess(function(event, request, settings){               
       var response = request.responseText;
       if(response == '{"login":"failed"}')
       {
           window.location.href = '/admin/managemenu';
       }
   }); 

   $(document).ajaxStop($.unblockUI); 
   $(document).ajaxError($.unblockUI);
           
   $("select:not(.not_appli)").select2({
       formatResult: format_select,            
       escapeMarkup: function(m) { return m; }
   });

 function format_select(selData) {
 var parent_id = selData.element[0].parentElement.id;
 
     var sel_array = new Array('approver1','approver2','approver3','reporting_id','interviewer_id','reporting_manager','employee');
     if(jQuery.inArray(parent_id,sel_array) >=0)
     {
         if(parent_id == 'employee')
         {
             var title = '';
             var emp_split = selData.id.split('-');
             var textData = selData.text;

             if (selData.id == 0) return selData.text; 
             if(emp_split[0] == 'cand')
             {
                 title = 'candidate-profile_pic.jpg';                    
             }
             else if(emp_split[0] == 'emp')
             {
                 title = $('#'+parent_id+' option[value="'+selData.id+'"]').attr('title');
             }
             else 
                 title = '';
             return "<img class='flag' src='" + domain_data + "public/uploads/profile/"+title+"' onerror=\"this.src='"+domain_data+"/public/uploads/profile/profile_pic.png'\" />" + "<span>" + textData + "<\/span><div class='seldivimg'><\/div>";
         }
         else
         {
             var title = $('#'+parent_id+' option[value="'+selData.id+'"]').attr('title');
             if (!selData.id) return selData.text; 
         
             if(title == '')
                 title = "profile_pic.png";
             return "<img class='flag' src='" + domain_data + "public/uploads/profile/"+title+"' onerror=\"this.src='"+domain_data+"/public/uploads/profile/profile_pic.png'\" />" + "<span>" + selData.text + "<\/span><div class='seldivimg'><\/div>";
         }
     }
     else 
     {
         return  "<span>" + selData.text + "<\/span><div class='seldivimg'><\/div>";
     }            
 }


});