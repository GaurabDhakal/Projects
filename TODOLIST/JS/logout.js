let logoutBtn = document.getElementById("logoutBtn");

function logout(){
    let keys = Object.keys(localStorage).filter(key=>key.startsWith("todo_"));
    let keysOfCategory = Object.keys(localStorage).filter(key=>key.startsWith('CATE_'));
    let username = "nameOfUsr"
    let editHistoryKeys = Object.keys(localStorage).filter(key=>key.startsWith("edithistory"));
    editHistoryKeys.forEach(key => localStorage.removeItem(key));
    keysOfCategory.forEach(key => localStorage.removeItem(key));
    localStorage.removeItem("todoList_todaysData");
    keys.forEach(key=>localStorage.removeItem(key));
    localStorage.removeItem(username);
    window.location.reload();
}

logoutBtn.addEventListener("click",logout)