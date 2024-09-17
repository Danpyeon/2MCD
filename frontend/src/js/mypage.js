const history = [
  {
    ordernumber: 20222,
    name: "밀크앤페퍼 카마라 자켓 토프",
    price: 9500,
    cnt: 1,
  },
  {
    ordernumber: 20222,
    name: "밀크앤페퍼 카마라 자켓 토프",
    price: 9500,
    cnt: 1,
  },
];

const interests = [
  {
    name: "밀크앤페퍼 카마라 자켓 토프",
    price: 9500,
  },
  {
    name: "밀크앤페퍼 카마라 자켓 토프",
    price: 9500,
  },
];

const review = [
  {
    name: "밀크앤페퍼 카마라 자켓 토프",
    review: "sjansjan rnldudnj~",
  },
  {
    name: "밀크앤페퍼 카마라 자켓 토프",
    review: "sjansjan rnldudnj~",
  },
];

const cart = [
  {
    name: "밀크앤페퍼 카마라 자켓 토프",
    price: 9500,
    cnt: 1,
  },
  {
    name: "밀크앤페퍼 카마라 자켓 토프",
    price: 9500,
    cnt: 1,
  },
];

loadInfo();
async function loadInfo() {
  let itemList;

  // await $.ajax({
  //   type: "post",
  //   url: "http://localhost:3000/mypage", // 나중에 수정!
  //   contentType: "application/json",
  //   success: (res) => {
  //     itemList = res;
  //   },
  //   error: (e) => {
  //     itemList = e;
  //   },
  // });

  $(".history-cnt").text(history.length);
  $(".inter-cnt").text(interests.length);
  $(".review-cnt").text(review.length);

  // $(".history-cnt").text(itemList.history.length);
  // $(".inter-cnt").text(itemList.interests.length);
  // $(".review-cnt").text(itemList.review.length);

  // $(".history > item-list").html(makeHistoryList(itemList.history));
  // $(".interests > item-list").html(makeHistoryList(itemList.interests));
  // $(".review > item-list").html(makeHistoryList(itemList.review));
  // $(".cart > item-list").html(makeHistoryList(itemList.cart));
  $(".history > .item-list").html(makeHistoryList(history));
  $(".interests > .item-list").html(makeHistoryList(interests));
  $(".review > .item-list").html(makeHistoryList(review));
  $(".cart > .item-list").html(makeHistoryList(cart));
}

function makeHistoryList(list) {
  if (!list) {
    return "<span>관심상품이 없습니다.</span>";
  }

  let text = "";
  for (let i = 0; i < list.length; i++) {
    text += "<div class=item>";
    if ("ordernumber" in list[i]) text += `<span>${list[i].ordernumber}</span>`;
    text += `<span>${list[i].name}</span>`;
    if ("price" in list[i]) text += `<span>${list[i].price}원</span>`;
    if ("cnt" in list[i]) text += `<span>${list[i].cnt}</span>`;
    if ("review" in list[i])
      text += `<span>${cuttingText(list[i].review)}</span>`;
    text += "</div>";
  }

  return text;
}

function cuttingText(text) {
  return text.substr(0, 7) + "...";
}

function movePage(url) {
  location.pathname = `/frontend/src/html/mypage/${url}.html`;
}
