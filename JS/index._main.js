let a = () => {
    document.getElementById('here').innerHTML = "Hello My Name is Gaurab Dhakal";
}
let button = document.querySelector('.calculator')
let toggle = () => {
    button.classList.toggle('calculator')
}
let giveoutput = () => {
    let user_inp1 = parseFloat(document.getElementById('usrinp_1').value)
    let user_inp2 = parseFloat(document.getElementById('usrinp_2').value)
    let operator = document.getElementById('operator');
    let output = document.getElementById('outputhere');
    let answer;


    if (!isNaN(user_inp1) && !isNaN(user_inp2)) {
        if (operator.value == "+") {
            answer = user_inp1 + user_inp2;
            output.innerHTML = `${answer}, is your answer`;
        }
        else if (operator.value == "-") {
            answer = user_inp1 - user_inp2;
            output.innerHTML = `${answer}, is your answer!`
        }
        else if (operator.value == "*") {
            answer = user_inp1 * user_inp2;
            output.innerHTML = `${answer}, is your answer!`
        }
        else if (operator.value == "/") {
            answer = user_inp1 / user_inp2;
            output.innerHTML = `${answer}, is your answer!`
        }
        else {
            output.innerHTML = "Something is Wrong, I recommend to check your operator.";
        }
        if (operator.value == "/" && user_inp2 == 0) {
            output.innerHTML = `Undefined, you can't divide a number by 0.`
        }
    }
    else{
        output.innerHTML = `Please enter valid numbers in both input fields.`
    }

}
let calc2 = () => {
    let inp1 = parseFloat(prompt("Enter your number: "));
    let operate = prompt("Enter your operator(+,-,/,*): ");
    let inp2 = parseFloat(prompt("Enter your number: "))
    if (operate == "+") {
        alert(inp1 + inp2)
    }
    else if (operate == "-") {
        alert(inp1 - inp2)
    }
    else if (operate == "/") {
        alert(inp1 / inp2)
    }
    else if (operate == "*") {
        alert(inp1 * inp2)
    }
    else {
        alert("Kindly Check Your Operator")
    }
}
document.getElementById('usrinp_1').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        giveoutput();
    }
});

document.getElementById('usrinp_2').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        giveoutput();
    }
});


function clearOTA(){
    let output = document.getElementById('outputhere');
    output.innerHTML="";
}