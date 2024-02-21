let iconSidebar = document.querySelector(".material-symbols-rounded");
let sidebarSection = document.querySelector(".menuBar");
let tbhac = document.querySelectorAll(".toBeHiddenAfterCollapse");
let nameOfClass = "collapsedSidebar";
iconSidebar.addEventListener("click",()=>{
    if(!sidebarSection.classList.contains(nameOfClass)){
        sidebarSection.classList.add(nameOfClass);
        tbhac.forEach(elem=>elem.hidden=true)
        console.log("added")
    }else{
        tbhac.forEach(elem=>elem.hidden=false)
        sidebarSection.classList.remove(nameOfClass)
        console.log("removed")
    }
})