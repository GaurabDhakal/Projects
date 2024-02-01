document.querySelector(".formMain").addEventListener("submit",(e)=>{
    e.preventDefault();
    handleSubmit();
})
const usrValUni = document.getElementById("usrVal");
let listArea = document.getElementById("listArea");
function clearInput(){
    usrValUni.value = "";
}

function formatList(usrVal){
    listArea.innerHTML = ""
}

function delData(id){
    localStorage.removeItem(id)
    formatList()
    renderLocalStorage()
}

function deleteAllLocal(){
    localStorage.clear();
    renderLocalStorage();
}


function storeInLocal(usrVal){
    localStorage.setItem((Math.floor(Math.random()*10000)),usrVal);
}
function handleSubmit(){
    const usrVal = usrValUni.value;
    if(usrVal.length === 0){
        document.querySelector('.warning').textContent = "Enter something first"
        }else{
            document.querySelector('.warning').textContent =""
    storeInLocal(usrVal)
    formatList(usrVal);
    clearInput();
    renderLocalStorage()
    }
}

function renderLocalStorage(){
    const keys = Object.keys(localStorage);
    const values = Object.values(localStorage);
    let parentElem = document.querySelector(".delAllSec");
    if(keys!=0){
        parentElem.textContent = ""
        let btnDelAll = document.createElement("button");
        btnDelAll.classList.add("btnDesignClear")
        btnDelAll.textContent = "Delete All";
        btnDelAll.setAttribute("onclick",`deleteAllLocal()`)
        parentElem.appendChild(btnDelAll);
    }else if(keys.length===0){parentElem.textContent=""}
    formatList()
    for(let i = 0;i<keys.length;i++){
        if(typeof values[i] === "string"){
            let elemSpan = document.createElement("div");
            let elem = document.createElement("li");
            let btnElem = document.createElement("button");
            btnElem.setAttribute("onclick",`delData(${keys[i]})`)
            btnElem.textContent = "Remove";
            elemSpan.appendChild(elem);
            elemSpan.appendChild(btnElem);
            elem.classList.add(`${keys[i]}`)
            elem.innerHTML = (`${values[i]} <br />`);
            listArea.appendChild(elemSpan)
        }
    }
}


renderLocalStorage();