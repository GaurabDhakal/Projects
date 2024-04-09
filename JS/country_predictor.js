let keys = Object.keys(localStorage);
const countryName = new Intl.DisplayNames(["EN"], { type: "region" });
const output = document.getElementById("output");
const historyWarning = document.getElementById("historyWarning");
let clearHistoryBtnElem = document.getElementById("clearHistory");
const currentDate = new Date();
const userTimezoneOffset = currentDate.getTimezoneOffset(); // Get the user's timezone offset in minutes
const userTimestamp = new Date(
    currentDate.getTime() - userTimezoneOffset * 60000
);
const prefixKey = "CP_";

let universalResult;
let chkError = () => {
        if(universalResult.error){
            return universalResult.error.message;
        }else{
            return "Data not available";
        
        }

};
let errorMsgArea = document.querySelector(".errorArea");
// Function to display error message in output element
function displayErrorMessage(message) {
    errorMsgArea.textContent = message;
}

// Function to display loading message in output element
function displayLoadingMessage() {
    errorMsgArea.textContent = "Loading";
}

function displayResult(result) {
    errorMsgArea.hidden = true;
    // Show the output div
    output.hidden = false;
    // Hide the loading area
    loadingArea.hidden = true;

    // Select the table body element within the output div
    const tableBody = output.querySelector("tbody");

    // Clear previous table rows
    tableBody.innerHTML = "";

    // Iterate over the result data and dynamically add table rows
    for (let i = 0; i < 5 && i < result.country.length; i++) {
        let countryCode = result.country[i].country_id;
        let row = `
            <tr>
                <td>${i + 1}</td> 
                <td>${countryName.of(countryCode)}</td>
                <td>${((result.country[i].probability)*100).toFixed(1)+"%"}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
    }
}
let loadingArea = document.getElementById("loadingGif");
async function countryPredict() {
    let usrInpElem = document.getElementById("country");
    let usrInp = usrInpElem.value;
    output.hidden = true;
    let hasSpace = usrInp.includes(" ");
    loadingArea.hidden = false;

    if (usrInp.length === 0) {
        console.log("No name entered");
        loadingArea.hidden = true;
        errorMsgArea.hidden = false;
        usrInpElem.classList.add("invalidInputWarning");
        displayErrorMessage("Kindly enter the name first!");
    } else if (hasSpace) {
        loadingArea.hidden = true;
        displayErrorMessage("Whitespaces are not allowed (first name only)");
    } else {
        if (usrInpElem.classList.contains("invalidInputWarning")) {
            usrInpElem.classList.remove("invalidInputWarning");
        }
        displayLoadingMessage();
        let options = {
            method: "GET",
        };
        try {
            let response = await fetch(`https://api.nationalize.io?name=${usrInp}`, options);
            let result = await response.json();
            universalResult = result;
            console.log(result)
            const dataToStore = {
                data: result,
                timestamp: new Date().toISOString(), // Current timestamp in ISO format
            };

            // Ensure 'country' property exists before adding it to the stored data
            if (result.country && Array.isArray(result.country) && result.country.length > 0) {
                dataToStore.country = result.country;
            }
            if (result.country === null) {
                displayErrorMessage("Data not available");
            } else if(result.count>0) {
                localStorage.setItem(prefixKey + usrInp, JSON.stringify(dataToStore));
                displayResult(result);
            }else{
                loadingArea.hidden = true;
                console.log("No data found")
                displayErrorMessage(chkError());
            }
        } catch (error) {
            loadingArea.hidden = true;
            displayErrorMessage(`Error: ${error}`);
        }
    }
}

// Add event listener for the "Enter" key
document.getElementById("country").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        countryPredict();
    }
});

const container = document.getElementById("containerOuterlayer");
const historyDisplayArea = document.getElementById("historyDisplayArea");
const historyDisplay = document.getElementById("historyParent");
const historyDisplayChild = document.getElementById("history");
const footer = document.getElementById("footer");

