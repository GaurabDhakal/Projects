let iconSidebar = document.querySelector(".material-symbols-rounded");
let sidebarSection = document.querySelector(".menuBar");
let tbhac = document.querySelectorAll(".toBeHiddenAfterCollapse");
let iconOfCategoryAdd = document.querySelector(".iconOfCategoryAdd")


let nameOfClass = "collapsedSidebar";
let widthOfWindows = window.screen.width;
if(!localStorage.getItem("nameOfUsr")){
    console.log("i am here at the top")
    localStorage.setItem("sideBar","nonCollapsedSidebar");
}

if(localStorage.getItem("sideBar")=="collapsedSidebar"){
    handleToggleSidebar();
}

function handleToggleSidebar(){
    let cateTitle = document.querySelector(".cateTitle")
    if(!sidebarSection.classList.contains(nameOfClass)){
        iconOfCategoryAdd.style.justifyContent = "center";
        iconOfCategoryAdd.style.margin = "10px"
        cateTitle.style.justifyContent = "center"
        sidebarSection.classList.add(nameOfClass);
        tbhac.forEach(elem=>elem.hidden=true);
    }else{
        iconOfCategoryAdd.style.justifyContent = "space-between";
        cateTitle.style.justifyContent = "space-between"
        iconOfCategoryAdd.style.margin = "3vw"
        tbhac.forEach(elem=>elem.hidden=false)
        sidebarSection.classList.remove(nameOfClass)
    }
    localStorage.setItem("sideBar",sidebarSection.classList.contains(nameOfClass)?"collapsedSidebar":"nonCollapsedSidebar");
    
}
if(widthOfWindows<916){
    handleToggleSidebar()
}


iconSidebar.addEventListener("click",handleToggleSidebar)