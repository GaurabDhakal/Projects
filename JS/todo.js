document.querySelector(".formMain").addEventListener("submit",(e)=>{
    e.preventDefault();
    handleSubmit();
})
const usrValUni = document.getElementById("usrVal");
let listArea = document.getElementById("listArea");
const storageKeyPrefix = "todo_"; // Add a prefix to the storage key

function clearInput(){
    usrValUni.value = "";
}

function formatList(usrVal){
    listArea.innerHTML = ""
}

function delData(id){
    localStorage.removeItem(storageKeyPrefix + id); // Add the prefix to the storage key
    formatList();
    renderLocalStorage();
}

function deleteAllLocal(){
    let onlyTodoKeys = Object.keys(localStorage).filter((value)=>value.startsWith(storageKeyPrefix));
    console.log(onlyTodoKeys)
    for(let key of onlyTodoKeys){
        localStorage.removeItem(key);
    }
    renderLocalStorage();
}

function storeInLocal(usrVal){
    const id = Math.floor(Math.random()*10000);
    localStorage.setItem(storageKeyPrefix + id, usrVal); // Add the prefix to the storage key
}

function handleSubmit(){
    const usrVal = usrValUni.value;
    if(usrVal.length === 0){
        document.querySelector('.warning').textContent = "Enter something first"
    } else {
        document.querySelector('.warning').textContent =""
        storeInLocal(usrVal);
        formatList(usrVal);
        clearInput();
        renderLocalStorage();
    }
}

function renderLocalStorage(){
    const keys = Object.keys(localStorage).filter(key => key.startsWith(storageKeyPrefix)); // Filter out items without the prefix
    let parentElem = document.querySelector(".delAllSec");
    if(keys.length !== 0){
        parentElem.textContent = "";
        let btnDelAll = document.createElement("button");
        btnDelAll.classList.add("btnDesignClear");
        btnDelAll.textContent = "Remove All";
        btnDelAll.setAttribute("onclick",`deleteAllLocal()`);
        parentElem.appendChild(btnDelAll);
    } else {
        parentElem.textContent = "";
    }
    formatList();
    for(let key of keys){
        const value = localStorage.getItem(key);
        if(typeof value === "string"){
            let elemSpan = document.createElement("div");
            let elem = document.createElement("li");
            elem.classList.add("listElem")
            let btnElem = document.createElement("button");
            btnElem.setAttribute("onclick",`delData(${key.substr(storageKeyPrefix.length)})`); // Remove the prefix from the key
            btnElem.textContent = "Remove";
            elemSpan.appendChild(elem);
            elemSpan.classList.add("liDiv")
            elemSpan.appendChild(btnElem);
            elem.classList.add(`${key}`);
            elem.innerHTML = (`${value} <br />`);
            listArea.appendChild(elemSpan);
        }
    }
}

renderLocalStorage();