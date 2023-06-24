// let num = [1,3,2,4,2];
let num = prompt("Enter your string or integer: ");
// for(let f in num){
//     console.log(f)
// }
// num.forEach((i)=>{
//     console.log(i-1);
// })
let count = prompt("Enter the number of time you want ot print warning: ");
let c = 0;
while(num.length === 0){
    console.log(`Please define "${num}" first!`);
    c++;
    if(c==count){
        console.log(c)
        break;
    }
}