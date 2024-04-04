let iconSidebar = document.querySelector(".material-symbols-rounded");
let sidebarSection = document.querySelector(".menuBar");
let tbhac = document.querySelectorAll(".toBeHiddenAfterCollapse");
let iconOfCategoryAdd = document.querySelector(".iconOfCategoryAdd")
let lbiwrapper = document.querySelector(".lbiwrapper")
let logoutBtnIconElem = document.querySelector(".logoutBtnIcon")
let menuBarContainer = document.querySelector(".menuBarContainer")
let nameOfClass = "collapsedSidebar";
let widthOfWindows = window.screen.width;
if(!localStorage.getItem("nameOfUsr")){
    console.log("i am here at the top")
    
    localStorage.setItem("sideBar","nonCollapsedSidebar");
}
let mobileOrNot = false;
if(localStorage.getItem("sideBar")=="collapsedSidebar"){
    logoutBtnIconToggler(true);
    handleToggleSidebar();
}

function logoutBtnIconToggler(condition){
    logoutBtnIconElem.innerHTML = "";
    if(condition) lbiwrapper.hidden = false;
    lbiwrapper.hidden = !lbiwrapper.hidden;
    logoutBtnIconElem.appendChild(makeMaterialIcon("logout","logout()","logoutBtnIcon"));
}

function handleToggleSidebar(device){
    let cateTitle = document.querySelector(".cateTitle")
    if(device!='mobile'&&!mobileOrNot){
        logoutBtnIconToggler()
        menuBarContainer.classList.toggle("menuBarContainerCollapsed")
        if(!sidebarSection.classList.contains(nameOfClass)){
            iconOfCategoryAdd.style.justifyContent = "center";
            tbhac.forEach(elem=>elem.hidden=true);
            iconOfCategoryAdd.style.margin = "10px"
            cateTitle.style.justifyContent = "center"
            sidebarSection.classList.add(nameOfClass);
        }else{
            iconOfCategoryAdd.style.justifyContent = "space-between";
            cateTitle.style.justifyContent = "space-between"
            iconOfCategoryAdd.style.margin = "3vw"
            tbhac.forEach(elem=>elem.hidden=false)
            sidebarSection.classList.remove(nameOfClass)
        }
    localStorage.setItem("sideBar",sidebarSection.classList.contains(nameOfClass)?"collapsedSidebar":"nonCollapsedSidebar");
    }else{
        mobileOrNot = true;
        if(menuBarContainer.style.display == "block"){
            menuBarContainer.style.display = "none";
            tbhac.forEach(elem=>elem.hidden=true);
        }else{
            tbhac.forEach(elem=>elem.hidden=false)
            cateTitle.style.justifyContent = "space-between"
            menuBarContainer.style.display = "block";
        }
        menuBarContainer.classList.toggle("menuBarContainerCollapsedMobile")
        menuBarContainer.style.minWidth = "80%";
    }
}

iconSidebar.addEventListener("click",handleToggleSidebar)