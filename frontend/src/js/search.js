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

function isDetailCategory(item) {
  switch (item) {
    case "봄":
    case "여름":
      return "springsummer";
    case "가을":
    case "겨울":
      return "fallwinter";
    case "목줄":
      return "collar";
    case "하네스":
      return "harness";
    case "리드줄":
      return "lead";
    case "액서서리":
      return "accessories";
    case "리빙":
      return "living";
    case "장난감":
      return "toy";
    case "고양이":
      return "cat";

    default:
      return "none";
  }
}

function isBrand(item) {
  switch (item) {
    case "mlikandpepper":
    case "mlik and pepper":
    case "mlik & pepper":
    case "mlik &pepper":
    case "mlik & pepper":
    case "mlik& pepper":
    case "밀크앤페퍼":
    case "밀크 앤페퍼":
    case "밀크 앤 페퍼":
    case "밀크앤 페퍼":
      location.search = "?page=1&sort=milkandpepper";
      location.path = "/frontend/src/html/item/product.html";
      return true;

    case "maxbone":
    case "맥스본":
      location.search = "?page=1&sort=maxbone";
      location.href =
        "/frontend/src/html/item/product.html?page=1&sort=maxbone";
      return true;

    case "pet so chic":
    case "petso chic":
    case "pet sochic":
    case "petsochic":
    case "펫소시크":
    case "펫 소시크":
    case "펫 소 시크":
    case "펫소 시크":
      location.search = "?page=1&sort=petsochic";
      location.href =
        "/frontend/src/html/item/product.html?page=1&sort=petsochic";
      return true;

    default:
      break;
  }

  return false;
}

let page = 1;
let item;
let itemList;

loadSearchItem();
async function loadSearchItem() {
  const params = new URLSearchParams(location.search);
  item = params.get("item");

  if (isBrand(item.toLowerCase())) return;

  let obj = {
    page: page,
    item: item,
    detailCategory: isDetailCategory(item),
  };

  $(".search-page-bar .search-input-field").val(item);
  $(".search-title .search-item-title").text(item);
  $(".search-page-bar .delete-btn").css("visibility", "visible");

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/search", // 나중에 수정!
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {
      itemList = res.data;

      if (res.status === 404) {
        $(".result-wrapper").html(`<div class="kor search-failed">
            <b> "${item}"을(를) 찾지 못했어요.. 다른 키워드로 검색해보세요! </b>
          </div>
          <img class="no-cat" src="/frontend/img/layout/search-cat.gif" />
          `);
        return;
      } else if (itemList.length <= 5) {
        $(".btn-container").css("display", "none");
      }
    },
    error: (e) => {
      console.error("e", e);
    },
  });

  $(".search-item-count").text(itemList.length);
  makeList();
}

async function addItemList() {
  page += 1;

  const params = new URLSearchParams(location.search);
  item = params.get("item");

  let obj = {
    page: page,
    item: item,
    detailCategory: isDetailCategory(item),
  };

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/search", // 나중에 수정!
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {
      itemList = res.data;

      if (itemList.length <= 5) {
        $(".btn-container").css("display", "none");
      }
    },
    error: (e) => {
      console.error("e", e);
    },
  });

  makeList();
}

function makeList() {
  let text = "";
  let list = itemList;

  if (!list) return;

  for (let i = 0; i < list.length; i++) {
    const blob = new Blob([new Uint8Array(list[i].FILE_NAME)], {
      type: "image/jpeg",
    });
    const u = URL.createObjectURL(blob);

    text += `  <div class="item">`;
    text += `    <a href="/frontend/src/html/item/itemDetail.html?id=${list[i].ITEM_SEQ}">`;
    text += `      <img src="${u}" />`;
    text += `      <div class="item-info">`;
    text += `        <div class="brand">${list[i].BRAND}</div>`;
    text += `        <div class="item-name">${list[i].ITEM_NAME}</div>`;
    text += `      </div>`;
    text += `    </a>`;
    text += `  </div>`;
  }

  $(".item-list").append(text);
}
