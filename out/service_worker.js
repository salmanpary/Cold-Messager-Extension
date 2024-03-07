chrome?.webNavigation?.onDOMContentLoaded?.addListener(function (details) {
  console.log(details.url)
  //being selective about url to send message to avoid multiple api calls
  if (!details.url.includes("linkedin.com") || ( !/tscp-serving/i.test(details.url) && !/search\/results/i.test(details.url)) ) {
    return;
  }
 
  
  

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0] ) {
      chrome?.storage?.local?.get(["user"])?.then(data => {
        let user = data;
        if (!user) user = {};
        console.log('Before message sending block');
        chrome.tabs.sendMessage(tabs[0].id, { action: "runContentScript", user: user }, function(response){
          console.log('Inside message sending block');
          if(response && response.success){
            console.log(' success = true ')
          }
          else{
            console.log('no response')
          }
          console.log(response)
        } );
        console.log(`Message sent to ${details.url}`)
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