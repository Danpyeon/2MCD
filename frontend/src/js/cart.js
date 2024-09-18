const cart = [
  {
    id: 1,
    name: "밀크앤페퍼 카마라 자켓 토프",
    price: 9500,
    cnt: 1,
  },
  {
    id: 2,
    name: "밀크앤페퍼 카마라 자켓 토프",
    price: 9500,
    cnt: 1,
  },
  {
    id: 3,
    name: "밀크앤페퍼 카마라 자켓 토프",
    price: 9500,
    cnt: 1,
  },
];

let itemList;

loadItemList();
async function loadItemList() {
  let obj = {
    id: getCookies("userCache"),
  };

  // await $.ajax({
  //   type: "post",
  //   url: "http://localhost:3000/info", // 나중에 수정!
  //   data: JSON.stringify(obj),
  //   contentType: "application/json",
  //   success: (res) => {
  //     itemList = res;
  //   },
  //   error: (e) => {
  //     console.error(e);
  //   },
  // });

  itemList = cart;

  makeList();
}

function makeList() {
  let text = "";
  for (let i = 0; i < itemList.length; i++) {
    text += `  <tr class="item">`;
    text += `  <td><input type="checkbox" name="item-sel" id="i${itemList[i].id}" class="cb" name='cb' value=${itemList[i].price} /></td>`;
    text += `  <td>${itemList[i].name}</td>`;
    text += `  <td>${itemList[i].price}원</td>`;
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

$("input[type='checkbox']").on("change", function () {
  if ($(this).is(":checked")) {
    totalPrice += +$(this).val();
  } else {
    totalPrice -= +$(this).val();
  }

  $(".item-cnt").text($("input[type='checkbox']:checked").length);
  $(".total-price").text(totalPrice);
});

function orderItem(isAll, isOrder) {
  if (!isAll && $("input[type='checkbox']:checked").length <= 0) {
    alert("상품을 하나이상 선택해주세요");
    return;
  }

  if (!isOrder) {
    $("input[type='checkbox']:checked").each((i) => {
      let idx = itemList.find((e) => e.id === +$(i).val());
      itemList.splice(idx, 1);
    });

    makeList();
  }

  if (isOrder) {
    alert("주문이 완료되었습니다.");
    location.pathname = `/frontend/src/html/main.html`;
  }
}
