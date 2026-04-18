var $ = jQuery.noConflict();

jQuery(document).ready(function($){



$('.footer-accordion-head').click(function(){

  if($(this).hasClass('active')){
    $('.footer-accordion-body').slideUp();
    $(this).removeClass('active');

  }
  else{
    $('.footer-accordion-head').removeClass('active');
    $(this).addClass('active');
  $('.footer-accordion-body').slideUp();
  $(this).next('.footer-accordion-body').slideDown();

}
  return false;

})



/*=============*/

$(".filter-tag-item").click(function(){
  $(this).addClass("active");
  
})
  
/*==========================*/ 
/* sliders */ 
/*==========================*/
if($('.hero-slider').length > 0){
jQuery('.hero-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  arrows: false, 
  infinite: true, 
  centerMode: false, 
  autoplay: true,
  autoplaySpeed: 3000,
  fade: true,
  speed: 3000,
});
}


if($('.wic-slider').length > 0){
jQuery('.wic-slider').slick({
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots:true,
  arrows: false, 
  infinite: true, 
  centerMode: false, 
});
}  


// if($('.reviw-list').length > 0){
// jQuery('.reviw-list').slick({
//   slidesToShow: 2,
//   slidesToScroll: 1,
//   dots: false,
//   arrows: true, 
//   infinite: true, 
//   centerMode: false, 
//   responsive: [
//   {
//       breakpoint: 991,
//       settings: {
//         arrows:true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         dots:false, 
//         prevArrow: $('.prev'),
//         nextArrow: $('.next') ,  
//         adaptiveHeight: false
//       }
//     },
//    ] 
   
// });
// }

/*==========================*/  
/* Mobile Slider */  
/*==========================*/ 
// var size = 1024; 
// if(window.screen.width < size) {
//   $('.news-post-slider').addClass('news-post-mobile-slider');
//   $('.product-block-slider').addClass('product-mobile-slider');
// }
// else
// {
//   $('.news-post-slider').removeClass('news-post-mobile-slider');
//   $('.product-block-slider').removeClass('product-mobile-slider');
// }
  
var $slider = $('.reviw-list');
var $progressBarLabel = $('.slider__label');

  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) { 
      var calc = ((nextSlide + 1) / (slick.slideCount - 0)) * 100;
      $progressBarLabel.css('width', calc + '%')
  });


  $('.reviw-list').on('init', function(event, slick){
      var calc2 =  100 / slick.slideCount;
      $progressBarLabel.css('width', calc2 + '%')
  });

if($('.reviw-list').length > 0){
jQuery('.reviw-list').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots:false,
  autoplay:false,
  arrows: true,  
  prevArrow: $('.home-review-prev'),
  nextArrow: $('.home-review-next'),
  infinite: true,
  loop:true,
  centerMode: false, 
  responsive: [
    
   {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:false,
        dots:false,
        arrows: true, 
        adaptiveHeight: true
      }
    },
    {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 376,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
  ]
});
}  
  
/*==========================*/  
/* Mobile Slider */  
/*==========================*/ 
var $slider = $('.product-block-slider');
 var $progressBarLabel = $('.slider__label');

  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) { 
      var calc = ((nextSlide + 1) / (slick.slideCount - 0)) * 100;
      $progressBarLabel.css('width', calc + '%')
  });


  $('.product-block-slider').on('init', function(event, slick){
      var calc2 =  100 / slick.slideCount;
      $progressBarLabel.css('width', calc2 + '%')
  });

if($('.product-block-slider').length > 0){
jQuery('.product-block-slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  autoplay:false,
  arrows: false, 
  prevArrow: $('.product-block-prev'),
  nextArrow: $('.product-block-next'),
  infinite: true, 
  centerMode: false, 
  responsive: [
    
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:false,
        dots:false,
        arrows: true, 
        adaptiveHeight: true
      }
    },
    {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 376,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
  ]
});
}
/*==========================*/  
/* Mobile Slider */  
/*==========================*/ 
if($('.insta-img-list').length > 0){
jQuery('.insta-img-list').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false, 
  infinite: true, 
  centerMode: false, 
  responsive: [
    {
      breakpoint: 5000,
      settings: "unslick"
    },
    {
      breakpoint: 767,
      settings: {
        arrows:false,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots:false, 
        adaptiveHeight: false
      }
    }
  ]
});
}


