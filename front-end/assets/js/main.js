// Animations
new WOW().init();

// Site Scroll
checkHeaderScrollState();
$(window).scroll(function() {
  checkHeaderScrollState();
});

function checkHeaderScrollState() {
  if ($(window).scrollTop() > 8) {
    $(".dropdown-section").addClass("d-xl-block");
    $(".header").addClass("header-fixed");
  } else {
    $(".header").removeClass("header-fixed");
    $(".dropdown-section").removeClass("d-xl-block");
  }
}


$('.dropdown a').click(function() {
  $(".dropdown ul").toggleClass("d-none");
});

// Fale conosco open / close
$('.fale-conosco.modal-full-close').click(function() {
  $(".fale-conosco.modal-full").toggleClass("modal-full-hide");
});
$('.fale-conosco-btn').click(function() {
  $(".fale-conosco.modal-full").toggleClass("modal-full-hide");
});

// Menu open / close
$('.hamburger').click(function() {
  $(".menu--overlay.modal-full").toggleClass("modal-full-hide");
});
$('.menu--overlay .modal-full-close').click(function() {
  $(".menu--overlay.modal-full").toggleClass("modal-full-hide");
});


// Busca` / close
$('.search').click(function() {
  $(".busca.modal-full").toggleClass("modal-full-hide");
});
$('.busca .modal-full-close').click(function() {
  $(".busca.modal-full").toggleClass("modal-full-hide");
});

// Owl Carousel
$('.owl-carousel').owlCarousel({
    loop: true,
    autoplay:true,
    autoplayHoverPause: true,
    margin:0,
    // nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        },
        1280:{
            items:2
        }
    }
})
