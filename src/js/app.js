if (module.hot) {
  module.hot.accept();
}

$(function(){
 	var isOpen = false;
 	var slide = '';
 	var slides = $('.js-slide');
 	var videos = $('.js-story');

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

	var slider = $('.js-slides').flipbox({
		vertical: false,
	});
	
	function showText(id) {
		$('.section--show').removeClass('section--show');
		slide = id;
		$(`#${id}__text`).addClass('section--show');
	}

	// goto next
	function nextSlide () {
		var id = parseInt(slide.replace(/\D+/ig, ''), 10);
		id += 1;
		if(slide.startsWith('img')){
			id = (id > 6) ? 1 : id;
			id = `img${id}`;
		} 
		if(slide.startsWith('video')){
			id = (id > 4) ? 1 : id
			id = `video${id}`;
		} 
		showText(id);
		return slider.flipbox('next');
	}
	// back to previous
	function prevSlide () {
		var id = parseInt(slide.replace(/\D+/ig, ''), 10);
		id -= 1;
		if(slide.startsWith('img')){
			id = (id < 1) ? 6 : id;
			id = `img${id}`;
		} 
		if(slide.startsWith('video')){
			id = (id < 1) ? 4 : id
			id = `video${id}`;
		} 
		showText(id);
		return slider.flipbox('prev', true);
	}
	// goto a specified slide
	function goTo(id) {
		showText(id);
		var index = $.map(slides, el => el.id).indexOf(id);
		return slider.flipbox('jump', index)
	}

	var mc = new Hammer($('.js-slides')[0]);
	mc.on("swipeleft", nextSlide);
	mc.on("swiperight", prevSlide);

	$('.js-slideshow-forward').on('click', nextSlide);
	$('.js-slideshow-backward').on('click', prevSlide);

	$(window).on('resize', function() {
		slider.flipbox('resize');
	})

 	videos.on('ended', '.js-slide__video', nextSlide);


	$(window).on('popstate', route);
	route();
});
