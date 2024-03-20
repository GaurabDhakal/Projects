let iconSidebar = document.querySelector(".material-symbols-rounded");
let sidebarSection = document.querySelector(".menuBar");
let tbhac = document.querySelectorAll(".toBeHiddenAfterCollapse");
let iconOfCategoryAdd = document.querySelector(".iconOfCategoryAdd")
let nameOfClass = "collapsedSidebar";
iconSidebar.addEventListener("click",()=>{
    if(!sidebarSection.classList.contains(nameOfClass)){

        iconOfCategoryAdd.style.justifyContent = "center";
        iconOfCategoryAdd.style.margin = "10px"
        sidebarSection.classList.add(nameOfClass);
        tbhac.forEach(elem=>elem.hidden=true)
        console.log("added")
    }else{
        iconOfCategoryAdd.style.justifyContent = "space-between";
        iconOfCategoryAdd.style.margin = "3vw"
        tbhac.forEach(elem=>elem.hidden=false)
        sidebarSection.classList.remove(nameOfClass)
        console.log("removed")
    }
})