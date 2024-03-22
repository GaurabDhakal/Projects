let AddCategoryPopUP = document.querySelector(".newCateFormParentElem"); // Main elem
let addMSR = document.getElementById("addMSR"); // add button outside popup
let backBtn = document.getElementById("cateCancelBtn");
let addBtnInsidePopUp = document.getElementById("cateCancelBtn");
let newCategoryForm = document.getElementById("newCategoryForm");
let warningCateSection = document.querySelector(".warningCateSection");
let noCategoryMessage = document.querySelector(".noCategoryMessage");
let listOfCategories = document.querySelector(".listOfCategories");
let MainAll = document.querySelector(".MainAllParent");
let CategoryShowSection = document.querySelector(".categoryShowSection");
let titleOfNewCategory  = document.querySelector(".titleOfNewCategory")
let usrInpElemNewCate = document.getElementById("cateName");
const categoryPrefix = "CATE_"

let defaultAttributeOfForm = newCategoryForm.getAttribute("onsubmit");
// newCategoryForm.addEventListener("submit",handleNewCateSubmission)

function newCateHandleOutSidePopUp(){
    renderList();
    if(AddCategoryPopUP.hidden) AddCategoryPopUP.hidden = false;
}


function handleBackBtn(){
    usrInpElemNewCate.value = ``;
    newCategoryForm.removeAttribute("onsubmit")
    newCategoryForm.setAttribute("onsubmit",defaultAttributeOfForm)
    usrInpElemNewCate.placeholder = "Enter name of the category"
    titleOfNewCategory.textContent = "Add Category";
    if(!AddCategoryPopUP.hidden) AddCategoryPopUP.hidden = true;
}


let cateAddBtn = document.getElementById("cateAddBtn");
function changeName(){
    newCategoryForm.removeAttribute("onsubmit");
    AddCategoryPopUP.hidden = false;
    titleOfNewCategory.textContent = "Change Name: ";
    usrInpElemNewCate.placeholder = "Enter the name here";
    cateAddBtn.value="Change"
    newCategoryForm.setAttribute("onsubmit",`handleChangeName(event)`);
}
function handleChangeName(event){
    event.preventDefault();
    let usrInp = document.getElementById("cateName").value;
    if(usrInp.length === 0){
        warningCateSection.textContent = `Oh oh, Seems like you forgot something!`;
    }else{
        if(localStorage.getItem("nameOfUsr")==usrInp){
            warningCateSection.textContent = `Name is already ${usrInp}!`
        }else{
            localStorage.setItem("nameOfUsr",usrInp);
            syncName();
            handleBackBtn();
            toggleSettingsMenu()
        }
        cateAddBtn.textContent = "Add";
    }
}
//supporting callback function for rename
function renameCategory(categoryName){
    newCategoryForm.removeAttribute("onsubmit")
    AddCategoryPopUP.hidden = false;
    usrInpElemNewCate.value = `${categoryName.slice(categoryPrefix.length)}`
    usrInpElemNewCate.placeholder = `Enter new name of the category`
    titleOfNewCategory.textContent = `Rename ${categoryName.slice(categoryPrefix.length)}`;
    newCategoryForm.setAttribute("onsubmit",`handleRenameCategory("${categoryName}",event)`);

}

//main rename function

function handleRenameCategory(categoryName,event){
    event.preventDefault()
    let usrInp = document.getElementById("cateName");
    if(usrInp.value.length === 0){
        warningCateSection.textContent = `Oh oh, Seems like you forgot something!`
    }else{
        let temp = localStorage.getItem(categoryName)
        localStorage.removeItem(categoryName)
        localStorage.setItem(`${categoryPrefix}${usrInp.value}`,temp)
        if(document.querySelector(".hTagForTitleOfCategory")){
            document.querySelector(".hTagForTitleOfCategory").textContent = randomEmoji()+" "+usrInp.value;
        }
        renderLocalStorage();
        renderCategories();
        handleBackBtn();
        renderList()
    }
}

function handleNewCateSubmission(event){
    event.preventDefault();
    let usrInp = document.getElementById("cateName").value;
    if(usrInp.length === 0){
        warningCateSection.textContent = `Oh oh, Seems like you forgot something!`
    }else{
        localStorage.setItem(`${categoryPrefix}${usrInp}`,'')
        warningCateSection.textContent = `Added`
        document.getElementById("cateName").value = ``
        handleBackBtn();
        warningCateSection.textContent = ``;
        renderCategories()
        renderList();
    }
}

