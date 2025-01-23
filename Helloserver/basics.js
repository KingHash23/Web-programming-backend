// single in comment
/**multiple line comment */
// variables

// const
const PT = 3.41
console.log(PT);
// let
let num = 4;
let num2 = PT
//var
var num3 = 5;

function addnum() {
 console.log(num + num2 + num3);
}
var name = "number"; // string



/** Data types */
// int 
let age = 23; // number 
// an operation using int
let sum = age + 5; // number
console.log (sum + num);
console.log(num + num2 + num3);
console.log(num + num2 + num3 + age);



// float
let decimal = 3.14; // number
// an operation using float
let area = decimal * decimal; // number
console.log(area + num);



// boolean
let isStudent = true; // boolean
let isInhall = false; // boolean
console.log(isStudent);
console.log(isInhall);
// logical operators in boolean
console.log(isStudent && isInhall);// true and false gives us a false
console.log(isStudent || isInhall);



// string
var Tname = "Calvin";
var fname='Mark';
let lastName = `Obba`;
let greeting = `Hello World! ${fname}🌍`; // string 
let welcome = `Welcome backk ${Tname} 🦍`; // string  concatenation  
console.log( welcome );
console.log(greeting );
console.log(fname.toUpperCase()); // string method upper case
console.log(lastName.length); // string method length
// array
let friends = ["Alice", "Bob", "Charlie"]; // array
let fruits= ["mangoes", "oranges", "bananas", "apples"]; // array
console.log(friends);
console.log(fruits);
fruits.push("Grape")// appending items to the  array
console.log(fruits);
// removing values from the array
fruits.pop(); // removing one item at index 2
console.log(fruits);





// object
let person = {
    name: "John",
    age: 30,
    isStudent: true
}; // object
console.log(person);
let credentials = {
    username: "calvin",
    password: "1234",
    email: "calvin@gmail.com"
    // additional properties can be added here
}; // object
console.log(credentials);
let signupform={
    username: "calvin",
    email: "calvin@gmail.com",
    password: "1234",
    age: 23,
    gender: "male",
    // additional properties can be added here
}; // object
console.log(signupform);
signupform["comfrimpassword"] = "1234";
console.log(signupform);
// object methods
person.greet = function() {
    console.log(`Hello, my name is ${this.name}`);
}; // adding a method to the object
person.greet(); // calling the method

//Comparison operators
console.log(signupform.password == signupform.comfrimpassword);
console.log(signupform.password === signupform.comfrimpassword);


