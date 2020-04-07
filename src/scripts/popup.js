const SWITCH_SELECTOR = ".switch__input";
const LOGO_SELECTOR = ".header__logo";

const popupSwitch = document.querySelector(SWITCH_SELECTOR);

// chrome.storage.sync.get("color", function (data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
// });

popupSwitch.onclick = function (element) {
  const headerLogo = document.querySelector(LOGO_SELECTOR);
  headerLogo.classList.toggle("disabled");
};
