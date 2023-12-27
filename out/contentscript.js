//bug button click
//format ->
//3 times
//resolve ->fields 
//set timeout issue
// const SmiritiFunction = () => {
//   const profileName = document.querySelector('.text-heading-xlarge').innerHTML
//   const tagLine = document.querySelector('.text-body-medium').innerHTML.replace(/\s+/g, ' ').trim();
//   const profileLocation = document.querySelector('.text-body-small.inline.t-black--light.break-words').innerHTML.replace(/\s+/g, ' ').trim()
//   const description = document.querySelector('.pv-shared-text-with-see-more div:first-of-type span:first-child').innerText.replace(/\s+/g, ' ').trim()


//   // there are multiple sections and each section has a div with Id section name but the content is not inside the div with that particular id
//   // if there are no multiple roles, the main div would contain the role
//   // if there were multiple roles, the main div would contain the company name
//   // if there were multiple roles, there would be a span denoting the bulletin point in the listDiv
//   // if there are multiple roles, location span and duration span interchanges

//   function extractExperience() {
//       console.log('Extract experience function called');
//       const divWithExp = document.querySelector('div#experience');
//       if (divWithExp) {
//           const expSection = divWithExp.closest('section');
//           const expUl = expSection.querySelector('ul.pvs-list');
//           const expLi = expUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
//           const expArray = [];
//           const roleDescriptionSet = new Set(); // Set to store unique role descriptions
  
//           for (let i = 0; i < expLi.length; i++) {
//               const li = expLi[i];
//               const expObj = {};
//               const company_link = li.querySelector('a[data-field="experience_company_logo"]');
//               if (company_link) {
//                   expObj['company_link'] = company_link.href;
//               }
//               const mainDiv = li.querySelector('div.display-flex.flex-row.justify-space-between');
//               if (mainDiv) {
//                   const locationSpan = mainDiv.querySelector('span.t-14.t-normal');
//                   const durationSpan = mainDiv.querySelector('span.t-black--light');
  
//                   const listDiv = li.querySelector('div.pvs-list__outer-container.pvs-entity__sub-components');
  
//                   if (listDiv) {
//                       const bulletinSpan = listDiv.querySelector('span.pvs-entity__path-node');
  
//                       if (bulletinSpan && locationSpan && durationSpan) {
//                           expObj['company_name'] = mainDiv.querySelector('span.visually-hidden').innerText.trim();
//                           expObj['location'] = durationSpan.querySelector('span.visually-hidden').innerText.trim();
//                           expObj['duration'] = locationSpan.querySelector('span.visually-hidden').innerText.trim();
  
//                           const roles = [];
//                           const multipleRolesLi = listDiv.querySelectorAll('li.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
//                           for (let j = 0; j < multipleRolesLi.length; j++) {
//                               const roleObj = {};
//                               const currRole = multipleRolesLi[j];
//                               const roleTitle = currRole.querySelector('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold');
//                               const roleDuration = currRole.querySelector('span.t-14.t-normal.t-black--light');
//                               if (roleTitle && roleDuration) {
//                                   const roleDescriptionDiv = currRole.querySelector('div.pvs-list__outer-container.pvs-entity__sub-components');
//                                   roleObj['role'] = roleTitle.querySelector('span.visually-hidden').innerText.trim();
//                                   roleObj['duration'] = roleDuration.querySelector('span.visually-hidden').innerText.trim();
  
//                                   if (roleDescriptionDiv) {
//                                       const roleDescriptionUl = roleDescriptionDiv.querySelector('ul');
//                                       const roleDescriptionLi = roleDescriptionUl.querySelectorAll('li');
//                                       const rDArray = [];
//                                       for (let k = 0; k < roleDescriptionLi.length; k++) {
//                                           const descriptionText = roleDescriptionLi[k].querySelector('span.visually-hidden').innerText.trim();
//                                           if (!roleDescriptionSet.has(descriptionText)) {
//                                               roleDescriptionSet.add(descriptionText);
//                                               rDArray.push(descriptionText);
//                                           }
//                                       }
//                                       roleObj['role_description'] = rDArray;
//                                   }
  
