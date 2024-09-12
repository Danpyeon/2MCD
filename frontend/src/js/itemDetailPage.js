function openImg() {
  let img = $(".describe-imgs");
  let arrowBtn = $(".arrowBtn");

  if (img.hasClass("show-img")) {
    img.removeClass("show-img");
    img.addClass("hide-img");
    arrowBtn.attr("src", "/frontend/img/icon/openBtn.png");
  } else {
    img.addClass("show-img");
    img.removeClass("hide-img");
    arrowBtn.attr("src", "/frontend/img/icon/closeBtn.png");
  }
}
