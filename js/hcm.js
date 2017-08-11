//
$(document).ready(function() {
	var tag = document.getElementsByTagName('body')[0];
	if ($.browser.msie) {
		if ($.browser.version == '9.0')
			tag.setAttribute('class', 'NONIE');
		else
			tag.setAttribute('class', 'IE8');

	} else {
		tag.setAttribute('class', 'NONIE');
	}

});

var loaderValue ;
function ajaxLoader() {
	PF('statusDialog').show();
	loaderValue = setTimeout(function() {
			PF('ajaxTimeout').show();
		    PF('statusDialog').hide();
	}, 90000);
}

function ajaxHider() {
	clearTimeout(loaderValue);
	PF('statusDialog').hide();
	PF('ajaxTimeout').hide();
}

function continueAjax() {
	PF('statusDialog').show();
	PF('ajaxTimeout').hide();
}

function openDialogForFileUpload(id){
	$('#'+id+' input').click();
}

//
function noError() {
	return true;
}
window.onerror = noError;

// <!-- Author: Shivam Kumar - Preventing Form from Submittion by Pressing
// Enter. -->
// $(document).ready(function() {
// $(window).keydown(function(event) {
// if (event.keyCode == 13) {
// event.preventDefault();
// return false;
// }
// });
// });

// <!-- Author: Shivam Kumar - for printing any specific document area. -->
function printDocument(divId) {
	var divToPrint = document.getElementById(divId);

	var popupWin = window.open('', '_blank',
			'width=800,height=800,scrollbars=1');
	popupWin.document.open();
	popupWin.document
			.write('<html xmlns:p="http://primefaces.org/ui"><head><link type="text/css" rel="stylesheet" href="/stylesheet/talentpact/#{identity.currentTheme}.css" /><link type="text/css" rel="stylesheet" href="/stylesheet/talentpact/primefaces.css" /><style>.Overflow_Width{width:100% !important;} .td_outputCol { white-space: normal; word-wrap: break-word; } .ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default{border: 1px solid #d8dcdf !important; background: #eeeeee;}.ui-icon-calendar{background-position: -32px -112px;}.ui-icon-triangle-1-s{background-position: -64px -16px;}.ui-datatable table thead th .ui-sortable-column-icon, .TipContent { display:none; } </style></head><body style="position: relative;padding:10px;" class="colorBackground" onload="window.print();">'
					+ '<div class="center-body-false">'
					+ '<style> .TipContent { display:none; }.center-body-false { width:100% !important; } .ToolTip { font-size:12px; }</style>'
					+ divToPrint.innerHTML
					+ '</div>'
					+ '<div id="MaskedDiv" class ="MaskedDiv" style="position: fixed; top:0; bottom:0; left:0; right:0;" /></body></html>');
	popupWin.document.close();
}
//This method is introduced to select checkbox for only page selection with page row size
function selectOnPage(formId, divId, size){
	
	for(var temp = 0;temp<size;temp++){
		var divIdVal = formId+":"+temp+":"+divId;
		alert(divIdVal);
		document.getElementById(divIdVal).checked=true;
	}

}

function toggleDatatable() {
	var i = $('.ui-row-toggler.ui-icon-circle-triangle-s').length;
	if (i == 1) {
		return;
	}
	$('.ui-row-toggler.ui-icon-circle-triangle-s').trigger('click');
}

function warnResetChanges(){
	
}

//// checking main tab changes
var mainTabSkipCheck = "false";
var mainTabClickIndex = 0;

function selectMainTab(index){
	mainTabClickIndex = index;
	return checkMainTabChanges();
}

function checkMainTabChanges(){
	if(mainTabSkipCheck=="false"){
		var result = checkFormForChanges();
		if(result == false){
			PF('confirmMainTabChangeDialog').show();
		}
		return result;
	}else{
		return true;
	}
}
function checkFormForChanges(){
	if($('.revert').length > 0){
		return false;
	}else{
		return true;
	}
}

function changeMainTabComplete(){
	mainTabSkipCheck = "false";
}

function confirmMainTabLoseChanges(){
	mainTabSkipCheck = "true";
	PF('confirmMainTabChangeDialog').hide();
	PF('mainTabViewWidget').select(mainTabClickIndex);
}