//                                   roles.push(roleObj);
//                               }
//                           }
  
//                           if (roles.length > 0) {
//                               expObj['roles'] = roles;
//                           }
//                       } else if ((bulletinSpan && locationSpan) || (bulletinSpan && durationSpan)) {
//                           expObj['company_name'] = mainDiv.querySelector('span.visually-hidden').innerText.trim();
//                           expObj['primary_info'] = (locationSpan) ? { 'duration': locationSpan.querySelector('span.visually-hidden').innerText.trim() } : { 'location': durationSpan.querySelector('span.visually-hidden').innerText.trim() };
//   // incase of multiple roles, location spam and duration span intercahnges

//                           const roles = [];
//                           const multipleRolesLi = listDiv.querySelectorAll('li.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
//                           for (let j = 0; j < multipleRolesLi.length; j++) {
//                               const roleObj = {};
//                               const currRole = multipleRolesLi[j];
//                               const roleTitle = currRole.querySelector('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold');
//                               const roleDuration = currRole.querySelector('span.t-14.t-normal.t-black--light');
//                               if (roleTitle && roleDuration) {
//                                   const roleDescriptionDiv = currRole.querySelector('div.pvs-list__outer-container.pvs-entity__sub-components');
//                                   roleObj['role'] = roleTitle.querySelector('span.visually-hidden').innerText.trim();
//                                   roleObj['duration'] = roleDuration.querySelector('span.visually-hidden').innerText.trim();
  
//                                   if (roleDescriptionDiv) {
//                                       const roleDescriptionUl = roleDescriptionDiv.querySelector('ul');
//                                       const roleDescriptionLi = roleDescriptionUl.querySelectorAll('li');
//                                       const rDArray = [];
//                                       for (let k = 0; k < roleDescriptionLi.length; k++) {
//                                           const descriptionText = roleDescriptionLi[k].querySelector('span.visually-hidden').innerText.trim();
//                                           if (!roleDescriptionSet.has(descriptionText)) {
//                                               roleDescriptionSet.add(descriptionText);
//                                               rDArray.push(descriptionText);
//                                           }
//                                       }
//                                       roleObj['role_description'] = rDArray;
//                                   }
  
//                                   roles.push(roleObj);
//                               }
//                           }
  
//                           if (roles.length > 0) {
//                               expObj['roles'] = roles;
//                           }
//                       } else if (locationSpan && durationSpan) {
//                           // single role, location span = company name
//                           expObj['role'] = mainDiv.querySelector('span.visually-hidden').innerText.trim();
//                           expObj['company_name'] = locationSpan.querySelector('span.visually-hidden').innerText.trim();
//                           expObj['duration'] = durationSpan.querySelector('span.visually-hidden').innerText.trim();
//                       }
//                   }
//               }
//               expArray.push(expObj);
//           }
  
//           return expArray;
//       } else {
//           console.log('No experience details provided');
//       }
//   }
  

//   function extractEducation() {
//       const divWithEdu = document.querySelector('div#education');
//       if (divWithEdu) {
//           const eduSection = divWithEdu.closest('section');
//           const eduUl = eduSection.querySelector('ul.pvs-list');
//           const eduArray = [];
//           const eduLi = eduUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');

//           for (let i = 0; i < eduLi.length; i++) {
//               const li = eduLi[i];
//               const educationObject = {};

//               const titleSchool = li.querySelector('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold');
//               if (titleSchool) {
//                   educationObject['name_of_institution'] = titleSchool.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const degree = li.querySelector('span.t-14.t-normal');
//               if (degree) {
//                   educationObject['course'] = degree.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const duration = li.querySelector('span.t-black--light');
//               if (duration) {
//                   educationObject['course_duration'] = duration.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const eduDescription = li.querySelector('div.pvs-list__outer-container.pvs-entity__sub-components');
//               if (eduDescription) {
//                   educationObject['description'] = eduDescription.querySelector('span.visually-hidden').innerText.trim();
//               }

