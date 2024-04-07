let wellWishes = [
    "You've crushed it today! Now go enjoy yourself.",
    "Clock out time! Wishing you a fun-filled rest of the day.",
    "Tasks complete! Go recharge and do something you love.",
    "Well done! Now go make the most of your free time.",
    "That's it for work tasks! Time to switch to relax mode!",
    "Step away from the desk! Have a delightful rest of your day.",
    "Awesome job today! May your evening be equally fantastic.",
    "High five for finishing! Go out and seize the rest of your day.",
    "Productive day done! Wishing you a joyful rest of the day."
];

let tobeStored = {
    date: new Date().toDateString(),
    count: 0
};
if (!localStorage.getItem("todoList_todaysData")) {
    localStorage.setItem("todoList_todaysData", JSON.stringify(tobeStored));

}
let todaysData = JSON.parse(localStorage.getItem("todoList_todaysData"));
if (todaysData.date != new Date().toDateString()) {
    todaysData.date = new Date().toDateString();
    todaysData.count = 0;
    localStorage.setItem("todoList_todaysData", JSON.stringify(todaysData));
}

function handleNoListMsgFn() {
    let noListMessage = document.querySelector(".noListMessage");
    noListMessage.hidden = false;
    let todaysData = JSON.parse(localStorage.getItem("todoList_todaysData"));
    let elemOfWishes = document.querySelector(".noListMessage");
    console.log(todaysData.count)
    if (todaysData.count == 0) {
        elemOfWishes.innerHTML = `<h3>Remember, action drives results so let's get started!</h3>`;
    } else {
        let randomWish = wellWishes[Math.floor(Math.random() * wellWishes.length)];
        let randomWishSplit = randomWish.split("!");
        elemOfWishes.innerHTML = `${todaysData.count>3?`<h3> ${randomWishSplit[0]}!</h3><p>${randomWishSplit[1]}!</p>`:`Let's get few more tasks done!`}<p>
        You completed ${todaysData.count} ${todaysData.count>1?"tasks":"task"} today.</p>`;
    }
}
handleNoListMsgFn();