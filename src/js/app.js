if (module.hot) {
  module.hot.accept();
}

$(function(){
 	var isOpen = false;
 	var slide = '';
 	var story = '';
 	var slides_tpl = $('#js-slides').detach().html();
 	var video_tpl = $('#js-stories').detach().html();
 	var slides = $('.js-slide');
 	var videos = $('.js-story');
 	var slider_img = $('.js-slides');
 	var slider_video = $('.js-stories');
 	var current_story = null;
	

 	function openSlideshow(isStory) {
 		isOpen = true;
 		$(document.body).addClass('no-scroll');
	 	$('.js-main-content').addClass('slideshow');
	 	$('.slider').toggleClass('slider--stories', isStory);
 	}

 	function closeSlideshow() {
 		isOpen = false;
 		stopStory();
 		$('.slider').removeClass('slider--stories');
 		$(document.body).removeClass('no-scroll');
	 	$('.js-main-content').removeClass('slideshow');
	 	$('.section--show').removeClass('section--show');
	 	window.location.hash = '';
 	}

 	function route() {
 		var hash = window.location.hash.replace('#!', '');

 		if (hash.startsWith('img')) {
 			slide = hash;
 			slider_img.html(slides_tpl);
 			slider_video.hide();
 			slider_img.show();
 			setImgNav();
 			openSlideshow(false);
 			goToImg(hash);
 		} else if(hash.startsWith('video')) {
 			story = hash;
 			slider_video.html(video_tpl);
 			slider_video.show();
 			slider_img.hide();
 			setStoryNav()
 			openSlideshow(true);
 			goToVideo(hash);
 		} else {
 			closeSlideshow();
 			slide = '';
 		}
 	}

	$('.js-close-slideshow').on('click', closeSlideshow);
	$(window).on('keydown', (e)=>{
		if(e.key === 'Escape') {
			closeSlideshow()
		}
	})
	
	function showText(id) {
		$('.section--show').removeClass('section--show');
		slide = id;
		$(`.js-${id}__text`).addClass('section--show');
	}

	// goto next
	function nextSlide () {
		var id = parseInt(slide.replace(/\D+/ig, ''), 10);
		id += 1;
		if(slide.startsWith('img')){
			id = (id > 6) ? 1 : id;
			id = `img${id}`;
		} 
		showText(id);
		return goToImg(id);
	}
	// back to previous
	function prevSlide () {
		var id = parseInt(slide.replace(/\D+/ig, ''), 10);
		id -= 1;
		if(slide.startsWith('img')){
			id = (id < 1) ? 6 : id;
			id = `img${id}`;
		} 
		return goToImg(id);
	}
	// goto a specified slide
	function goToImg(id) {
		showText(id);
		$('.slide--open').removeClass('slide--open');
		return $(`#${id}`).addClass('slide--open');
	}

	function stopStory() {
		if (current_story) {
			current_story.pause();
		}
	}

	function goToVideo(id) {
		stopStory();
		story = id;
		videos.hide();
		var el = $(`#${id}`);
		var video = el.children('.js-slide__video');
		el.show();
		video.attr('preload', 'preload');
		video.attr('autoplay', 'autoplay');
		current_story = video[0];
		current_story.play();
	}

	function nextVideo() {
		var id = parseInt(story.replace(/\D+/ig, ''), 10);
		id += 1;
		if (id > 4) {
			return closeSlideshow()
		}
		return goToVideo(`video${id}`);
	}

	function prevVideo() {
		var id = parseInt(story.replace(/\D+/ig, ''), 10);
		id -= 1;
		id = (id < 1) ? 4 : id;
		return goToVideo(`video${id}`);
	}

	function switchImg(e) {
		if(e.key === 'ArrowRight') {
			nextSlide();
		}
		if(e.key === 'ArrowLeft') {
			prevSlide();
		}
	}

	function setImgNav() {
		var mc = new Hammer($('.js-slides')[0]);
		mc.on("swipeleft", nextSlide);
		mc.on("swiperight", prevSlide);

		$('.js-slideshow-forward').off('click');
		$('.js-slideshow-backward').off('click');
		$(window).off('keydown', switchVideo);

		$('.js-slideshow-forward').on('click', nextSlide);
		$('.js-slideshow-backward').on('click', prevSlide);
		$(window).on('keydown', switchImg);
	}

	function switchVideo(e) {
		if(e.key === 'ArrowRight') {
			nextVideo();
		}
		if(e.key === 'ArrowLeft') {
			prevVideo();
		}
	}

	function setStoryNav() {
		var mc = new Hammer($('.js-story')[0]);
		mc.on("swipeleft", nextVideo);
		mc.on("swiperight", prevVideo);

		$('.js-slideshow-forward').off('click');
		$('.js-slideshow-backward').off('click');
		$(window).off('keydown', switchImg);
		$('.js-slideshow-forward').on('click', nextVideo);
		$('.js-slideshow-backward').on('click', prevVideo);
		$(window).on('keydown', switchVideo);
	}

 	$('.js-slide__video').on('ended', nextVideo);


	$(window).on('popstate', route);
	route();
});
