$(document).ready(function() {
 /* Making window responsive*/
 	var complete_empwidth = $('.emp-screen-view').width();
	$('#displayimg').css("width", "150");
	$('#personalDetailsDiv').css("width", (complete_empwidth-(152)));	
		
	 function checkempWidth() {
        var complete_empwidth = $('.emp-screen-view').width();		
		$('#displayimg').css("width", "150");
		$('#personalDetailsDiv').css("width", (complete_empwidth-(152)));		
    }
	
	/* Making window responsive*/
 	var complete_width = $('.poc-ui-data-control').width();
	$('.left-block-ui-data').css("width", "230");
	$('.right-block-data').css("width", (complete_width-(263)));	
		
	 function checkWidth() {
        var complete_width = $('.poc-ui-data-control').width();		
		$('.left-block-ui-data').css("width", "230");
		$('.right-block-data').css("width", (complete_width-(263)));		
    }
	
	
	function checknew1Width() {
        var complete_width = $('.short-ui-full-1').width();		
		$('.short-ui-full-1 label').css("width", "160");
		$('.short-ui-full-1 .division1').css("width", (complete_width-(190)));	
    }

	/* Making window responsive*/
 	var complete_width = $('.short-ui-full-1').width();
	$('.short-ui-full-1 label').css("width", "160");
	$('.short-ui-full-1 .division1').css("width", (complete_width-(190)));	
	
	 
	$(window).resize(function() {
		checkWidth();
		checkempWidth();
		checknew1Width();
	});

	//$('.step_form').alternateScroll({ 'horizontal-bar-class': 'styled-h-bar'});
	
});