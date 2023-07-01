
const outputArea = document.getElementById('output')
let dislikeReturn = async () => {
    const usrVal = document.getElementById('name').value;
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
let chkStatus = ()=>{
    if((result.deleted)===true){
        return "The video is deleted!"
    }else{
        return "The video is not deleted!"
    }
}
console.log(result);
outputArea.innerHTML = `<p id="warning">ID of the video : ${result.id} <br>
                        Dislikes Count: ${result.dislikes} <br>
                        Likes Count: ${result.likes} <br>
                        Views Count: ${result.viewCount} <br>
                        Video Status: ${chkStatus()}<p>`
}