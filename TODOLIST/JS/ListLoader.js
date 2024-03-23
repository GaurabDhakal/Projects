
let selectElem = document.createElement("select");
selectElem.setAttribute("id","cateSelect")

function renderList(className,optional,preSelectVal){
    let categorySelectOption = document.querySelector(`.${className}`);
    if(optional) selectElem.setAttribute("class",`${optional}`)
    selectElem.innerHTML =``
    let defaultOption = document.createElement("option");
    defaultOption.value = "def"
    defaultOption.innerHTML = `Select Category`;
    selectElem.appendChild(defaultOption);
    let keys = Object.keys(localStorage).filter(key=>key.startsWith("CATE_"));
    if(keys.length==0){
        let OptionNoCate = document.createElement("option");
        OptionNoCate.textContent = "No categories found!"
        OptionNoCate.disabled = true;
        OptionNoCate.setAttribute("value","ncop");
        selectElem.appendChild(OptionNoCate)
    }else{
        keys.forEach(elem=>{
            let Option = document.createElement("option");
            Option.setAttribute("value",elem)
            Option.textContent = elem.slice(5);
            if (preSelectVal && Option.value === preSelectVal) {
                Option.selected = true; 
            }
            selectElem.appendChild(Option);
            })
    }
    categorySelectOption.appendChild(selectElem)
    // categorySelectPopUpArea.appendChild(selectElem)
}

renderList("categorySelectOption")