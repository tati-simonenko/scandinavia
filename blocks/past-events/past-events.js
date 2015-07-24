$(document).ready(function() {

 	var slider = $('#my-carousel');
	var sliderItems = slider.children('.slider-item');
	var allWidthSlider = 0, indSlide;

	var activeSlide;
	var activeWidth = [];
	var activePosition = [];
	var activePositionXs = [];
	var marginSlide = 15;

	var sliderPrev = $('#carousel-prev');
	var sliderNext = $('#carousel-next');

	function slideMove(indSlide) {

		var docW = $(window).width();
		//console.log(docW);

		sliderItems.each(function(index){
			if (docW > 767) {
				if( index > indSlide+1 || index < indSlide-1 )
					$(this).css({"opacity": "0.3"});
			} else {
				if( index > indSlide || index < indSlide )
					$(this).css({"opacity": "0.3"});
			} 
		});

		if (docW <= 767) {
			slider.css({"transition": "margin-left 0.5s"});
			slider.css({"margin-left": -(activePosition[indSlide]+activeWidth[indSlide]/2-docW/2)});
		} else {
			slider.css({"transition": "margin-left 0.5s"});
			slider.css({"margin-left": -(activePosition[indSlide]+activeWidth[indSlide]/2-docW/2-marginSlide)});
		}
	}

	function initSliderControls() {
		sliderItems.each(function(index){
	 		$(this).css({"opacity": "1"});
	 	});
	}

	function mySlider() {
		sliderItems.each(function(index){
			allWidthSlider += $(this).outerWidth(true);
			activeWidth.push($(this).outerWidth(true));
			if( $(this).hasClass('active') )
				indSlide = index;
		});
		slider.width(allWidthSlider);

		slideMove(indSlide);
	}

	if ( slider.length ) {
		sliderItems = slider.children('.slider-item');
		sliderItems.each(function(index){
			activePosition.push($(this).offset().left);
		});
		mySlider(); 
	}
	


	sliderPrev.on('click', function(){
		initSliderControls();
		indSlide -= 1;
		console.log(indSlide);
		if (indSlide == -1) {
			indSlide = sliderItems.length-1;
			console.log("if "+indSlide);
		}  
		slideMove(indSlide);
	});
	sliderNext.on('click', function(){
		initSliderControls();
		indSlide += 1;
		console.log(indSlide);
		if (indSlide == sliderItems.length) {
			indSlide = 0;
			console.log("if "+indSlide);
		}  
		slideMove(indSlide);
	});


	$(window).resize(function(){
		activeWidth = [];
		allWidthSlider = 0;
		slider.css({"margin-left": "0"});
		initSliderControls();
  		mySlider();
	});


 
});
