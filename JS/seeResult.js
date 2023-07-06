let inpArea = document.getElementById('inpArea');
let goBack = document.getElementById('goBack');
async function chkResult() {
    let loadingGif = document.getElementById('loadingGif');
    const symbolN = document.getElementById('symbolN').value;
    const dob = document.getElementById('dob').value;
    let outputArea = document.getElementById('output');
    outputArea.innerHTML=""
    inpArea.hidden=true;
    loadingGif.hidden=false
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
        loadingGif.hidden=true;
        outputArea.innerHTML= ` <table>
        <caption>Result</caption>
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
    goBack.hidden=false;
        console.log(final);
    } catch (error) {
        goBack.hidden=false;
        outputArea.innerHTML="Please submit correct details!"
        console.error(error);
    }
}
function goBackk(){
    inpArea.hidden=false;
    goBack.hidden=true;

}