let randClasGen = ()=>{
    let alphas = 'abcdefghijklmnopqrstuvwxyz'
    let alphasArr = alphas.split('')
    let rand="";
    for(let i = 0;i<=6;i++){
        rand += alphasArr[Math.floor(Math.random()*6)]
    }
    return rand;
}

const randomEmoji = () =>{
    const emojis = "😊,😁,😀,😃,😄,🤗,🤩,😸,🚀,🔥".split(",")
    return emojis[Math.floor(Math.random()*emojis.length)||0]
}

function popupToggle(className,optionalClassName,e){
    let allPopup = document.querySelector(`.${className}`);
    if(allPopup.classList.contains("activePopup")){
        allPopup.classList.remove("activePopup")
    }else{
        allPopup.classList.add("activePopup")
    }
    allPopup.hidden = !allPopup.hidden;
    if(optionalClassName){
        let allPopup = document.querySelector(`.${optionalClassName}`);
        if(allPopup){
            allPopup.hidden = true;
        }
    }
}





function hideTheContainer(className){
    let allPopup = document.querySelector(`.${className}`);
    if(allPopup){
        allPopup.hidden = true;
    }
}


const makeMaterialIcon = (iconName,TextContent) =>{
    const icon = document.createElement("span");
    icon.setAttribute("class","material-symbols-outlined")
    if(TextContent){
        icon.textContent = TextContent;
    }
    icon.textContent = iconName;
    return icon;
}


