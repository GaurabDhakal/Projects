const mainExpandedForm  = document.querySelector(".mainExpandedForm")
const todoExpandedWrapper  = document.querySelector(".todoExpandedWrapper")
const todoExpanded  = document.querySelector(".todoExpanded")
const todoContentInInput = document.querySelector(".todoContentInInput");
const editTypeBorderColor = document.querySelector(".editTypeBorderColor");    
const subBtnMain = document.querySelector(".subBtnMain"); 
let warningAreaOTE = document.querySelector(".warningAreaOTE");
let prevVal,todoIdGlobal,prevSelVal;

//hCOnC = handle Content on click

function hCOnC(){
    let textOfIcon = editTypeBorderColor.textContent;
    console.log(textOfIcon)
    if(textOfIcon=="border_color"){
        todoContentInInput.select()
        editTypeBorderColor.textContent="cancel"
    }else{
        editTypeBorderColor.textContent="border_color"
    }
    todoContentInInput.toggleAttribute("readonly")
    todoContentInInput.classList.toggle("whenReadOnly")
}

editTypeBorderColor.addEventListener("click",hCOnC)

window.addEventListener("click",(e)=>{
    if(e.target == todoExpanded){
        backHandleEArea();
    }
})

function handleKeys(e){
        if(e.key=="Escape") backHandleEArea();
        if(e.key=="Tab"){
            e.preventDefault()
            todoContentInInput.focus();
        }
}

function backHandleEArea(){
    todoExpandedWrapper.hidden=true;
    todoContentInInput.value="";
    window.removeEventListener("keydown",handleKeys)
    warningAreaOTE.textContent="";
    renderLocalStorage();
}

//todoCPT = todoContentPopupToggle
function todoCPT(todoId,prevCategory){
    todoIdGlobal = todoId;
    prevVal = localStorage.getItem(todoId);
    todoContentInInput.value = prevVal;
    window.addEventListener("keydown",handleKeys)
    todoExpandedWrapper.hidden=false;
    renderList("categorySelectPopUpArea","todoPopUpSel",prevCategory)
    prevSelVal = prevCategory;
}

mainExpandedForm.addEventListener("submit",(e)=>{
    const todoPopUpSel = document.querySelector(".todoPopUpSel");
    e.preventDefault();
    let val = todoContentInInput.value;
    let category = todoPopUpSel.value;
    if(todoContentInInput.value.length==0){
        warningAreaOTE.textContent = ("Please enter something!")
    }else if(prevVal==val&&prevSelVal === category){
        warningAreaOTE.textContent = "No changes!"
    }else{
        if(prevSelVal!==category){
            console.log(prevSelVal)
            let dataInsideIt = localStorage.getItem(prevSelVal);
            let newArrForm = (dataInsideIt.split(" "));
            let index = 0;
            newArrForm.forEach(elem=>{
                if(elem==todoIdGlobal.substring(5)){
                    console.log("elem",elem)
                    index = newArrForm.indexOf(elem)
                    console.log("index", index)
                }
            })
            newArrForm.splice(index,1)
            let resultString = newArrForm.join(" ");
            localStorage.setItem(prevSelVal,resultString);
            let temp = localStorage.getItem(category);
            let TempArr = temp.split(" ");
            TempArr.push(todoIdGlobal.substring(5));
            let TempArrAfter = TempArr.join(" ");
            localStorage.setItem(category,TempArrAfter);
        }
        localStorage.setItem(todoIdGlobal,val);
        backHandleEArea();
        renderLocalStorage();
    }
})