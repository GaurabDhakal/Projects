const mainExpandedForm  = document.querySelector(".mainExpandedForm")
const todoExpandedWrapper  = document.querySelector(".todoExpandedWrapper")
const todoExpanded  = document.querySelector(".todoExpanded")
const todoContentInInput = document.querySelector(".todoContentInInput");
const editTypeBorderColor = document.querySelector(".editTypeBorderColor");
const subBtnMain = document.querySelector(".subBtnMain"); 
let warningAreaOTE = document.querySelector(".warningAreaOTE");
let prevVal,todoIdGlobal,prevSelVal;

let checkIcon = document.querySelector(".theIcon");
let checkIconParent = document.querySelector(".checkIcon");


function toggleIcons(temp){
    let textOfIcon = editTypeBorderColor.textContent;
    todoContentInInput.value = temp;
    if(textOfIcon=="edit"){
        todoContentInInput.select()
        editTypeBorderColor.textContent="cancel"
    }else{
        editTypeBorderColor.textContent="edit"
    }
}
//hCOnC = handle Content on click
function hCOnC(){
    let temp = prevVal;
    toggleIcons(temp);
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
    renderList("categorySelectOption")
}

//todoCPT = todoContentPopupToggle
function todoCPT(event,todoId,prevCategory){
    if(!((event.target.classList.contains("theIcon"))||(event.target.classList.contains("checkIcon")))){
    positionHandler(null,"todoContentInInput","editTypeBorderColor")
    todoIdGlobal = todoId;
    prevVal = localStorage.getItem(todoId);
    todoContentInInput.value = prevVal;
    window.addEventListener("keydown",handleKeys)
    todoExpandedWrapper.hidden=false;
    renderList("categorySelectPopUpArea","todoPopUpSel",prevCategory)
    prevSelVal = prevCategory;
    }
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
            let dataInsideIt = localStorage.getItem(prevSelVal);
            let newArrForm = (dataInsideIt.split(" "));
            let index = 0;
            newArrForm.forEach(elem=>{
                if(elem==todoIdGlobal.substring(5)){
                    index = newArrForm.indexOf(elem)
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
        createToast("success","Changes saved!");
        localStorage.setItem(todoIdGlobal,val);
        backHandleEArea();
        
        renderList("categorySelectOption")
        renderLocalStorage();
    }
})