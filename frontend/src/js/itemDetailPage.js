function openImg() {
  let img = $(".describe-imgs");
  let arrowBtn = $(`.img-open-btn .arrowBtn`);

  if (img.hasClass("show-img")) {
    img.removeClass("show-img");
    img.addClass("hide-img");
    arrowBtn.css("transform", "rotate(0)");
  } else {
    img.addClass("show-img");
    img.removeClass("hide-img");
    arrowBtn.css("transform", "rotate(180deg)");
  }
}

function showImg() {
  let imgs = $(".item-img img");
  let bigDiv = $(".show-big-img");
  let srcs =
    '<button class="show-big-img-close-btn" onclick="closeBigImg()" >⨉</button>';

  for (let i = 0; i < imgs.length; i++) {
    srcs += `<img class="big-imgs" src="${imgs[i].src}" />`;
  }

  console.log(srcs);

  bigDiv.html(srcs);
  bigDiv.css("display", "block");
  $(".item-info-wrapper").css("display", "none");
}

function showGuide(src) {
  let bigDiv = $(".show-big-img");
  let srcs = '<span class="guide-text">SIZE GUIDE</span>';
  srcs +=
    '<button class="show-big-img-close-btn" onclick="closeBigImg()">⨉</button>';
  srcs += `<img class="guide-imgs" src="${src}" />`;

  bigDiv.html(srcs);
  bigDiv.css("display", "block");
  bigDiv.css("position", "fixed");
  $("body").css("overflow-y", "hidden");
}

function closeBigImg() {
  $(".show-big-img").css("display", "none");
  $(".show-big-img").css("position", "absolute");
  $("body").css("overflow-y", "auto");
  $(".item-info-wrapper").css("display", "flow-root");
}

function openShare() {
  $(".share-menu").css("display", "block");
}

function closeShare() {
  $(".share-menu").css("display", "none");
}

// 아래부터는 나중에 수정!!!!
// loadInfo();
async function loadInfo() {
  const params = new URLSearchParams(location.search);
  let id = params.get("id");
  let obj = { id: id };
  let itemInfo;

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/send1", // 나중에 수정!
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {
      itemInfo = res;
    },
    error: (e) => {
      itemInfo = e;
    },
  });

  makeItemPage(itemInfo);
}

function makeItemPage(item) {}
