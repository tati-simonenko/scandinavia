jQuery(document).ready(function(){

  $('.bxslider').bxSlider();
  $('.bxslider2').bxSlider();

  $('.bxslider2').bxSlider({
    minSlides: 1,
    maxSlides: 3,
    moveSlides: 1,
    slideMargin: 10
  });

  // $(".event-detail-special__show").click(function(){
  //   $(this).parent().find(".event-detail-special__tooltip").toggleClass("open");
  // })

  $(".mobile-menu__burger").click(function(){
    $(this).parent().parent().find(".mobile-menu").toggleClass("mobile-menu__open");
    $(this).parent().find(".mobile-link__list").toggleClass("open");
  })

  // owl


//   $('.owl-carousel').owlCarousel({
//     items:2,
//     loop:true,
//     margin:40,
//     nav:true,
//     dots:true,
//     responsive:{
//         0:{
//             autoWidth: true,
//             items:2,
//             center: true
//         },
//         770:{
//             autoWidth: true,
//             items:2,
//             center: true,
//             margin:2
//         },
//         1199:{
//             autoWidth:true,
//             items:2,
//             center: true,
//             margin:2,
//             nav:true
//         }
//     }
// });

var owl = $("#owl-demo");
 
  owl.owlCarousel({
      items : 10, //10 items above 1000px browser width
      itemsDesktop : [1000,5], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,3], // betweem 900px and 601px
      itemsTablet: [600,2], //2 items between 600 and 0
      itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
  });
 
  // Custom Navigation Events
  
           
$(".next").click(function(){
  $(this).css("color","red");
    owl.trigger('owl.next');
  })
  $(".prev").click(function(){
    owl.trigger('owl.prev');
  })

});

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


  // tooltip

  // $('#event-detail-special__show').click(function(event) {
  //       $(this).parent().find('#event-detail-special__tooltip').toggleClass("open");
  //   });
  //   $(document).click(function (event) {
  //       if ($(event.target).closest('#event-detail-special__tooltip').length == 0 && $(event.target).attr('id') != 'event-detail-special__show') {
  //           $(this).find('#event-detail-special__tooltip').toggleClass("open");
  //       }
  //   });

// event-item

$('.event-detail-special__show').click(function(e) {
    var $message = $('.event-detail-special__tooltip');
 
    if ($message.css('display') != 'block') {
        $(this).parent().find('.event-detail-special__tooltip').show();
 
        var firstClick = true;
        $(document).bind('click.myEvent', function(e) {
            if (!firstClick && $(e.target).closest('.event-detail-special__tooltip').length == 0) {
                $message.hide();
                $(document).unbind('click.myEvent');
            }
            firstClick = false;
        });
    }
 
    e.preventDefault();
});


// map

$('.footer-map__link').click(function(e) {
    var $message = $('.footer-map__link--tooltip');
 
    if ($message.css('display') != 'block') {
        $(this).parent().find('.footer-map__link--tooltip').show();
 
        var firstClick = true;
        $(document).bind('click.myEvent', function(e) {
            if (!firstClick && $(e.target).closest('.footer-map__link--tooltip').length == 0) {
                $message.hide();
                $(document).unbind('click.myEvent');
            }
            firstClick = false;
        });
    }
 
    e.preventDefault();
});

$('.event-detail-special__show').on("tap",function(e){
    var $message = $('.event-detail-special__tooltip');
 
    if ($message.css('display') != 'block') {
        $(this).parent().find('.event-detail-special__tooltip').show();
 
        var firstClick = true;
        $(document).bind('click.myEvent', function(e) {
            if (!firstClick && $(e.target).closest('.event-detail-special__tooltip').length == 0) {
                $message.hide();
                $(document).unbind('click.myEvent');
            }
            firstClick = false;
        });
    }
 
    e.preventDefault();
});


// map

$('.footer-map__link').on("tap",function(e){
    var $message = $('.footer-map__link--tooltip');
 
    if ($message.css('display') != 'block') {
        $(this).parent().find('.footer-map__link--tooltip').show();
 
        var firstClick = true;
        $(document).bind('click.myEvent', function(e) {
            if (!firstClick && $(e.target).closest('.footer-map__link--tooltip').length == 0) {
                $message.hide();
                $(document).unbind('click.myEvent');
            }
            firstClick = false;
        });
    }
 
    e.preventDefault();
});


 
});

