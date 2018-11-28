if (module.hot) {
  module.hot.accept();
}

$(function(){
 	var isOpen = false;
 	var slide = '';
 	var story = '';
 	var slides = $('.js-slide');
 	var videos = $('.js-story');
 	var slider_img = $('.js-slides');
 	var slider_video = $('.js-stories');
	slider_video.hide();

 	function openSlideshow() {
 		isOpen = true;
 		$(document.body).addClass('no-scroll');
	 	$('.js-main-content').addClass('slideshow');
 	}

 	function closeSlideshow() {
 		isOpen = false;
 		$(document.body).removeClass('no-scroll');
	 	$('.js-main-content').removeClass('slideshow');
	 	$('.section--show').removeClass('section--show');
	 	window.location.hash = '';
 	}

 	function route() {
 		var hash = window.location.hash.replace('#!', '');

 		if (hash.startsWith('img')) {
 			slide = hash;
 			slider_video.hide();
 			slider_img.show();
 			setImgNav();
 			openSlideshow();
 			goToImg(hash);
 		} else if(hash.startsWith('video')) {
 			story = hash;
 			slider_video.show();
 			slider_img.hide();
 			setStoryNav()
 			openSlideshow();
 			goToVideo(hash);
 		} else {
 			closeSlideshow();
 			slide = '';
 		}
 	}

	$('.js-close-slideshow').on('click', closeSlideshow);

	var slider = slider_img.flipbox({
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
	function goToImg(id) {
		showText(id);
		var index = $.map(slides, el => el.id).indexOf(id);
		return slider.flipbox('jump', index)
	}

	function goToVideo(id) {
		story = id;
		videos.hide();
		var el = $(`#${id}`);
		var video = el.children('.js-slide__video');
		el.show();
		video.attr('preload', 'preload');
		video.attr('autoplay', 'autoplay');
		video[0].play();
	}

	function nextVideo() {
		console.log('nextVideo');	
	}

	function prevVideo() {
		console.log('prevVideo');
	}

	function setImgNav() {
		var mc = new Hammer($('.js-slides')[0]);
		mc.on("swipeleft", nextSlide);
		mc.on("swiperight", prevSlide);

		$('.js-slideshow-forward').off();
		$('.js-slideshow-backward').off();
		$('.js-slideshow-forward').on('click', nextSlide);
		$('.js-slideshow-backward').on('click', prevSlide);
	}

	function setStoryNav() {
		var mc = new Hammer($('.js-story')[0]);
		mc.on("swipeleft", nextVideo);
		mc.on("swiperight", prevVideo);

		$('.js-slideshow-forward').off();
		$('.js-slideshow-backward').off();
		$('.js-slideshow-forward').on('click', nextVideo);
		$('.js-slideshow-backward').on('click', prevVideo);
	}

 	videos.on('ended', '.js-slide__video', nextVideo);


	$(window).on('popstate', route);
	route();
});
