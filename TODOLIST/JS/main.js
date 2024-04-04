
let usrValUni = document.getElementById("usrVal");
let listArea = document.getElementById("listArea");
let warningArea = document.querySelector('.warning');
let noListMessage = document.querySelector("#noListMessage");
let settingMenu = document.querySelector(".settingMenu");
let iconSettings = document.querySelector(".settingsIcon");
const storageKeyPrefix = "todo_"; // Add a prefix to the storage key
const audio = new Audio("./click.wav");
audio.load();
const errorMessages = [
    "Please enter a task before submitting.",
    "Tasks cannot be left blank. Please add a description.",
    "Oops! Looks like you forgot to enter your task.",
    "Your to-do list item cannot be empty. Please add a task.",
    "Empty tasks are not allowed. Please provide a description.",
    "It seems like you haven't entered a task. Please try again.",
    "To-do items cannot be blank. Please enter a task.",
    "Empty to-dos are not permitted. Please provide a task description.",
    "You must enter a task before adding it to your to-do list.",
    "Please add a description to your task before submitting.",
    "Task completion requires initiative.", 
    "Remember, action drives results.",
    "Proactive task management leads to success.", 
    "Don't let your to-do list languish.",
    "Tasks await your attention.", 
    "The first step is the hardest - let's get started!"
];
function playSound(soundFile) {
    if(soundFile) audio.src = soundFile;
    audio.play();
}
function clearInput(){
    usrValUni.value = "";
}
function formatList(){
    listArea.innerHTML = ""
}

function delData(id,noCompulsion,optional){
    if(localStorage.getItem(`edithistory_${id}`)){
        localStorage.removeItem(`edithistory_${id}`);
    }
    localStorage.removeItem(storageKeyPrefix + id); // Add the prefix to the storage key
    formatList();
    createToast("success","Item checked off the list.");
    playSound();
    let cateLocalKey = Object.keys(localStorage).filter(elem => 
        elem.startsWith(categoryPrefix) &&
        localStorage.getItem(elem).includes(id)
    );
    if(cateLocalKey.length!=0){
    let oldCateData = localStorage.getItem(cateLocalKey);
    localStorage.setItem(cateLocalKey,oldCateData.replace(id,""));
    }
    // if(!noCompulsion) showCategory(noCompulsion);
    console.log(cateLocalKey)
    if(noCompulsion) showCategory(noCompulsion,classGenNFind(cateLocalKey[0]));
    hideWarning();
    renderLocalStorage();
}
function hideWarning(){
    warningArea.hidden = true;
}

function storeInLocal(usrVal){
    let todaysData = JSON.parse(localStorage.getItem("todoList_todaysData"));
    todaysData.count++;
    localStorage.setItem("todoList_todaysData", JSON.stringify(todaysData));
    let cateValue = document.getElementById("cateSelect")
    const id = Math.floor(Math.random()*10000);

    let selectedOption = cateValue.options[cateValue.selectedIndex];
    if(selectedOption.value!="def"||selectedOption.value!="ncop"){
        const usrcategory  = localStorage.getItem(selectedOption.value)
        let usrcategoryNew =   usrcategory + `${id} `
        localStorage.setItem(cateValue.value,usrcategoryNew)
    }
    localStorage.setItem(storageKeyPrefix + id, usrVal); // Add the prefix to the storage key
}


function randomWarning(){
    return errorMessages[Math.floor(Math.random()*errorMessages.length)];
}

function handleSubmit(){
    const usrVal = usrValUni.value;
    if(usrVal.length === 0){
        if(warningArea.hidden) warningArea.hidden = false;
        warningArea.textContent = randomWarning();
    } else {
        hideWarning() 
        storeInLocal(usrVal);
        createToast("success","Task added successfully");
        formatList();
        clearInput();
        renderLocalStorage();
    }
}
function renderLocalStorage(){
    const keys = Object.keys(localStorage).filter(key => key.startsWith(storageKeyPrefix)); // Filter out items without the prefix

    formatList();
    if(keys.length<1){
        // if(noListMessage.hidden) noListMessage.hidden = false;
        handleNoListMsgFn()
        noListMessage.hidden = false;
    }
    let totalTaskCount = document.querySelector('.totalTaskCount')
    totalTaskCount.textContent = `Total tasks: ${keys.length}`
    if(keys.length>0){
        for(let key of keys){
            if(!noListMessage.hidden) noListMessage.hidden = true;
            const value = localStorage.getItem(key);
            if(typeof value === "string"){
    
    
                let elemDiv = document.createElement("div");
                let elem = document.createElement("li");
                elem.classList.add("listElem")
                


                let miniDiv = document.createElement("div");
                miniDiv.classList.add("miniDiv");

                let checkIcon = document.createElement("span");
                checkIcon.setAttribute("class","material-symbols-outlined");
                checkIcon.classList.add("theIcon")
                checkIcon.classList.add("theme")
                checkIcon.textContent = "task_alt"
    
                let categoryNameShow = document.createElement("p");
                categoryNameShow.setAttribute("class","categoryNameShow")
                let categoryExactName = Object.keys(localStorage).filter(elem=>
                    elem.startsWith("CATE_")
                ).filter(elem=>
                    localStorage.getItem(elem).includes(key.substring(storageKeyPrefix.length))
                )
                elemDiv.setAttribute("onclick",`todoCPT(event,"${key}","${categoryExactName}"||"def")`);
                if(categoryExactName.length>0){
                    categoryNameShow.textContent = "Category: "+categoryExactName[0].slice("CATE_".length);
                }else{
                    categoryNameShow.textContent = "Uncategorized"
                }
    
                let btnElem = document.createElement("button");
                btnElem.setAttribute("class","checkIcon");
                btnElem.setAttribute("onclick",`delData(${key.substring(storageKeyPrefix.length)},false)`); // Remove the prefix from the key
                
                btnElem.appendChild(checkIcon);
                elemDiv.appendChild(elem);
                miniDiv.appendChild(categoryNameShow)
                miniDiv.appendChild(btnElem)
                elemDiv.classList.add("liDiv")
                elemDiv.classList.add("theme")
                elemDiv.appendChild(miniDiv);
                elem.classList.add(`${key}`);
                elem.innerHTML = (`TODO: ${value} <br />`);
                listArea.appendChild(elemDiv);
            }
        }
    }
}
//Function to remove hideWarning when user starts typing after the error of invalid submit is shown 
usrValUni.addEventListener("input",()=>{
    let val = usrValUni.value;
    if(val.length>0){
        hideWarning()
    }
})
renderLocalStorage();
document.querySelector(".formMain").addEventListener("submit",(e)=>{
    e.preventDefault();
    handleSubmit();
})

console.info("CONSOLE is not for beginners, rest!😎")


settingMenu.addEventListener("mousedown",()=>{
    iconSettings.classList.toggle("settingsIconActive");
})

settingMenu.addEventListener("click",()=>{
    toggleSettingsMenu();
})
function toggleSettingsMenu(param){
    let settingsMenu = document.querySelector(".settingOptionPopupWrapper");
    settingsMenu.hidden = !settingsMenu.hidden;
    if(param&&param=="just_close"){
        settingsMenu.hidden = true;
    }
}

