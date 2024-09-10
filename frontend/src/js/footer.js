function contentsOpenClose() {
  let contents = $("#contents");
  let arrowBtn = $("#arrowBtn");
  let footerimg = $(".footer-layer");

  if (contents.attr("class") === "none") {
    contents.removeClass("none");
    contents.addClass("block");
    footerimg.removeClass("bottom-20");
    footerimg.addClass("bottom-30");
    arrowBtn.attr("src", "/frontend/img/icon/closeBtn.png");
  } else {
    contents.addClass("none");
    contents.removeClass("block");
    footerimg.removeClass("bottom-30");
    footerimg.addClass("bottom-20");
    arrowBtn.attr("src", "/frontend/img/icon/openBtn.png");
  }
}