//               eduArray.push(educationObject);
//           }

//           return eduArray;
//       } else {
//           console.log('No education details provided');
//           return [];
//       }
//   }


//   function extractVolunteering() {
//       const divWithVol = document.querySelector('div#volunteering_experience');
//       if (divWithVol) {
//           const volSection = divWithVol.closest('section');
//           const volUl = volSection.querySelector('ul.pvs-list');
//           const volLi = volUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
//           const volArray = [];

//           for (let i = 0; i < volLi.length; i++) {
//               const li = volLi[i];
//               const volunteerObject = {};

//               const title = li.querySelector('div.display-flex.align-items-center.mr1.t-bold');
//               if (title) {
//                   volunteerObject['role'] = title.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const organisation = li.querySelector('span.t-14.t-normal');
//               if (organisation) {
//                   volunteerObject['organisation'] = organisation.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const duration = li.querySelector('span.t-black--light');
//               if (duration) {
//                   volunteerObject['duration'] = duration.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const description = li.querySelector('div.pv-shared-text-with-see-more.full-width.t-14.t-normal.t-black.display-flex.align-items-center');
//               if (description) {
//                   volunteerObject['description'] = description.querySelector('span.visually-hidden').innerText.trim();
//               }

//               volArray.push(volunteerObject);
//           }

//           return volArray;
//       } else {
//           console.log('No volunteering experience provided');
//           return [];
//       }
//   }



//   function extractProjects() {
//       const divWithProj = document.querySelector('div#projects');
//       if (divWithProj) {
//           const projSection = divWithProj.closest('section');
//           const projUl = projSection.querySelector('ul.pvs-list');
//           const projLi = projUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
//           const projArray = [];

//           for (let i = 0; i < projLi.length; i++) {
//               const li = projLi[i];
//               const projectObject = {};

//               const title = li.querySelector('div.display-flex.align-items-center.mr1.t-bold');
//               if (title) {
//                   projectObject['title'] = title.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const duration = li.querySelector('span.t-14.t-normal');
//               if (duration) {
//                   projectObject['duration'] = duration.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const projLinkDiv = li.querySelector('div.pv2');
//               if (projLinkDiv) {
//                   const projLink = projLinkDiv.querySelector('a');
//                   projectObject['link'] = projLink.href;
//               }

//               const description = li.querySelector('div.pv-shared-text-with-see-more.full-width.t-14.t-normal.t-black.display-flex.align-items-center');
//               if (description) {
//                   projectObject['description'] = description.querySelector('span.visually-hidden').innerText.trim();
//               }

//               projArray.push(projectObject);
//           }

//           return projArray;
//       } else {
//           console.log('No projects added');
//           return [];
//       }
//   }


//   function extractSkills() {
//       const divWithSkills = document.querySelector('div#skills');
//       if (divWithSkills) {
//           const skillsSection = divWithSkills.closest('section');
//           const skillsArray = []
//           const skillsUl = skillsSection.querySelector('ul.pvs-list')
//           const skillsLi = skillsUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA')
//           for (let i = 0; i < skillsLi.length; i++) {
//               const li = skillsLi[i]
//               const title = li.querySelector('div.display-flex.align-items-center.mr1.t-bold')
//               skillsArray.push(title.querySelector('span.visually-hidden').innerText.trim())
//           }
//           return skillsArray
//       }
//       else {
//           console.log("No skills added")
//       }
//   }


//   function extractHA() {
//       const divWithHA = document.querySelector('div#honors_and_awards');
//       if (divWithHA) {
//           const HASection = divWithHA.closest('section');
//           const HAUl = HASection.querySelector('ul.pvs-list');
//           const HALi = HAUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
//           const HAArray = [];

