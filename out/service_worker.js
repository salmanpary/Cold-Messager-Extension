chrome?.webNavigation?.onDOMContentLoaded?.addListener(function (details) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome?.storage?.local?.get(["user"])?.then(data => {
      let user = data
      if (!user) user={}
      chrome.tabs.sendMessage(tabs[0].id, { action: "runContentScript" , user: user})
    }).catch(err => console.log(err))
  });
});

chrome.runtime.onMessage.addListener(
async function(request, sender, sendResponse) {
  if (request.user) {
      chrome?.storage?.local?.set({'user': request.user})
      .then(() => chrome.storage.local.get(["user"])).catch(err => console.log(err))
  }
}
);