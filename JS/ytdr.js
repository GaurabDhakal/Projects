
const outputArea = document.getElementById('output')
const loader  = document.getElementById('loadingGif');

// function randomColorPicker(){
//     const hexNum = Math.floor(Math.random()*(256*256*256))
//     const hexCode = "#"+ hexNum.toString(16);
//     return hexCode;
// }
let dislikeReturn = async () => {
    // let colorBgForOutputPTag = randomColorPicker();
    // console.log(colorBgForOutputPTag)
    outputArea.innerHTML =""
    loader.hidden = false;
    const usrValElem = document.getElementById('name')
    const usrVal = usrValElem.value;
    if(usrVal.length===0){
        loader.hidden = true;
        usrValElem.classList.add("invalidInputWarning")
        outputArea.innerHTML=`<p class="invalidInputWarning invalidInputWarningPtag">Seems like you forgot to enter the id?`
        return;
    }
let options = {
        method:'GET',
        headers:{
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9",
            Pragma: "no-cache",
            "Cache-Control": "no-cache",
            Connection: "keep-alive"
        }
    }
    if(usrValElem.classList.contains("invalidInputWarning")){
        usrValElem.classList.remove("invalidInputWarning")
    }
    let extractedId = usrVal.split("v=")[1] || usrVal;
    console.log(extractedId)
let response = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${extractedId}`,options);
let result = await response.json();
const keysCount = Object.keys(result);
console.log(keysCount);
if(keysCount.length==7){}
console.log(result);
loader.hidden = true;
outputArea.innerHTML = `
                        <table>
                        <tr><td>Total dislikes</td><td>Total Likes</td><td>Total Views</td></tr>
                        <tr><td>${result.dislikes}</td><td>${result.likes}</td><td>${result.viewCount}</td></tr>
                        </table>
                        `;
// let idOfDislikeContainer = document.getElementById("dislikeContainer");
// idOfDislikeContainer.style.backgroundColor = colorBgForOutputPTag;
}
                    else{
                        loader.hidden=true;
                        outputArea.innerHTML=`<strong>Invalid ID!<strong>`
                    }
}

document.getElementById('name').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        dislikeReturn();
    }
});
