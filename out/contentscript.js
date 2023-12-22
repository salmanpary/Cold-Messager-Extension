//bug button click
//format ->
//3 times
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "runContentScript") {
    const nameElement = document.querySelector(
      ".text-heading-xlarge.inline.t-24.v-align-middle.break-words"
    );
    const taglineElement = document.querySelector(
      ".text-body-medium.break-words"
    );
    const latestCompanyElement =
      document.querySelector(".inline-show-more-text--is-collapsed") ||
      document.querySelector(
        '.inline-show-more-text--is-collapsed-with-line-clamp[style*="line-clamp:2;"]'
      ) ||
      document.querySelector(".inline");

    const collegeElement =
      document.querySelector(".inline-show-more-text--is-collapsed") ||
      document.querySelector(
        '.inline-show-more-text--is-collapsed-with-line-clamp[style*="line-clamp:2;"]'
      ) ||
      document.querySelector(".inline");
    const locationElement = document.querySelector(
      ".text-body-small.inline.t-black--light.break-words"
    );
    // Extract content from each element if available
    const person_name = nameElement ? nameElement.textContent.trim() : null;
    const tagline = taglineElement ? taglineElement.textContent.trim() : null;
    const location1 = locationElement
      ? locationElement.textContent.trim()
      : null;
    let about;

    setTimeout(() => {
      const elements = document.getElementsByClassName("display-flex ph5 pv3");

      if (elements.length > 0) {
        const visuallyHiddenSpan =
          elements[0].querySelector(".visually-hidden");

        if (visuallyHiddenSpan) {
          about = visuallyHiddenSpan.innerText.trim();
        } else {
          console.log(
            "No element found with class 'visually-hidden' inside 'display-flex ph5 pv3'"
          );
        }

        const profileInfo = {
          person_name,
          tagline,
          location: location1,
          about: about,
        };

        console.log(profileInfo);
      } else {
        console.log("No elements found with class 'display-flex ph5 pv3'");
      }
      // basic details
      const profileName = document.querySelector(
        ".text-heading-xlarge"
      ).innerHTML;
      const tagLine = document
        .querySelector(".text-body-medium")
        .innerHTML.replace(/\s+/g, " ")
        .trim();
      const profileLocation = document
        .querySelector(".text-body-small.inline.t-black--light.break-words")
        .innerHTML.replace(/\s+/g, " ")
        .trim();
      const description = document
        .querySelector(
          ".pv-shared-text-with-see-more div:first-of-type span:first-child"
        )
        .innerText.replace(/\s+/g, " ")
        .trim();

      // Function to extract information from a section
      function extractSectionInformation(sectionId) {
        const divWithSection = document.querySelector(`div#${sectionId}`);
        if (divWithSection) {
          const section = divWithSection.closest("section");
          const ul = section.querySelector("ul");
          const liElements = ul.getElementsByTagName("li");
          const dataArray = [];
          const uniqueElementsSet = new Set();
          // for cleaning data, checking if one entry is duplicate or subset
          // Function to check if one array is a subset of another
          function isSubset(arr1, arr2) {
            return arr1.every((item) => arr2.includes(item));
          }

          for (let i = 0; i < liElements.length; i++) {
            const li = liElements[i];
            const visuallyHiddenSpans = li.querySelectorAll(
              "span.visually-hidden"
            );
            const innerTextArray = [];

            visuallyHiddenSpans.forEach((span) => {
              innerTextArray.push(span.innerText.replace(/\s+/g, " ").trim());
            });
            // Check if innerTextArray is a subset of any existing element in the set
            const isSubsetOfExisting = [...uniqueElementsSet].some(
              (existingArray) => isSubset(innerTextArray, existingArray)
            );
            // If not a subset, add innerTextArray to dataArray and the set
            if (!isSubsetOfExisting) {
              dataArray.push(innerTextArray);
              uniqueElementsSet.add(innerTextArray);
            }
          }

          return dataArray;
        } else {
          console.error(`Div with id "${sectionId}" not found`);
          return null;
        }
      }

      const extractedData = {
        name: profileName,
        bio: tagLine,
        location: profileLocation,
        description: description,
        experience: extractSectionInformation("experience"),
        education: extractSectionInformation("education"),
        volunteering_experience: extractSectionInformation(
          "volunteering_experience"
        ),
        projects: extractSectionInformation("projects"),
        skills: extractSectionInformation("skills"),
        honors_and_awards: extractSectionInformation("honors_and_awards"),
      };
      console.log(extractedData);
      const jsonData = JSON.stringify(extractedData, null, 2);
      console.log(jsonData);

      const button = document.querySelector(
        ".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.pvs-profile-actions__action"
      );
      const button2 = document.querySelector(
        ".artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.pvs-profile-actions__action"
      );
      console.log(button2);

      // Function to handle button click
      function fillContentEditableWithDummyText() {
        setTimeout(() => {
          const contentEditableDiv = document.querySelector('.msg-form__contenteditable');
          
          if (contentEditableDiv) {
            // Replace this with your desired dummy text
            const dummyText = 'Hello, this is dummy text!';
            
            // Set the inner HTML of the contenteditable div with the dummy text
            const message=`<p>Hi ${extractedData["name"]},</p>
            <p>Saw that you are working at TinkerHub MEC.</p>
           <p>Do you have an opening at TinkerHub MEC for a full stack developer role?</p>
            <p>Thank you</p>
            `
            contentEditableDiv.innerHTML = message;
            
            // Optionally, you can also trigger an input event to notify any listeners
            const inputEvent = new Event('input', { bubbles: true });
            contentEditableDiv.dispatchEvent(inputEvent);
          }
        }, 1000);
      }
      
      function handleButtonClick() {
        console.log("Button clicked!");
        // Your custom logic for button click
        fillContentEditableWithDummyText();
      }

      // Check if button1 exists
      if (button) {
        const buttonTextSpan = button.querySelector(".artdeco-button__text");

        // Check if button1 has the expected text
        if (buttonTextSpan && buttonTextSpan.textContent.trim() === "Message") {
          console.log('Button 1 with text "Message" found!');

          // Add click event listener to button1
          button.addEventListener("click", handleButtonClick);
        } else {
          console.log("Button 1 does not contain the expected text");
          if (button2) {
            const buttonTextSpan = button2.querySelector(
              ".artdeco-button__text"
            );

            // Check if button2 has the expected text
            if (
              buttonTextSpan &&
              buttonTextSpan.textContent.trim() === "Message"
            ) {
              console.log('Button 2 with text "Message" found!');

              // Add click event listener to button2
              button2.addEventListener("click", handleButtonClick);
            } else {
              console.log("Button 2 does not contain the expected text");
            }
          }
        }
      } else {
        console.log("Buttons not found");
      }

      // to save it
      // Create a Blob with the JSON data
      //  const blob = new Blob([jsonData], { type: 'application/json' });
      //  // Create a download link
      //  const downloadLink = document.createElement('a');
      //  downloadLink.href = URL.createObjectURL(blob);
      //  downloadLink.download = `${profileName}.json`;
      //  downloadLink.textContent = 'Download JSON';
      //  // Append the link to the body
      //  document.body.appendChild(downloadLink);
      //  // Trigger a click on the link to start the download
      //  downloadLink.click();
      //  // Remove the link from the DOM
      //  document.body.removeChild(downloadLink);
      //  console.log(`Data saved to ${profileName}.json`);
    }, 2000);
  }
});