//           for (let i = 0; i < HALi.length; i++) {
//               const li = HALi[i];
//               const honorsAndAwardObject = {};

//               const title = li.querySelector('div.display-flex.align-items-center.mr1.t-bold');
//               if (title) {
//                   honorsAndAwardObject['title'] = title.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const issue = li.querySelector('span.t-14.t-normal');
//               if (issue) {
//                   honorsAndAwardObject['issued_by'] = issue.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const description = li.querySelector('div.pv-shared-text-with-see-more.full-width.t-14.t-normal.t-black.display-flex.align-items-center');
//               if (description) {
//                   honorsAndAwardObject['description'] = description.querySelector('span.visually-hidden').innerText.trim();
//               }

//               HAArray.push(honorsAndAwardObject);
//           }

//           return HAArray;
//       } else {
//           console.log("No awards added");
//           return [];
//       }
//   }


//   function extractCert() {
//       const divWithCert = document.querySelector('div#licenses_and_certifications');
//       if (divWithCert) {
//           const certSection = divWithCert.closest('section');
//           const certUl = certSection.querySelector('ul.pvs-list');
//           const certLi = certUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
//           const certArray = [];

//           for (let i = 0; i < certLi.length; i++) {
//               const li = certLi[i];
//               const certificationObject = {};

//               const title = li.querySelector('div.display-flex.align-items-center.mr1.t-bold');
//               if (title) {
//                   certificationObject['title'] = title.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const issue = li.querySelector('span.t-14.t-normal');
//               if (issue) {
//                   certificationObject['issued_by'] = issue.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const duration = li.querySelector('span.t-14.t-normal.t-black--light');
//               if (duration) {
//                   certificationObject['date'] = duration.querySelector('span.visually-hidden').innerText.trim();
//               }

//               const certLinkDiv = li.querySelector('div.pv2');
//               if (certLinkDiv) {
//                   const certLink = certLinkDiv.querySelector('a');
//                   certificationObject['link'] = certLink.href;
//               }

//               certArray.push(certificationObject);
//           }

//           return certArray;
//       } else {
//           console.log('No certifications');
//           return [];
//       }
//   }


//   const extractedData = {
//       'name': profileName,
//       'bio': tagLine,
//       'location': profileLocation,
//       'description': description,
//       'experience': extractExperience(),
//       'education': extractEducation(),
//       'volunteering_experience': extractVolunteering(),
//       'projects': extractProjects(),
//       'top_skills': extractSkills(),
//       'honors_and_awards': extractHA(),
//       'licenses_and_certifications': extractCert()
//   };



//   const jsonData = JSON.stringify(extractedData, null, 2);
//   console.log(jsonData);
// }
// const Smiritfunction2 = () => {
//   const nameElement = document.querySelector(
//     ".text-heading-xlarge.inline.t-24.v-align-middle.break-words"
//   );
//   const taglineElement = document.querySelector(
//     ".text-body-medium.break-words"
//   );
//   const latestCompanyElement =
//     document.querySelector(".inline-show-more-text--is-collapsed") ||
//     document.querySelector(
//       '.inline-show-more-text--is-collapsed-with-line-clamp[style*="line-clamp:2;"]'
//     ) ||
//     document.querySelector(".inline");

//   const collegeElement =
//     document.querySelector(".inline-show-more-text--is-collapsed") ||
//     document.querySelector(
//       '.inline-show-more-text--is-collapsed-with-line-clamp[style*="line-clamp:2;"]'
//     ) ||
//     document.querySelector(".inline");
//   const locationElement = document.querySelector(
//     ".text-body-small.inline.t-black--light.break-words"
//   );
//   // Extract content from each element if available
//   const person_name = nameElement ? nameElement.textContent.trim() : null;
//   const tagline = taglineElement ? taglineElement.textContent.trim() : null;
//   const location1 = locationElement
//     ? locationElement.textContent.trim()
//     : null;
//   let about;

