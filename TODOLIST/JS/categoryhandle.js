let AddCategoryPopUP = document.querySelector(".newCateFormParentElem"); // Main elem
let addMSR = document.getElementById("addMSR"); // add button outside popup
let backBtn = document.getElementById("cateCancelBtn");
let addBtnInsidePopUp = document.getElementById("cateCancelBtn");
let newCategoryForm = document.getElementById("newCategoryForm");
let warningCateSection = document.querySelector(".warningCateSection");
let AddCategoryPopUPParent = document.querySelector(".AddCategoryPopUP");
let noCategoryMessage = document.querySelector(".noCategoryMessage");
let listOfCategories = document.querySelector(".listOfCategories");
let MainAll = document.querySelector(".MainAllParent");
let CategoryShowSection = document.querySelector(".categoryShowSection");
let titleOfNewCategory = document.querySelector(".titleOfNewCategory")
let usrInpElemNewCate = document.getElementById("cateName");
const categoryPrefix = "CATE_"
const classNamesMap = {};


let popUp = document.querySelector(".popup-container-parent");
let popUpRename = document.querySelector(".popup-container-min-rename-section");
let delElem = document.querySelector(".popup-container-min");

let defaultAttributeOfForm = newCategoryForm.getAttribute("onsubmit");
// newCategoryForm.addEventListener("submit",handleNewCateSubmission)
function handleKeysTwo(e) {
    console.log(e.target)
    if (e.target == AddCategoryPopUPParent) {
        handleBackBtn()
    }
}
function handleKeysOne(e) {
    if (e.key == "Escape") handleBackBtn();
    if (e.key == "Tab") {
        e.preventDefault()
    }
}
function newCateHandleOutSidePopUp() {
    renderList("categorySelectOption");
    if (AddCategoryPopUP.hidden) AddCategoryPopUP.hidden = false;
}

function handleBackBtn() {
    window.removeEventListener("click", handleKeysTwo)
    window.removeEventListener("keydown", handleKeysOne)
    usrInpElemNewCate.value = ``;
    warningCateSection.textContent = ``;
    newCategoryForm.removeAttribute("onsubmit")
    newCategoryForm.setAttribute("onsubmit", defaultAttributeOfForm)
    usrInpElemNewCate.placeholder = "Enter name of the category"
    titleOfNewCategory.textContent = "Add Category";
    if (!AddCategoryPopUP.hidden) AddCategoryPopUP.hidden = true;
}


let cateAddBtn = document.getElementById("cateAddBtn");
function changeName() {
    newCategoryForm.removeAttribute("onsubmit");
    window.addEventListener("click", handleKeysTwo)
    window.addEventListener("keydown", handleKeysOne)
    AddCategoryPopUP.hidden = false;
    titleOfNewCategory.textContent = "Change name ";
    usrInpElemNewCate.placeholder = "Enter the name here";
    usrInpElemNewCate.value = localStorage.getItem("nameOfUsr");
    cateAddBtn.value = "Change"
    newCategoryForm.setAttribute("onsubmit", `handleChangeName(event)`);
}
function handleChangeName(event) {
    event.preventDefault();
    let usrInp = document.getElementById("cateName").value;
    if (usrInp.length === 0) {
        warningCateSection.textContent = `Oh oh, Seems like you forgot something!`;
    } else {
        if (localStorage.getItem("nameOfUsr").toLowerCase() == usrInp.toLowerCase()) {
            warningCateSection.textContent = `Name is already ${usrInp}!`
        } else {
            localStorage.setItem("nameOfUsr", usrInp);
            createToast("success", `Name changed to ${usrInp}!`)
            syncName();
            handleBackBtn();
            toggleSettingsMenu("just_close")
        }
        cateAddBtn.textContent = "Add";
    }
}

function callBackCN() {
    toggleSettingsMenu("just_in");
    changeName()
}