function dontChangeMainTab(){
	PF('confirmMainTabChangeDialog').hide();
	return false;
}

// checking child tab changes
var childTabSkipCheck = "false";
var childTabClickIndex = 0;

function selectChildTab(index){
	childTabClickIndex = index;
	if(index!=1){
		return checkChildTabChanges();
	} else{
		return true;
	}
}

function checkChildTabChanges(){
	if(childTabSkipCheck=="false"){
		var result = checkFormForChanges();
		if(result == false){
			PF('confirmChildTabChangeDialog').show();
		}
		return result;
	}else{
		return true;
	}
}

function changeChildTabComplete(){
	childTabSkipCheck = "false";
}

function confirmChildTabLoseChanges(){
	PF('confirmChildTabChangeDialog').hide();
	childTabSkipCheck = "true";
	PF('childTabViewWidget').select(childTabClickIndex);
}

function dontChangeChildTab(){
	PF('confirmChildTabChangeDialog').hide();
	return false;
}

function unbindunload(){
	$(window).off('beforeunload');
	$(window).onbeforeunload = null;
	window.onbeforeunload = null;
	window.onbeforeunload = undefined;
}

function leftMenuHighlight(labelName){

	try{
		if($('#leftMenuForm div:first.ui-tieredmenu ul.ui-menu-list li:contains(\"'+labelName+'\")').length>0){
			$('li.ui-parent-select','[id="leftMenuForm"]').removeClass('ui-parent-select');
			$('#leftMenuForm div:first.ui-tieredmenu ul.ui-menu-list li:contains(\"'+labelName+'\")').addClass('ui-parent-select');
			$('li','[id="leftMenuForm"]').on("click", function(){
				$('li.ui-parent-select','[id="leftMenuForm"]').removeClass('ui-parent-select');
				$(this).addClass('ui-parent-select');
			});
		}
	} catch(e){
	}

	}


