// api 생성 후 수정!!
async function tryLogin(event) {
  event.preventDefault();

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
        alert("로그인 성공");
      }
    },
    error: (e) => {
      console.error(e);
      alert("로그인 실패");
    },
  });
}
