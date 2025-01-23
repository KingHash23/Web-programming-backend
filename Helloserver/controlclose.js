//if statements
// if (condition){

// }else if (condition){

// }else{
//     //default code
// }
// an if statement to check if age is for teenagers, youth or elderly
let age = 14
if(age >= 13 && age <= 19) {
    console.log("teenager😒😒");
} else if (age >= 20 && age <= 59) {
    console.log("youth nigga🦍🦍🦍🦍🦍🦍🦍🦍🦍🦍🦍");
} else {
    console.log("You are old");
}

// switch statements
/**  switch(parmater){
    case: function
    break;
    case: function
    break;
    default: function
}*/
//Switch statement telling us which day of the week ahs been entered

let dayOfWeek = "Saturday";

switch(dayOfWeek) {
    case "Monday":
        console.log("Today is Monday");
        break;
    case "Tuesday": 
    console.log("Today is Tuesday");
    break;
    case "Wednesday":
        console.log("Today is Wednesday");
        break;
    case "Thursday":
        console.log("Today is Thursday");
        break;
    case "Friday":
        console.log("Today is Friday");
        break;
    case "Saturday":
        console.log("Today is Saturday");
        break;
    case "Sunday":
        console.log("Today is Sunday");
        break;
    default:
        console.log("Invalid day");
        break;
}

// loops
// //for loops
// for(initalization,condition, increment){ result 
//     //code
// }
// //while loops
// initalization
// while(condition)
//     { result
//         increment}
//print the first hundred counting numbers using for loop

for(let i = 1; i <= 100; i++) {
    console.log(i);
}

//print the first hundred counting numbers using while loop 
let i = 1;
while(i <= 100) {
    console.log(i);
    i++;
}
// for in loops
// for(initalization in storage){
//     results
// }

let numbers = [1, 2, 3, 4, 5];

for(let number in numbers) {
    console.log(number);
}

let person = {
    name: "John",
    age: 25,
    city: "New York"
};

for(let key in person) {
    console.log(key + ": " + person[key]);
}
// for of loops
// for(initalization of storage){
// results}

let nums = [1, 2, 3, 4, 5];

for(let number of nums) {
    console.log(number);
}

let colors = ["red", "blue", "green"];

for(let color of colors) {
    console.log(color);
}