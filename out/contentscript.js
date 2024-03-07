if (window.location.href.includes("www.coldmessager.com")) {
    var webLocalStorage = window.localStorage;
    var user = webLocalStorage.getItem("user");  
    chrome.runtime.sendMessage({ user: user });
}




function extractCompanyName(companyName) {
    // Check if the center symbol is present in the company name
    const centerSymbolIndex = companyName.indexOf("·");
  
    if (centerSymbolIndex !== -1) {
      // If the center symbol is present, get the left part before the symbol
      return companyName.substring(0, centerSymbolIndex).trim();
    } else {
      // If the center symbol is not present, return the original company name
      return companyName.trim();
    }
  }

function extractDuration(duration){
    const centerSymbolIndex = duration.indexOf("·");
    let newDuration = duration
    newDuration = newDuration.replace('yrs','years')
    newDuration = newDuration.replace('mos','months')
    if (centerSymbolIndex !== -1) {
        return newDuration.substring(centerSymbolIndex+1).trim();
    } else {
        return newDuration.trim();
    }
}
function extractExperience() {
    try{
        const divWithExp = document.querySelector('div#experience');
        if (divWithExp) {
            const expSection = divWithExp.closest('section');
            const expUl = expSection.querySelector('ul.pvs-list');
            const expLi = expUl.querySelectorAll('li.artdeco-list__item');
            const expArray = [];
            const roleDescriptionSet = new Set(); // Set to store unique role descriptions
    
            for (let i = 0; i < expLi.length; i++) {
                const li = expLi[i];
                const expObj = {};
                const company_link = li.querySelector('a[data-field="experience_company_logo"]');
                if (company_link) {
                    expObj['company_link'] = company_link.href;
                }
                // maindiv = titlxe + basic details
                const mainDiv = li.querySelector('div.display-flex.flex-row.justify-space-between');
                if (mainDiv) {
                    
                    const locationSpan = mainDiv.querySelector('span.t-14.t-normal');
                    const durationSpan = mainDiv.querySelector('span.t-black--light');

                    const listDiv = li.querySelector('div.pvs-list__outer-container.pvs-entity__sub-components');
    // listdiv = extra details
                    if (listDiv) {
                        const bulletinSpan = listDiv.querySelector('span.pvs-entity__path-node');
    // multiple roles, location and duration both provided
                        if (bulletinSpan && locationSpan && durationSpan) {
                            expObj['company_name'] = extractCompanyName(mainDiv.querySelector('span.visually-hidden').innerText.trim());
                            expObj['location'] = durationSpan.querySelector('span.visually-hidden').innerText.trim();
                            expObj['duration'] = locationSpan.querySelector('span.visually-hidden').innerText.trim();
                            expObj['primary_info'] = {'duration': extractDuration(locationSpan.querySelector('span.visually-hidden').innerText.trim()) ,
                                                    'location': durationSpan.querySelector('span.visually-hidden').innerText.trim()
                                                    };
                            
                            const roles = [];
                            const multipleRolesLi = listDiv.querySelectorAll('li');
                            for (let j = 0; j < multipleRolesLi.length; j++) {
                                const roleObj = {};
                                const currRole = multipleRolesLi[j];
                                const roleTitle = currRole.querySelector('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold');
                                const roleDuration = currRole.querySelector('span.t-14.t-normal.t-black--light');
                                if (roleTitle && roleDuration) {
                                    const roleDescriptionDiv = currRole.querySelector('div.pvs-list__outer-container.pvs-entity__sub-components');
                                    roleObj['role'] = roleTitle.querySelector('span.visually-hidden').innerText.trim();
                                    roleObj['duration'] = extractDuration(roleDuration.querySelector('span.visually-hidden').innerText.trim())
    
                                    if (roleDescriptionDiv) {
                                        const roleDescriptionUl = roleDescriptionDiv.querySelector('ul');
                                        const roleDescriptionLi = roleDescriptionUl.querySelectorAll('li');
                                        const rDArray = [];
                                        for (let k = 0; k < roleDescriptionLi.length; k++) {
                                            const descriptionTextSpan = roleDescriptionLi[k].querySelector('span.visually-hidden')
                                            if (descriptionTextSpan) {
                                                const descriptionText = descriptionTextSpan.innerText.trim()
                                                if (!roleDescriptionSet.has(descriptionText)) {
                                                    roleDescriptionSet.add(descriptionText);
                                                    rDArray.push(descriptionText);
                                                }
                                            }
                                        }
                                        roleObj['role_description'] = rDArray;
                                    }
    
                                    roles.push(roleObj);
                                }
                            }
    
                            if (roles.length > 0) {
                                expObj['roles'] = roles;
                            }
                        } else if ((bulletinSpan && locationSpan) || (bulletinSpan && durationSpan)) {
                            expObj['company_name'] = extractCompanyName(mainDiv.querySelector('span.visually-hidden').innerText.trim());
                            expObj['primary_info'] = (locationSpan) ? { 'duration': extractDuration(locationSpan.querySelector('span.visually-hidden').innerText.trim()) } : { 'location': durationSpan.querySelector('span.visually-hidden').innerText.trim() };
    // incase of multiple roles, location spam and duration span intercahnges
    
                            const roles = [];
                            const multipleRolesLi = listDiv.querySelectorAll('li');

                            try{
                                for (let j = 0; j < multipleRolesLi.length; j++) {
                                    const roleObj = {};
                                    const currRole = multipleRolesLi[j];
                                    const roleTitle = currRole.querySelector('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold');
                                    const roleDuration = currRole.querySelector('span.t-14.t-normal.t-black--light');
                                    if (roleTitle && roleDuration) {
                                        const roleDescriptionDiv = currRole.querySelector('div.pvs-list__outer-container.pvs-entity__sub-components');
                                        roleObj['role'] = roleTitle.querySelector('span.visually-hidden').innerText.trim();
                                        roleObj['duration'] = extractDuration(roleDuration.querySelector('span.visually-hidden').innerText.trim());
                                        if (roleDescriptionDiv) {
                                            const roleDescriptionUl = roleDescriptionDiv.querySelector('ul');
                                            const roleDescriptionLi = roleDescriptionUl.querySelectorAll('li');
                                            const rDArray = [];
                                            for (let k = 0; k < roleDescriptionLi.length; k++) {
                                                const descriptionTextSpan = roleDescriptionLi[k].querySelector('span.visually-hidden')
                                                if (descriptionTextSpan) {
                                                    const descriptionText = descriptionTextSpan.innerText.trim();
                                                    if (!roleDescriptionSet.has(descriptionText)) {
                                                        roleDescriptionSet.add(descriptionText);
                                                        rDArray.push(descriptionText);
                                                    }
                                                }
                                            }
                                            roleObj['role_description'] = rDArray;
                                        }
        
                                        roles.push(roleObj);
                                    }
                                }
                            } catch(error) {
                                console.log(error)
                            }

                            if (roles.length > 0) {
                                expObj['roles'] = roles;
                            }
                        } else {
                            // single role with description
                            // single role, location span = company name
                            const roles = []
                            const roleObj = {}
                            roleObj['role'] = mainDiv.querySelector('span.visually-hidden').innerText.trim();
                            expObj['primary_info'] = {}
                            if(locationSpan){
                                expObj['company_name'] = extractCompanyName( locationSpan.querySelector('span.visually-hidden').innerText.trim());
                            }
                           if( durationSpan ){
                            expObj['primary_info']['duration'] = extractDuration(durationSpan.querySelector('span.visually-hidden').innerText.trim());
                           }
                            const roleDescriptionUl = listDiv.querySelector('ul.pvs-list');
                            const roleDescriptionLi = roleDescriptionUl.querySelectorAll('li');
                            const rDArray = [];
                            for (let k = 0; k < roleDescriptionLi.length; k++) {
                                const descriptionTextDiv = roleDescriptionLi[k].querySelector('span.visually-hidden')
                                if(descriptionTextDiv){
                                    const descriptionText = descriptionTextDiv.innerText.trim();
                                    if (!roleDescriptionSet.has(descriptionText)) {
                                        roleDescriptionSet.add(descriptionText);
                                        rDArray.push(descriptionText);
                                    }
                                }
            
                            }
                            roleObj['role_description'] = rDArray;
                            roles.push(roleObj);
                            expObj['roles'] = roles
                        }
                    }
                    else{
                        // no listdiv
                        // single role without description
                        // no listdiv = no extra details provided except the titile part
                        expObj['role'] = mainDiv.querySelector('span.visually-hidden').innerText.trim();
                        if(locationSpan){
                            expObj['company_name'] = extractCompanyName(locationSpan.querySelector('span.visually-hidden').innerText.trim());
                        }
                       if( durationSpan ){
                        expObj['duration'] = extractDuration(durationSpan.querySelector('span.visually-hidden').innerText.trim())
                       }
                    }
                }
    
    
                expArray.push(expObj);
            }
         
            return expArray;
        } else {
            // no div with exp = no experience details provided
        
        }

    }catch(e){
        return []
    }
   
}