function showHistory() {
    footer.hidden = true;
    container.hidden = true;
    historyDisplay.hidden = false;
    let keys = Object.keys(localStorage);
    let countOfOthers = 0;
    let countToCheck = 0;
    for (let key of keys) {
        if (key.startsWith("CP_")) {
            countToCheck++;
        } else {
            countOfOthers++;
        }
    }
    if (countToCheck <= 0) {
        historyWarning.innerHTML = `<p class="noRF">No record found!</p>`;
        historyWarning.hidden = false;
        clearHistoryBtnElem.hidden = true;
    } else if (countToCheck >= 1) {
        clearHistoryBtnElem.hidden = false;
    }

    keys.sort((a, b) => {
        if (a.startsWith("CP_") && b.startsWith("CP_")) {
            return (
                new Date(JSON.parse(localStorage.getItem(b)).timestamp) -
                new Date(JSON.parse(localStorage.getItem(a)).timestamp)
            );
        }
    });

    for (let key of keys) {
        if (key.startsWith("CP_")) {
            let value = localStorage.getItem(key);
            try {
                historyDisplayArea.hidden = false;
                let parsedValue = JSON.parse(value);
                if (
                    typeof parsedValue === "object" &&
                    parsedValue !== null &&
                    !Array.isArray(parsedValue) &&
                    parsedValue.data.count != 0 &&
                    key.startsWith("CP_")
                ) {
                    const timestamp = new Date(parsedValue.timestamp)
                        .toLocaleDateString("en-CA", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        })
                        .replace(/\//g, "-");
                    historyWarning.hidden = true;

                    const name = key.charAt(3).toUpperCase() + key.slice(4);
                    historyDisplayArea.innerHTML +=
                        `<div id="toBeHiddenLater"> ${timestamp}: ${name} ` +
                        ": " +
                        countryName.of(parsedValue.country[0].country_id) +
                        `, Probability: ${parsedValue.country[0].probability.toFixed(
                            3
                        )}</div><br>`;
                }
            } catch (error) {
                console.error("Error parsing value for key:", key, error);
            }
        }
    }
}

function isValidFormat(parsedValue) {
    return (
        typeof parsedValue === "object" &&
        parsedValue !== null &&
        !Array.isArray(parsedValue) &&
        parsedValue.timestamp &&
        typeof parsedValue.timestamp === "string"
    );
}

function goBack() {
    container.hidden = false;
    footer.hidden = false;
    historyDisplay.hidden = true;
    historyDisplayArea.innerHTML = "";
    output.hidden = true;
    if (keys.length < 3) {
        historyWarning.hidden = false;
        historyWarning.innerHTML = "No recorded history found!!";
    }
}

function clearHistory() {
    const keysForClear = Object.keys(localStorage);
    historyWarning.hidden = false;
    historyDisplayArea.hidden = true;
    console.log("cleared");
    if (keysForClear.length === 0) {
        historyWarning.innerHTML = "History is already empty.";
    } else if (keysForClear.length > 0) {
        let keys = Object.keys(localStorage);
        for (let key of keys) {
            if (key.startsWith("CP_")) {
                localStorage.removeItem(key);
            }
        }
        historyDisplayArea.innerHTML = "";

        clearHistoryBtnElem.textContent = "Clearing..";
        setTimeout(() => {
            clearHistoryBtnElem.textContent = "Clear History";
            clearHistoryBtnElem.hidden = true;
        }, 400);
        historyWarning.innerHTML = "History has been successfully cleared!";
    }
}

document.getElementById("country").addEventListener("keydown", (e) => {
    if (e.shiftKey && e.key === "Enter") {
        showHistory();
    }
});
let usrInpElem = document.getElementById("country");
document.addEventListener("DOMContentLoaded", function () {
    usrInpElem.addEventListener("input", () => {
        if (usrInpElem.value.length > 0) {
            if (usrInpElem.classList.contains("invalidInputWarning")) {
                usrInpElem.classList.remove("invalidInputWarning");
            }
        }
    });
});
