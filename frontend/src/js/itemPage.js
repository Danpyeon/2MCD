// loadItems();
currentMenu();

function categoryFilter(filter) {
  const params = new URLSearchParams(location.search);
  let search = "page=" + params.get("page");

  search += "&cate=" + filter;
  location.search = search;
}

function brandFilter(filter) {
  const params = new URLSearchParams(location.search);
  let search = "page=" + params.get("page");

  if (!location.search) search += "&cate=all&sort=" + filter;
  else {
    const params = new URLSearchParams(location.search);
    params.set("sort", filter);
    search = params;
  }

  location.search = search;
}

function currentMenu() {
  const params = new URLSearchParams(location.search);
  let crr;

  if (params.get("cate")) {
    crr = $(`#${params.get("cate")}`);
  } else {
    crr = $("#all");
  }

  //카테고리 가져오기
  let menuChildDiv = crr.children("div"); // 자식 테그의 div 불러오기
  menuChildDiv.addClass("hover");

  crr.append(`  <svg
                  width="${crr.width()}"
                  height="3.59"
                  viewBox="0 0 ${crr.width()} 3.59"
                  style="opacity: 1; visibility: inherit"
                >
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-width="2.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M1.4,1.6s5.67.59,23.73.8c18.34,0,23.16-.52,25.47-.65"
                    style="stroke-dashoffset: 0; stroke-dasharray: none"
                  ></path>
                </svg>`);

  let underline = crr.children("svg");

  if (crr.position() && underline) {
    underline.css("left", "0px");
    underline.css("top", "30px");
  }
}

// api 완성되면 수정함!!!!
// 아이템 필터링해서 불러오기
async function loadItems() {
  const params = new URLSearchParams(location.search);
  let obj = {
    category: params.get("cate") ? params.get("cate") : "all",
    sort: params.get("sort") ? params.get("sort") : "all",
    page: params.get("page"),
  };
  let itemList;

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/send1", // 나중에 수정!
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {
      itemList = res;
    },
    error: (e) => {
      itemList = e;
    },
  });

  makeItemList(itemList);
}

function openSubMenu() {
  let sub = $(".sub-brand-menu");

  if (sub.css("visibility") === "hidden") sub.css("visibility", "visible");
  else sub.css("visibility", "hidden");
  console.log(sub.is(":hidden"));
}

// 상품 아이템 만들기!
function makeItemList(itemList) {
  let str;

  for (let i = 0; i < itemList.length; i++) {
    str += `  <div class="item">`;
    str += `  <a href="/frontend/src/html/item/itemDetail.html?id=${itemList[i].id}">`;
    str += `    <img src="${itemList[i].img}" />`;
    str += `    <div class="item-brand">${itemList[i].brand}</div>`;
    str += `    <div class="item-name">${itemList[i].title}</div>`;
    str += `  </a>`;
    str += `</div>`;
  }
}
