"use strict";

const updateBadge = function () {
  if (localStorage.getItem("cleanerDisabled") === "true") {
    chrome.browserAction.setBadgeBackgroundColor({
      color: "#9e9f9f",
    });
  } else {
    chrome.browserAction.setBadgeBackgroundColor({
      color: "#31d7a2",
    });
  }

  chrome.storage.local.get("hiddenThreads", function (result) {
    if (result.hiddenThreads !== null) {
      chrome.browserAction.setBadgeText({
        text: result.hiddenThreads.toString(),
      });
    }
  });
};

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: ".forocoches.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });

  updateBadge();

  chrome.runtime.onMessage.addListener(function (message, callback) {
    if (message.status == "update") {
      updateBadge();
    }
  });
});