function extractEducation() {
    try{
    const divWithEdu = document.querySelector('div#education');
    if (divWithEdu) {
        const eduSection = divWithEdu.closest('section');
        const eduUl = eduSection.querySelector('ul.pvs-list');
        const eduArray = [];
        const eduLi = eduUl.querySelectorAll('li.artdeco-list__item');

        for (let i = 0; i < eduLi.length; i++) {
            const li = eduLi[i];
            const educationObject = {};

            const titleSchool = li.querySelector('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold');
            if (titleSchool) {
                educationObject['name_of_institution'] = titleSchool.querySelector('span.visually-hidden').innerText.trim();
            }

            const degree = li.querySelector('span.t-14.t-normal');
            if (degree) {
                educationObject['course'] = degree.querySelector('span.visually-hidden').innerText.trim();
            }

            const duration = li.querySelector('span.t-black--light');
            if (duration) {
                educationObject['course_duration'] = duration.querySelector('span.visually-hidden').innerText.trim();
            }

            const eduDescription = li.querySelector('div.pvs-list__outer-container.pvs-entity__sub-components');
            if (eduDescription) {
                educationObject['description'] = eduDescription.querySelector('span.visually-hidden').innerText.trim();
            }

            eduArray.push(educationObject);
        }

        return eduArray;
    } else {
        
        return [];
    }
}catch(e){
    return []
}
}


