let inpArea = document.getElementById('inpArea');
let goBack = document.getElementById('goBack');
const historyArea = document.getElementById('historyMain');
const historyInner = document.getElementById('history');
const container = document.getElementById('container');
let outputArea = document.getElementById('output');
let historyWarning = document.getElementById('historyWarning');
let keys = Object.keys(localStorage);

async function chkResult() {
    let loadingGif = document.getElementById('loadingGif');
    const symbolN = document.getElementById('symbolN').value;
    const dob = document.getElementById('dob').value;
    outputArea.innerHTML = ""
    if (symbolN.length === 0 || dob.length === 0) {
        outputArea.innerHTML = "Please fill up all details!";
    } else {


        inpArea.hidden = true;
        loadingGif.hidden = false
        const options = {
            method: 'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.9",
                "Connection": "keep-alive",
                "Content-Length": "47",
                "Content-Type": "application/json",
                "Host": "see.nicasiabank.com",
                "Origin": "https://see.nicasiabank.com",
                "Referer": "https://see.nicasiabank.com/see-result/check",
                "Sec-Ch-Ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Microsoft Edge\";v=\"114\"",
                "Sec-Ch-Ua-Mobile": "?0",
                "Sec-Ch-Ua-Platform": "\"Windows\"",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.67",
                "X-Requested-With": "XMLHttpRequest",
                "X-Security-Request": "required"
            },
            body: JSON.stringify({
                symbol_number: symbolN,
                dob: dob
            })
        };

        try {
            let response = await fetch('https://see.nicasiabank.com/api/see/get-result', options);
            let final = await response.json();
            loadingGif.hidden = true;
            localStorage.setItem(`${symbolN}`, JSON.stringify(final));
            outputArea.innerHTML = ` 
        <table>
        <thead> <strong>Your Result</strong></thead>
        <tr>
            <th>ID </th>
            <th>Symbol Number </th>
            <th>Alphabet </th>
            <th>GPA </th>
            <th>DOB </th>
        </tr>
        <tr>
            <td>${final.data.id}</td>
            <td>${final.data.symbol_number}</td>
            <td>${final.data.alphabet}</td>
            <td>${final.data.gpa}</td>
            <td>${final.data.dob}</td>
        </tr>
    </table>`
            goBack.hidden = false;
            console.log(final);
        }
        catch (error) {
            goBack.hidden = false;
            loadingGif.hidden = true;
            outputArea.innerHTML = "Pardon us! The API has been closed. Please try again later"
            console.error(error);
        }}
}
function goBackk() {
    inpArea.hidden = false;
    goBack.hidden = true;
    outputArea.innerHTML = ""

}
function showHistory() {
    let i = 1;
    container.hidden = true;
    historyArea.hidden = false;
    for (let key of keys) {
        let value = localStorage.getItem(key);
        try {
            let parsedValue = JSON.parse(value);
            if (typeof parsedValue === "object" && parsedValue !== null && !Array.isArray(parsedValue)) {
                historyWarning.innerHTML = ""
                historyInner.innerHTML += `<p>
                ${i}. Symbol Number: ${parsedValue.data.symbol_number}
                    GPA: ${parsedValue.data.gpa}
                </p> <br>`;
                i++;
            }
        } catch (error) {
            console.error("Error parsing value for key:", key, error);
        }

    }
}

function goBackFromHistoryPage() {
    container.hidden = false
    historyArea.hidden = true;
    historyInner.innerHTML = ''

}
document.getElementById('dob').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        chkResult();
    }
});
