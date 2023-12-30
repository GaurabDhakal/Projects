let keys = Object.keys(localStorage);
const countryName = new Intl.DisplayNames(['EN'], { type: 'region' });
const output = document.getElementById('output');
const historyWarning = document.getElementById('historyWarning');
const loadingArea = document.querySelector('.hideLoadingGif');
let countryPredict= async () =>{

    let usrInp = document.getElementById('country').value;

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
    let i = 1;
        for (let key of keys) {
            
            let value = localStorage.getItem(key);
            try {
                let parsedValue = JSON.parse(value);
                if (typeof parsedValue === "object" && parsedValue !== null && !Array.isArray(parsedValue)) {
                    historyWarning.innerHTML = ""
                    historyDisplayArea.innerHTML += `<p>${i}. ${key} ` + ": " + countryName.of(parsedValue.country[0].country_id) + `, Probability: ${parsedValue.country[0].probability}</p><br>`;
                    i++;}
            } catch (error) {
                console.error("Error parsing value for key:", key, error);
            }
            
        }
    
}



// Go back function
function goBack() {
    container.hidden = false;
    historyDisplay.hidden = true;
    historyDisplayArea.innerHTML = "";
    output.innerHTML = ""
    if (keys.length < 3) {
        historyWarning.innerHTML = "No recorded history found!!";
    }
}

//Clear History Function
function clearHistory() {
    const keysForClear = Object.keys(localStorage);
    console.log("clicked");
    if(keysForClear.length === 0){
        historyWarning.innerHTML="History is already empty."
    }
    else if (keysForClear.length > 0) {
        localStorage.clear(keysForClear);
        historyDisplayArea.innerHTML = "";
        historyWarning.innerHTML = "History has been successfully cleared!";
    }

}