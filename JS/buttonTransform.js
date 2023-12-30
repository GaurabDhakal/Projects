function btnSize(param) {
    let btnElement = document.querySelector('.btnTransform')
    if (param) {
        btnElement.classList.add("changeSize")
    } else {
        btnElement.classList.remove("changeSize");
    }
}