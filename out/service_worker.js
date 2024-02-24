chrome?.webNavigation?.onDOMContentLoaded?.addListener(function (details) {
  if (!details.url.includes("linkedin.com") || !/tscp-serving/i.test(details.url)) {
    // Skip sending messages if not from LinkedIn domain
    // otherwise will lead to connection not established error
    // checking tscp-serving because there were multiple parts loaded dynamically and after checking various profiles, this was the only common url which worked for every single one of them
    // that error came because we sent messages to tabs without checking where they come from. so we kept on sending messages even if that is chrome://extension or coldmessager which is not designed to respond to our request
    // we included this check in details itself because a few linkedin tabs didnt have url property whereas in details, url was always seen
    return;
  }


  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0] ) {
      chrome?.storage?.local?.get(["user"])?.then(data => {
        let user = data;
        if (!user) user = {};
        chrome.tabs.sendMessage(tabs[0].id, { action: "runContentScript", user: user });
        console.log(`sent message to ${details.url}`)
      }).catch((err) => {
        console.error(err);
      });
    } else {
      console.log("No tabs found"); 
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