/*==========================*/  
/* Mobile Slider */  
/*==========================*/ 

  
/*==========================*/  
/* Mobile Slider */  
/*==========================*/ 
if($('.post-slider').length > 0){
jQuery('.post-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  autoplay:false,
  arrows: false, 
  infinite: true, 
  centerMode: false, 
  responsive: [
    {
      breakpoint: 5000,
      settings: "unslick"
    },
    {
      breakpoint: 768,
      settings: {
        arrows:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots:false,          
        adaptiveHeight: true
      }
    }
  ]
});
}

/*==========================*/  
/* Mobile Slider */  
/*==========================*/ 
var $slider = $('.news-post-slider');
 var $progressBarLabel = $('.slider__label');

  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) { 
      var calc = ((nextSlide + 1) / (slick.slideCount - 0)) * 100;
      $progressBarLabel.css('width', calc + '%')
  });


  $('.news-post-slider').on('init', function(event, slick){
      var calc2 =  100 / slick.slideCount;
      $progressBarLabel.css('width', calc2 + '%')
  });

if($('.news-post-slider').length > 0){
jQuery('.news-post-slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  autoplay:false,
  arrows: true, 
  prevArrow: $('.news-post-prev'),
  nextArrow: $('.news-post-next'),
  infinite: true, 
  centerMode: false, 
  
  responsive: [
    {
          breakpoint: 1201,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrows: true, 
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 376,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        } 
  ]
});
}

/*==========================*/  
/* product-review-slider */  
/*==========================*/ 
var $slider = $('.product-review-slider');
 var $progressBarLabel = $('.slider__label');

  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) { 
      var calc = ((nextSlide + 1) / (slick.slideCount - 0)) * 100;
      $progressBarLabel.css('width', calc + '%')
  });


  $('.product-review-slider').on('init', function(event, slick){
      var calc2 =  100 / slick.slideCount;
      $progressBarLabel.css('width', calc2 + '%')
  });

if($('.product-review-slider').length > 0){
jQuery('.product-review-slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  autoplay:false,
  arrows: true, 
  prevArrow: $('.product-review-prev'),
  nextArrow: $('.product-review-next'),
  infinite: true, 
  centerMode: false, 
  responsive: [
    {
          breakpoint: 1201,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 990,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 376,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
  ]
});
}

/*==========================*/  
/* product-grid.custom */  
/*==========================*/ 
    $(document).ready(function () {
    
    
    var found = setInterval(function(){
        if( $(".product-grid.custom ").length ){
            clearInterval(found);
        }

    var $slider = $('.product-grid.custom ');
 var $progressBarLabel = $('.slider__label');

  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) { 
      var calc = ((nextSlide + 1) / (slick.slideCount - 0)) * 100;
      $progressBarLabel.css('width', calc + '%')
  });


  $('.product-grid.custom ').on('init', function(event, slick){
      var calc2 =  100 / slick.slideCount;
      $progressBarLabel.css('width', calc2 + '%')
  });
    
        // slick slider code
        $(".product-grid.custom ").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  autoplay:false,
  arrows: false, 
  prevArrow: $('.product-block-prev'),
  nextArrow: $('.product-block-next'),
  infinite: true, 
  centerMode: false, 
  responsive: [
    
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:false,
        dots:false,
        arrows: true, 
        adaptiveHeight: true
      }
    },
    {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 376,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }       
       
      ]
        })
        
    }, 200);
});








/*==========================*/  
/* sc-img-slider */  
/*==========================*/ 
if($('.sc-img-slider').length > 0){
jQuery('.sc-img-slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  arrows: false, 
  infinite: true, 
  centerMode: true, 
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,  
        adaptiveHeight: false
      }
    }
  ]
});
}

/*==========================*/  
/* filter modal  */  
/*==========================*/ 
$('#openFilterBox').click(function(){
  $('body').addClass('filter-open');
})
$('.filter-close-btn').click(function(){
  $('body').removeClass('filter-open');
})


