

let guessTheGender = async ()=> {
    let loader = document.getElementById('loadingGif');
    loader.hidden = false;
    let usrInpElem = document.getElementById('name')
    let n = usrInpElem.value;
    let hasSpace = n.includes(" ");
    let outputArea = document.getElementById('output');
    outputArea.innerHTML=""
    if (n.length === 0) {
        usrInpElem.classList.add("invalidInputWarning")
        loader.hidden = true;
        outputArea.innerHTML = `<p class="invalidInputWarningPtag invalidInputWarning">Please enter the name!</p>`
    }
    else {
        n = hasSpace?n.split(" ")[0]:n;
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
            if(!result.gender){
                outputArea.innerHTML = `<p id="oa">Pardon! Data of the name isn't available in the database</p>`
                loader.hidden = true;
            }else{
            loader.hidden = true;
            outputArea.innerHTML = `<div>
            <table>
            <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Probability</th>
                <th>Total Searches</th>
            </tr>
            <tr>
                <td class="tableColumn">${(result.name).charAt(0).toUpperCase()+(result.name).slice(1)}</td>
                <td class="tableColumn">${(result.gender).charAt(0).toUpperCase()+(result.gender).slice(1)}</td>
                <td class="tableColumn">${result.probability*100+"%"}</td>
                <td class="tableColumn">${result.count}</td>
            </tr>
            </table>
            </div>`;
            console.log(result)
            console.log(`The probability is ${result.probability}`)
        }
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
