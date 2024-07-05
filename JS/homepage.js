
// Element selector
const selectAndReturn = (id) => {
    return document.querySelector(id);
}


// EventListener Add and remover
const addOrRemoveEvent = (typeOfEvent = "addEventListener", element = null, event = null, callback = null) => {
    if (element && typeof element[typeOfEvent] === "function") {
        element[typeOfEvent](event, callback);
    }

}

const dropDownMain = selectAndReturn(".downDownMain");
const mainBody = selectAndReturn(".main");


dropDownMain.addEventListener("click", () => {
    toggleDropDown();
    addOrRemoveEvent("addEventListener", mainBody, "click", () => toggleDropDown(true));
});

function toggleDropDown(forceHide = false) {
    let dropDown = document.querySelector(".material-symbols-outlined");
    let dropdownContent = document.querySelector(".dropdownContent");
    dropDown.textContent = dropdownContent.hidden ? "arrow_drop_up" : "arrow_drop_down";
    dropdownContent.hidden = !dropdownContent.hidden;
    if (forceHide === true) {
        addOrRemoveEvent("removeEventListener", mainBody, "click", () => toggleDropDown(true));
        dropDown.textContent = "arrow_drop_down";
        dropdownContent.hidden = true;
    }
}

async function fetchAndRenderContent(contentType = false) {
    try {
        const response = await fetch('../json/details.json');
        const data = await response.json();
        
        data.forEach(item => {
            const container = document.querySelector(`.${item.class}`);
            if (container) {
                if (item.section === 'intro') {
                    container.innerHTML = `
                        <span class='titleOfAboutMe'><h1>${item.title}</h1></span>
                        <p class="introContent">${item.content}</p>
                    `;
                } else if (item.section === 'skills') {
                    container.innerHTML = `
                        <div class="skillsTitle"><h1>${item.title}</h1></div>
                        <div class="skillsMain"><ul>
                            ${item.skills.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                        </div>
                    `;
                }
                else if(item.section=='projects'){
                    container.innerHTML = `<div><h1 class="projectsTitle">${item.title}</h1></div><div class="anchorsDiv"></div>`
                    const anchorsDiv = document.querySelector(".anchorsDiv")
                    Object.entries(item.projects).forEach(([key,value]) => {
                        anchorsDiv.innerHTML+= `
                        <a href= ${value} class="anchorProjects">${key}</a><br />
                        `
                    })
                }
                else if(item.section==="conclusion"){
                    console.log("I am here")
                    container.innerHTML = `<div><h1 class="conclusionTitle">${item.title}</h1></div>
                                        <div>${item.content}</div>`
                }
            }
            else {
                console.warn(`Element with class "${item.class}" not found`);
            }
        });
    } catch (error) {
        console.error('Error fetching or rendering content:', error);
    }
    if(contentType){
        return
    }
}

fetchAndRenderContent();