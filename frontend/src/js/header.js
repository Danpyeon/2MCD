window.addEventListener("scroll", () => {
  let top = $(window).scrollTop();
  let header = $(".header-container");
  let inner = $("#inner-header");

  if (top < 700 && header.hasClass("none")) {
    header.removeClass("none");
  }

  if (top >= 200 && top <= 800) {
    header.addClass("minimize");
    header.css("height", "6vw");
    inner.css("margin", " 1vw 2.5vw");
  } else if (top > 800) {
    if (!header.hasClass("none")) header.addClass("none");
  } else if (top < 200 && header.hasClass("minimize")) {
    header.removeClass("minimize");
    header.css("height", "7vw");
    inner.css("margin", "1.5vw 2.5vw");
  }
});

$(document).ready(() => {
  let menu_ball = $("#menu-ball");
  let position;
  $("#menu > li").hover(
    function (event) {
      $(this).addClass("current-menu");
      position = $(".current-menu").position().left + $(this).outerWidth() / 2;
      menu_ball.css("left", position + "px");
    },
    function () {
      $(this).removeClass("current-menu");
    }
  );

  $("#menu").hover(
    function (event) {
      menu_ball.css("display", "block");
    },
    function () {
      menu_ball.css("display", "none");
    }
  );

  let pageUnderline = $(".page-underline");
  $(".myPage").hover(
    function (event) {
      pageUnderline.css("display", "block");
      pageUnderline.css("animation", "showRight 0.2s");
    },
    function () {
      pageUnderline.css("animation", "none");
      pageUnderline.css("display", "none");
    }
  );
});

let lastScroll = 0;
$(window).on("scroll", function () {
  let scrollTop = $(this).scrollTop();

  if (scrollTop > 800) {
    if (scrollTop > lastScroll) {
      // $(".header-container").removeClass("fixed");
      $(".header-container").addClass("minimize");
      $(".header-container").addClass("none");
    } else if (scrollTop <= lastScroll) {
      // $(".header-container").addClass("fixed");
      $(".header-container").addClass("minimize");
      $(".header-container").removeClass("none");
    }
    lastScroll = scrollTop;
  }
});
