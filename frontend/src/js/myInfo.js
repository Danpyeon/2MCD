let info = {
  id: "adsf",
  name: "kkk",
  nickname: "asdf",
  email: "asdf@gmail.com",
  phone: "01012341234",
};

loadInfo();
async function loadInfo() {
  let data;
  // await $.ajax({
  //   type: "post",
  //   url: "http://localhost:3000/mypage", // 나중에 수정!
  //   success: (res) => {
  //     data = res;
  //   },
  //   error: (e) => {
  //     itemList = e;
  //   },
  // });

  data = info;

  $(".user-id").text(data.id);
  $(".user-name").text(data.name);
  $(".user-nickname").val(data.nickname);
  $(".user-email").val(data.email);
  $(".user-phone").text(data.phone);
}

async function sendChangeInfo(event) {
  event.preventDefault();

  let obj = {
    pw: $(".user-pw").val(),
    nickname: $(".user-nickname").val(),
    email: $(".user-email").val(),
  };
  let result;

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/info", // 나중에 수정!
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {
      result = res;
    },
    error: (e) => {
      itemList = e;
    },
  });

  if (result.status === 200) {
    alert("성공적으로 변경되었습니다.");
  } else {
    alert("변경에 실패하였습니다.");
  }
}
