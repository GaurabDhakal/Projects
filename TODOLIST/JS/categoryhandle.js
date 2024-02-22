let AddCategoryPopUP = document.querySelector(".newCateFormParentElem"); // Main elem
let addMSR = document.getElementById("addMSR"); // add button outside popup
let backBtn = document.getElementById("cateCancelBtn");
let addBtnInsidePopUp = document.getElementById("cateCancelBtn");
let newCategoryForm = document.getElementById("newCategoryForm");
let warningCateSection = document.querySelector(".warningCateSection");
let noCategoryMessage = document.querySelector(".noCategoryMessage");
let listOfCategories = document.querySelector(".listOfCategories");
let MainAll = document.querySelector(".MainAllParent");
let CategoryShowSection = document.querySelector(".CategoryShowSection");

const categoryPrefix = "CATE_"

newCategoryForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    handleNewCateSubmission()
})

function newCateHandleOutSidePopUp(){
    renderList();
    if(AddCategoryPopUP.hidden) AddCategoryPopUP.hidden = false;
}

function handleBackBtn(){
    if(!AddCategoryPopUP.hidden) AddCategoryPopUP.hidden = true;
}




function handleNewCateSubmission(){
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


function renderCategories(){
    let keys = Object.keys(localStorage).filter(elem=>elem.startsWith(categoryPrefix))
    console.log(keys)
    if(keys.length>0){
        noCategoryMessage.textContent = ``;
        // Sidebar section
        listOfCategories.textContent = ``
        for(let key of keys){
            const div = document.createElement("div");
            const showBtn = document.createElement("button");
            const cate = document.createElement("div");
            cate.setAttribute("id","categoryListingSideBarText")
            cate.textContent = `${key.slice(categoryPrefix.length)}`
            div.appendChild(cate);
            showBtn.textContent = `View`;
            showBtn.setAttribute("onclick",`showCategory("${key}")`)
            showBtn.setAttribute("class","btnShow")
            div.appendChild(showBtn);
            div.setAttribute('class','categoryListing')
            listOfCategories.appendChild(div)
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
    renderCategories();
}
function showCategory(idOfTheCategory){
    let todoInCate =  localStorage.getItem(idOfTheCategory).split(' ');
    CategoryShowSection.innerHTML = ``
    if(document.querySelector(".iterativeDiv")) document.querySelector('.iterativeDiv').innerHTML = ``;
    CategoryShowSection.hidden = false;
    CategoryShowSection.innerHTML = ``;
    if(!MainAll.hidden) MainAll.hidden = true;

    let dangerZone = document.createElement("div");
    dangerZone.classList.add("dangerZone")
    let h4ODZ = document.createElement("h4")
    h4ODZ.innerHTML = "Warning: Delete Category"

    let dangerZoneDangerBtn = document.createElement("button");
    dangerZoneDangerBtn.setAttribute("onclick",`deleteCategory("${idOfTheCategory}")`)
    let spanDel = document.createElement("span")
    spanDel.setAttribute("class","material-symbols-outlined")
    spanDel.textContent = `delete_forever`
    dangerZone.appendChild(h4ODZ);
    dangerZoneDangerBtn.appendChild(spanDel);
    dangerZone.appendChild(dangerZoneDangerBtn);

    CategoryShowSection.appendChild(dangerZone);
    let childDiv = document.createElement("div"); // <DIV>
    childDiv.setAttribute("class","divOfCategory");

    let title = document.createElement("h3"); // TITLE
    title.textContent ="Category: "+ idOfTheCategory.slice(categoryPrefix.length)
    let iterateDiv = document.createElement("div");
    iterateDiv.setAttribute("class","iterateDiv")
    if(todoInCate.length==0){iterateDiv.textContent = "Nothing in this category!"}
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

function hideCategory(){
    MainAll.hidden = false;
    if(!CategoryShowSection.hidden) CategoryShowSection.hidden = true;
}
renderCategories()
backBtn.addEventListener("click",handleBackBtn);
addMSR.addEventListener("click",newCateHandleOutSidePopUp);