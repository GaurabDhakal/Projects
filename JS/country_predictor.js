let keys = Object.keys(localStorage);
const countryName = new Intl.DisplayNames(['EN'], { type: 'region' });
const output = document.getElementById('output');
const sHB = document.getElementById("showHB");
const pB = document.getElementById('predictB');

function recordCheck(){
    const keysForClear = Object.keys(localStorage);
    if(keysForClear.length<=3){
    historyDisplayArea.innerHTML = "No recorded history found."
}
}

async function countryPredict() {

    let usrInp = document.getElementById('country').value;
    let loadingArea = document.querySelector('.hideLoadingGif');
    loadingArea.classList.remove('hideLoadingGif');

    if (usrInp.length === 0) {
        loadingArea.classList.add('hideLoadingGif')
        output.innerHTML = "Please enter the name of the country!"
    } else {
        output.innerHTML = "Loading";
        let options = {
            method: 'GET'
        }
        let response = await fetch(`https://api.nationalize.io?name=${usrInp}`, options);
        let result = await response.json();
        console.log(result);
        localStorage.setItem(`${usrInp}`, JSON.stringify(result));
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
document.getElementById('country').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        countryPredict();
    }
});


const container = document.querySelector("#container");
const historyDisplayArea = document.getElementById("historyDisplayArea");
const historyDisplay = document.getElementById("history");

//show history function
function showHistory() {
    container.classList.add("hideContainer");
    sHB.classList.add('hide')
    recordCheck();
    pB.classList.add('hide')
    historyDisplay.classList.remove("hide");
    let keys = Object.keys(localStorage);
    let i = 1;
    for (let key of keys) {
        let value = localStorage.getItem(key);

        try {
            let parsedValue = JSON.parse(value);

            if (typeof parsedValue === "object" && parsedValue !== null && !Array.isArray(parsedValue)) {
                historyDisplayArea.innerHTML += `<p>${i}. ${key} ` + ": " + countryName.of(parsedValue.country[0].country_id) + `, Probability: ${parsedValue.country[0].probability}</p><br>`;
                i++;
                
            }
        } catch (error) {
            console.error("Error parsing value for key:", key, error);
        }
        
    }
}

// Go back function
function goBack() {
    container.classList.remove('hideContainer');
    sHB.classList.remove('hide');
    pB.classList.remove('hide');
    historyDisplay.classList.add('hide');
    historyDisplayArea.innerHTML = "";
    output.innerHTML=""
}

//Clear History Function
function clearHistory(){
    const keysForClear = Object.keys(localStorage);
    console.log("clicked")
    if(keysForClear.length <= 3){
    historyDisplayArea.innerHTML = "History is already empty!";
    }else{
        localStorage.clear(keysForClear);
        historyDisplayArea.innerHTML = "History has been successfully cleared!";
    }
    
}

recordCheck();