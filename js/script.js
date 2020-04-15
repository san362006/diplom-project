$(function(){
  let $body = $('body');
  let $container = $('.modal-container');
  let $modal = $('.modal-callback');
  let $mobileContainer = $('.header__nav-mobile');
  let $mobileMenu = $('.nav__list-mobile');
  let $mobileControls = $('.mobile-controls');


  //Плавный переход по якорной ссылке
  $('a[href^="#"]').on('click', function(evt) {
    evt.preventDefault();
    var target = $(this).attr("href");
    var position = $(target).offset().top;
        
    $('html, body').animate({scrollTop: position}, 1000);
  });

  // Функция отключения скролла
  function disableScroll() {
    let pagePosition = window.scrollY;
    $body.addClass('fixed');
    $body.attr('data-position', pagePosition);
    $body.css({
      top: -pagePosition + 'px'
    })
  };

  // Функция включения скролла
  function enableScroll() {
    let pagePosition = parseInt($body.attr('data-position'), 10);
    $body.css({
      top: 'auto'
    });
    $body.removeClass('fixed');
    window.scrollTo(0, pagePosition)
    $body.removeAttr('data-position');
  }

  //Функция показа мобильного меню
  function showMenu() {
    $mobileContainer.addClass('nav-mobile-open');
    $mobileMenu.animate({left: 0});
    $mobileControls.toggleClass('hamburger');
    $mobileControls.toggleClass('close');
    disableScroll();
  }

  //Функция скрытия мобильного меню
  function hideMenu() {
    $mobileContainer.removeClass('nav-mobile-open');
    $mobileMenu.animate({left: '-320px'});
    $mobileControls.toggleClass('close');
    $mobileControls.toggleClass('hamburger');
    enableScroll();
  }

  // Функция закрытия MODAL
  function closeModal (){
    $container.fadeOut(400, enableScroll);
    $modal.animate({
      top: '40%'
    })
  }

  //Открываем-закрываем мобильное меню
  $mobileControls.click(function(){
    if (this.className == 'mobile-controls hamburger') {
      showMenu();
    } else {
      hideMenu();
    }
  });

  //Закрываем меню по клику на пункт мобильного меню
  $('.nav__link-mobile').click(function(){
    if ($mobileControls.css('display') !== 'none'){
      hideMenu();
    }
  });

  // Открываем MODAL
  $('.modal-open').click(function(evt){
    evt.preventDefault();
    $container.fadeIn(400, disableScroll);
    $modal.animate({
      top: '50%'
    })
  });

  // Закрываем MODAL по клику на пустой области
  $container.click(function(evt){
    if(evt.target == this) {
      $(this).fadeOut();
      closeModal();
    }
  });

  // Закрываем MODAL по клику по кнопке закрыть
  $('.modal-close').click(function(){
    closeModal();
  })

  // Маска ввода номера телефона
  $('input[type="tel"]').inputmask({"mask": "+7 (999) 999-99-99"});

  // Валидация формы
  $('form').each(function () {
    $(this).validate({
      errorPlacement(error, element) {
        return true;
      },

      focusInvalid: false,
      rules: {
        Телефон: {
          required: true,
        },
        Имя: {
          required: true,
        }
      },

      submitHandler(form) {
        let th = $(form);

        $.ajax({
          type: 'POST',
          url: 'mail.php',
          data: th.serialize(),
        }).done(() => {
          th.trigger('reset');
          closeModal();
        });

        return false;
      }
    });
  });
});

//Инициализация слайдера
var mySwiper = new Swiper('.swiper-container', {
  speed: 500,
  slidesPerView: 3,
  spaceBetween: 30,
  loop: 'true',

  navigation: {
    nextEl: '.swiper__control_arrow-right',
    prevEl: '.swiper__control_arrow-left',
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },

  breakpoints: {
    1020: {
      slidesPerView: 1,
      spaceBetween: 30
    },

    1280: {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: 'false'
    }
  },
});
