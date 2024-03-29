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

function extractDuration(duration) {
    const centerSymbolIndex = duration.indexOf("·");
    let newDuration = duration
    newDuration = newDuration.replace('yrs', 'years')
    newDuration = newDuration.replace('mos', 'months')
    if (centerSymbolIndex !== -1) {
        return newDuration.substring(centerSymbolIndex + 1).trim();
    } else {
        return newDuration.trim();
    }
}
function extractExperience() {
    try {
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
                            expObj['primary_info'] = {
                                'duration': extractDuration(locationSpan.querySelector('span.visually-hidden').innerText.trim()),
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

                            try {
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
                            } catch (error) {
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
                            if (locationSpan) {
                                expObj['company_name'] = extractCompanyName(locationSpan.querySelector('span.visually-hidden').innerText.trim());
                            }
                            if (durationSpan) {
                                expObj['primary_info']['duration'] = extractDuration(durationSpan.querySelector('span.visually-hidden').innerText.trim());
                            }
                            const roleDescriptionUl = listDiv.querySelector('ul.pvs-list');
                            const roleDescriptionLi = roleDescriptionUl.querySelectorAll('li');
                            const rDArray = [];
                            for (let k = 0; k < roleDescriptionLi.length; k++) {
                                const descriptionTextDiv = roleDescriptionLi[k].querySelector('span.visually-hidden')
                                if (descriptionTextDiv) {
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
                    else {
                        // no listdiv
                        // single role without description
                        // no listdiv = no extra details provided except the titile part
                        expObj['role'] = mainDiv.querySelector('span.visually-hidden').innerText.trim();
                        if (locationSpan) {
                            expObj['company_name'] = extractCompanyName(locationSpan.querySelector('span.visually-hidden').innerText.trim());
                        }
                        if (durationSpan) {
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

    } catch (e) {
        return []
    }

}


function extractEducation() {
    try {
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
    } catch (e) {
        return []
    }
}


function extractVolunteering() {
    try {
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
    } catch (e) {
        return []

    }
}



function extractProjects() {
    try {

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
    } catch (e) {
        console.log(e)
        return []
    }
}


function extractSkills() {
    try {
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
    } catch (e) {
        console.log(e)
        return []

    }
}


function extractHA() {
    try {
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
    } catch (e) {
        return []

    }
}


function extractCert() {
    try {
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
    } catch (e) {
        console.log(e)
        return []
    }
}

const scrapingFunction = () => {
    const profileName = document.querySelector('.text-heading-xlarge').innerHTML
    const tagLine = document.querySelector('.text-body-medium').innerHTML.replace(/\s+/g, ' ').trim();
    const profileLocation = document.querySelector('.text-body-small.inline.t-black--light.break-words').innerHTML.replace(/\s+/g, ' ').trim()
    const description = document.querySelector('.pv-shared-text-with-see-more div:first-of-type span:first-child').innerText.replace(/\s+/g, ' ').trim()
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
    };
    return extractedData;
}



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "runContentScript") {
        console.log('received message to run content script')
        try {

            chrome.storage.local.get(["currentCount", "countAutoConnect"], result => {
                const currentCount = result.currentCount;
                const countAutoConnect = result.countAutoConnect;
                console.log('Current count:', currentCount);
                console.log('Limit:', countAutoConnect);
            });

            const user = JSON.parse(request.user.user)
            let extractedData;
            const button = document.querySelector(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.pvs-profile-actions__action");
            const button2 = document.querySelector(".artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view.pvs-profile-actions__action");




            function fillContentEditableWithDummyText(message, contentBox) {
                console.log(`fill function called with ${contentBox.tagName}`)
                if (contentBox.tagName.toLowerCase() === 'textarea') {
                    contentBox.value = message
                }
                else {
                    contentBox.innerHTML = `<p>${message}<p/>`;
                }
                // Optionally, you can also trigger an input event to notify any listeners
                const inputEvent = new Event('input', { bubbles: true });
                contentBox.dispatchEvent(inputEvent);
            }

            function handleMessageButtonClick() {
                console.log(`handle message button click called`)
                setTimeout(() => {
                    const contentEditableDivNodelist = document.querySelectorAll('.msg-form__contenteditable');
                    if (contentEditableDivNodelist) {
                        console.log('div list found')
                    }
                    console.log(contentEditableDivNodelist)
                    const messageField = contentEditableDivNodelist.item(contentEditableDivNodelist.length - 1);
                    if (messageField) {
                        console.log('message field found')
                    }
                    extractedData = scrapingFunction();
                    setTimeout(() => {
                        console.log('inside set timeout')
                        fillContentEditableWithDummyText('Loading...', messageField)
                        fetch('https://gmuf2naldzuc4nxlduhu4bnmce0lbfbn.lambda-url.eu-north-1.on.aws/', {
                            method: "POST",
                            body: JSON.stringify({
                                email: user.email,
                                extractedData: extractedData
                            })
                        }).then(res => res.json()).then(data => fillContentEditableWithDummyText(data.message, messageField))
                    }, 700);

                }, 700)

            }




            // adding click handlers to the message buttons
            if (button) {
                const buttonTextSpan = button.querySelector(".artdeco-button__text");
                // Check if button1 has the expected text
                if (buttonTextSpan && buttonTextSpan.textContent.trim() === "Message") {
                    button.addEventListener("click", handleMessageButtonClick);
                    console.log('Added event listener to button for messaging')
                } else {
                    if (button2) {
                        const buttonTextSpan = button2.querySelector(".artdeco-button__text");
                        if (buttonTextSpan && buttonTextSpan.textContent.trim() === "Message") {
                            button2.addEventListener("click", handleMessageButtonClick);
                        } else {
                        }
                    }
                }
            } else {
            }

            // PERSONALISED CONNECTION REQUEST RELATED
            //------------------------------------------------------------//

            const greenButtonStyle = {
                border: '2px solid #E1306C', // Instagram pink border
                boxShadow: '0px 4px 4px rgba(255, 215, 0, 0.5)', // Yellow golden shadow
            };



            function handleAddNoteButtonClick() {
                setTimeout(() => { // adding set timeout because the message field takes a bit time to load
                    const addNoteMessageArea = document.querySelector('.connect-button-send-invite__custom-message');
                    if (addNoteMessageArea !== null) {
                        extractedData = scrapingFunction();
                        setTimeout(() => {
                            fillContentEditableWithDummyText('Loading...', addNoteMessageArea)
                            fetch('https://gmuf2naldzuc4nxlduhu4bnmce0lbfbn.lambda-url.eu-north-1.on.aws/', {
                                method: "POST",
                                body: JSON.stringify({
                                    email: user.email,
                                    extractedData: extractedData
                                })
                            }).then(res => res.json()).then(data => fillContentEditableWithDummyText(data.message, addNoteMessageArea))
                        }, 700);
                    }
                }, 500)
            }

            function connectHandler(connectButton) {
                try {
                    // if we click any of the filtered buttons, we need to check if we are in the search results url or the profiles url or did we find this profile on the right side of someone else's profile
                    if (window.location.href.toLowerCase().includes("https://www.linkedin.com/search/results")) {
                        // if we are in the search results url, we need to navigate to the profile
                        const userProfileElement = connectButton.closest('.linked-area');
                        if (userProfileElement) {
                            const closestTitleLine = userProfileElement.querySelector('.entity-result__title-text');
                            if (closestTitleLine) {
                                closestTitleLine.click()
                            }
                        }
                    }
                    // we cannot add connection note if we are trying to connect with a profile whose recommendation is on the side of someone else's profile
                    const addNoteButton = document.querySelector('button[aria-label="Add a note"]');
                    if (addNoteButton) {
                        addNoteButton.addEventListener("click", handleAddNoteButtonClick)
                    }
                }
                catch (e) {
                    console.log(`error in connect handler ${e}`)
                }

            }

 // suppose we visit a profile who is not our connection. provision to add personalised note to that person 
 if (!window.location.href.includes("/search/results/")) {
    const connectButtonsOnProfile = locateConnectButtons()
    if (connectButtonsOnProfile && connectButtonsOnProfile.length > 0) {
        connectButtonsOnProfile.forEach(button => {
            button.addEventListener("click", () => {
                connectHandler(button);
            });
            Object.assign(button.style, greenButtonStyle);
        });
    }
}

            //   COMMON FOR AUTOCONNECT AND PERSONALISED CONNECTION REQUESTS
            //----------------------------------------------------------------------------

            function locateConnectButtons() {
                return new Promise(resolve => {
                    // Simulating time delay for locating connect buttons
                    setTimeout(() => {
                        const connectButtonSearchList = document.querySelectorAll('.artdeco-button');
                        // Filter the elements based on the presence of a child span with text "Connect"
                        const filteredButtons = Array.from(connectButtonSearchList).filter(button => {
                            const spanElement = button.querySelector('.artdeco-button__text'); // Query the span directly
                            return spanElement && spanElement.textContent.trim().toLowerCase() === "connect";
                        });
                        resolve(filteredButtons); // Resolve with the filtered buttons
                    }, 300);
                });
            }

            // PERSONALISED CONNECT REQ
            // planning to call it whenever autoconnect is off or in case of premium users
            async function sendPersonalisedNotes() {
                const filteredButtons = await locateConnectButtons();
                if (filteredButtons && filteredButtons.length > 0) {
                    filteredButtons.forEach(button => {
                        button.addEventListener("click", () => {
                            connectHandler(button);
                        });
                        Object.assign(button.style, greenButtonStyle);
                    });
                }
            }





            // AUTO CONNECT RELATED FOR NON-PREMIUM USERS
            //----------------------------------------------------------

            async function autoConnect() {
                try {
                    let nextPageButton;
                    let countLimitReached = false;
            
                    do {
                        const filteredButtons = await locateConnectButtons();
                        for (const connectButton of filteredButtons) {
                            if (countLimitReached) break; // Exit loop if count limit is reached
                            Object.assign(connectButton.style, greenButtonStyle);
                            let nameOfPersonToConnect = connectButton.closest('.linked-area').querySelector('.entity-result__title-text').innerText;
                            connectButton.click();
                            await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
                            const sendWithoutNoteButton = document.querySelector('button[aria-label="Send now"].artdeco-button--primary');
                            sendWithoutNoteButton.click();
                            console.log(`Sent a connect request to ${nameOfPersonToConnect} without a note`);
                            await incrementCount();
                            await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
            
                            // Check count limit after each connection attempt
                            countLimitReached = !(await checkCountLimit());
                            if (countLimitReached) break; // Exit loop if count limit is reached
                        }
            
                        if (countLimitReached) break; // Exit loop if count limit is reached
            
                        document.documentElement.scrollTo({
                            top: document.documentElement.scrollHeight,
                            behavior: 'smooth'
                        });
                        await new Promise(resolve => setTimeout(resolve, 1000));
            
                        nextPageButton = document.querySelector('button[aria-label="Next"]');
                        if (nextPageButton) {
                            nextPageButton.click();
                            await new Promise(resolve => setTimeout(resolve, 3000));
                        }
                        console.log('Next page button:', nextPageButton);
                    } while (nextPageButton);
            
                    console.log('EXITING DO WHILE LOOP');
                    console.log(nextPageButton);
                    
                    // Reset storage variables if needed
                    if (countLimitReached) {
                        chrome.storage.local.set({ "enableAutoConnect": false });
                        chrome.storage.local.set({ "currentCount": "0" });
                    }
                } catch (error) {
                    console.error("Error in autoConnect:", error);
                    // Handle error and reset storage variables
                    chrome.storage.local.set({ "enableAutoConnect": false });
                    chrome.storage.local.set({ "currentCount": "0" });
                }
            }
            
            
            async function incrementCount() {
                let currentCount = await getCount();
                currentCount++;
                chrome.storage.local.set({ "currentCount": currentCount.toString() });
                console.log('current count after increment is', await getCount());
            }

            async function getCount() {
                return new Promise(resolve => {
                    chrome.storage.local.get(["currentCount"], result => {
                        resolve(parseInt(result.currentCount) || 0);
                    });
                });
            }

            async function getLimit() {
                return new Promise(resolve => {
                    chrome.storage.local.get(["countAutoConnect"], result => {
                        resolve(parseInt(result.countAutoConnect) || 0);
                    });
                });
            }

            async function checkCountLimit() {
                try {
                    const countAutoConnect = await getCount();
                    const limit = await getLimit();
                    console.log('Current count:', countAutoConnect);
                    console.log('Limit:', limit);
                    const isWithinLimit = countAutoConnect < limit;
                    console.log('Is within limit?', isWithinLimit);
                    return isWithinLimit;
                } catch (error) {
                    console.error('Error in checkCountLimit:', error);
                    return false; // Return false if an error occurs
                }
            }
            

            // Initialize autoConnect or sendPersonalisedNotes based on the Chrome storage value
            chrome.storage.local.get(["enableAutoConnect"], result => {
                if (result.enableAutoConnect && window.location.href.includes("www.linkedin.com/search/results/")) {
                    autoConnect();
                } else {
                    sendPersonalisedNotes();
                }
            });



        }  // closing bracket of try
        catch (e) {
            console.log(e)
        }

    }  // closing bracket of contentscript run command
});

