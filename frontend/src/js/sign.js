// api 생성 후 수정!!

async function tryLogin(event) {
  event.preventDefault();

  // if (!checkFill(true)) {
  //   return;
  // }

  let result;
  let loginData = {
    id: $(".user_id").val(),
    pw: $(".user_pw").val(),
  };

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/login", // 나중에 수정!
    data: JSON.stringify(loginData),
    contentType: "application/json",
    success: (res) => {
      // result = res;

      if (res.status === 200) {
        document.cookie = `userCache=${loginData.id}; path=/`;
        alert("로그인 성공");
        location.href = "/frontend/src/html/main.html"
      }
    },
    error: (e) => {
      console.error(e);
      alert("로그인 실패");
    },
  });

}

// function checkFill(isLogin) {
//   const loginList = {
//     아이디: ".user_id",
//     비밀번호: ".user_pw",
//   };
//   const infoList = {
//     이름: ".user_name",
//     이메일: ".user_email",
//     닉네임: ".user_nickname",
//     휴대전화1: ".user_phone1",
//     휴대전화2: ".user_phone2",
//     휴대전화3: ".user_phone3",
//   };
//   let arr = Object.entries(loginList);

//   for (let i = 0; i < arr.length; i++) {
//     if (!$(arr[i][1]).val()) {
//       alert(`${arr[i][0]}을 입력해주세요`);
//       return false;
//     }
//   }

//   if (isLogin) return true;

//   if ($(".user_pw").val() !== $(".pw_check").val()) {
//     alert("비밀번호가 다릅니다.");
//     return;
//   }

//   arr = Object.entries(infoList);

//   for (let i = 0; i < arr.length; i++) {
//     if (!$(arr[i][1]).val()) {
//       alert(`${arr[i][0]}을 입력해주세요`);
//       return false;
//     }
//   }

//   return true;
// }

async function trySignUp(event) {
  event.preventDefault();

  if (!checkFill(false)) {
    return;
  }

  let result;
  let userData = {
    id: $(".user_id").val(),
    pw: $(".user_pw").val(),
    name: $(".user_name").val(),
    nickname: $(".user_nickname").val(),
    email: $(".user_email").val(),
    phone: `${$(".user_phone1").val()}${$(".user_phone2").val()}${$(
      ".user_phone3"
    ).val()}`,
  };

  console.log(userData);

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/signUp", // 나중에 수정!
    data: JSON.stringify(userData),
    contentType: "application/json",
    success: (res) => {
      // result = res;

      if (res.status === 200) {
        alert("회원가입 성공");
        location.href = "/frontend/src/html/sign/signIn.html"
      }
    },
    error: (e) => {
      console.error(e);
      alert("회원가입 실패");
    },
  });
}
