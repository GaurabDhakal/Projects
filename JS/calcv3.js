document.addEventListener('DOMContentLoaded', function() {
    const inputOutput = document.querySelector('.inputOutput input');
    let currentInput = '';
    let lastResult = ''; // To store the last calculated result for 'Ans'

    function updateDisplay() {
        inputOutput.value = currentInput;
    }

    function handleNumber(number) {
        currentInput += number;
        updateDisplay();
    }

    function handleOperation(operation) {
        if (['+', '-', '×', '÷'].includes(currentInput.slice(-1))) {
            return; // Prevent multiple consecutive operators
        }else if(currentInput===NULL){
            currentInput="Enter something";
        }
        currentInput += operation;
        updateDisplay();
    }

    function calculateResult() {
        currentInput = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        try {
            lastResult = eval(currentInput).toString(); // Store the result in 'lastResult'
            currentInput = lastResult;
        } catch (error) {
            currentInput = 'Error';
        }
        updateDisplay();
    }

    function clearInput() {
        currentInput = '';
        updateDisplay();
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    function handleAns() {
        currentInput += lastResult; // Append the last result to the current input
        updateDisplay();
    }

    function handleExponential() {
        if (currentInput.length > 0 && !isNaN(currentInput.slice(-1))) {
            currentInput += '*Math.pow(10,'; // Start the exponential part
        }
    }

    document.querySelectorAll('.column').forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent.trim();
            if (!isNaN(value)) { // If it's a number
                handleNumber(value);
            } else {
                switch (value) {
                    case 'DEL':
                        deleteLast();
                        break;
                    case 'AC':
                        clearInput();
                        break;
                    case '=':
                        calculateResult();
                        break;
                    case '+':
                    case '-':
                    case '×':
                    case '÷':
                        handleOperation(value);
                        break;
                    case 'Ans':
                        handleAns();
                        break;
                    case 'x10^x':
                        handleExponential();
                        break;
                }
            }
        });
    });
});