//supporting callback function for rename
function renameCategory(categoryName) {
    window.addEventListener("keydown", handleKeysOne)
    window.addEventListener("click", handleKeysTwo)
    miniPopupMenuToggle(popUp)
    AddCategoryPopUP.hidden = false;
    usrInpElemNewCate.value = `${categoryName.slice(categoryPrefix.length)}`
    usrInpElemNewCate.placeholder = `Enter new name of the category`
    titleOfNewCategory.textContent = `Rename ${categoryName.slice(categoryPrefix.length)}`;
    newCategoryForm.setAttribute("onsubmit", `handleRenameCategory("${categoryName}",event)`);

}

//main rename function

function handleRenameCategory(categoryName, event) {
    event.preventDefault()
    let usrInp = document.getElementById("cateName");
    if (usrInp.value.length === 0) {
        warningCateSection.textContent = `Oh oh, Seems like you forgot something!`
    }
    else if (categoryName == `${categoryPrefix}${usrInp.value}`) {
        warningCateSection.textContent = `No changes!`
    }
    else if (typeof localStorage.getItem(categoryPrefix + usrInp.value) == "string") {
        warningCateSection.textContent = `Choose a unique category name.`
    }
    else {
        let temp = localStorage.getItem(categoryName)
        localStorage.removeItem(categoryName)
        localStorage.setItem(`${categoryPrefix}${usrInp.value}`, temp)
        if (document.querySelector(".hTagForTitleOfCategory")) {
            document.querySelector(".hTagForTitleOfCategory").textContent = randomEmoji() + " " + usrInp.value;
        }
        createToast("success", `Category "${categoryName.slice(categoryPrefix.length)}" renamed to "${usrInp.value}"!`)
        renderLocalStorage();
        renderCategories();
        handleBackBtn();
        renderList("categorySelectOption")
    }
}

function handleNewCateSubmission(event) {
    event.preventDefault();
    let usrInp = document.getElementById("cateName").value;
    if (usrInp.length === 0) {
        warningCateSection.textContent = `Oh oh, Seems like you forgot something!`
    }
    else if (typeof localStorage.getItem(categoryPrefix + usrInp) == "string") {
        warningCateSection.textContent = `Wait category already exists`
    }
    else {
        createToast("success", `Category "${usrInp}" added!`)
        let CN = categoryPrefix + usrInp.toLowerCase()
        localStorage.setItem(CN, '')
        warningCateSection.textContent = `Added`
        document.getElementById("cateName").value = ``
        handleBackBtn();
        warningCateSection.textContent = ``;
        renderCategories()
        renderList("categorySelectOption");
    }
}

let randClasGen = () => {
    let alphas = 'abcdefghijklmnopqrstuvwxyz'
    let alphasArr = alphas.split('')
    let rand = "";
    for (let i = 0; i <= 6; i++) {
        rand += alphasArr[Math.floor(Math.random() * 6)]
    }
    return rand;
}

function randomEmoji() {
    const emojis = "😊,😁,😀,😃,😄,🤗,🤩,😸,🚀,🔥".split(",")
    return emojis[Math.floor(Math.random() * emojis.length) || 0]
}

let ocnGlobal;
function positionHandler(event) {
    // ... your existing popup content modification code ...
    // Positioning Logic
    const button = document.querySelector(`.${ocnGlobal}`);
    const popup = document.querySelector('.popup-container');
    const iconRect = button.getBoundingClientRect();
    const popupLeft = iconRect.right + 20;
    const popupTop = iconRect.top - 10;

    popup.style.left = `${popupLeft}px`;
    popup.style.top = `${popupTop}px`;
}


function popupToggle(className, optionalClassName, event) {
    let allPopup = document.querySelector(`.${className}`);
    if (allPopup.classList.contains("activePopup")) {
        allPopup.classList.remove("activePopup")
    } else {
        allPopup.classList.add("activePopup")
    }
    allPopup.hidden = !allPopup.hidden;
    ocnGlobal = optionalClassName;
    let elem = document.querySelector(`.${ocnGlobal}`);
    elem.addEventListener('click', positionHandler)
}

