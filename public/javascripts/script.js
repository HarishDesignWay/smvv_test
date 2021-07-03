window.onload = function () {
    $('#pageLoader').fadeOut("slow");
}

$('#certificatesSlider').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 1500,
    autoplay: true,
    responsive: [{
        breakpoint: 768,
        settings: {
            slidesToShow: 3,
        }
    },
    {
        breakpoint: 575,
        settings: {
            slidesToShow: 2,
        }
    }
    ]
})

//#TESTIMONIAL SLIDER
$('#testimonialSlider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [{
        breakpoint: 1931,
        settings: {
            slidesToShow: 2,
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 1,
        }
    },
    {
        breakpoint: 575,
        settings: {
            slidesToShow: 1,
        }
    },
    ]
})


//#CALCULATE DIV VALUE
var rightContentWidth;
var BodyWidth;
var leftMargin;

function calculateWidth() {
    rightContentWidth = $(".site-container").width() + 15;
    BodyWidth = $(".body-wrapper").width();
    marginValue = ((BodyWidth - rightContentWidth) / 2) + 10;
    console.log(BodyWidth, "BodyWidth");
    if (BodyWidth >= 768 && BodyWidth <= 1931) {
        if ($(".right-aligned-conatiner-desk").hasClass('container')) {
            $(".right-aligned-conatiner-desk").removeClass('container')
        }

        $(".right-aligned-conatiner-desk").css('paddingLeft', marginValue + "px");
    } else {
        console.log("else");
        $(".right-aligned-conatiner-desk").css('paddingLeft', "15px");
        $(".right-aligned-conatiner-desk").addClass('container')
    }
    $(".right-aligned-conetnt").css('marginRight', "-" + marginValue + "px");
}

calculateWidth();
$(window).resize(function () {
    calculateWidth();
});

//#NAVBAR SCROLL
var scroll = $(window).scrollTop();
var navbar = $("#siteNav")
// $('.navbar-spacer').css('height', navbar.height())
function navscroll() {
    if (scroll >= 30) {
        navbar.addClass("shadow");
    } else {
        navbar.removeClass("shadow");
    }
}
navscroll()

//#NAVBAR TOGGLE FUNCTION
$('.navbar-toggler').click(function () {
    if ($('.navbar-toggler').attr('aria-expanded') == "false")
        navbar.addClass("shadow");
    else {
        navscroll()
    }
})


$(window).scroll(function () {
    scroll = $(window).scrollTop();
    navscroll()

})

// #Password toggler
$('.password-toggler').click(function () {
    $(this).toggleClass('eyeOpen');
    if ($('.password-toggler').hasClass('eyeOpen')) {
        $('.loginPassword').attr('type', 'text')
    } else {
        $('.loginPassword').attr('type', 'password')
    }
})