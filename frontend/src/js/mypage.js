loadInfo();
async function loadInfo() {
  let cart;
  let id = getCookies("userCache");

  let obj = {
    id: id,
  };

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/mypageCart",
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {
      cart = res.data;
    },
    error: (e) => {
      itemList = e;
    },
  });

  $(".cart > .item-list").html(makeHistoryList(cart));
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

function makeHistoryList(list) {
  if (list === undefined || list === null || !list) {
    return "<div class='item'><span>관심상품이 없습니다.</span></div>";
  }

  let text = "";
  let max = list.length > 2 ? 2 : list.length;
  for (let i = 0; i < max; i++) {
    text += "<div class='item'>";
    text += `<span>${list[i].item_seq}</span>`;
    text += `<span>${cuttingText(list[i].item_name)}</span>`;
    text += `<span>${list[i].item_price}원</span>`;
    text += `<span>1</span>`;
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
