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

let elemOfWishes = document.querySelector(".noListMessage");

let randomWish = wellWishes[Math.floor(Math.random()*wellWishes.length)];
let randomWishSplit = randomWish.split("!");
console.log(randomWishSplit)
elemOfWishes.innerHTML = `<h3>${randomWishSplit[0]}!</h3><p>${randomWishSplit[1]}</p>`;