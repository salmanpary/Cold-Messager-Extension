chrome?.webNavigation?.onDOMContentLoaded?.addListener(function (details) {
  if (!details.url.includes("linkedin.com")) {
    // Skip sending messages if not from LinkedIn domain
    return;
  }

  console.log(details);

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    tabs.forEach(element => {
      console.log(element);
    });

    if (tabs[0] && tabs[0].status === "complete") {
      chrome?.storage?.local?.get(["user"])?.then(data => {
        let user = data;
        if (!user) user = {};
        
        chrome.tabs.sendMessage(tabs[0].id, { action: "runContentScript", user: user }, function () {
          console.log(`message sent to ${tabs[0].id}`);
        });
      }).catch((err) => {
        console.error(err);
        console.log(`error sending message to ${tabs[0].id}`);
      });
    } else {
      console.log("Tab status is not complete. Message not sent.");
    }
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