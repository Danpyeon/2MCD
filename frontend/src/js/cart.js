let itemList;

loadItemList();
async function loadItemList() {
  // let cart;
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
      itemList = res.data;
    },
    error: (e) => {
      itemList = e;
    },
  });

  makeList();
}

function makeList() {
  let text = "";
  for (let i = 0; i < itemList.length; i++) {
    text += `  <tr class="item">`;
    text += `  <td><input type="checkbox" name="item-sel" id="${itemList[i].item_seq}" class="cb" name='cb' value=${itemList[i].item_price} /></td>`;
    text += `  <td>${itemList[i].item_name}</td>`;
    text += `  <td>${itemList[i].item_price}원</td>`;
    text += `  <td>1</td>`;
    text += `</tr>`;
  }

  $("tbody").html(text);
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

let itemCnt = 0;
let totalPrice = 3000;

$(document).on("change", "input[type='checkbox']", function () {
  if ($(this).is(":checked")) {
    totalPrice += +$(this).val();
  } else {
    totalPrice -= +$(this).val();
  }

  $(".item-cnt").text($("input[type='checkbox']:checked").length);
  $(".total-price").text(totalPrice);
});

async function orderItem(isAll, isOrder) {
  let delArr = [];

  if (!isAll && $("input[type='checkbox']:checked").length <= 0) {
    alert("상품을 하나이상 선택해주세요");
    return;
  }

  if (!isOrder) {
    $('input[type="checkbox"]:checked').each(function () {
      let idx = itemList.find((e) => e.item_seq === +$(this).attr("id"));
      delArr.push(idx.item_seq);
      itemList.splice(idx, 1);
    });

    let id = getCookies("userCache");
    let obj = {
      id: id,
      list: delArr,
    };

    await $.ajax({
      type: "post",
      url: "http://localhost:3000/deleteCart",
      data: JSON.stringify(obj),
      contentType: "application/json",
      success: (res) => {
        if (!isOrder) alert("삭제되었습니다");
      },
      error: (e) => {
        if (!isOrder) alert("삭제 실패 하였습니다");
        console.error("e", e);
      },
    });

    makeList();
  }

  if (isOrder) {
    alert("주문이 완료되었습니다.");
    location.pathname = `/frontend/src/html/main.html`;
  }
}
