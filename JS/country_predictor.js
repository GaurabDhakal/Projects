let keys = Object.keys(localStorage);
const countryName = new Intl.DisplayNames(['EN'], { type: 'region' });
const output = document.getElementById('output');
const historyWarning = document.getElementById('historyWarning');
const loadingArea = document.querySelector('.hideLoadingGif');
let clearHistoryBtnElem = document.getElementById("clearHistory");

const currentDate = new Date();
const userTimezoneOffset = currentDate.getTimezoneOffset(); // Get the user's timezone offset in minutes
const userTimestamp = new Date(currentDate.getTime() - userTimezoneOffset * 60000); 

historyWarning.hidden=false;
let countryPredict= async () =>{
    let usrInpElem = document.getElementById('country')
    let usrInp = usrInpElem.value;
    let hasSpace  = usrInp.includes(" ");
    loadingArea.classList.remove('hideLoadingGif');

    if (usrInp.length === 0) {
        loadingArea.classList.add('hideLoadingGif')
        usrInpElem.classList.add("invalidInputWarning")
        output.innerHTML = `<p class="invalidInputWarning invalidInputWarningPtag">Kindly enter the name first!</p>`
    } else if(hasSpace){
        loadingArea.classList.add('hideLoadingGif')
        output.innerHTML = `<p class="invalidInputWarningPtag invalidInputWarning">Only First Name!</p>`
    } 
    else {
        if(usrInpElem.classList.contains("invalidInputWarning")){
            usrInpElem.classList.remove("invalidInputWarning")
        }
        output.innerHTML = "Loading";
        let options = {
            method: 'GET'
        }
        let response = await fetch(`https://api.nationalize.io?name=${usrInp}`, options);
        let result = await response.json();
        console.log(result);
        const dataToStore = {
            data: result,
            timestamp: new Date().toISOString(), // Current timestamp in ISO format
        };
        
          // Ensure 'country' property exists before adding it to the stored data
        if (result.country && Array.isArray(result.country) && result.country.length > 0) {
            dataToStore.country = result.country;
        }
        localStorage.setItem(`${usrInp}`, JSON.stringify(dataToStore));
        if (!result.country[4]) {
            loadingArea.classList.add('hideLoadingGif')

            output.innerHTML = `<div id="oa">Sorry! We are unable to find data of the given name.</div>`;

            console.log("Name isn't in the database")
        } else {
            output.innerHTML = "";
            loadingArea.classList.add('hideLoadingGif')
            for (let i = 0; i < 5; i++) {
                let countryCode = await result.country[i].country_id;

                output.innerHTML += `<div id=oa>${i + 1}. ${countryName.of(countryCode)}, Probability: ${result.country[i].probability} `;
            }
        }
    }
}
document.getElementById('country').addEventListener('keyup',  (event)=> {
    if (event.key === 'Enter') {
        countryPredict();
    }
});


const container = document.querySelector("#container");
const historyDisplayArea = document.getElementById("historyDisplayArea");
const historyDisplay = document.getElementById("history");

//show history function
function showHistory() {
    container.hidden = true;
    historyDisplay.hidden = false;
    let keys = Object.keys(localStorage);

    if (keys.length === 0) {
        historyWarning.hidden = false;
        historyWarning.innerHTML = `<p class="noRF">No record found!</p>`;
        clearHistoryBtnElem.hidden = true;
    } else if (keys.length > 0) {
        clearHistoryBtnElem.hidden = false;
    }

    keys.sort((a, b) => {
        return new Date(JSON.parse(localStorage.getItem(b)).timestamp) - new Date(JSON.parse(localStorage.getItem(a)).timestamp);
    });

    for (let key of keys) {
        let value = localStorage.getItem(key);
        try {
            historyDisplayArea.hidden = false;
            let parsedValue = JSON.parse(value);
            if (typeof parsedValue === "object" && parsedValue !== null && !Array.isArray(parsedValue)) {
                const timestamp = new Date(parsedValue.timestamp).toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).replace(/\//g, '-');
                historyWarning.hidden = true;
                const name = key.charAt(0).toUpperCase() + key.slice(1);
                historyDisplayArea.innerHTML += `<p id="toBeHiddenLater"> ${timestamp}: ${name} ` + ": " + countryName.of(parsedValue.country[0].country_id) + `, Probability: ${parsedValue.country[0].probability}</p><br>`;
            }
        } catch (error) {
            console.error("Error parsing value for key:", key, error);
        }
    }
}


function isValidFormat(parsedValue) {
    return (
        typeof parsedValue === "object" &&
        parsedValue !== null &&
        !Array.isArray(parsedValue) &&
        parsedValue.timestamp &&
        typeof parsedValue.timestamp === 'string'
    );
}


// Go back function
function goBack() {
    container.hidden = false;
    historyDisplay.hidden = true;
    historyDisplayArea.innerHTML = "";
    output.innerHTML = ""
    if (keys.length < 3) {
        historyWarning.hidden=false;
        historyWarning.innerHTML = "No recorded history found!!";
    }
}

//Clear History Function
function clearHistory() {
    const keysForClear = Object.keys(localStorage);
    historyWarning.hidden=false;
    historyDisplayArea.hidden=true;
    console.log("clicked");
    if(keysForClear.length === 0){
        historyWarning.innerHTML="History is already empty."
    }
    else if (keysForClear.length > 0) {
        localStorage.clear(keysForClear);
        historyDisplayArea.innerHTML = "";
        clearHistoryBtnElem.textContent = "Hiding..."
        setTimeout(()=>{
            clearHistoryBtnElem.textContent = "Clear History"
            clearHistoryBtnElem.hidden = true;
        },400)
        historyWarning.innerHTML = "History has been successfully cleared!";
    }
}

// Shift+Enter for Show History Function

document.getElementById("country").addEventListener("keydown",(e)=>{
        if(e.shiftKey &&e.key === "Enter"){
            showHistory();
        }
})
let usrInpElem = document.getElementById('country');
document.addEventListener('DOMContentLoaded', function () {
usrInpElem.addEventListener("input",()=>{
    if(usrInpElem.value.length>0){
        if(usrInpElem.classList.contains("invalidInputWarning")){
            usrInpElem.classList.remove("invalidInputWarning")
        }
        
    }
})
})