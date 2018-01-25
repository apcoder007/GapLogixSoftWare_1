$(document).ready(function(){
                           
  $('#s2id_timezoneid').blur(function(){ 
     $('#errors-timezoneid').remove();
     
     if($.trim($('#timezoneid').val()) == '')
      {

         // To place error messages after Add Link
         $('#timezoneid').after("<span class='errors' id='errors-timezoneid'>Please select time zone preference.<\/span>");
      }
      else 
      {
          $('#errors-timezoneid').remove();   

      }
     });
                                       
                                          
                                   

  $('#s2id_dateformatid').blur(function(){ 
     $('#errors-dateformatid').remove();
     
     if($.trim($('#dateformatid').val()) == '')
      {

         // To place error messages after Add Link
         $('#dateformatid').after("<span class='errors' id='errors-dateformatid'>Please select date format.<\/span>");
      }
      else 
      {
          $('#errors-dateformatid').remove();   

      }
     });
                                       
                                          
                                   

  $('#s2id_timeformatid').blur(function(){ 
     $('#errors-timeformatid').remove();
     
     if($.trim($('#timeformatid').val()) == '')
      {

         // To place error messages after Add Link
         $('#timeformatid').after("<span class='errors' id='errors-timeformatid'>Please select time format.<\/span>");
      }
      else 
      {
          $('#errors-timeformatid').remove();   

      }
     });
                                       
                                          
                                             

  $('#othercurrencycode').blur(function(){                                   
     $('#errors-othercurrencycode').remove();                                    
     if($.trim($(this).val()) == '')
      { 
         $(this).parent().append("<span class='errors' id='errors-othercurrencycode'>Please enter currency code.<\/span>");
         
         $(this).val('');                                
      }
      else 
      {
          $('#errors-othercurrencycode').remove();   
          
           $('#othercurrencycode').trigger('keyup');
         $('#othercurrencycode').trigger('change'); 
      }
      
     });
                                           
                                           
                                          
                                             
  $('#othercurrencycode').keyup(function(){
      var expr = /^[a-zA-Z][a-zA-Z0-9\s]*$/;
      $('#errors-othercurrencycode').remove(); 
      $('.errors-othercurrencycode').remove(); 
     
      if($(this).val() != '')
      { 
          if(!expr.test($(this).val()))
           {
               $('#errors-othercurrencycode').remove();                                    
               $(this).parent().append("<span class='errors' id='errors-othercurrencycode'>Please enter valid currency code.<\/span>");
               
           }
      }
      else
      {
          $('#errors-othercurrencycode').remove();                                    
      }
  }); 
                                       
                                     

  $('#othercurrencyname').blur(function(){                                   
     $('#errors-othercurrencyname').remove();                                    
     if($.trim($(this).val()) == '')
      { 
         $(this).parent().append("<span class='errors' id='errors-othercurrencyname'>Please enter currency name.<\/span>");
         
         $(this).val('');                                
      }
      else 
      {
          $('#errors-othercurrencyname').remove();   
          
           $('#othercurrencyname').trigger('keyup');
         $('#othercurrencyname').trigger('change'); 
      }
      
     });
                                           
                                           
                                          
                                             
  $('#othercurrencyname').keyup(function(){
      var expr = /^[a-zA-Z][a-zA-Z0-9\s]*$/;
      $('#errors-othercurrencyname').remove(); 
      $('.errors-othercurrencyname').remove(); 
     
      if($(this).val() != '')
      { 
          if(!expr.test($(this).val()))
           {
               $('#errors-othercurrencyname').remove();                                    
               $(this).parent().append("<span class='errors' id='errors-othercurrencyname'>Please enter valid currency name.<\/span>");
               
           }
      }
      else
      {
          $('#errors-othercurrencyname').remove();                                    
      }
  }); 
                                       
                           

  $('#s2id_currencyname').blur(function(){ 
     $('#errors-currencyname').remove();
     
     if($.trim($('#currencyname').val()) == '')
      {

         // To place error messages after Add Link
         $('#currencyname').after("<span class='errors' id='errors-currencyname'>Please select currency.<\/span>");
      }
      else 
      {
          $('#errors-currencyname').remove();   

      }
     });
                                       
                                          
                                   

  $('#s2id_passwordid').blur(function(){ 
     $('#errors-passwordid').remove();
     
     if($.trim($('#passwordid').val()) == '')
      {

         // To place error messages after Add Link
         $('#passwordid').after("<span class='errors' id='errors-passwordid'>Please select default password.<\/span>");
      }
      else 
      {
          $('#errors-passwordid').remove();   

      }
     });
                                       
                                          
                                   

  $('#s2id_perm_country').blur(function(){ 
     $('#errors-perm_country').remove();
     
     if($.trim($('#perm_country').val()) == '')
      {

         // To place error messages after Add Link
         $('#perm_country').after("<span class='errors' id='errors-perm_country'>Please select country.<\/span>");
      }
      else 
      {
          $('#errors-perm_country').remove();   

      }
     });
                                       
                                          
                                   

  $('#s2id_perm_state').blur(function(){ 
     $('#errors-perm_state').remove();
     
     if($.trim($('#perm_state').val()) == '')
      {

         // To place error messages after Add Link
         $('#perm_state').after("<span class='errors' id='errors-perm_state'>Please select state.<\/span>");
      }
      else 
      {
          $('#errors-perm_state').remove();   

      }
     });
                                       
                                          
                                   

  $('#s2id_perm_city').blur(function(){ 
     $('#errors-perm_city').remove();
     
     if($.trim($('#perm_city').val()) == '')
      {

         // To place error messages after Add Link
         $('#perm_city').after("<span class='errors' id='errors-perm_city'>Please select city.<\/span>");
      }
      else 
      {
          $('#errors-perm_city').remove();   

      }
     });
                                       
                                          
                                   

  $('#s2id_workcodename').blur(function(){ 
     $('#errors-workcodename').remove();
     
     if($.trim($('#workcodename').val()) == '')
      {

         // To place error messages after Add Link
         $('#workcodename').after("<span class='errors' id='errors-workcodename'>Please select employment status.<\/span>");
      }
      else 
      {
          $('#errors-workcodename').remove();   

      }
     });
                                       
                                          
                                             

  $('#employee_code').blur(function(){                                   
     $('#errors-employee_code').remove();                                    
     if($.trim($(this).val()) == '')
      { 
         $(this).parent().append("<span class='errors' id='errors-employee_code'>Please enter employee code.<\/span>");
         
         $(this).val('');                                
      }
      else 
      {
          $('#errors-employee_code').remove();   
          
           $('#employee_code').trigger('keyup');
         $('#employee_code').trigger('change'); 
      }
      
     });
                                           
                                           
                                          
                                           
  $('#employee_code').blur(function(){

   if($.trim($(this).val()) != '')
    {
       var minlength = 1;
       var maxlength = 5;    
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
                            
               $('#errors-employee_code').remove();                                                                 
               $(this).parent().append("<span class='errors' id='errors-employee_code'>"+label+" must contain at least "+minlength+" characters.<\/span>");
           }
       }
       if(maxlength != '')
       {                               
           if($.trim($(this).val().length) > maxlength)
           {
               $('#errors-employee_code').remove();                                                                 
               $(this).parent().append("<span class='errors' id='errors-employee_code'>"+label+" must contain at most "+maxlength+" characters.<\/span>");
           } 
       }                                   
    } 
  });  
                                     
  $('#employee_code').keyup(function(){
      var expr = /^[A-Za-z][a-zA-Z@\-]*$/;
      $('#errors-employee_code').remove(); 
      $('.errors-employee_code').remove(); 
     
      if($(this).val() != '')
      { 
          if(!expr.test($(this).val()))
           {
               $('#errors-employee_code').remove();                                    
               $(this).parent().append("<span class='errors' id='errors-employee_code'>Please enter valid employee code.<\/span>");
               
           }
      }
      else
      {
          $('#errors-employee_code').remove();                                    
      }
  }); 
                                       
}); //end of ready function.