/*==========================*/  
/* Mobile Slider */  
/*==========================*/ 
// if($('.reviw-list').length > 0){
// jQuery('.reviw-list').slick({
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   dots: false,
//   arrows: true, 
//   infinite: true,
//   prevArrow: $('.prev1'),
//   nextArrow: $('.next1') ,  
//   responsive: [
//     {
//       breakpoint: 5000,
//       settings: "unslick"
//     },
//     {
//       breakpoint: 991,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,          
//         adaptiveHeight: true
//       }
//     },
//     {
//       breakpoint: 767,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     }
//   ]
// });
// }
/*==========================*/  
/* Mobile Slider */  
/*==========================*/ 
if($('.mobile-slider').length > 0){
jQuery('.mobile-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  arrows: false, 
  infinite: true, 
  responsive: [
    {
      breakpoint: 5000,
      settings: "unslick"
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,          
        adaptiveHeight: true
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
}

/*==========================*/  
/* Logo With Text Slider */  
/*==========================*/ 
if($('.custom-slider').length > 0){
jQuery('.custom-slider').slick({
  slidesToShow: 1.3,
  arrows:false,
  dots:false,
  swipe:false,
  infinite:true,
  speed: 6000,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  draggable:false,
  accessibility: false, 
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});
}  
/*==========================*/
/* Header fix */
/*==========================*/
var scroll = $(window).scrollTop();
if (scroll >= 10) {
    $("body").addClass("fixed");
} else {
    $("body").removeClass("fixed");
}


});


$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
        $("body").addClass("fixed");
    } else {
        $("body").removeClass("fixed");
    }
});

$(document).on('change', '.dynamic_select', function () {
    var value = $(this).val();
    $(this).find('option[value="' + value + '"]').attr("selected", "selected");
});


$(function() { 
    $('#turmeric-sort').change(function(){
        if($('#turmeric-sort').val() == 'turmeric1') {
            $('#turmeric1').removeClass('d-none'); 
            $('#turmeric2').addClass('d-none'); 
            $('#turmeric3').addClass('d-none');
            $('#turmeric4').addClass('d-none');
            $('#turmeric5').addClass('d-none');
        } else if($('#turmeric-sort').val() == 'turmeric2') {
            $('#turmeric1').addClass('d-none'); 
            $('#turmeric2').removeClass('d-none'); 
            $('#turmeric3').addClass('d-none'); 
            $('#turmeric4').addClass('d-none');
            $('#turmeric5').addClass('d-none');
        }else if($('#turmeric-sort').val() == 'turmeric3') {
            $('#turmeric1').addClass('d-none'); 
            $('#turmeric2').addClass('d-none'); 
            $('#turmeric3').removeClass('d-none'); 
            $('#turmeric4').addClass('d-none');
            $('#turmeric5').addClass('d-none');
        }else if($('#turmeric-sort').val() == 'turmeric4') {
            $('#turmeric1').addClass('d-none'); 
            $('#turmeric2').addClass('d-none'); 
            $('#turmeric3').addClass('d-none'); 
            $('#turmeric4').removeClass('d-none');
            $('#turmeric5').addClass('d-none');
        }else if($('#turmeric-sort').val() == 'turmeric5') {
            $('#turmeric1').addClass('d-none'); 
            $('#turmeric2').addClass('d-none'); 
            $('#turmeric3').addClass('d-none'); 
            $('#turmeric4').addClass('d-none');
            $('#turmeric5').removeClass('d-none');
        }
    });
});

if($('.featured-product-slider').length > 0){
jQuery('.featured-product-slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  autoplay:false,
  arrows: true, 
  prevArrow: $('.prev1'),
  nextArrow: $('.next1') ,
  infinite: true, 
  centerMode: false, 
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:false,
        dots:false,
        arrows: true, 
        adaptiveHeight: true
      }
    },
    {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 376,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
  ]
});
}

$(document).ready(function() {
  $('.tab-item-link').on('click', function() {
    $('.featured-product-slider').slick('refresh');
  });
});