function extractVolunteering() {
    try{
    const divWithVol = document.querySelector('div#volunteering_experience');
    if (divWithVol) {
        const volSection = divWithVol.closest('section');
        const volUl = volSection.querySelector('ul.pvs-list');
        const volLi = volUl.querySelectorAll('li.artdeco-list__item');
        const volArray = [];

        for (let i = 0; i < volLi.length; i++) {
            const li = volLi[i];
            const volunteerObject = {};

            const title = li.querySelector('div.display-flex.align-items-center.mr1.t-bold');
            if (title) {
                volunteerObject['role'] = title.querySelector('span.visually-hidden').innerText.trim();
            }

            const organisation = li.querySelector('span.t-14.t-normal');
            if (organisation) {
                volunteerObject['organisation'] = organisation.querySelector('span.visually-hidden').innerText.trim();
            }

            const duration = li.querySelector('span.t-black--light');
            if (duration) {
                volunteerObject['duration'] = duration.querySelector('span.visually-hidden').innerText.trim();
            }

            const description = li.querySelector('div.pv-shared-text-with-see-more.full-width.t-14.t-normal.t-black.display-flex.align-items-center');
            if (description) {
                volunteerObject['description'] = description.querySelector('span.visually-hidden').innerText.trim();
            }

            volArray.push(volunteerObject);
        }

        return volArray;
    } else {
       
        return [];
    }
}catch(e){
    return []

}
}



function extractProjects() {
    try{

        const divWithProj = document.querySelector('div#projects');
        if (divWithProj) {
            const projSection = divWithProj.closest('section');
            const projUl = projSection.querySelector('ul.pvs-list');
            const projLi = projUl.querySelectorAll('li.artdeco-list__item');
            const projArray = [];
    
            for (let i = 0; i < projLi.length; i++) {
                const li = projLi[i];
                const projectObject = {};
    
                const title = li.querySelector('div.display-flex.align-items-center.mr1.t-bold');
                if (title) {
                    projectObject['title'] = title.querySelector('span.visually-hidden').innerText.trim();
                }
    
                const duration = li.querySelector('span.t-14.t-normal');
                if (duration) {
                    projectObject['duration'] = duration.querySelector('span.visually-hidden').innerText.trim();
                }
    
                const projLinkDiv = li.querySelector('div.pv2');
                if (projLinkDiv) {
                    const projLink = projLinkDiv.querySelector('a');
                    projectObject['link'] = projLink.href;
                }
    
                const description = li.querySelector('div.pv-shared-text-with-see-more.full-width.t-14.t-normal.t-black.display-flex.align-items-center');
                if (description) {
                    projectObject['description'] = description.querySelector('span.visually-hidden').innerText.trim();
                }
    
                projArray.push(projectObject);
            }
    
            return projArray;
        } else {
           
            return [];
        }
    }catch(e){
        console.log(e)
        return []
    }
}


