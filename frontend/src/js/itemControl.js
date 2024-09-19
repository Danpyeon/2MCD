let itemList;

loadItemList();
async function loadItemList() {
  await $.ajax({
    type: "get",
    url: "http://localhost:3000/itemcontrol", // 나중에 수정!
    success: (res) => {
      itemList = res.data;
    },
    error: (e) => {
      console.error(e);
    },
  });

  makeList();
}

function makeList() {
  let text = "";
  for (let i = 0; i < itemList.length; i++) {
    const blob = new Blob([new Uint8Array(itemList[i].FILE_NAME)], {
      type: "image/jpeg",
    });
    const u = URL.createObjectURL(blob);

    text += `  <tr class="item">`;
    text += `  <td><input type="checkbox" name="item-sel" id="i${itemList[i].ITEM_SEQ}" class="cb" name='cb' value='${itemList[i].ITEM_SEQ}'  /></td>`;
    text += `  <td><img src='${u}' /></td>`;
    text += `  <td>${itemList[i].ITEM_NAME}</td>`;
    text += `  <td>${itemList[i].ITEM_PRICE}원</td>`;
    text += `</tr>`;
  }

  $(".items").html(text);
}

async function deleteItem() {
  let delArr = [];

  if ($("input[type='checkbox']:checked").length <= 0) {
    alert("상품을 하나이상 선택해주세요");
    return;
  }

  $('input[type="checkbox"]:checked').each(function () {
    let idx = itemList.find((e) => e.ITEM_SEQ === +$(this).val());

    delArr.push(idx.ITEM_SEQ);
    itemList.splice(idx, 1);
  });

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/deleteItem", // 나중에 수정!
    data: JSON.stringify(delArr),
    contentType: "application/json",
    success: (res) => {
      if (res.status === 200) alert("삭제되었습니다");
      else alert("삭제 실패 하였습니다");
    },
    error: (e) => {
      alert("삭제 실패 하였습니다");
      console.error("e", e);
    },
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
}

function addItem() {
  location.href = "/frontend/src/html/admin/itemInfo.html?mode=add";
}
