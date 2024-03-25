let logoutBtn = document.getElementById("logoutBtn");

function logout(){
    let keys = Object.keys(localStorage).filter(key=>key.startsWith("todo_"));
    let keysOfCategory = Object.keys(localStorage).filter(key=>key.startsWith('CATE_'));
    let username = "nameOfUsr"
    keysOfCategory.forEach(key => localStorage.removeItem(key));
    keys.forEach(key=>localStorage.removeItem(key));
    localStorage.removeItem(username);
    window.location.reload();
}

logoutBtn.addEventListener("click",logout)