chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "runContentScript" });
    });
  });
  