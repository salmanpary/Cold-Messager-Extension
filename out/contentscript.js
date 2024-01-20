function extractExperience() {
    try{
        console.log('Extract experience function called');
        const divWithExp = document.querySelector('div#experience');
        console.log(divWithExp, 'divWithExp');
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
                            expObj['company_name'] = mainDiv.querySelector('span.visually-hidden').innerText.trim();
                            expObj['location'] = durationSpan.querySelector('span.visually-hidden').innerText.trim();
                            expObj['duration'] = locationSpan.querySelector('span.visually-hidden').innerText.trim();
    
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
                                    roleObj['duration'] = roleDuration.querySelector('span.visually-hidden').innerText.trim();
    
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
                            expObj['company_name'] = mainDiv.querySelector('span.visually-hidden').innerText.trim();
                            expObj['primary_info'] = (locationSpan) ? { 'duration': locationSpan.querySelector('span.visually-hidden').innerText.trim() } : { 'location': durationSpan.querySelector('span.visually-hidden').innerText.trim() };
    // incase of multiple roles, location spam and duration span intercahnges
    
                            const roles = [];
                            const multipleRolesLi = listDiv.querySelectorAll('li');
                            console.log(multipleRolesLi)

                            try{
                                for (let j = 0; j < multipleRolesLi.length; j++) {
                                    const roleObj = {};
                                    const currRole = multipleRolesLi[j];
                                    const roleTitle = currRole.querySelector('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold');
                                    const roleDuration = currRole.querySelector('span.t-14.t-normal.t-black--light');
                                    if (roleTitle && roleDuration) {
                                        const roleDescriptionDiv = currRole.querySelector('div.pvs-list__outer-container.pvs-entity__sub-components');
                                        roleObj['role'] = roleTitle.querySelector('span.visually-hidden').innerText.trim();
                                        roleObj['duration'] = roleDuration.querySelector('span.visually-hidden').innerText.trim();
                                        console.log('reldesc')
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
                                console.log(expObj)
                            }
                        } else {
                            // single role with description
                            // single role, location span = company name
                            expObj['role'] = mainDiv.querySelector('span.visually-hidden').innerText.trim();
                            if(locationSpan){
                                expObj['company_name'] = locationSpan.querySelector('span.visually-hidden').innerText.trim();
                            }
                           if( durationSpan ){
                            expObj['duration'] = durationSpan.querySelector('span.visually-hidden').innerText.trim();
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
                            expObj['role_description'] = rDArray;
                        }
                    }
                    else{
                        // no listdiv
                        // single role without description
                        // no listdiv = no extra details provided except the titile part
                        expObj['role'] = mainDiv.querySelector('span.visually-hidden').innerText.trim();
                        if(locationSpan){
                            expObj['company_name'] = locationSpan.querySelector('span.visually-hidden').innerText.trim();
                        }
                       if( durationSpan ){
                        expObj['duration'] = durationSpan.querySelector('span.visually-hidden').innerText.trim();
                       }
                    }
                }
    
    
                expArray.push(expObj);
            }
            console.log(expArray)
            return expArray;
        } else {
            // no div with exp = no experience details provided
            console.log('No experience details provided');
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
        console.log('No education details provided');
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
        console.log('No volunteering experience provided');
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
            console.log('No projects added');
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
        console.log("No skills added")
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
        console.log("No awards added");
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
        console.log('No certifications');
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
                console.log(outerContainerDiv, 'outerContainerDiv');
                const ulElement = outerContainerDiv.querySelector('ul.pvs-list');
                const expLi = ulElement.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');

                for (let i = 0; i < expLi.length; i++) {
                    const li = expLi[i];
                    console.log(li, 'li');
                    const insideDiv = li.querySelector('.ppsZsJKymLFlJUSOceObOsHEYkrXkSuVhVQg.pvs-entity--padded.JvHHhNIExyEKobNUWiOPChZtcnCYXSDmw');
                    console.log(insideDiv, 'insideDiv');

                    // Extract the href of the a tag inside the first div (insideDiv)
                    const aTag = insideDiv.querySelector('a');
                    if (aTag) {
                        const hrefValue = aTag.getAttribute('href');
                        console.log(hrefValue, 'hrefValue');
                    }

                    const detailsDiv = insideDiv.querySelector('.display-flex.flex-column.full-width.align-self-center');
                    console.log(detailsDiv, 'detailsDiv');

                    const companyNameAndTotalExperience = detailsDiv.querySelector('.display-flex.flex-row.justify-space-between');
                    const companyATag = companyNameAndTotalExperience.querySelector('a');
                    const companyLink = companyATag.getAttribute('href');
                    console.log(companyLink, 'companyLink');

                    const companyName = companyATag.querySelector('span').textContent.trim(); // Extracting company name
                    console.log(companyName, 'companyName');

                    const totalYearsElement = companyNameAndTotalExperience.querySelector('span.t-14.t-normal');
                    const totalYears=totalYearsElement?totalYearsElement.querySelector('span').textContent.trim():''; // Extracting total years
                    // const totalYears = totalYearsElement ? totalYearsElement.textContent.trim() : ''; // Extracting total years
                    console.log(totalYears, 'totalYears');
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


console.log(extractedData);
  
  return extractedData;
 
  
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "runContentScript") {
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
    console.log(button2);
  
    // Function to handle button click
    function fillContentEditableWithDummyText(message) {
      console.log("fillContentEditableWithDummyText called");
     
      const contentEditableDivNodelist = document.querySelectorAll('.msg-form__contenteditable');
      const contentEditableDiv = contentEditableDivNodelist.item(contentEditableDivNodelist.length -1 );
      console.log(contentEditableDiv);
      
        if (contentEditableDiv) {
          // Replace this with your desired dummy text
          const dummyText = 'Hello, this is dummy text!';
          
          // Set the inner HTML of the contenteditable div with the dummy text
        //   const message=`<p>Hi ${extractedData["name"]},</p>
        //   <p>Saw that you have worked at ${extractedData["experience"][0]?.company_name.split(' · ')[0].trim()}</p>
        //  <p>Do you have an opening at ${extractedData["experience"][0]?.company_name.split(' · ')[0].trim()} for a full stack developer role?</p>
        //   <p>Thank you</p>
        //   `
          contentEditableDiv.innerHTML = `<p>${message}<p/>`;
          
          // Optionally, you can also trigger an input event to notify any listeners
          const inputEvent = new Event('input', { bubbles: true });
          contentEditableDiv.dispatchEvent(inputEvent);
        }
   
    }
    
    function handleButtonClick() {
        console.log("Button clicked!");
        extractedData = Smiritifunction3();
        // Your custom logic for button click
        setTimeout(() => {
            fillContentEditableWithDummyText('Loading...')
            console.log('reqqq')
            fetch('https://gmuf2naldzuc4nxlduhu4bnmce0lbfbn.lambda-url.eu-north-1.on.aws/',{
                method: "POST",
                body: JSON.stringify({
                    uid: "WIknTUSSunQtmQbFPsgaLhKY98B3",
                    extractedData: extractedData
                })
            }).then(res => res.json()).then(data => fillContentEditableWithDummyText(data.message))
        },300);
        //fillContentEditableWithDummyText();
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
  }
});