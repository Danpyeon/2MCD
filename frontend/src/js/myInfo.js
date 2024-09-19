  
  $(".user-id").text('qwer');
  $(".user-pw").val('1234');
  $(".user-name").text('실험쥐'),
  $(".user-nickname").val('test'),
  $(".user-email").val('qwer@qwer.com'),
  $(".user-phone").text('010-1234-5678')


let obj = {
  id : $(".user-id").text('qwer'),
  pw : $(".user-pw").val('1234'),
  name : $(".user-name").text('실험쥐'),
  nickname : $(".user-nickname").val('test'),
  email : $(".user-email").val('qwer@qwer.com'),
  phone : $(".user-phone").text('010-1234-5678') 
};


loadInfo();
async function loadInfo() {
  let data = info;
  await $.ajax({
    type: "post",
    url: "http://localhost:3000/mypage", // 나중에 수정!
    success: (res) => {
      data = res;
    },
    error: (e) => {
      itemList = e;
    },
  });

  // 쿠키로부터 불러온 유저 정보 화면에 표시
  $(".user-name").text(data.user_name);
  $(".user-phone").text(data.user_phone);

  // 수정 가능한 필드 (비밀번호, 닉네임, 이메일)만 입력 가능하게 설정
  $(".user-pw").val(data.user_password);
  $(".user-nickname").val(data.user_nickname);
  $(".user-email").val(data.user_email);
}

async function sendChangeInfo(event) {
  event.preventDefault();

  let obj = {
    pw: $(".user-pw").val(),
    nickname: $(".user-nickname").val(),
    email: $(".user-email").val()
  };

  await $.ajax({
    type: "post",
    url: "http://localhost:3000/info", // API URL
    data: JSON.stringify(obj),
    contentType: "application/json",
    success: (res) => {
      if (res.status === 200) {
        alert("회원 정보가 성공적으로 수정되었습니다.");
      }
    },
    error: (e) => {
      alert("회원 정보 수정에 실패했습니다.");
      console.error(e);
    }
  });
}


