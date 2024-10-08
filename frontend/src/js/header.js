isLogin();
function isLogin() {
  let login = getCookies("userCache");
  // let login = "admin";
  let link = $(".my-page-text");
  let inner = "";

  if (login === null) {
    inner += '<div class="login-btn">Login</div>';
    link.attr("href", "/frontend/src/html/sign/signIn.html");
  } else if (login === "admin") {
    inner += '<div class="login-btn">Admin</div>';
    link.attr("href", "/frontend/src/html/admin/itemControl.html");
  } else {
    inner += `<div class="mypage-text">My Page</div>`;
    link.attr("href", "/frontend/src/html/mypage/mypage.html");
    $(".myPage").addClass("sub-menu-open");
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

$(".search-bar .search-input-field").on(
  "propertychange change keyup paste input",
  () => {
    let deleteBtn = $(".delete-btn");

    if ($(".search-bar .search-input-field").val()) {
      deleteBtn.css("visibility", "visible");
    } else {
      deleteBtn.css("visibility", "hidden");
    }
  }
);

function clearInput() {
  $(".search-bar .search-input-field").val("");
  $(".search-bar .delete-btn").css("visibility", "hidden");
}

function isBrand(item) {
  switch (item) {
    case "mlikandpepper":
    case "mlik and pepper":
    case "mlik & pepper":
    case "mlik &pepper":
    case "mlik & pepper":
    case "mlik& pepper":
    case "밀크앤페퍼":
    case "밀크 앤페퍼":
    case "밀크 앤 페퍼":
    case "밀크앤 페퍼":
      location.search = "?page=1&sort=milkandpepper";
      location.path = "/frontend/src/html/item/product.html";
      return true;

    case "maxbone":
    case "맥스본":
      location.search = "?page=1&sort=maxbone";
      location.href =
        "/frontend/src/html/item/product.html?page=1&sort=maxbone";
      return true;

    case "pet so chic":
    case "petso chic":
    case "pet sochic":
    case "petsochic":
    case "펫소시크":
    case "펫 소시크":
    case "펫 소 시크":
    case "펫소 시크":
      location.search = "?page=1&sort=petsochic";
      location.href =
        "/frontend/src/html/item/product.html?page=1&sort=petsochic";
      return true;

    default:
      break;
  }

  return false;
}

function goSearch() {
  let search = $(".search-bar .search-input-field").val();

  if (isBrand(search.toLowerCase())) return;

  if (!search) return;
  location.pathname = "/frontend/src/html/item/search.html";
  location.search = "?item=" + search;
}

$("#search-user-wrapper > .search-btn").on("click", () => {
  $(".search-bar").css("display", "block");
});

function closeSearch() {
  // $(".search-bar").css("animation", "show-search-bar 0.3s reverse");
  $(".search-bar").css("display", "none");
}
