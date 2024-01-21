

$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	

	var accordion = new Accordion($('#subdown'), false);
});

/* menu */
	$(window).load( function() {

  $(".ninja-btn, .panel-overlay, .panel li a").click( function() {
    $(".ninja-btn, .panel-overlay, .panel").toggleClass("active");
    /* Check panel overlay */
    if ($(".panel-overlay").hasClass("active")) {
      $(".panel-overlay").fadeIn();
    } else {
      $(".panel-overlay").fadeOut();
    }
  }); 
  
});


$(window).on("load resize", function() {
  var menuHeightOffset = $(".panel").find("ul").height() /2;

  $(".panel").find("ul").css({
    "margin-top": -menuHeightOffset
  });
});
/* search */

$('button').click(function (e) {
  $(this).toggleClass('submit');
  $('body').toggleClass('hue');
  $('form').toggleClass('rotate');
  $('input').toggleClass('grow');
  e.preventDefault();

  
});

$('#search').click(function () {
    var keyword = $("input#keyword").val()
    if (keyword != '') {
        window.location.href = 'search.html?keyword=' + keyword;
    }
});


 



	/* background */
	;(function($, window, document, undefined) {

	$.fn.animatedBG = function(options){
		var defaults = {
				colorSet: ['#0F1108', '#0D1F2D', '#32936F', '#984447', '#320A28'],
				speed: 3000
			},
			settings = $.extend({}, defaults, options);

		return this.each(function(){
			var $this = $(this);

			$this.each(function(){
				var $el = $(this),
					colors = settings.colorSet;
				
				function shiftColor() {
					var color = colors.shift();
					colors.push(color);
					return color;
				}

				// initial color
				var initColor = shiftColor();
				$el.css('backgroundColor', initColor);
				setInterval(function(){
					var color = shiftColor();
					$el.animate({backgroundColor: color}, 3000);
				}, settings.speed);
			});
		});
	};

	// Initialize
	$(function(){
		$('.animated_bg').animatedBG();
	});

}(jQuery, window, document));

/* rating page */
$(function () {
  "use strict";
  // toggle password masking
  $('.toggle-mask').on('click', function () {
    var maskToggle = $(this).text();
    var password = $('#password').val();
    if (maskToggle === 'Hide') {
      $(this).text("Show");
      $('#password').replaceWith('<input type="password" id="password" name="password" maxlength="12" autocorrect="off" autocapitalize="off" value=' + password + '>');
    } else if (maskToggle === 'Show') {
      $(this).text("Hide");
      $('#password').replaceWith('<input type="text" id="password" name="password" maxlength="12" autocorrect="off" autocapitalize="off" value=' + password + '>');
    }
  });

  // highlight row on focus
  $('#full-name, #email, #password').focus(function () {
    $(this).parent().addClass('active');
  });
  $('#full-name, #email, #password').focusout(function () {
    $('.active').removeClass('active');
  });
});

/** rating stars **/
$('#starsubmit').children('input[type=button]').click(function(){
  var star = $('input[name=star]:checked', '#ratingsForm').attr('class');
  star = (star != undefined)? star : 'You have to choose a rating from 1 to 5';
  alert(star);
});



