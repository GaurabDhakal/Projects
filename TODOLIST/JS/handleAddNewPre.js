let formParent = document.querySelector('.formParent');
let preAddSection = document.querySelector('.preAddSectionParent');
let preAddBtn = document.querySelector('#preAddBtn');
let btnCancel = document.querySelector('#btnCancel')

function handleAddNewPre(){
        renderList("categorySelectOption")
        if(formParent.hidden) {
            formParent.hidden = false;
        };
        if(!preAddSection.hidden) preAddSection.hidden = true;
}

preAddBtn.addEventListener("click",handleAddNewPre)

btnCancel.addEventListener("click",()=>{
    hideWarning(); // from main.js file
    if(!formParent.hidden) {formParent.hidden = true;}
    renderList("categorySelectOption")
    if(preAddSection.hidden) preAddSection.hidden = false;
})
