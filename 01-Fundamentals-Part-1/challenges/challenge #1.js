/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter).

Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a Boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.
*/

// § Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95m tall.
// 1.
let massMark = 78
let heightMark = 1.69
let massJohn = 92
let heightJohn = 1.95
// 2.
let BMIMark = massMark / (heightMark * heightMark)
let BMIJohn  = massJohn / heightJohn ** 2
// 3.
let markHigherBMI = BMIMark > BMIJohn
console.log(BMIMark, BMIJohn, markHigherBMI)

// § Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76m tall.
// 1.
massMark = 95
heightMark = 1.88
massJohn = 85
heightJohn = 1.76
// 2.
BMIMark = massMark / (heightMark * heightMark)
BMIJohn  = massJohn / heightJohn ** 2
// 3.
markHigherBMI = BMIMark > BMIJohn
console.log(BMIMark, BMIJohn, markHigherBMI)