//   setTimeout(() => {
//     const elements = document.getElementsByClassName("display-flex ph5 pv3");

//     if (elements.length > 0) {
//       const visuallyHiddenSpan =
//         elements[0].querySelector(".visually-hidden");

//       if (visuallyHiddenSpan) {
//         about = visuallyHiddenSpan.innerText.trim();
//       } else {
//         console.log(
//           "No element found with class 'visually-hidden' inside 'display-flex ph5 pv3'"
//         );
//       }

//       const profileInfo = {
//         person_name,
//         tagline,
//         location: location1,
//         about: about,
//       };

//       console.log(profileInfo);
//     } else {
//       console.log("No elements found with class 'display-flex ph5 pv3'");
//     }
//     // basic details
//     const profileName = document.querySelector(
//       ".text-heading-xlarge"
//     ).innerHTML;
//     const tagLine = document
//       .querySelector(".text-body-medium")
//       .innerHTML.replace(/\s+/g, " ")
//       .trim();
//     const profileLocation = document
//       .querySelector(".text-body-small.inline.t-black--light.break-words")
//       .innerHTML.replace(/\s+/g, " ")
//       .trim();
//     const description = document
//       .querySelector(
//         ".pv-shared-text-with-see-more div:first-of-type span:first-child"
//       )
//       .innerText.replace(/\s+/g, " ")
//       .trim();

//     // Function to extract information from a section
//     function extractSectionInformation(sectionId) {
//       const divWithSection = document.querySelector(`div#${sectionId}`);
//       if (divWithSection) {
//         const section = divWithSection.closest("section");
//         const ul = section.querySelector("ul");
//         const liElements = ul.getElementsByTagName("li");
//         const dataArray = [];
//         const uniqueElementsSet = new Set();
//         // for cleaning data, checking if one entry is duplicate or subset
//         // Function to check if one array is a subset of another
//         function isSubset(arr1, arr2) {
//           return arr1.every((item) => arr2.includes(item));
//         }

//         for (let i = 0; i < liElements.length; i++) {
//           const li = liElements[i];
//           const visuallyHiddenSpans = li.querySelectorAll(
//             "span.visually-hidden"
//           );
//           const innerTextArray = [];

//           visuallyHiddenSpans.forEach((span) => {
//             innerTextArray.push(span.innerText.replace(/\s+/g, " ").trim());
//           });
//           // Check if innerTextArray is a subset of any existing element in the set
//           const isSubsetOfExisting = [...uniqueElementsSet].some(
//             (existingArray) => isSubset(innerTextArray, existingArray)
//           );
//           // If not a subset, add innerTextArray to dataArray and the set
//           if (!isSubsetOfExisting) {
//             dataArray.push(innerTextArray);
//             uniqueElementsSet.add(innerTextArray);
//           }
//         }

//         return dataArray;
//       } else {
//         console.error(`Div with id "${sectionId}" not found`);
//         return null;
//       }
//     }

//     const extractedData = {
//       name: profileName,
//       bio: tagLine,
//       location: profileLocation,
//       description: description,
//       experience: extractSectionInformation("experience"),
//       education: extractSectionInformation("education"),
//       volunteering_experience: extractSectionInformation(
//         "volunteering_experience"
//       ),
//       projects: extractSectionInformation("projects"),
//       skills: extractSectionInformation("skills"),
//       honors_and_awards: extractSectionInformation("honors_and_awards"),
//     };
//     console.log(extractedData);
//     const jsonData = JSON.stringify(extractedData, null, 2);
//     console.log(jsonData);

//     const button = document.querySelector(
//       ".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.pvs-profile-actions__action"
//     );
//     const button2 = document.querySelector(
//       ".artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.pvs-profile-actions__action"
//     );
//     console.log(button2);

//     // Function to handle button click
//     function fillContentEditableWithDummyText() {
//       console.log("fillContentEditableWithDummyText called");
     
