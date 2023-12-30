function btnSize(param) {
    let btnElement = document.getElementById("btnTransform");
    if (param) {
        btnElement.classList.add("changeSize")
    } else {
        btnElement.classList.remove("changeSize");
    }
}