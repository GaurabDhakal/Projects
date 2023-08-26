
const outputArea = document.getElementById('output')
const loader  = document.getElementById('loadingGif');

let dislikeReturn = async () => {
    outputArea.innerHTML =""
    loader.hidden = false;
    const usrVal = document.getElementById('name').value;
    if(usrVal.length===0){
        loader.hidden = true;
        outputArea.innerHTML="Empty Field!!!"
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
let response = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${usrVal}`,options);
let result = await response.json();
const keysCount = Object.keys(result);
console.log(keysCount);
if(keysCount.length==7){
let chkStatus = ()=>{
    if((result.deleted)===true){
        return "This video is deleted!"
    }else{
        return "This video is not deleted!"
    }
}
console.log(result);
loader.hidden = true;
outputArea.innerHTML = `<p id="warning">ID of the video : ${result.id} <br>
                        Dislikes Count: ${result.dislikes} <br>
                        Likes Count: ${result.likes} <br>
                        Views Count: ${result.viewCount} <br>
                        Video Status: ${chkStatus()}<p>`
}
                    else{
                        loader.hidden=true;
                        outputArea.innerHTML=`Video with the id ${usrVal} doesn't exist!`
                    }
}

document.getElementById('name').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        dislikeReturn();
    }
});
