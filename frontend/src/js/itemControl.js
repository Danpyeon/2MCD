const cart = [
  {
    id: 1,
    name: "밀크앤페퍼 카마라 자켓 토프",
    price: 9500,
    img: "/frontend/img/brand/maxbone-magazin-forbes.jpg",
  },
  {
    id: 2,
    name: "밀크앤페퍼 카마라 자켓 토프",
    price: 9500,
    img: "/frontend/img/brand/maxbone-magazin-forbes.jpg",
    cnt: 1,
  },
  {
    id: 3,
    name: "밀크앤페퍼 카마라 자켓 토프",
    price: 9500,
    img: "/frontend/img/brand/maxbone-magazin-forbes.jpg",
    cnt: 1,
  },
];

let itemList;

loadItemList();
async function loadItemList() {
  // await $.ajax({
  //   type: "post",
  //   url: "http://localhost:3000/info", // 나중에 수정!
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
    text += `  <td><input type="checkbox" name="item-sel" id="i${itemList[i].id}" class="cb" name='cb' value=${itemList[i].id} /></td>`;
    text += `  <td><img src='${itemList[i].img}' /></td>`;
    text += `  <td>${itemList[i].name}</td>`;
    text += `  <td>${itemList[i].price}원</td>`;
    text += `</tr>`;
  }

  $(".items").html(text);
}

function deleteItem() {
  if ($("input[type='checkbox']:checked").length <= 0) {
    alert("상품을 하나이상 선택해주세요");
    return;
  }

  $("input[type='checkbox']:checked").each((i) => {
    let idx = itemList.find((e) => e.id === +$(i).val());
    itemList.splice(idx, 1);
  });

  makeList();
}

function editItem() {
  let len = $("input[type='checkbox']:checked").length;
  if (len !== 1) {
    alert("상품을 하나만 선택해주세요");
    return;
  }

  let idx = $("input[type='checkbox']:checked").val();
  location.href = "/frontend/src/html/admin/itemInfo.html?mode=edit&id=" + idx;
  // location.pathname = "/frontend/src/html/admin/itemInfo.html";
  // location.search = "?mode=edit&id=" + idx;
}

function addItem() {
  location.href = "/frontend/src/html/admin/itemInfo.html?mode=add";
  // location.search = "?mode=add";
}
