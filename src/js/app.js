if (module.hot) {
  module.hot.accept();
}

$(function(){
 	var isOpen = false;
 	var slide = '';

 	function openSlideshow() {
 		isOpen = true;
 		$(document.body).css({overflow: 'hidden'});
	 	$('.js-main-content').addClass('slideshow');
 	}

 	function closeSlideshow() {
 		isOpen = false;
 		$(document.body).css({overflow: 'auto'});
	 	$('.js-main-content').removeClass('slideshow');
	 	window.location.hash = '';
 	}

 	function route() {
 		var hash = window.location.hash.replace('#!', '');

 		if (hash.startsWith('video') || hash.startsWith('img')) {
 			slide = hash;
 			openSlideshow();
 		} else {
 			closeSlideshow();
 			slide = '';
 		}
 	}

	$(window).on('popstate', route);
	$('.js-close-slideshow').on('click', closeSlideshow);
	$('.js-slides').flipbox({
		vertical: false,
		autoplay: true, 
		autoplayWaitDuration: 3000,
	});
});