function extractSkills() {
    try{
    const divWithSkills = document.querySelector('div#skills');
    if (divWithSkills) {
        const skillsSection = divWithSkills.closest('section');
        const skillsArray = []
        const skillsUl = skillsSection.querySelector('ul.pvs-list')
        const skillsLi = skillsUl.querySelectorAll('li.artdeco-list__item')
        for (let i = 0; i < skillsLi.length; i++) {
            const li = skillsLi[i]
            const title = li.querySelector('div.display-flex.align-items-center.mr1.t-bold')
            skillsArray.push(title.querySelector('span.visually-hidden').innerText.trim())
        }
        return skillsArray
    }
    else {
       
    }
}catch(e){
    console.log(e)
    return []

}
}


function extractHA() {
    try{
    const divWithHA = document.querySelector('div#honors_and_awards');
    if (divWithHA) {
        const HASection = divWithHA.closest('section');
        const HAUl = HASection.querySelector('ul.pvs-list');
        const HALi = HAUl.querySelectorAll('li.artdeco-list__item');
        const HAArray = [];

        for (let i = 0; i < HALi.length; i++) {
            const li = HALi[i];
            const honorsAndAwardObject = {};

            const title = li.querySelector('div.display-flex.align-items-center.mr1.t-bold');
            if (title) {
                honorsAndAwardObject['title'] = title.querySelector('span.visually-hidden').innerText.trim();
            }

            const issue = li.querySelector('span.t-14.t-normal');
            if (issue) {
                honorsAndAwardObject['issued_by'] = issue.querySelector('span.visually-hidden').innerText.trim();
            }

            const description = li.querySelector('div.pv-shared-text-with-see-more.full-width.t-14.t-normal.t-black.display-flex.align-items-center');
            if (description) {
                honorsAndAwardObject['description'] = description.querySelector('span.visually-hidden').innerText.trim();
            }

            HAArray.push(honorsAndAwardObject);
        }

        return HAArray;
    } else {
       
        return [];
    }
}catch(e){
    return []

}
}


