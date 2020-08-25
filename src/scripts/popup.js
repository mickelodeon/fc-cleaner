const popupSwitch = document.querySelector(".switch__input");
const keywordsInput = document.querySelector(".keywords__field");
const keywordsSubmit = document.querySelector(".keywords__submit");
const keywordsBlock = document.querySelector(".keywords__block");
const keywordsReset = document.querySelector(".keywords__reset--button");

let keywordsList = [];
let keywordsRemovers = [];
let cleanerDisabled = false;

popupSwitch.onclick = function () {
  if (localStorage.getItem("cleanerDisabled") === "true") {
    localStorage.setItem("cleanerDisabled", false);
    cleanerDisabled = false;
    popupSwitch.checked = true;
    document.body.classList.remove("disabled");
    if (localStorage.getItem("keywordsList") != null) {
      if (localStorage.getItem("keywordsList").length >= 1) {
        keywordsList = localStorage.getItem("keywordsList").split(",");
        updateContentInfo();
      }
    }
  } else {
    localStorage.setItem("cleanerDisabled", true);
    cleanerDisabled = true;
    popupSwitch.checked = false;
    document.body.classList.add("disabled");
    if (keywordsList.length >= 1) {
      keywordsList = [];
      updateContentInfo();
    }
  }
  chrome.runtime.sendMessage({ status: "update" });
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
  localStorage.removeItem("keywordsList");
  updateList();
};

const submitKeyword = function () {
  if (keywordsInput.value != "") {
    if (localStorage.getItem("keywordsList") != null) {
      if (localStorage.getItem("keywordsList").length >= 1) {
        keywordsList = localStorage.getItem("keywordsList").split(",");
      }
    }
    keywordsList.push(keywordsInput.value);
    localStorage.setItem("keywordsList", keywordsList);
    updateList();
    if (cleanerDisabled) {
      keywordsList = [];
    }
    keywordsInput.value = "";
    keywordsInput.focus();
  }
};

const updateList = function () {
  let keywordsContent = "";
  if (localStorage.getItem("keywordsList") != null) {
    if (localStorage.getItem("keywordsList").length >= 1) {
      keywordsList = localStorage.getItem("keywordsList").split(",");
    }
  }

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

  if (!cleanerDisabled) {
    updateContentInfo();
  } else {
    keywordsList = [];
  }
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
    if (localStorage.getItem("keywordsList") != null) {
      if (localStorage.getItem("keywordsList").length >= 1) {
        keywordsList = localStorage.getItem("keywordsList").split(",");
      }
    }
    keywordsList.splice(index, 1);
    localStorage.setItem("keywordsList", keywordsList);
    updateList();
    if (cleanerDisabled) {
      keywordsList = [];
    }
  }
};

const updateContentInfo = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { keywordsList: keywordsList },
      function (response) {}
    );
  });
};

if (localStorage.getItem("cleanerDisabled") == null) {
  localStorage.setItem("cleanerDisabled", false);
} else {
  if (localStorage.getItem("cleanerDisabled") == "true") {
    cleanerDisabled = true;
    popupSwitch.checked = false;
    document.body.classList.add("disabled");
  }
}

if (localStorage.getItem("keywordsList") != null) {
  if (localStorage.getItem("keywordsList").length >= 1) {
    if (!cleanerDisabled) {
      keywordsList = localStorage.getItem("keywordsList").split(",");
    }
    updateList();
  }
}

updateContentInfo();
