let itemId;
let isCreate = false;

loadInfo();
async function loadInfo() {
  const params = new URLSearchParams(location.search);
  let mode = params.get("mode");

  if (mode === "add" || !mode) return;

  itemId = params.get("id");

  let obj = {
    id: itemId,
  };
  let info;

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/editItemInfo",
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {
      info = res.data[0];
      itemId = info.ITEM_SEQ;
    },
    error: (e) => {
      // itemList = e;
    },
  });

  $("select[name='top']").val(info.TOP);
  insertDetailSelect();
  $("select[name='detail']").val(info.DETAIL);
  $("select[name='brand']").val(info.BRAND);
  $(".item-name").val(info.ITEM_NAME);
  $(".item-price").val(info.ITEM_PRICE);
  $(".item-desc").val(info.ITEM_MATERIAL);

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/editItemHashtag",
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {
      info = res.data;
    },
    error: (e) => {
      // itemList = e;
    },
  });

  $(".item-tag").val(makeHashtagStr(info));
}

insertDetailSelect();
function insertDetailSelect() {
  let top = $('select[name="top"]').val();
  let text = "";

  if (top === "Outdoor") {
    text += '<option value="springsummer">봄여름의류</option>';
    text += '<option value="fallwinter">가을겨울의류</option>';
    text += '<option value="harness">하네스</option>';
    text += '<option value="collar">목줄</option>';
    text += '<option value="lead">리드줄</option>';
    text += '<option value="accessories">액서서리</option>';
    text += '<option value="bag">이동가방</option>';
  } else {
    text += '<option value="living">리빙</option>';
    text += '<option value="toy">장난감</option>';
    text += '<option value="cat">고양이</option>';
  }

  $('select[name="detail"]').html(text);
}

function makeHashtagStr(tags) {
  let res = "";

  tags.map((t) => {
    res += `${t.hashtag_name},`;
  });

  res = res.slice(0, -1);
  return res;
}

async function tryUpload(event) {
  event.preventDefault();

  let item = $(".item-img")[0];
  let desImg = $(".item-desc-img")[0];
  let res;
  const wait = (timeToDelay) =>
    new Promise((resolve) => setTimeout(resolve, timeToDelay));

  if (item.files.length === 0 || desImg.files.length === 0) {
    alert("파일을 선택해주세요");
    return;
  }

  res = await updateDefaultInfo();
  if (res) res = await updatePriceInfo();
  if (res) res = await deleteImg();
  if (res) res = await updateImgInfo();
  if (res) res = await deleteTag();
  if (res) res = await updateTagInfo();
}

async function updateDefaultInfo() {
  let obj = {
    top: $('select[name="top"]').val(),
    detail: $('select[name="detail"]').val(),
    brand: $('select[name="brand"]').val(),
    name: $(".item-name").val(),
    desc: $(".item-desc").val(),
  };

  if (itemId) obj["id"] = itemId;

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/updateItemInfoDefault",
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {},
    error: (e) => {
      alert("상품 등록 실패");
      return false;
      console.error(e);
    },
  });

  return true;
}

async function getItemId() {
  let id;
  isCreate = true;

  await $.ajax({
    type: "get",
    url: "http://localhost:3000/getLastItemId",
    success: (res) => {
      id = res.data[0].item_seq;
    },
    error: (e) => {
      alert("상품 등록 실패");
      console.error(e);
      return false;
    },
  });

  return id;
}

async function deleteTag() {
  itemId = itemId ? itemId : await getItemId();
  let obj = {
    id: itemId,
  };

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/deleteTag",
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {},
    error: (e) => {
      alert("상품 등록 실패");
      return false;

      console.error(e);
    },
  });

  return true;
}

async function updateTagInfo() {
  if (!$(".item-tag").val()) return;

  itemId = itemId ? itemId : await getItemId();
  let obj = {
    tag: $(".item-tag").val().split(","),
    id: itemId,
  };

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/updateItemInfoTag",
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {},
    error: (e) => {
      alert("상품 등록 실패");
      return false;
      console.error(e);
    },
  });
  return true;
}

async function updatePriceInfo() {
  itemId = itemId ? itemId : await getItemId();
  let obj = {
    price: $(".item-price").val(),
    id: itemId,
    isCreate: isCreate,
  };

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/updateItemInfoPrice",
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {},
    error: (e) => {
      alert("상품 등록 실패");
      return false;

      console.error(e);
    },
  });

  return true;
}

async function updateImgInfo() {
  itemId = itemId ? itemId : await getItemId();
  let item = $(".item-img")[0];
  let desImg = $(".item-desc-img")[0];

  const fd = new FormData();
  fd.append("image", item.files[0]);
  fd.append("id", itemId);
  fd.append("isCreate", isCreate);

  const fd2 = new FormData();
  fd2.append("image", desImg.files[0]);
  fd2.append("id", itemId);
  fd2.append("isCreate", isCreate);

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/updateItemInfoImg",
    data: fd,
    processData: false,
    contentType: false,
    success: (res) => {},
    error: (e) => {
      alert("상품 등록 실패");
      console.error(e);
      return false;
    },
  });

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/updateItemInfoImg",
    data: fd2,
    processData: false,
    contentType: false,
    success: (res) => {
      alert("상품 등록 성공");
    },
    error: (e) => {
      alert("상품 등록 실패");
      console.error(e);
      return false;
    },
  });

  return true;
}

async function deleteImg() {
  itemId = itemId ? itemId : await getItemId();
  let obj = {
    id: itemId,
  };

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/deleteImg",
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {},
    error: (e) => {
      alert("상품 등록 실패");
      return false;

      console.error(e);
    },
  });

  return true;
}
