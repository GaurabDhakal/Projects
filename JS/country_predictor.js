let keys = Object.keys(localStorage);
const countryName = new Intl.DisplayNames(['EN'], { type: 'region' });
const output = document.getElementById('output');
const historyWarning = document.getElementById('historyWarning');
let clearHistoryBtnElem = document.getElementById("clearHistory");
const currentDate = new Date();
const userTimezoneOffset = currentDate.getTimezoneOffset(); // Get the user's timezone offset in minutes
const userTimestamp = new Date(currentDate.getTime() - userTimezoneOffset * 60000);
const prefixKey = "CP_";

//Checks teh type of error
let universalResult;
let chkError = ()=>{
    if(universalResult.error){
        return universalResult.error;
    }else{
        return "Data of name isn't available!"
    }
}

let loadingArea = document.getElementById("loadingGif");
let countryPredict= async () =>{
    let usrInpElem = document.getElementById('country')
    let usrInp = usrInpElem.value;
    let hasSpace  = usrInp.includes(" ");
    loadingArea.hidden=false;

    if (usrInp.length === 0) {
        loadingArea.hidden=true;
        usrInpElem.classList.add("invalidInputWarning")
        output.innerHTML = `<p class="invalidInputWarning invalidInputWarningPtag">Kindly enter the name first!</p>`
    } else if(hasSpace){
        loadingArea.hidden=true;
        output.innerHTML = `<p class="invalidInputWarningPtag invalidInputWarning">Whitespaces are not allowed(first name only)</p>`
    } 
    else {
        if(usrInpElem.classList.contains("invalidInputWarning")){
            usrInpElem.classList.remove("invalidInputWarning")
        }
        output.innerHTML = "Loading";
        let options = {
            method: 'GET'
        }
        try{
        let response = await fetch(`https://api.nationalize.io?name=${usrInp}`, options);
        let result = await response.json();
        universalResult = result;
        const dataToStore = {
            data: result,
            timestamp: new Date().toISOString(), // Current timestamp in ISO format
        };
        
          // Ensure 'country' property exists before adding it to the stored data
        if (result.country && Array.isArray(result.country) && result.country.length > 0) {
            dataToStore.country = result.country;
        }
        if(result.count!=0){
        localStorage.setItem(prefixKey+usrInp, JSON.stringify(dataToStore));
        }
        if(result.country === null){
            output.innerHTML = "Data not available";
            console.log("no data")
        }else{
            output.innerHTML = "";
            loadingArea.hidden=true;
            let resultElem = document.createElement("table");
            output.append(resultElem);
            resultElem.innerHTML = `<tr>
            <th>S.N</td>
            <th>Country</th>
            <th>Probability</th>
            </tr>`
            for (let i = 0; i < 5; i++) {
                let countryCode = await result.country[i].country_id;
                
                resultElem.innerHTML += `<tr>
                <td>${i + 1}</td> 
                <td>${countryName.of(countryCode)}</td>
                <td>${result.country[i].probability}</td>
                </tr
                >`;
            }
        }
        
    }catch(error){
        loadingArea.hidden=true;
        output.innerHTML = `<div id="oa">${chkError()}
        </div>`;
    }
    }
}
document.getElementById('country').addEventListener('keyup',  (event)=> {
    if (event.key === 'Enter') {
        countryPredict();
    }
});


const container = document.getElementById("containerOuterlayer");
const historyDisplayArea = document.getElementById("historyDisplayArea");
const historyDisplay = document.getElementById("history");
const footer = document.getElementById("footer");
//show history function
function showHistory() {
    footer.hidden=true
    container.hidden = true;
    historyDisplay.hidden = false;
    let keys = Object.keys(localStorage);
    let countOfOthers = 0
    let countToCheck = 0;
    for(let key of keys){
        if(key.startsWith("CP_")){
            countToCheck++;
        }else{
            countOfOthers++;
        }
    }
    if (countToCheck<=0) {
        historyWarning.innerHTML = `<p class="noRF">No record found!</p>`;
        historyWarning.hidden = false;
        clearHistoryBtnElem.hidden = true;
    } else if (countToCheck >= 1) {
        clearHistoryBtnElem.hidden = false;
    }

    keys.sort((a, b) => {
        if(a.startsWith("CP_")&&b.startsWith("CP_")){
        return new Date(JSON.parse(localStorage.getItem(b)).timestamp) - new Date(JSON.parse(localStorage.getItem(a)).timestamp);
    }
    });

    for (let key of keys) {
        if(key.startsWith("CP_")){
        let value = localStorage.getItem(key);
        try {
            historyDisplayArea.hidden = false;
            let parsedValue = JSON.parse(value);
            if (typeof parsedValue === "object" && parsedValue !== null && !Array.isArray(parsedValue)&&parsedValue.data.count!=0&&key.startsWith("CP_")) {
                const timestamp = new Date(parsedValue.timestamp).toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).replace(/\//g, '-');
                historyWarning.hidden = true;
                
                const name = key.charAt(3).toUpperCase() + key.slice(4);
                historyDisplayArea.innerHTML += `<div id="toBeHiddenLater"> ${timestamp}: ${name} ` + ": " + countryName.of(parsedValue.country[0].country_id) + `, Probability: ${parsedValue.country[0].probability}</div><br>`;
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
        typeof parsedValue.timestamp === 'string'
    );
}


// Go back function
function goBack() {
    container.hidden = false;
    footer.hidden=false;
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
    console.log("cleared");
    if(keysForClear.length === 0){
        historyWarning.innerHTML="History is already empty."
    }
    else if (keysForClear.length > 0) {
        let keys = Object.keys(localStorage);
        for(let key of keys){
            if(key.startsWith("CP_")){
                localStorage.removeItem(key);
            }
        }
        historyDisplayArea.innerHTML = "";

        clearHistoryBtnElem.textContent = "Clearing.."
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