
let buttons = document.getElementsByClassName('hideUponClick');

function toggle(btn,classOfElem,toHide){
    let calculatorElem = document.querySelector(btn);
    // console.log(calculatorElem)
    let v1 = document.querySelector(".v1");
    if(v1.hidden===true){
        v1.hidden=false
    }else{
        v1.hidden=true;
    }
    let toggleBtn = document.querySelector(classOfElem);
    let btnToHide = document.querySelector(toHide);
    if(btnToHide.hidden===false){
        btnToHide.hidden = true;
    }else{
        btnToHide.hidden = false;
    }

    if(calculatorElem.hidden===true){
        calculatorElem.hidden = false
    }else{
        calculatorElem.hidden = true
    }
   // For changing name of the buttons upon click
   let header = document.querySelector(".selectCalcH2");
   if(header.hidden===true&&toggleBtn.innerText=="Close"){
    header.hidden=false;
    toggleBtn.innerText = (toggleBtn.classList.contains("hideShowToggle2"))?"Calculator V.3":"Calculator V.2";
    
   }else{
    toggleBtn.innerText = "Close"
    header.hidden=true;
   }

}


let giveOutput = () => {
    let user_inp1 = parseFloat(document.getElementById('usrinp_1').value)
    let user_inp2 = parseFloat(document.getElementById('usrinp_2').value)
    let operator = document.getElementById('operator');
    let output = document.getElementById('outputhere');
    let answer;


    if (!isNaN(user_inp1) && !isNaN(user_inp2)) {
        if (operator.value === "+") {
            answer = user_inp1 + user_inp2;
            output.innerHTML = `${answer}, is your answer`;
        }
        else if (operator.value === "-") {
            answer = user_inp1 - user_inp2;
            output.innerHTML = `${answer}, is your answer!`
        }
        else if (operator.value === "*") {
            answer = user_inp1 * user_inp2;
            output.innerHTML = `${answer}, is your answer!`
        }
        else if (operator.value === "/"){
            answer = user_inp1 / user_inp2;
            output.innerHTML = `${answer}, is your answer!`
        }
        else {
            output.innerHTML = "Something is Wrong, \n I recommend to check your operator.";
        }
        if (operator.value === "/" && user_inp2 === 0) {
            output.innerHTML = `Undefined, you can't divide a number by 0.`
        }
    }
    else{
        output.innerHTML = `Please enter valid numbers in both <br>input fields.`
    }

}
let calc2 = () => {
    let inp1 = parseFloat(prompt("Enter first number: "));
    let operate = prompt("Enter your operator(+,-,/,*): ");
    let inp2 = parseFloat(prompt("Enter second number: "))
    if (operate === "+") {
        let sum = inp1+inp2;
        alert("The sum is: " + sum)
    }
    else if (operate === "-") {
        alert("The difference is: "+ (inp1 - inp2))
    }
    else if (operate === "/") {
        alert("The division is: " + (inp1 / inp2))
    }
    else if (operate === "*") {
        alert("The product is: "+  (inp1 * inp2))
    }
    else {
        alert("Invalid Operator")
    }
}

document.getElementById('usrinp_2').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        giveOutput();
    }
});


function clearOTA(){
    let output = document.getElementById('outputhere');
    output.innerHTML="";
}
function nextElem(event,elem2){
    if(event.key==="Enter"){
        event.preventDefault();
        document.getElementById(elem2).focus();
    }
}