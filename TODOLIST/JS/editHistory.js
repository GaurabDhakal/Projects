let parentEditHistoryPopup = document.querySelector(".parentEditHistoryPopup");
function toggleEditHistory(id) {
    parentEditHistoryPopup.hidden = !parentEditHistoryPopup.hidden;
    showEditHistoryPopup(id)
}


parentEditHistoryPopup.addEventListener("click", function (e) {
    if (e.target == this||e.target === this.children[0]) {
        toggleEditHistory();        
    }
});

function showEditHistoryPopup(id) {
    let historyArea = document.querySelector(".historyArea");
    historyArea.innerHTML = "";
    let data = JSON.parse(localStorage.getItem(`edithistory_${id}`));
    if(data == null){
        historyArea.innerHTML = "<p>No edit history found</p>";
    }else{
        for(let eachEdit of data){
            let div = document.createElement("div");
            div.classList.add("editHistoryMainArea")
            let dateDiv = document.createElement("div");
            let mainData = document.createElement("div");
            dateDiv.innerHTML =`<span class="editedOn">Edited on: </span>`+ `<p class="historyPArea editedP">${new Date(eachEdit["editedOn"]).toUTCString()}</p>`;
            mainData.innerHTML =`<span class="prevVersion"> Previous Version: </span>`+ `<p class="historyPArea prevVerP">TODO: ${eachEdit["task"]}</p>`
            div.appendChild(dateDiv)
            div.appendChild(mainData)
            historyArea.appendChild(div)
            console.log(eachEdit)
        }
    }
}