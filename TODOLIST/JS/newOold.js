
let warningAreaN = document.querySelector(".warningAreaN");
const newUsrSection = document.getElementById("newUsrView")
let todoTitles = [
        "Tasks for Today",
        "What's Next on the Agenda?",
        "Your Daily Goals",
        "Let's Get Things Done",
        "Plan Your Day",
        "Your Task List Awaits",
        "Productivity Plan",
        "Action Items",
        "Things to Accomplish",
        "Daily Duties",
        "Your Task Journey",
        "Agenda for the Day",
        "Tasks at Hand",
        "To-Do List Magic",
        "Mission for Today",
        "Your Daily Task Adventure",
        "Tackle Your Tasks",
        "Today's Objectives",
        "Goals for the Day",
        "Focus and Achieve",
        "Your Action Plan",
        "Master Your To-Dos", 
        "Time to Get Productive",
        "Check It Off the List",
        "Your Productivity Checklist",
        "Crush Your To-Do List" 
    ];
    
const oldUsrSection = document.getElementById("OldUsrViewDefault");
function oldUsrView(){
    console.log("Old usr")
    let nameOfUsr = localStorage.getItem(Object.keys(localStorage).filter(key => key=="nameOfUsr"));
    let headTitle = document.querySelector(".headTitle");
    nameOfUsr = nameOfUsr.split(" ")
    let test = "Gaurab".split(" ")
    console.log(test,test[0])
    headTitle.textContent = `Hello ${nameOfUsr[0].charAt(0).toUpperCase()+nameOfUsr[0].slice(1)}, ${todoTitles[Math.floor(Math.random()*todoTitles.length)]}`;
    if(newUsrSection.hidden===false) newUsrSection.hidden = true;
    oldUsrSection.hidden = false;
    console.log(newUsrSection,oldUsrSection)
}

function newUsrView(){
    console.log("New usr");
    if(newUsrSection.hidden===true) newUsrSection.hidden = false;
    oldUsrSection.hidden = true;
    console.log(newUsrSection,oldUsrSection)
}

function newOrOldCheck(){
    let keys = Object.keys(localStorage);   
    if(keys.includes("nameOfUsr")){
        oldUsrView();
    }else{
        newUsrView();
    }
}

let handleNewUsr = ()=>{
    let usrInpElem = document.querySelector(".newUsrInpuArea").value;
    if(usrInpElem.length===0){
        warningAreaN.textContent = "Enter the name first!"
    }else{
        localStorage.setItem("nameOfUsr",usrInpElem);
        newOrOldCheck();
    }
}

let newUsrForm = document.querySelector(".newUsrForm");

newUsrForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    handleNewUsr();
})

newOrOldCheck();