//         const contentEditableDiv = document.querySelector('.msg-form__contenteditable');
//         console.log(contentEditableDiv);
//         if (contentEditableDiv) {
//           // Replace this with your desired dummy text
//           const dummyText = 'Hello, this is dummy text!';
          
//           // Set the inner HTML of the contenteditable div with the dummy text
//           const message=`<p>Hi ${extractedData["name"]},</p>
//           <p>Saw that you are working at TinkerHub MEC.</p>
//          <p>Do you have an opening at TinkerHub MEC for a full stack developer role?</p>
//           <p>Thank you</p>
//           `
//           contentEditableDiv.innerHTML = message;
          
//           // Optionally, you can also trigger an input event to notify any listeners
//           const inputEvent = new Event('input', { bubbles: true });
//           contentEditableDiv.dispatchEvent(inputEvent);
//         }
   
//     }
    
//     function handleButtonClick() {
//       console.log("Button clicked!");
//       // Your custom logic for button click
//       fillContentEditableWithDummyText();
//     }

//     // Check if button1 exists
//     if (button) {
//       const buttonTextSpan = button.querySelector(".artdeco-button__text");

//       // Check if button1 has the expected text
//       if (buttonTextSpan && buttonTextSpan.textContent.trim() === "Message") {
//         console.log('Button 1 with text "Message" found!');

//         // Add click event listener to button1
//         button.addEventListener("click", handleButtonClick);
//       } else {
//         console.log("Button 1 does not contain the expected text");
//         if (button2) {
//           const buttonTextSpan = button2.querySelector(
//             ".artdeco-button__text"
//           );

//           // Check if button2 has the expected text
//           if (
//             buttonTextSpan &&
//             buttonTextSpan.textContent.trim() === "Message"
//           ) {
//             console.log('Button 2 with text "Message" found!');

//             // Add click event listener to button2
//             button2.addEventListener("click", handleButtonClick);
//           } else {
//             console.log("Button 2 does not contain the expected text");
//           }
//         }
//       }
//     } else {
//       console.log("Buttons not found");
//     }
//   }, 2000);
  
