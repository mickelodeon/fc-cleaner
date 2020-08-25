"use strict";

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

    chrome.browserAction.setBadgeBackgroundColor({
      color: "#31d7a2",
    });

    chrome.storage.local.get(["hiddenThreads"], function (result) {
      console.log("Value currently is " + result.hiddenThreads);
      chrome.browserAction.setBadgeText({
        text: result.hiddenThreads.toString(),
      });
    });
  });
});
