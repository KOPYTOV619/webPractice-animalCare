$(document).ready(function(){
    $('.our-pet-block__slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: true,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="./img/arrow_left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="./img/arrow_right.svg"></button>',
      });
   
    $('ul.catalog-block__tab').on('click', 'li:not(.catalog-block__tabs__active)', function() {
      $(this)
        .addClass('catalog-block__tabs__active').siblings().removeClass('catalog-block__tabs__active')
        .closest('.catalog-block').find('.catalog-block__tab-img').removeClass('catalog-block__tab-img__active').eq($(this).index()).addClass('catalog-block__tab-img__active');
    });

    //modal
    $('[data-modal=donation]').on('click', function(){
      $('.overlay, #donation').fadeIn('slow');
    });
    $('[data-modal=contacts]').on('click', function(){
      $('.overlay, #contacts').fadeIn('slow');
    });
    $('.modal__close').on('click', function(){
      $('.overlay, #donation, #contacts, #thanks').fadeOut('slow');
    });
    
    function validForm(form){
      $(form).validate({
        rules:{
          name:"required",
          email: {
            required: true,
            email: true
          },
          phone:"required",
          
        },
        messages: {
          name: "Please specify your name",
          email: {
            required: "We need your email address to contact you",
            email: "Your email address must be in the format of name@domain.com"
          }
        }
      });
    };
    validForm('#contacts .form');
    validForm('#donation .form');

    $('input[name=phone]').mask("+9 (999) 999-99-99");

    $('.form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#contacts, #donation').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('.form').trigger('reset');
        });
        return false;
    });

    new WOW().init();

    });

