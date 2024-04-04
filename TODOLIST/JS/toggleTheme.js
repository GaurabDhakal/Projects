function toggleThemeMenu(e){
    let popupForTheme = document.querySelector('.popupForTheme');
    popupForTheme.hidden = !popupForTheme.hidden;
    toggleSettingsMenu("just_close");
}

document.querySelector('.sectionPopupTheme').addEventListener('click', (e)=>{
    if(e.target==document.querySelector('.sectionPopupTheme')) toggleThemeMenu()
})
document.querySelector('.changeThemeIcon').addEventListener('click', toggleThemeMenu)


let themeSelect = document.querySelector('.theme');4
themeSelect.addEventListener('change', (e)=>{
    let theme = e.target.value;
    console.log(theme)
    localStorage.setItem('theme',theme)
})

function loadTheme(){
    let theme = localStorage.getItem('theme');
    let light = document.querySelector('#light')
    console.log(theme)
    if(theme&&theme=="light"){
        light.selected = true;
    }
}
loadTheme()