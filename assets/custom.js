/*-----------------------------------------------------------------------------/
/ Custom Theme JS
/-----------------------------------------------------------------------------*/

// Insert any custom theme js here...




mobileOnlySlider(".subscribe-step-wrapper", true, false, 767);
function mobileOnlySlider($slidername, $dots, $arrows, $breakpoint) {
	var slider = $($slidername); 
	var settings = {
		mobileFirst: true,
		autoplay: true,
        dots: $dots,
		arrows: $arrows,
		responsive: [
			{
				breakpoint: $breakpoint,
				settings: "unslick"
			}
		]
	};

	slider.slick(settings);
	$(window).on("resize", function () {
		if ($(window).width() > $breakpoint) {
			return;
		}
		if (!slider.hasClass("slick-initialized")) {
			return slider.slick(settings);
		}
	});
} 

mobileOnlySliderIngredient(".select-ingredient__content-items", true, false, 767);
function mobileOnlySliderIngredient($slidername, $dots, $arrows, $breakpoint) {
	var slider = $($slidername);
	var settings = {
		mobileFirst: true,
		autoplay: true,
        dots: $dots,
		arrows: $arrows,
		responsive: [
			{
				breakpoint: $breakpoint,
				settings: "unslick"
			}
		]
	};

	slider.slick(settings);
	$(window).on("resize", function () {
		if ($(window).width() > $breakpoint) {
			return;
		}
		if (!slider.hasClass("slick-initialized")) {
			return slider.slick(settings);
		}
	});
} 