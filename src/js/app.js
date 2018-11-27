if (module.hot) {
  module.hot.accept();
}

$(function(){
 	var isOpen = false;
 	var slide = '';
 	var slides = $('.js-slides').children();

 	function openSlideshow() {
 		isOpen = true;
 		$(document.body).addClass('no-scroll');
	 	$('.js-main-content').addClass('slideshow');
 	}

 	function closeSlideshow() {
 		isOpen = false;
 		$(document.body).removeClass('no-scroll');
	 	$('.js-main-content').removeClass('slideshow');
	 	window.location.hash = '';
 	}

 	function route() {
 		var hash = window.location.hash.replace('#!', '');

 		if (hash.startsWith('video') || hash.startsWith('img')) {
 			slide = hash;
 			openSlideshow();
 			goTo(hash);
 		} else {
 			closeSlideshow();
 			slide = '';
 		}
 	}

	$('.js-close-slideshow').on('click', closeSlideshow);
	// var slider = $('.js-slides').flipbox({
	// 	vertical: false,
	// });
	
	// goto next
	function nextSlide () {
		debugger;
		return slider.flipbox('next');
	}
	// back to previous
	function prevSlide () {
		return slider.flipbox('prev')
	}
	// goto a specified slide
	function goTo(id) {
		var index = $.map(slides, el => el.id).indexOf(id);
		return slider.flipbox('jump', index)
	}

 	$('.js-slides').on('ended', '.js-slide__video', nextSlide);


	$(window).on('popstate', route);
	route();
});
