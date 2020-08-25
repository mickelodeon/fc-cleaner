const threadTitles = document.querySelectorAll('*[id^="thread_title_"]');

chrome.runtime.onMessage.addListener(function (message) {
  if (message.keywordsList.length >= 1) {
    localStorage.setItem("keywordsList", message.keywordsList);
  } else {
    localStorage.removeItem("keywordsList");
  }

  searchThreads(message.keywordsList);
});

const cleanThreads = function () {
  const hiddenThreads = document.getElementsByClassName("hidden__thread");
  for (i = hiddenThreads.length - 1; i >= 0; i--) {
    hiddenThreads[i].classList.remove("hidden__thread");
  }
};

const searchThreads = function (keywordsList) {
  cleanThreads();
  for (i = 0; i < keywordsList.length; i++) {
    for (j = 0; j < threadTitles.length; j++) {
      if (
        threadTitles[j].textContent
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            keywordsList[i]
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
      ) {
        hideThread(threadTitles[j].closest("tr"));
      }
    }
  }
  updateThreadCounter(document.getElementsByClassName("hidden__thread"));
};

const hideThread = function (thread) {
  thread.classList.add("hidden__thread");
};

const updateThreadCounter = function (hiddenThreads) {
  chrome.runtime.sendMessage({ status: "update" });
  chrome.storage.local.set({ hiddenThreads: hiddenThreads.length });
};

if (localStorage.getItem("keywordsList") !== null) {
  if (localStorage.getItem("keywordsList").length >= 1) {
    searchThreads(localStorage.getItem("keywordsList").split(","));
  } else {
    localStorage.removeItem("keywordsList");
  }
}
