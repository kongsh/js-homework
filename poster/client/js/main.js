import { data } from "./data.js";
import { AudioPlayer } from "./audio.js";

/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

function getNode(node) {
  if (typeof node === "string") return document.querySelector(node);
  return node;
}

function toggleListClass(ul, target, className) {
  if (typeof ul === "string") ul = getNode(ul);
  if (typeof target === "string") target = getNode(target);
  if (typeof className !== "string") throw new TypeError("toggleListClass 함수의 인자 className은 문자열이어야 합니다.");

  ul.forEach((li) => {
    li.classList.remove(className);
  });

  target.classList.add(className);
}

function setBgColor(elem, [colorA, colorB = "#000"]) {
  if (typeof elem === "string") elem = getNode(elem);
  if (typeof colorA !== "string") throw new TypeError("setBgColor 함수의 인자 colorA는 문자열이어야 합니다.");
  if (typeof colorB !== "string") throw new TypeError("setBgColor 함수의 인자 colorB는 문자열이어야 합니다.");

  elem.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
}

function setImage(target, { name, alt }) {
  if (typeof target === "string") target = getNode(target);
  if (typeof name !== "string") throw new TypeError("setImage 함수의 인자 name은 문자열이어야 합니다.");
  if (typeof alt !== "string") throw new TypeError("setImage 함수의 인자 alt는 문자열이어야 합니다.");

  target.src = `./assets/${name.toLowerCase()}.jpeg`;
  target.alt = alt;
}

function setNameText(target, nameText) {
  if (typeof target === "string") target = getNode(target);
  if (typeof nameText !== "string") throw new TypeError("setNameText 함수의 두번째 인자는 문자열이어야 합니다.");

  target.textContent = nameText;
}

function playAudio(source) {
  if (typeof source !== "string") throw new TypeError("playAudio함수의 인자는 문자열이어야 합니다.");

  if (!audioPlayer) audioPlayer = new AudioPlayer(source);
  else {
    audioPlayer.stop();
    audioPlayer = new AudioPlayer(source);
  }

  audioPlayer.play();
}

function handleNavImageClick(e) {
  if (!(e.target.tagName === "IMG")) return;

  const targetList = e.target.closest("li");
  const targetData = data[+targetList.dataset.index - 1];

  toggleListClass(this.querySelectorAll("ul > li"), targetList, "is-active");

  setBgColor(document.body, targetData.color);
  setImage(visualImg, targetData);
  setNameText(nickName, targetData.name);

  playAudio(`./assets/audio/${targetData.name.toLowerCase()}.m4a`);
}

const nav = getNode(".nav");
const visualImg = getNode(".visual > div > img");
const nickName = getNode(".nickName");

let audioPlayer = null;

nav.addEventListener("click", handleNavImageClick);
