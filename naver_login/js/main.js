const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

const state = {
  inputId: "",
  inputPwd: "",
  isLoggedIn: false,
};

function getNode(node) {
  if (typeof node === "string") return document.querySelector(node);
  return node;
}

function emailReg(text) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

function setInputValue(valueType, value) {
  if (!["id", "password"].includes(valueType)) throw new Error("setInputValue의 첫 번째 인자는 'id' 또는 'password'여야 합니다.");
  if (typeof value !== "string") throw new TypeError("setInputValue의 두번째 인자에는 문자열이 들어와야 합니다.");

  if (valueType === "id") state.inputId = value;
  else if (valueType === "password") state.inputPwd = value;
}

function toggleInputClass(node, isValid) {
  if (typeof isValid !== "boolean") throw new TypeError("toggleInputClass의 두 번째 인자는 Boolean 값이어야 합니다.");

  if (!isValid) node.classList.add("is--invalid");
  else node.classList.remove("is--invalid");
}

function manageInputState(node, valueType, validFunction) {
  if (typeof node === "string") node = document.querySelector(node);
  if (!["id", "password"].includes(valueType)) throw new Error("manageInputState의 두번째 인자는 'id' 또는 'password'여야 합니다.");
  if (typeof validFunction !== "function") throw new TypeError("manageInputState의 세번째 인자는 함수형이어야 합니다.");

  const inputNode = node.querySelector("input");

  inputNode.addEventListener("input", (e) => {
    const inputValue = e.target.value;

    setInputValue(valueType, inputValue);

    if (!validFunction(inputValue)) toggleInputClass(inputNode, false);
    else toggleInputClass(inputNode, true);
  });
}

function isLoginValid() {
  if (user.id === state.inputId && user.pw === state.inputPwd) return true;
  else return false;
}

function onLoginSuccess() {
  console.log("로그인 성공");
  state.isLoggedIn = "true";
  window.location.href = "welcome.html";
}

function onLoginFailure() {
  console.log("로그인 실패");
  alert("아이디 또는 비밀번호가 잘못되었습니다.");
}

function onLoginError(error) {
  console.error("로그인 중 오류 발생:", error);

  alert("🛠️현재 서버와 연결이 원활하지 않습니다.🛠️ \n네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요😥");
}

function loginHandler() {
  event.preventDefault(); // 일시적으로 폼 제출을 막았습니다.

  try {
    if (isLoginValid()) onLoginSuccess();
    else onLoginFailure();
  } catch (error) {
    onLoginError(error);
  }
}

const idFormNode = getNode(".user-email");
const pwdFormNode = getNode(".user-password");
const loginButton = getNode(".btn-login");

manageInputState(idFormNode, "id", emailReg);
manageInputState(pwdFormNode, "password", pwReg);

loginButton.addEventListener("click", loginHandler);
