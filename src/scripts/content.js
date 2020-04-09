var threadTitles = document.querySelectorAll('*[id^="thread_title_"]');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.keywordsList.length >= 1) {
    sendResponse({ farewell: "Hi from Forocoches front page!" });
    searchThreads(request.keywordsList);
  }
});

const searchThreads = function (keywordsList) {
  for (i = 0; i < keywordsList.length; i++) {
    for (j = 0; j < threadTitles.length; j++) {
      if (threadTitles[j].textContent.includes(keywordsList[i])) {
        hideThread(threadTitles[j].closest("tr"));
      }
    }
  }
};

const hideThread = function (thread) {
  thread.style.opacity = "0";
};
