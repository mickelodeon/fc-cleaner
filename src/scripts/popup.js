const popupSwitch = document.querySelector(".switch__input");
const headerLogo = document.querySelector(".header__logo");
const keywordsInput = document.querySelector(".keywords__field");
const keywordsSubmit = document.querySelector(".keywords__submit");
const keywordsBlock = document.querySelector(".keywords__block");
const keywordsRemove = document.querySelector(".keywords__item--remove");
const keywordsReset = document.querySelector(".keywords__reset--button");

let keywordsList = [];

popupSwitch.onclick = function () {
  headerLogo.classList.toggle("disabled");
};

keywordsSubmit.onclick = function () {
  if (keywordsInput.value != "") {
    keywordsList.push(keywordsInput.value);
    keywordsInput.value = "";
    updateList();
  }
};

// keywordsRemove.onclick = function () {
//   console.log(keywordsList[this.dataset.index]);
// };

keywordsReset.onclick = function () {
  keywordsList = [];
  keywordsBlock.innerHTML = "";
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
};
