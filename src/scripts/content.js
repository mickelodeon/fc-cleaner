var threadTitles = document.querySelectorAll('*[id^="thread_title_"]');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse({ farewell: "Hi from Forocoches front page!" });

  if (request.keywordsList.length >= 1) {
    localStorage.setItem("keywordsList", request.keywordsList);
  } else {
    localStorage.removeItem("keywordsList");
  }

  searchThreads(request.keywordsList);
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
      if (threadTitles[j].textContent.includes(keywordsList[i])) {
        hideThread(threadTitles[j].closest("tr"));
      }
    }
  }
};

const hideThread = function (thread) {
  thread.classList.add("hidden__thread");
};

if (localStorage.getItem("keywordsList") !== null) {
  if (localStorage.getItem("keywordsList").length >= 1) {
    searchThreads(localStorage.getItem("keywordsList").split(","));
  } else {
    localStorage.removeItem("keywordsList");
  }
}