function hideTheContainer(className) {
    let allPopup = document.querySelector(`.${className}`);
    if (allPopup) {
        allPopup.hidden = true;
    }
}
const handleHideToggleMenu = (e) => {
    if (e.target == popUp) {
        miniPopupMenuToggle(popUp)
    }
}

function miniPopupMenuToggle(...elem) {
    elem[0].hidden = !elem[0].hidden
    let i = 0;
    elem.forEach(elem => {
        if (i != 0) {
            elem.innerHTML = ``;
        }
        i++;
    })
    window.removeEventListener("click", handleHideToggleMenu)
}

function openModal(categoryName) {
    miniPopupMenuToggle(popUp);
    popUpRename.innerHTML = ``;
    delElem.innerHTML = ``;
    const popupContainerMinContainerSpan = document.createElement("span");
    popupContainerMinContainerSpan.setAttribute("class", "material-symbols-outlined")
    popupContainerMinContainerSpan.textContent = "delete";
    const popupContainerMinP = document.createElement("p");
    popupContainerMinP.textContent = "Delete Category";
    delElem.appendChild(popupContainerMinContainerSpan)
    delElem.appendChild(popupContainerMinP)
    delElem.setAttribute("onclick", `deleteCategory("${categoryName}")`)

    window.addEventListener("click", handleHideToggleMenu)
    const minDivRenameSection = document.createElement("div");
    minDivRenameSection.setAttribute("class", "popup-container-min-rename-section-inside")
    const p = document.createElement("p");
    p.setAttribute("class", "popup-container-min-rename-section-p")
    p.textContent = "Rename Category";
    minDivRenameSection.setAttribute("onclick", `renameCategory("${categoryName}")`)
    minDivRenameSection.appendChild(makeMaterialIcon("edit"));
    minDivRenameSection.appendChild(p);
    popUpRename.appendChild(minDivRenameSection)
}


const makeMaterialIcon = (iconName, TextContent) => {
    const icon = document.createElement("span");
    icon.setAttribute("class", "material-symbols-outlined")
    if (TextContent) {
        icon.textContent = TextContent;
    }
    icon.textContent = iconName;
    return icon;
}


function classGenNFind(categoryName) {
if(categoryName.startsWith(categoryPrefix)){
    if (classNamesMap.hasOwnProperty(categoryName)) {
        return classNamesMap[categoryName];
    } else {
        // Generate a random string of characters
        const randomString = Math.random().toString(36).substring(2, 8); // Adjust length as needed
        
        // Combine category name and random string to create a unique class name
        const className = `${categoryName}_${randomString}`;
        
        // Store the generated class name in the mapping
        classNamesMap[categoryName] = className;
        
        return className;
    }
}else{
    console.log("invalid format")
}
}