function extractCert() {
    try{
    const divWithCert = document.querySelector('div#licenses_and_certifications');
    if (divWithCert) {
        const certSection = divWithCert.closest('section');
        const certUl = certSection.querySelector('ul.pvs-list');
        const certLi = certUl.querySelectorAll('li.artdeco-list__item');
        const certArray = [];

        for (let i = 0; i < certLi.length; i++) {
            const li = certLi[i];
            const certificationObject = {};

            const title = li.querySelector('div.display-flex.align-items-center.mr1.t-bold');
            if (title) {
                certificationObject['title'] = title.querySelector('span.visually-hidden').innerText.trim();
            }

            const issue = li.querySelector('span.t-14.t-normal');
            if (issue) {
                certificationObject['issued_by'] = issue.querySelector('span.visually-hidden').innerText.trim();
            }

            const duration = li.querySelector('span.t-14.t-normal.t-black--light');
            if (duration) {
                certificationObject['date'] = duration.querySelector('span.visually-hidden').innerText.trim();
            }

            const certLinkDiv = li.querySelector('div.pv2');
            if (certLinkDiv) {
                const certLink = certLinkDiv.querySelector('a');
                certificationObject['link'] = certLink.href;
            }

            certArray.push(certificationObject);
        }

        return certArray;
    } else {
       
        return [];
    }
}catch(e){
    console.log(e)
    return []
}
}
const extractExperience2 = () => {
    try {
        // Get the section with the specified class
        const profileCardSections = document.querySelectorAll('.artdeco-card.pv-profile-card.break-words.mt2');

        // Filter the sections that contain the "experience" div
        const sectionsWithExperience = Array.from(profileCardSections).filter((profileCardSection) => {
            const experienceDiv = profileCardSection.querySelector('#experience');
            return experienceDiv !== null;
        });

        sectionsWithExperience.forEach((profileCardSection) => {
            const experienceDiv = profileCardSection.querySelector('#experience');
            const outerContainerDiv = profileCardSection.querySelector('.pvs-list__outer-container');

            if (experienceDiv) {
                // Call the function to process the content within the found outer container div
            
                const ulElement = outerContainerDiv.querySelector('ul.pvs-list');
                const expLi = ulElement.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');

                for (let i = 0; i < expLi.length; i++) {
                    const li = expLi[i];
       
                    const insideDiv = li.querySelector('.ppsZsJKymLFlJUSOceObOsHEYkrXkSuVhVQg.pvs-entity--padded.JvHHhNIExyEKobNUWiOPChZtcnCYXSDmw');


                    // Extract the href of the a tag inside the first div (insideDiv)
                    const aTag = insideDiv.querySelector('a');
                    if (aTag) {
                        const hrefValue = aTag.getAttribute('href');
                  
                    }

                    const detailsDiv = insideDiv.querySelector('.display-flex.flex-column.full-width.align-self-center');
               

                    const companyNameAndTotalExperience = detailsDiv.querySelector('.display-flex.flex-row.justify-space-between');
                    const companyATag = companyNameAndTotalExperience.querySelector('a');
                    const companyLink = companyATag.getAttribute('href');
        

                    const companyName = companyATag.querySelector('span').textContent.trim(); // Extracting company name
                 
                    const totalYearsElement = companyNameAndTotalExperience.querySelector('span.t-14.t-normal');
                    const totalYears=totalYearsElement?totalYearsElement.querySelector('span').textContent.trim():''; // Extracting total years
                    // const totalYears = totalYearsElement ? totalYearsElement.textContent.trim() : ''; // Extracting total years
                    
                }
            }
        });
    } catch (e) {
        console.error(e);
        return [];
    }
}
const Smiritifunction3 = () => {
  const profileName = document.querySelector('.text-heading-xlarge').innerHTML
  const tagLine = document.querySelector('.text-body-medium').innerHTML.replace(/\s+/g, ' ').trim();
  const profileLocation = document.querySelector('.text-body-small.inline.t-black--light.break-words').innerHTML.replace(/\s+/g, ' ').trim()
  const description = document.querySelector('.pv-shared-text-with-see-more div:first-of-type span:first-child').innerText.replace(/\s+/g, ' ').trim()
  extractExperience2()
  // there are multiple sections and each section has a div with Id section name but the content is not inside the div with that particular id
  // if there are no multiple roles, the main div would contain the role
  // if there were multiple roles, the main div would contain the company name
  // if there were multiple roles, there would be a span denoting the bulletin point in the listDiv
  // if there are multiple roles, location span and duration span interchanges

 

  const extractedData = {
      'name': profileName,
      'bio': tagLine,
      'location': profileLocation,
      'description': description,
      'experience': extractExperience(),
      'education': extractEducation(),
      'volunteering_experience': extractVolunteering(),
      'projects': extractProjects(),
      'top_skills': extractSkills(),
      'honors_and_awards': extractHA(),
      'licenses_and_certifications': extractCert(),
    //   'experience2':extractExperience2(),
  };



  
  return extractedData;
 
  
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "runContentScript") {
    console.log('received message to run content script')
    try{ 
    const user = JSON.parse(request.user.user)
    let extractedData;
    // setTimeout(() => {
    //   extractedData= Smiritifunction3();
    // }, 1000);
    
    const button = document.querySelector(
      ".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.pvs-profile-actions__action"
    );
    const button2 = document.querySelector(
      ".artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.pvs-profile-actions__action"
    );
    
    


    function fillContentEditableWithDummyText(message, contentBox) {
        console.log('fill content called')
        if(contentBox.tagName.toLowerCase() === 'textarea'){
            contentBox.value = message
        }
        else{
            contentBox.innerHTML = `<p>${message}<p/>`;
        }
          // Optionally, you can also trigger an input event to notify any listeners
          const inputEvent = new Event('input', { bubbles: true });
          contentBox.dispatchEvent(inputEvent);
    }
    
    function handleButtonClick() {
        console.log('handle button click called')
        // either we perform normal messaging or personalised connection messages. so only 1 content div would be present at a time
        // whichever is present, we will assign it to the contentEditableDiv variable and pass it to fillMessage() funciton
    let contentEditableDiv;
        const contentEditableDivNodelist = document.querySelectorAll('.msg-form__contenteditable');  // for normal messaging
        setTimeout( () =>{
            const addNoteMessageArea = document.querySelector('.connect-button-send-invite__custom-message');  // for add note connections
            console.log(addNoteMessageArea)
            if(addNoteMessageArea !== null){
                contentEditableDiv = addNoteMessageArea
                console.log('content editable div set to add note')
            }
        }, 500)
        console.log(contentEditableDivNodelist)
        if(contentEditableDivNodelist !== null && contentEditableDivNodelist.length !== 0 ){
            contentEditableDiv= contentEditableDivNodelist.item(contentEditableDivNodelist.length -1 );  // for normal messaging
            console.log('content editable div set to normal messaging content')
        }
        extractedData = Smiritifunction3();
        // Your custom logic for button click
        setTimeout(() => {
            fillContentEditableWithDummyText('Loading...', contentEditableDiv)
         
            fetch('https://gmuf2naldzuc4nxlduhu4bnmce0lbfbn.lambda-url.eu-north-1.on.aws/',{
                method: "POST",
                body: JSON.stringify({
                    email: user.email,
                    extractedData: extractedData
                })
            }).then(res => res.json()).then(data => fillContentEditableWithDummyText(data.message, contentEditableDiv))
        },700);
        //fillContentEditableWithDummyText();
    }




    
    // Check if button1 exists
    if (button) {
      const buttonTextSpan = button.querySelector(".artdeco-button__text");
      // Check if button1 has the expected text
      if (buttonTextSpan && buttonTextSpan.textContent.trim() === "Message") {
        // Add click event listener to button1
        button.addEventListener("click", handleButtonClick);
      } else {
        if (button2) {
          const buttonTextSpan = button2.querySelector(
            ".artdeco-button__text"
          );
          // Check if button2 has the expected text
          if (
            buttonTextSpan &&
            buttonTextSpan.textContent.trim() === "Message"
          ) {
            // Add click event listener to button2
            button2.addEventListener("click", handleButtonClick);
          } else {
          
          }
        }
      }
    } else {
    }



    

    // PERSONALISED CONNECTION REQUEST RELATED
//------------------------------------------------------------//

const blueButtonStyle = {
    backgroundColor: 'blue',
    color: 'white',
};

// we can click on the connect button in the search results page as well as the profile page. If we click the connect button from the search results page, we need to navigate to the profiles page
const connectButtonSearchList = document.querySelectorAll('.artdeco-button');
console.log(connectButtonSearchList)
// Filter the elements based on the presence of a child span with text "Connect"
const filteredButtons = Array.from(connectButtonSearchList).filter(button => {
    const spanElement = button.querySelector('.artdeco-button__text'); // Query the span directly
    return spanElement && spanElement.textContent.trim().toLowerCase() === "connect";
});
console.log(filteredButtons.length);


function connectHandler( connectButton){
    try{
        console.log('connect handler called')
    // if we click any of the filtered buttons, we need to check if we are in the search results url or the profiles url or did we find this profile on the right side of someone else's profile
    if(window.location.href.toLowerCase().includes("https://www.linkedin.com/search/results")){
        // if we are in the search results url, we need to navigate to the profile
        const userProfileElement = connectButton.closest('.linked-area');
        if(userProfileElement){
            const closestTitleLine = userProfileElement.querySelector('.entity-result__title-text');
            console.log(closestTitleLine)
            if( closestTitleLine ){
                closestTitleLine.click()
                console.log('clicked the title to profile')
            }
        }
    }
    // we cannot add connection note if we are trying to connect with a profile whose recommendation is on the side of someone else's profile
    const addNoteButton = document.querySelector('button[aria-label="Add a note"]');
    console.log(addNoteButton)
    if( addNoteButton ){
        addNoteButton.addEventListener("click",handleButtonClick)
        console.log(' add note button found and event handler attached')
    }
    }
    catch(e){
        console.log(`error in connect handler ${e}`)
    }
    
}
if( filteredButtons && filteredButtons.length > 0 ){
    filteredButtons.forEach(button => {
        button.addEventListener("click", () =>{
            connectHandler(button)
        });
        Object.assign(button.style, blueButtonStyle);
        console.log('connect buttons found and event handlers attached')
      });
}
    sendResponse({ success: true });
}
catch(e){
    console.log(`error in sending response: ${e}`)
}

  }
});