function renderCategories(){
    let keys = Object.keys(localStorage).filter(elem=>elem.startsWith(categoryPrefix))
    if(keys.length>0){
        noCategoryMessage.textContent = ``;
        // Sidebar section
        listOfCategories.textContent = ``
        for(let key of keys){
            const div = document.createElement("div");
            const cate = document.createElement("div");
            const minDivRenameSection = document.createElement("div");
            minDivRenameSection.setAttribute("class","popup-container-min-rename-section")
            const p = document.createElement("p");
            p.setAttribute("class","popup-container-min-rename-section-p")
            p.textContent = "Rename Category";
            minDivRenameSection.setAttribute("onclick",`renameCategory("${key}")`)
            minDivRenameSection.appendChild(makeMaterialIcon("edit"));
            minDivRenameSection.appendChild(p);
            const popupContainer = document.createElement("div");
            const popupContainerSpacer = document.createElement("div");
            popupContainerSpacer.classList.add("popup-container-spacer")
            const popupContainerParent = document.createElement("div");
            popupContainer.setAttribute("class","popup-container")
            popupContainerParent.setAttribute("class","popup-container-parent")
            const popupContainerSpan = document.createElement("span");
            popupContainerSpan.setAttribute("class","material-symbols-outlined three-dot-icon")
            popupContainerSpan.textContent = "more_vert";
            let classNamePCMin = randClasGen()
            const popupContainerMinContainer = document.createElement("div");
            const popupContainerMinContainerParent = document.createElement("div");
            popupContainerMinContainerParent.appendChild(minDivRenameSection)
            popupContainerMinContainerParent.setAttribute("class",`popup-container-parent-min-content ${classNamePCMin}`);
            popupContainerMinContainerParent.hidden = true;
            const popupContainerMinP = document.createElement("p");
            popupContainerMinP.textContent = "Delete Category";

            popupContainerMinContainer.setAttribute("class",`popup-container-min`)
            popupContainerMinContainer.setAttribute("onclick",`deleteCategory("${key}")`)
            popupContainerSpan.setAttribute("onclick",`popupToggle("${classNamePCMin}")`)
            popupContainerMinContainer.hidden=true;
            const popupContainerMinContainerSpan = document.createElement("span");
            popupContainerMinContainerSpan.setAttribute("class","material-symbols-outlined")
            popupContainerMinContainerSpan.textContent = "delete";
            popupContainerMinContainer.appendChild(popupContainerMinContainerSpan)
            popupContainerMinContainer.appendChild(popupContainerMinP)
            popupContainerMinContainerParent.appendChild(popupContainerMinContainer)
            
            popupContainer.appendChild(popupContainerSpan)
            popupContainer.appendChild(popupContainerSpacer)

            cate.setAttribute("id","categoryListingSideBarText");
            let popupContainerClassName = randClasGen();
            popupContainerParent.classList.add(popupContainerClassName)
            popupContainerParent.hidden=true;
            let className = randClasGen()
            cate.textContent = `${randomEmoji()} ${key.slice(categoryPrefix.length)}`
            div.setAttribute("onmouseover",`popupToggle("${popupContainerClassName}")`)
            div.setAttribute("onmouseout",`popupToggle("${popupContainerClassName}")`)
            cate.setAttribute("onclick",`showCategory("${key}","${className}")`)
            div.appendChild(cate);
            div.setAttribute('class',`categoryListing ${className}`)
            listOfCategories.appendChild(div);
            
            popupContainer.appendChild(popupContainerMinContainerParent)
            popupContainerParent.appendChild(popupContainer)
            div.appendChild(popupContainerParent)

        }
        // Sidebar section Ends
    }else{
        listOfCategories.textContent = ``
        noCategoryMessage.textContent = `No Categories found!`;
    }
}
function deleteCategory(categoryName){
    localStorage.removeItem(categoryName);
    hideCategory()
    renderList();
    renderLocalStorage();
    renderCategories();
}
function showCategory(idOfTheCategory, categoryClassName){
    removeActiveCategoryInSideBar()
    let toBeHighLighted = document.querySelector(`.${categoryClassName}`);
    toBeHighLighted.classList.add("activeCategoryInSideBar")

    let todoInCate =  localStorage.getItem(idOfTheCategory).split(' ');
    CategoryShowSection.innerHTML = ``
    if(document.querySelector(".iterativeDiv")) document.querySelector('.iterativeDiv').innerHTML = ``;
    CategoryShowSection.hidden = false;
    CategoryShowSection.innerHTML = ``;
    if(!MainAll.hidden) MainAll.hidden = true;

    let childDiv = document.createElement("div"); // <DIV>
    childDiv.setAttribute("class","divOfCategory");

    let title = document.createElement("h3"); // TITLE
    title.classList.add("hTagForTitleOfCategory")
    title.textContent =randomEmoji()+" "+idOfTheCategory.slice(categoryPrefix.length)
    let iterateDiv = document.createElement("div");
    iterateDiv.setAttribute("class","iterateDiv")
    if(todoInCate.length==0){
        iterateDiv.textContent = "Nothing in this category!";
    }
    else{
        let totalValueLength = 0;
        todoInCate.forEach(value=>{
            totalValueLength +=value.length;
            if(value.length!=0){
                let divElem = document.createElement("div")
                divElem.classList.add("liDiv")
                let liA = document.createElement('li');
                let btnElem = document.createElement("button");
                btnElem.setAttribute("class","checkIcon");
                btnElem.setAttribute("onclick",`delData(${value},"${idOfTheCategory}")`);
                let checkIcon = document.createElement("span");
                checkIcon.setAttribute("class","material-symbols-outlined");
                checkIcon.textContent = "task_alt"
                liA.textContent = "TODO: " + localStorage.getItem(`todo_${value}`);
                btnElem.appendChild(checkIcon);
                divElem.appendChild(liA);
                divElem.appendChild(btnElem);
                iterateDiv.appendChild(divElem);
            }
        })
        if(totalValueLength===0)iterateDiv.textContent = "Nothing in this category!";
    }
    let btn = document.createElement("button");
    btn.setAttribute("class","btnTypeB")
    btn.classList.add('goBackCateSection')
    btn.setAttribute("onclick","hideCategory()")
    btn.textContent = 'Go Back'
    childDiv.appendChild(title);
    childDiv.appendChild(iterateDiv)
    childDiv.appendChild(btn);
    CategoryShowSection.appendChild(childDiv);
}


function removeActiveCategoryInSideBar(){
    let allCategory = document.querySelectorAll('.categoryListing');
    allCategory.forEach(elem=>{
        if(elem.classList.contains("activeCategoryInSideBar")){
            elem.classList.remove("activeCategoryInSideBar")
        }
    })
}

function hideCategory(){
    removeActiveCategoryInSideBar()
    MainAll.hidden = false;
    if(!CategoryShowSection.hidden) CategoryShowSection.hidden = true;
}
renderCategories()
backBtn.addEventListener("click",handleBackBtn);
addMSR.addEventListener("click",newCateHandleOutSidePopUp);