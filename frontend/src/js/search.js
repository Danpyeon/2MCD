$(".search-page-bar .search-input-field").on(
  "propertychange change keyup paste input",
  () => {
    let deleteBtn = $(".search-page-bar .delete-btn");

    if ($(".search-page-bar .search-input-field").val()) {
      deleteBtn.css("visibility", "visible");
    } else {
      deleteBtn.css("visibility", "hidden");
    }
  }
);

function deleteInput() {
  $(".search-page-bar .search-input-field").val("");
  $(".search-page-bar .delete-btn").css("visibility", "hidden");
}

function searchItem() {
  let search = $(".search-page-bar .search-input-field").val();

  if (!search) return;

  location.pathname = "/frontend/src/html/item/search.html";
  location.search = "?item=" + search;
}

let page = 1;
let item;
loadSearchItem();
async function loadSearchItem() {
  const params = new URLSearchParams(location.search);
  item = params.get("item");
  let obj = {
    page: page,
    item: item,
  };
  let itemList;

  $(".search-page-bar .search-input-field").val(item);
  $(".search-title .search-item-title").text(item);
  $(".search-page-bar .delete-btn").css("visibility", "visible");

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/search", // 나중에 수정!
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {
      itemList = res;
      if (res.count === 0) {
        $(".result-wrapper").html(`<div class="kor search-failed">
            <b> "${item}"을(를) 찾지 못했어요.. 다른 키워드로 검색해보세요! </b>
          </div>
          <img class="no-cat" src="/frontend/img/layout/search-cat.gif" />
          `);
        return;
      } else if (res.count <= 5) {
        $(".btn-container").css("display", "none");
      }

      $(".search-item-count").text(itemList.count);
    },
    error: (e) => {
      itemList = e;
    },
  });

  let text = "";
  let list = itemList.item;

  for (let i = 0; i < list.length; i++) {
    text += `  <div class="item">`;
    text += `    <a href="/frontend/src/html/item/itemDetail.html?id=${list[i].id}">`;
    text += `      <img src="${list[i].img}" />`;
    text += `      <div class="item-info">`;
    text += `        <div class="brand">${list[i].brand}</div>`;
    text += `        <div class="item-name">${list[i].name}</div>`;
    text += `      </div>`;
    text += `    </a>`;
    text += `  </div>`;
  }

  $(".item-list").html(text);
}

async function addItemList() {
  page += 1;
  let obj = {
    page: page,
    item: item,
  };
  let itemList;

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/search", // 나중에 수정!
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {
      itemList = res;
    },
    error: (e) => {
      itemList = e;
    },
  });

  let text = "";
  let list = itemList.item;

  for (let i = 0; i < list.length; i++) {
    text += `  <div class="item">`;
    text += `    <a href="/frontend/src/html/item/itemDetail.html?id=${list[i].id}">`;
    text += `      <img src="${list[i].img}" />`;
    text += `      <div class="item-info">`;
    text += `        <div class="brand">${list[i].brand}</div>`;
    text += `        <div class="item-name">${list[i].name}</div>`;
    text += `      </div>`;
    text += `    </a>`;
    text += `  </div>`;
  }

  $(".item-list").append(text);
}
