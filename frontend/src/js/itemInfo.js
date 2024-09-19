let dump = {
  brand: "PET SO CHIC",
  name: "어쩌구 저쩌구 대충 김",
  price: 9500,
  desc: "엄청납니다",
  tag: "#asdf",
};

loadInfo();
async function loadInfo() {
  const params = new URLSearchParams(location.search);
  let mode = params.get("mode");

  if (mode === "add" || !mode) return;

  let id = params.get("id");

  let obj = {
    id: id,
  };
  let info;

  // await $.ajax({
  //   type: "post",
  //   url: "http://localhost:3000/search", // 나중에 수정!
  //   data: JSON.stringify(obj),
  //   contentType: "application/json",
  //   success: (res) => {
  //     info = res;
  //   },
  //   error: (e) => {
  //     // itemList = e;
  //   },
  // });

  info = dump;

  $(".item-brand").val(info.brand);
  $(".item-name").val(info.name);
  $(".item-price").val(info.price);
  $(".item-desc").val(info.desc);
  $(".item-tag").val(info.tag);
}

async function tryUpload(event) {
  event.preventDefault();
  console.log(1);

  let obj = {
    brand: $(".item-brand").val(),
    name: $(".item-name").val(),
    price: $(".item-price").val(),
    desc: $(".item-desc").val(),
    tag: $(".item-tag").val(),
  };
  let item = $(".item-img")[0];
  let desImg = $(".item-desc-img")[0];

  if (item.files.length === 0 || desImg.files.length === 0) {
    alert("파일을 선택해주세요");
    return;
  }

  const itemImgFd = new FormData();
  const itemDesFd = new FormData();
  itemImgFd.append("image", item.files[0]);
  itemDesFd.append("image", desImg.files[0]);

  obj["itemImg"] = itemImgFd;
  obj["itemDesImg"] = itemDesFd;

  // 확인 로그
  // for (var key of itemImgFd.keys()) {
  //   console.log("key");
  //   console.log(key);
  // }
  // for (var value of itemImgFd.values()) {
  //   console.log("value");
  //   console.log(value);
  // }
  // console.log(obj);

  // await $.ajax({
  //   type: "post",
  //   url: "http://localhost:3000/search", // 나중에 수정!
  //   data: JSON.stringify(obj),
  //   processData: false,
  //   contentType: "application/json",
  //   success: (res) => {
  //     alert("상품 등록 성공");
  //   },
  //   error: (e) => {
  //     alert("상품 등록 실패");

  //     console.error(e);
  //   },
  // });
}