function checkJobDescriptionLength(){
	try{
		if(jobDescriptionMinLength > 0){
		
			if( $("div[id*='jobDescriptionEditDialog'] iframe").length > 0 ){
				
				var jdLength = $("div[id*='jobDescriptionEditDialog'] iframe")[0].contentDocument.body.innerText.replace(/[^0-9a-zA-Z]/g, '').length;
				
				if(jdLength < jobDescriptionMinLength) {
					
					PF('jobDescriptionMinLengthError').show();
					return false;
				}
			}
			else if ($("div[id*='jobDescriptionEditDialog'] textarea#requisition\\:myeditor_input").length > 0){
				
				var jdLength = $("div[id*='jobDescriptionEditDialog'] #requisition\\:myeditor_input")[0].innerText.replace(/[^0-9a-zA-Z]/g, '').length;
				
				if(jdLength < jobDescriptionMinLength) {
					
					PF('jobDescriptionMinLengthError').show();
					return false;
				}
				
			} 
		} else{
			return true;
		}
		
		
	} catch(e){
		console.log('could not calculate length of job description' + e);
	}
	return true;
}

	
	
	/// slimscroll jquery
	
	
	
	(function(f){jQuery.fn.extend({slimScroll:function(h){var a=f.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:0.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:0.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},h);this.each(function(){function r(d){if(s){d=d||
window.event;var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);f(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&m(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function m(d,f,h){k=!1;var e=d,g=b.outerHeight()-c.outerHeight();f&&(e=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),e=Math.min(Math.max(e,0),g),e=0<d?Math.ceil(e):Math.floor(e),c.css({top:e+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());
e=l*(b[0].scrollHeight-b.outerHeight());h&&(e=d,d=e/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),g),c.css({top:d+"px"}));b.scrollTop(e);b.trigger("slimscrolling",~~e);v();p()}function C(){window.addEventListener?(this.addEventListener("DOMMouseScroll",r,!1),this.addEventListener("mousewheel",r,!1),this.addEventListener("MozMousePixelScroll",r,!1)):document.attachEvent("onmousewheel",r)}function w(){u=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),D);c.css({height:u+"px"});
var a=u==b.outerHeight()?"none":"block";c.css({display:a})}function v(){w();clearTimeout(A);l==~~l?(k=a.allowPageScroll,B!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;B=l;u>=b.outerHeight()?k=!0:(c.stop(!0,!0).fadeIn("fast"),a.railVisible&&g.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(A=setTimeout(function(){a.disableFadeOut&&s||(x||y)||(c.fadeOut("slow"),g.fadeOut("slow"))},1E3))}var s,x,y,A,z,u,l,B,D=30,k=!1,b=f(this);if(b.parent().hasClass(a.wrapperClass)){var n=b.scrollTop(),
c=b.parent().find("."+a.barClass),g=b.parent().find("."+a.railClass);w();if(f.isPlainObject(h)){if("height"in h&&"auto"==h.height){b.parent().css("height","auto");b.css("height","auto");var q=b.parent().parent().height();b.parent().css("height",q);b.css("height",q)}if("scrollTo"in h)n=parseInt(a.scrollTo);else if("scrollBy"in h)n+=parseInt(a.scrollBy);else if("destroy"in h){c.remove();g.remove();b.unwrap();return}m(n,!1,!0)}}else{a.height="auto"==a.height?b.parent().height():a.height;n=f("<div></div>").addClass(a.wrapperClass).css({position:"relative",
overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",width:a.width,height:a.height});var g=f("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=f("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?
"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,WebkitBorderRadius:a.borderRadius,zIndex:99}),q="right"==a.position?{right:a.distance}:{left:a.distance};g.css(q);c.css(q);b.wrap(n);b.parent().append(c);b.parent().append(g);a.railDraggable&&c.bind("mousedown",function(a){var b=f(document);y=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);m(0,c.position().top,!1)});
b.bind("mouseup.slimscroll",function(a){y=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",function(a){a.stopPropagation();a.preventDefault();return!1});g.hover(function(){v()},function(){p()});c.hover(function(){x=!0},function(){x=!1});b.hover(function(){s=!0;v();p()},function(){s=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(z=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&
(m((z-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),z=b.originalEvent.touches[0].pageY)});w();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),m(0,!0)):"top"!==a.start&&(m(f(a.start).position().top,null,!0),a.alwaysVisible||c.hide());C()}});return this}});jQuery.fn.extend({slimscroll:jQuery.fn.slimScroll})})(jQuery);



function preventSpecialCharacters(targetInput) {
	
	$(targetInput).on('keypress', function (event) {
		
		var evt = event || window.event;
		var key = evt.keyCode || evt.which;
		
		if(key == 8) {// Backspace allowed
		 return;
		}
		var specialCharacters = ":~`+|;'\"<>/\\";
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		
		if (specialCharacters.indexOf(key) >= 0) {
		   event.preventDefault();
		   return false;
		}
	});
	
	$(targetInput).on('paste', function (e) {
    
		var pastedText = undefined;
		
		if (window.clipboardData && window.clipboardData.getData) { // IE
			pastedText = window.clipboardData.getData('Text');
		} else {
			var clipboardData = (e.originalEvent || e).clipboardData;
			if (clipboardData && clipboardData.getData) {
				pastedText = clipboardData.getData('text/plain');
			}
		}
		if(pastedText != undefined){
			var rx = new RegExp('[<>"\';\+`\:\|~\\\\\/]','g');
			val = pastedText.replace(rx,'');
			if(val != pastedText){
				e.preventDefault();
				return false;		
			}
		}
	});
}

function allowRegexValidation(targetInput, allowRegex){
	
	$(targetInput).on('keypress', function (event) {
		
		var evt = event || window.event;
		var key = evt.keyCode || evt.which;
		
		if(key == 8) {// Backspace allowed
		 return;
		}
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		
		var rx = new RegExp(allowRegex,'g');
		
		if (!rx.test(key)) {
		   event.preventDefault();
		   return false;
		}
	});
	
	$(targetInput).on('paste', function (e) {
    
		var pastedText = undefined;
		
		if (window.clipboardData && window.clipboardData.getData) { // IE
			pastedText = window.clipboardData.getData('Text');
		} else {
			var clipboardData = (e.originalEvent || e).clipboardData;
			if (clipboardData && clipboardData.getData) {
				pastedText = clipboardData.getData('text/plain');
			}
		}
		var rx = new RegExp(allowRegex,'g');
		if(pastedText != undefined){
			if (!rx.test(pastedText)) {
			   e.preventDefault();
			   return false;
			}
		}
	});
	
}