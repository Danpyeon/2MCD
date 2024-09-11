$(document).ready(() => {
  let child;
  let frame;
  $(".video-inner").on({
    mouseenter: function () {
      child = $(this).children("a");
      frame = $(this).find("iframe");

      child.css("visibility", "inherit");
      child.css("opacity", "1");
      frame.css("filter", "brightness(0.5)");
    },
    mouseleave: function () {
      child.css("opacity", "0");
      child.css("visibility", "hidden");
      frame.css("filter", "none");
    },
  });
});

function movieOn(src) {
  $(".movie-on iframe").prop("src", src);
  $(".movie-on").css("visibility", "visible");
}

function closeMovie() {
  $(".movie-on").css("visibility", "hidden");
}
