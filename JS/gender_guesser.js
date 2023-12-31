let guessTheGender = async ()=> {
    let loader = document.getElementById('hideLoadingGif');
    loader.hidden = false;
    let usrInpElem = document.getElementById('name')
    let n = usrInpElem.value;
    let outputArea = document.getElementById('output');
    outputArea.innerHTML=""
    if (n.length === 0) {
        usrInpElem.classList.add("invalidInputWarning")
        loader.hidden = true;
        outputArea.innerHTML = `<p class="invalidInputWarningPtag invalidInputWarning">Please enter the name!</p>`
    } else {
        if(usrInpElem.classList.contains("invalidInputWarning")){
            usrInpElem.classList.remove("invalidInputWarning")
        }
        // let name = prompt("Enter your name: ");
        const url = `https://api.genderize.io?name=${n}`;
        const options = {
            method: 'GET',
        }

        try {
            loader.hidden = false;
            const response = await fetch(url, options);
            const result = await response.json();
            let firstL = ((result.gender).charAt(0)).toUpperCase();
            let rem = (result.gender).slice(1);
            let final  = firstL + rem;
            loader.hidden = true;
            outputArea.innerHTML = `<p id="oa" align="center">The name "${n}" is determined to be ${final} with a probability of ${result.probability} based on the gender prediction. <br> <br>
            <p id=ff align =center>Fun Fact: This name was searched for ${result.count} times in this API .</p> </p>`;
            console.log(result)
            console.log(`The probability is ${result.probability}`)
        } catch (error) {
            console.error(error)
        }
    }

}

document.getElementById('name').addEventListener('keyup', (event)=> {
    if (event.key === 'Enter') {
        guessTheGender();
    }
});