// }
const Smiritifunction3 = () => {
  const profileName = document.querySelector('.text-heading-xlarge').innerHTML
  const tagLine = document.querySelector('.text-body-medium').innerHTML.replace(/\s+/g, ' ').trim();
  const profileLocation = document.querySelector('.text-body-small.inline.t-black--light.break-words').innerHTML.replace(/\s+/g, ' ').trim()
  const description = document.querySelector('.pv-shared-text-with-see-more div:first-of-type span:first-child').innerText.replace(/\s+/g, ' ').trim()


  // there are multiple sections and each section has a div with Id section name but the content is not inside the div with that particular id
  // if there are no multiple roles, the main div would contain the role
  // if there were multiple roles, the main div would contain the company name
  // if there were multiple roles, there would be a span denoting the bulletin point in the listDiv
  // if there are multiple roles, location span and duration span interchanges

  function extractExperience() {
      console.log('Extract experience function called');
      const divWithExp = document.querySelector('div#experience');
      if (divWithExp) {
          const expSection = divWithExp.closest('section');
          const expUl = expSection.querySelector('ul.pvs-list');
          const expLi = expUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
          const expArray = [];
          const roleDescriptionSet = new Set(); // Set to store unique role descriptions
  
          for (let i = 0; i < expLi.length; i++) {
              const li = expLi[i];
              const expObj = {};
              const company_link = li.querySelector('a[data-field="experience_company_logo"]');
              if (company_link) {
                  expObj['company_link'] = company_link.href;
              }
              // maindiv = title + basic details
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
                          const multipleRolesLi = listDiv.querySelectorAll('li.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
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
                                          const descriptionText = roleDescriptionLi[k].querySelector('span.visually-hidden').innerText.trim();
                                          if (!roleDescriptionSet.has(descriptionText)) {
                                              roleDescriptionSet.add(descriptionText);
                                              rDArray.push(descriptionText);
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
                          const multipleRolesLi = listDiv.querySelectorAll('li.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
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
                                          const descriptionText = roleDescriptionLi[k].querySelector('span.visually-hidden').innerText.trim();
                                          if (!roleDescriptionSet.has(descriptionText)) {
                                              roleDescriptionSet.add(descriptionText);
                                              rDArray.push(descriptionText);
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
          return expArray;
      } else {
          // no div with exp = no experience details provided
          console.log('No experience details provided');
      }
  }
  

  function extractEducation() {
      const divWithEdu = document.querySelector('div#education');
      if (divWithEdu) {
          const eduSection = divWithEdu.closest('section');
          const eduUl = eduSection.querySelector('ul.pvs-list');
          const eduArray = [];
          const eduLi = eduUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');

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
  }


  function extractVolunteering() {
      const divWithVol = document.querySelector('div#volunteering_experience');
      if (divWithVol) {
          const volSection = divWithVol.closest('section');
          const volUl = volSection.querySelector('ul.pvs-list');
          const volLi = volUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
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
  }



  function extractProjects() {
      const divWithProj = document.querySelector('div#projects');
      if (divWithProj) {
          const projSection = divWithProj.closest('section');
          const projUl = projSection.querySelector('ul.pvs-list');
          const projLi = projUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
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
  }


  function extractSkills() {
      const divWithSkills = document.querySelector('div#skills');
      if (divWithSkills) {
          const skillsSection = divWithSkills.closest('section');
          const skillsArray = []
          const skillsUl = skillsSection.querySelector('ul.pvs-list')
          const skillsLi = skillsUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA')
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
  }


  function extractHA() {
      const divWithHA = document.querySelector('div#honors_and_awards');
      if (divWithHA) {
          const HASection = divWithHA.closest('section');
          const HAUl = HASection.querySelector('ul.pvs-list');
          const HALi = HAUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
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
  }


  function extractCert() {
      const divWithCert = document.querySelector('div#licenses_and_certifications');
      if (divWithCert) {
          const certSection = divWithCert.closest('section');
          const certUl = certSection.querySelector('ul.pvs-list');
          const certLi = certUl.querySelectorAll('li.artdeco-list__item.qiKsLKoCUWtHqyagDivfYcjmKwgXlGodspDy.TPbZDJYZHPlKCdaCvYdpSYAYPoBvcsnjmfxA');
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
  }


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
      'licenses_and_certifications': extractCert()
  };


console.log(extractedData);
  
  return extractedData;
 
  
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "runContentScript") {
    let extractedData;
    setTimeout(() => {
      extractedData= Smiritifunction3();
    }, 1000);
    const button = document.querySelector(
      ".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.pvs-profile-actions__action"
    );
    const button2 = document.querySelector(
      ".artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.pvs-profile-actions__action"
    );
    console.log(button2);
  
    // Function to handle button click
    function fillContentEditableWithDummyText() {
      console.log("fillContentEditableWithDummyText called");
     
        const contentEditableDiv = document.querySelector('.msg-form__contenteditable');
        console.log(contentEditableDiv);
        if (contentEditableDiv) {
          // Replace this with your desired dummy text
          const dummyText = 'Hello, this is dummy text!';
          
          // Set the inner HTML of the contenteditable div with the dummy text
          const message=`<p>Hi ${extractedData["name"]},</p>
          <p>Saw that you are worked at ${extractedData["experience"][0]?.company_name.split(' · ')[0].trim()}</p>
         <p>Do you have an opening at ${extractedData["experience"][0]?.company_name.split(' · ')[0].trim()} for a full stack developer role?</p>
          <p>Thank you</p>
          `
          contentEditableDiv.innerHTML = message;
          
          // Optionally, you can also trigger an input event to notify any listeners
          const inputEvent = new Event('input', { bubbles: true });
          contentEditableDiv.dispatchEvent(inputEvent);
        }
   
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
  }
});