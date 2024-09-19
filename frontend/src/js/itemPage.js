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

  sortSetting(params.get("sort"));
}

function sortSetting(sort) {
  let text = "";

  switch (sort) {
    case "petsochic":
      text = "펫소시크";
      break;
    case "maxbone":
      text = "맥스본";
      break;
    case "milkandpepper":
      text = "밀크앤페퍼";
      break;

    default:
      text = "All Brands";
      break;
  }

  $(".brand-menu").html(text + '<b class="button">▾</b>');
}

// api 완성되면 수정함!!!!
// 아이템 필터링해서 불러오기
loadItems();
async function loadItems() {
  const params = new URLSearchParams(location.search);
  let path = location.pathname.split("/");

  let obj = {
    topCategory: path[path.length - 1].slice(0, -5),
    category: params.get("cate") ? params.get("cate") : "all",
    sort: params.get("sort") ? params.get("sort") : "all",
    page: params.get("page"),
  };
  let itemList;

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/inoutdoor", // 나중에 수정!
    data: JSON.stringify(obj),
    contentType: "application/json",
    dataType: "json",
    success: (res) => {
      itemList = res;
      console.log(res);
    },
    error: (e) => {
      // itemList = e;
      console.error(e);
    },
  });

  // makeItemList(itemList);
}

function openSubMenu() {
  let sub = $(".sub-brand-menu");

  if (sub.css("visibility") === "hidden") sub.css("visibility", "visible");
  else sub.css("visibility", "hidden");
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

makePageButton();
async function makePageButton() {
  const params = new URLSearchParams(location.search);
  let now = params.get("page");
  let itemCnt;
  let pageCnt;
  let btns = "";
  let obj = { cate: params.get("cate"), sort: params.get("sort") };

  // await $.ajax({
  //   type: "post",
  //   url: "http://localhost:3000/send1", // 나중에 수정!
  //   data: JSON.stringify(obj),
  //   contentType: "application/json",
  //   success: (res) => {
  //     itemCnt = res;
  //   },
  //   error: (e) => {
  //     console.error(e);
  //   },
  // });

  itemCnt = 90;
  pageCnt = itemCnt / 18;

  if (pageCnt <= 1) return;

  if (now >= 2) {
    btns += `<button onclick="movePage(1)"><b><<</b></button>`;
    btns += `<button onclick="movePage(${now - 1})"><b><</b></button>`;
  }

  for (let i = 0; i < pageCnt; i++) {
    if (i + 1 === +now)
      btns += `<button onclick="movePage(${i + 1})" class="on">${
        i + 1
      }</button>`;
    else btns += `<button onclick="movePage(${i + 1})">${i + 1}</button>`;
  }

  if (now < pageCnt) {
    btns += `<button onclick="movePage(${now - 1})"><b>></b></button>`;
    btns += `<button onclick="movePage(${pageCnt})"><b>>></b></button>`;
  }

  $(".page-button").html(btns);
}

function movePage(page) {
  const params = new URLSearchParams(location.search);

  params.set("page", page);
  location.search = params;
}
