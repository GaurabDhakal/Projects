async function resultCheck() {
    let sn = document.getElementById('rollNumber').value;
    let grade = document.getElementById('grade').value;
    let stream = document.getElementById('stream').value;
    const output = document.getElementById('output');
    const phoneArea = document.getElementById('phoneArea');
    const loadingGif = document.getElementById('loadingGif');
    
    loadingGif.hidden=false;
    // loadingGif.classList.remove('loadingGif')
    output.hidden =false;
    if(sn.length===0||grade.length===0||stream.length===0){
    output.innerHTML = "There are empty fields";
    }else{
    const payload = {
        roll_number: `${sn}`,
        grade: `${grade}`,
        faculty: `${stream}`
    };
        const url = 'https://academic.rianepal.edu.np/api/result';
        const options = {
            method: 'POST',
            body: JSON.stringify(payload),
            "headers": {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.9",
                "Connection": "keep-alive",
                "Content-Length": "62",
                "Content-Type": "application/json",
                "Host": "academic.rianepal.edu.np",
                "Origin": "https://rianepal.edu.np",
                "Referer": "https://rianepal.edu.np/",
                "Sec-Ch-Ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
                "Sec-Ch-Ua-Mobile": "?0",
                "Sec-Ch-Ua-Platform": '"Windows"',
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51"
            }
        }
        let result = await fetch(url, options);
        let response = await result.json();
        console.log(response);
        output.hidden = false;
        let keys = Object.keys(response);
        // loadingGif.classList.add('loadingGif')
        loadingGif.hidden=true;
        if(keys.length===2){
           output.innerHTML = `<i>${response.message}!</i>`
        //    phoneArea.innerHTML = `<i>${response.message}!</i>`;
        }
        console.log(response.data);
        output.innerHTML=`<table class="table-responsive table table-sm table-dark">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Grade</th>
                <th scope="col">Stream</th>
                <th scope="col">Symbol Number</th>
                <th scope="col">GPA</th>
                <th scope="col">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td id="nameO">${response.data.name}</td>
                <td id="gradeO">${response.data.grade}</td>
                <td id="streamO">${response.data.faculty}</td>
                <td id="snO">${response.data.roll_number}</td>
                <td id="gpaO">${response.data.gpa}</td>
                <td id="statusO">${response.data.status}</td>
            </tr>
        </tbody>
    </table>`

}
}
document.getElementById('rollNumber').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        resultCheck();
    }
});
