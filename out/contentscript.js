chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "runContentScript") {
    const nameElement = document.querySelector('.text-heading-xlarge.inline.t-24.v-align-middle.break-words');
    const taglineElement = document.querySelector('.text-body-medium.break-words');
    const latestCompanyElement = document.querySelector('.inline-show-more-text--is-collapsed') ||
      document.querySelector('.inline-show-more-text--is-collapsed-with-line-clamp[style*="line-clamp:2;"]') ||
      document.querySelector('.inline');
    
    const collegeElement = document.querySelector('.inline-show-more-text--is-collapsed') ||
      document.querySelector('.inline-show-more-text--is-collapsed-with-line-clamp[style*="line-clamp:2;"]') ||
      document.querySelector('.inline');
    const locationElement = document.querySelector('.text-body-small.inline.t-black--light.break-words');
    // Extract content from each element if available
    const person_name = nameElement ? nameElement.textContent.trim() : null;
    const tagline = taglineElement ? taglineElement.textContent.trim() : null;
    const location1 = locationElement ? locationElement.textContent.trim() : null;
    let about;
    
    setTimeout(() => {
      const elements = document.getElementsByClassName("display-flex ph5 pv3");
    
      if (elements.length > 0) {
        const visuallyHiddenSpan = elements[0].querySelector(".visually-hidden");
        
        if (visuallyHiddenSpan) {
          about = visuallyHiddenSpan.innerText.trim();
        } else {
          console.log("No element found with class 'visually-hidden' inside 'display-flex ph5 pv3'");
        }
    
        const profileInfo = {
          person_name,
          tagline,
          location: location1,
          about: about
        };
    
        console.log(profileInfo);
      } else {
        console.log("No elements found with class 'display-flex ph5 pv3'");
      }
    }, 2000); 
  }
});
