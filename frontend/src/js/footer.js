function contentsOpenClose(c) {
  let contents = $(`.${c} .contents`);
  let arrowBtn = $(`.${c} .arrowBtn`);
  let footerimg = $(".footer-layer");

  if (contents.hasClass("none")) {
    contents.removeClass("none");
    contents.addClass("block");
    footerimg.removeClass("bottom-20");
    footerimg.addClass("bottom-30");
    arrowBtn.css("transform", "rotate(180deg)");
  } else {
    contents.addClass("none");
    contents.removeClass("block");
    footerimg.removeClass("bottom-30");
    footerimg.addClass("bottom-20");
    arrowBtn.css("transform", "rotate(0)");
  }
}
