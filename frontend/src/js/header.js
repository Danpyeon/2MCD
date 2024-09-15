isLogin();
function isLogin() {
  let login = getCookies("userCache");
  let link = $(".myPage");
  let inner = "";

  if (login === null) {
    inner += '<span class="login-btn">Login</span>';
    link.attr("href", "/frontend/src/html/sign/signIn.html");
  } else {
    inner += `  <span class="mypage-text">My Page</span>
              <svg
                class="page-underline"
                width="100"
                height="8.14"
                viewBox="0 0 100 8.14"
              >
                <path
                  fill="none"
                  stroke="#000"
                  stroke-width="5.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.75,4.54s44.75.83,61.63.88c37,.09,94.57-1.66,102.18-2.64"
                  style="stroke-dashoffset: 0; stroke-dasharray: none"
                ></path>
              </svg>`;
    link.attr("href", "/frontend/src/html/myPage/myPage.html");
  }

  link.html(inner);
}

function getCookies(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

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

  let pageUnderline = $(".myPage .page-underline");
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
      $(".header-container").addClass("minimize");
      $(".header-container").addClass("none");
    } else if (scrollTop <= lastScroll) {
      $(".header-container").addClass("minimize");
      $(".header-container").removeClass("none");
    }
    lastScroll = scrollTop;
  }
});

$(".search-input-field").on("propertychange change keyup paste input", () => {
  let deleteBtn = $(".delete-btn");

  if ($(".search-input-field").val()) {
    deleteBtn.css("visibility", "visible");
  } else {
    deleteBtn.css("visibility", "hidden");
  }
});

$(".delete-btn").on("click", () => {
  $(".search-input-field").val("");
  $(".delete-btn").css("visibility", "hidden");
});

$(".search-input .search-btn").on("click", () => {
  let search = $(".search-input-field").val();

  if (!search) return;
  location.pathname = "/frontend/src/html/item/search.html?item=" + search;
});

$("#search-user-wrapper > .search-btn").on("click", () => {
  $(".search-bar").css("display", "block");
});

function closeSearch() {
  $(".search-bar").css("display", "none");
}
