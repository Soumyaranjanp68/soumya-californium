const express = require('express');
const router = express.Router();
const intro = require('./introduction')
const employee = require('./employee')
const _ = require('underscore')
//node module problem1
const intro2 = require('../logger/logger')
//node module problem2
const getInfo = require("../util/helper")
//node module problem3
const formatter = require('../validator/formatter')
//node module problem4
const lodash = require('lodash'); //external module , it makes it easier by taking the hassle out of working with arrays, objects,numbers,strings

router.get('/test-me', function (req, res) {
    console.log("email from introduction module", intro.myEmail)
    intro.myFunction('Sabiha')
    console.log("email from employee module", employee.myEmail)

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let result = _.first(days, 4)  //returs the 1st value if length is not mentioned , but if mention length the value from one upto the length
    console.log(`Result from underscore function is ${result}`)

    //node module problem1
    intro2.welcome("SoumyaRanjan")
    //node module problem2
    getInfo.printDate();
    getInfo.printMonth();
    getInfo.getBatchInfo();
    //node module problem3
    formatter.actTrim(" functionUp ")
    formatter.actToUppercase("soUMya")
    formatter.actToLowerCase("SOumya")
    //node module problem4
        //(i)-->chunk function of lodash, Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
        // let arrMonths = ["January","Fabruary","March","April","May","June","July","August","September","October","November","Decmber"];
        let result1 = lodash.chunk(["January","Fabruary","March","April","May","June","July","August","September","October","November","Decmber"], 3);
        console.log(result1);

        //(ii)--> tail function of lodash, Gets all elements except first element of array.
        let oddNumArr = [1,3,5,7,9,11,13,15,17,19];
        let result2 = lodash.tail(oddNumArr);
        console.log(result2);

        //(iii)--> union function of lodash, Creates an array of unique values, in order, from all given arrays using SameValueZero for equality comparisons.
        let arr1 = [1,2,3]
        let arr2 = [2,3,4]
        let arr3 = [4,5,6]
        let arr4 = [6,7,9]
        let arr5 = [1,3,5,9,11,12]
        let result3 = lodash.union(arr1 , arr2 , arr3 , arr4 , arr5);
        console.log(result3);

        //(iv)--> fromPairs function of lodash , The inverse of _.toPairs; this method returns an object composed from key-value pairs.
        let pairArr1 = ["horror","The Shining"];
        let pairArr2 = ["drama","titanic"];
        let pairArr3 = ["thirller","shutter Island"]
        let pairArr4 = ["fantasy","pans Labyrinth"]
         let result4 = lodash.fromPairs([pairArr1 , pairArr2 , pairArr3 , pairArr4]);
        //  let result4 = lowDash.fromPairs( [["horror","The Shining"] , ["drama","titanic"] , ["thirller","shutter Island"] , ["fantasy","pans Labyrinth"]]);
        console.log(result4);

        res.send('any dummy text')
});


router.get('/test-you', function(req, res){
    console.log("I am here")
    res.send("very important text")
})


module.exports = router;