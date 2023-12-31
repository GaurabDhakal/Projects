let a = () => {
    document.getElementById('here').innerHTML = "Hello My Name is Gaurab Dhakal";
}
let button = document.querySelector('.calculator')
let toggleBtn = document.querySelector('.hideShowToggle');
let buttons = document.getElementsByClassName('hideUponClick');
let toggle = () => {

    if(button.hidden === false){
        button.hidden = true
    }else{
        button.hidden = false
    }
   // For changing name of the buttons upon toggle
    if(toggleBtn.innerHTML === "Close"){
        toggleBtn.innerHTML = "Calculator V.2"
    }else{
        toggleBtn.innerHTML = "Close"
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
        output.innerHTML = `Please enter valid numbers in both input fields.`
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