function renderCategories() {
    let keys = Object.keys(localStorage).filter(elem => elem.startsWith(categoryPrefix))
    if (keys.length > 0) {
        noCategoryMessage.textContent = ``;
        // Sidebar section
        listOfCategories.textContent = ``
        for (let key of keys) {
            const div = document.createElement("div");
            const cate = document.createElement("div");
            const iconDiv = document.createElement("div");
            let className = randClasGen();
            cate.setAttribute("id", "categoryListingSideBarText");
            cate.textContent = `${randomEmoji()} ${key.slice(categoryPrefix.length)}`
            cate.setAttribute("onclick", `showCategory("${key}","${className}")`)
            div.setAttribute('class', `categoryListing ${className} ${classGenNFind(key)}`)
            let forIconDiv = randClasGen();

            // three dot icon area
            const popupContainerSpan = document.createElement("span");
            let ocn = randClasGen()
            popupContainerSpan.setAttribute("class", `material-symbols-outlined three-dot-icon ${ocn}`)
            popupContainerSpan.textContent = "more_vert";
            iconDiv.appendChild(popupContainerSpan)
            iconDiv.setAttribute("class", `iconDiv ${forIconDiv}`)
            iconDiv.setAttribute("onclick", `openModal("${key}")`)
            iconDiv.hidden = true
            //three dot icon code ends
            div.setAttribute("onmouseover", `popupToggle("${forIconDiv}","${ocn}",event)`)
            div.setAttribute("onmouseout", `popupToggle("${forIconDiv}","${ocn}",event)`)
            //"${popupContainerClassName}"
            div.appendChild(cate);
            div.appendChild(iconDiv);
            listOfCategories.appendChild(div);

        }
        // Sidebar section Ends
    } else {
        listOfCategories.textContent = ``
        noCategoryMessage.textContent = `No Categories found!`;
    }
}
function deleteCategory(categoryName) {
    localStorage.removeItem(categoryName);
    hideCategory()
    miniPopupMenuToggle(popUp)
    renderList("categorySelectOption");
    createToast("success", `Category "${categoryName.slice(categoryPrefix.length)}" deleted!`)
    renderLocalStorage();
    renderCategories();
}
function showCategory(idOfTheCategory, categoryClassName) {
    removeActiveCategoryInSideBar()
    if(categoryClassName){
        let toBeHighLighted = document.querySelector(`.${categoryClassName}`);
        toBeHighLighted.classList.add("activeCategoryInSideBar")
    }

    let todoInCate = localStorage.getItem(idOfTheCategory).split(' ');
    CategoryShowSection.innerHTML = ``
    if (document.querySelector(".iterativeDiv")) document.querySelector('.iterativeDiv').innerHTML = ``;
    CategoryShowSection.hidden = false;
    CategoryShowSection.innerHTML = ``;
    if (!MainAll.hidden) MainAll.hidden = true;

    let childDiv = document.createElement("div"); // <DIV>
    childDiv.setAttribute("class", "divOfCategory");

    let title = document.createElement("h3"); // TITLE
    title.classList.add("hTagForTitleOfCategory")
    title.textContent = randomEmoji() + " " + idOfTheCategory.slice(categoryPrefix.length)
    let iterateDiv = document.createElement("div");
    iterateDiv.setAttribute("class", "iterateDiv")
    if (todoInCate.length == 0) {
        iterateDiv.textContent = "Nothing in this category!";
    }
    else {

        let totalValueLength = 0;
        todoInCate.forEach(value => {
            totalValueLength += value.length;
            if (value.length != 0) {
                console.log("value", value)
                let divElem = document.createElement("div")
                divElem.classList.add("liDiv")
                let liA = document.createElement('li');
                let btnElem = document.createElement("button");
                btnElem.setAttribute("class", "checkIcon");
                btnElem.setAttribute("onclick", `delData(${value},"${idOfTheCategory}")`);
                let checkIcon = document.createElement("span");
                checkIcon.setAttribute("class", "material-symbols-outlined");
                checkIcon.textContent = "task_alt"
                liA.textContent = "TODO: " + localStorage.getItem(`todo_${value}`);
                btnElem.appendChild(checkIcon);
                divElem.appendChild(liA);
                divElem.appendChild(btnElem);
                iterateDiv.appendChild(divElem);
            }
        })
        if (totalValueLength === 0) iterateDiv.textContent = "Nothing in this category!";
    }
    let btn = document.createElement("button");
    btn.setAttribute("class", "btnTypeB")
    btn.classList.add('goBackCateSection')
    btn.setAttribute("onclick", "hideCategory()")
    btn.textContent = 'Go Back'
    childDiv.appendChild(title);
    childDiv.appendChild(iterateDiv)
    childDiv.appendChild(btn);
    CategoryShowSection.appendChild(childDiv);
}


function removeActiveCategoryInSideBar() {
    let allCategory = document.querySelectorAll('.categoryListing');
    allCategory.forEach(elem => {
        if (elem.classList.contains("activeCategoryInSideBar")) {
            elem.classList.remove("activeCategoryInSideBar")
        }
    })
}

function hideCategory() {
    removeActiveCategoryInSideBar()
    MainAll.hidden = false;
    if (!CategoryShowSection.hidden) CategoryShowSection.hidden = true;
}
renderCategories()
backBtn.addEventListener("click", handleBackBtn);
addMSR.addEventListener("click", newCateHandleOutSidePopUp);