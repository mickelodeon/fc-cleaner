const popupSwitch = document.querySelector(".switch__input");
const headerLogo = document.querySelector(".header__logo");
const keywordsInput = document.querySelector(".keywords__field");
const keywordsSubmit = document.querySelector(".keywords__submit");
const keywordsBlock = document.querySelector(".keywords__block");
const keywordsReset = document.querySelector(".keywords__reset--button");

let keywordsList = [];
let keywordsRemovers = [];

popupSwitch.onclick = function () {
  headerLogo.classList.toggle("disabled");
};

keywordsInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    submitKeyword();
  }
});

keywordsSubmit.onclick = function () {
  submitKeyword();
};

keywordsReset.onclick = function () {
  keywordsList = [];
  keywordsRemovers = [];
  keywordsBlock.innerHTML = "";
  if (localStorage.getItem("keywordsList") !== null) {
    localStorage.removeItem("keywordsList");
    updateList();
  }
};

const submitKeyword = function () {
  if (keywordsInput.value != "") {
    keywordsList.push(keywordsInput.value);
    localStorage.setItem("keywordsList", keywordsList);
    updateList();
    keywordsInput.value = "";
    keywordsInput.focus();
  }
};

const updateList = function () {
  let keywordsContent = "";
  for (i = 0; i < keywordsList.length; i++) {
    keywordsContent +=
      "<span class='keywords__item'>" +
      keywordsList[i] +
      "<img data-index='" +
      i +
      "' class='keywords__item--remove' src='/src/images/close.svg'/>" +
      "</span>";
  }
  keywordsBlock.innerHTML = keywordsContent;
  keywordsRemovers = document.querySelectorAll(".keywords__item--remove");
  updateRemovers();
};

const updateRemovers = function () {
  for (i = 0; i < keywordsRemovers.length; i++) {
    keywordsRemovers[i].addEventListener("click", function () {
      const index = this.dataset.index;
      removeKeyword(index);
    });
  }
};

const removeKeyword = function (index) {
  if (index > -1) {
    keywordsList.splice(index, 1);
    localStorage.setItem("keywordsList", keywordsList);
  }
  updateList();
};

if (localStorage.getItem("keywordsList") != null) {
  keywordsList = localStorage.getItem("keywordsList").split(",");
  updateList();
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { keywordsList: keywordsList }, function (
    response
  ) {
    console.log(response.farewell);
  });
});
