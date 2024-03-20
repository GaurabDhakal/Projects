let iconSidebar = document.querySelector(".material-symbols-rounded");
let sidebarSection = document.querySelector(".menuBar");
let tbhac = document.querySelectorAll(".toBeHiddenAfterCollapse");
let iconOfCategoryAdd = document.querySelector(".iconOfCategoryAdd")


let nameOfClass = "collapsedSidebar";
let widthOfWindows = window.screen.width;

let handleToggleSidebar = ()=>{
    let cateTitle = document.querySelector(".cateTitle")
    if(!sidebarSection.classList.contains(nameOfClass)){
        
        iconOfCategoryAdd.style.justifyContent = "center";
        iconOfCategoryAdd.style.margin = "10px"
        cateTitle.style.justifyContent = "center"
        sidebarSection.classList.add(nameOfClass);
        tbhac.forEach(elem=>elem.hidden=true)
    }else{
        iconOfCategoryAdd.style.justifyContent = "space-between";
        cateTitle.style.justifyContent = "space-between"
        iconOfCategoryAdd.style.margin = "3vw"
        tbhac.forEach(elem=>elem.hidden=false)
        sidebarSection.classList.remove(nameOfClass)
    }
}
if(widthOfWindows<916){
    handleToggleSidebar()
}


iconSidebar.addEventListener("click",handleToggleSidebar)