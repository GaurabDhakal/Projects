function btnSize(param,className) {
    let btnElement = document.querySelector(className);
    if (param) {
        btnElement.classList.add("changeSize")
    } else {
        btnElement.classList.remove("changeSize");
    }
}