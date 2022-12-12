const express = require('express');
const router = express.Router();
const intro = require('./introduction')
const employee = require('./employee')
const _ = require('underscore')
const mentorModule = require('../abc/xyz/myModule'); 
const req = require('express/lib/request');
const { route } = require('express/lib/application');


router.get("/profile-details", function(req, res){
    // Write the LOGIC here
    res.send('dummy response')
})

router.get('/test-me', function (req, res) {
    console.log("email from introduction module", intro.myEmail)
    intro.myFunction('Sabiha')
    console.log("email from employee module", employee.myEmail)

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let result = _.first(days, 4)
    console.log(`Result from underscore function is ${result}`)
    console.log(`The mentor of the day is ${mentorModule.mentor}`)

    res.send('any dummy text from route handler 1')
});


router.get('/test-me', function(req, res){
    console.log("I am here")
    res.send("any dummy text from route handler 2")
})

router.get('/students', function (req, res){
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})

// PATH Param example
router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */

    let requestParams = req.params

    // JSON strigify function helps to print an entire object
    // We can use many ways to print an object in Javascript, JSON stringify is one of them
    console.log("This is the request "+ JSON.stringify(requestParams))
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    
    res.send('Dummy response')
})

// PATH Param example
router.get("/profile/:name", function(req, res){
    console.log('Printing the request to find out wjere name is stored',req.params)
    console.log('user name is',req.params.name)
    //console.log(`User requesting for profile is ${name}`)
    res.send("dummy details")
})

// Query Param example
router.get("/shoes", function(req, res){
    console.log("The filter options for shoes are -",req.query)
    //req.query.size
    //req.query.brand
    res.send("dummy shoes response")
})

// 1-->an API for GET /movies that returns a list of movies.
// router.get("/movies", function(req, res){
//     console.log("movies are printed")
//     res.send(['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins' , '3 Idiots'])
// })
// // 2-->an API GET /movies/:indexNumber ,, it should return the movie in your array at index number element
// // router.get("/movies/:indexNumber", function(req, res){
// //     let moviesArr=['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins' , '3 Idiots']
// //     // if(req.params.indexNumber < moviesArr.length){
// //         console.log("successfully printed the index movie")
// //         // res.send(moviesArr[req.params.indexNumber])
    
// // });

    // 3-->
    router.get("/movies/:indexNumber", function(req, res){
        let moviesArr=['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins' , '3 Idiots']
    if(req.params.indexNumber > moviesArr.length-1){
        console.log("error")
        res.send("error, please check the index number")
    }else{
        console.log("successfully printed the movie")
    
        res.send(moviesArr[req.params.indexNumber])};
    });

//     // 4-->

//     router.get("/films", function(req, res){
//         let filmsArr=[ {
//             "id": 1,
//             "name": "The Shining"
//            }, {
//             "id": 2,
//             "name": "Incendies"
//            }, {
//             "id": 3,
//             "name": "Rang de Basanti"
//            }, {
//             "id": 4,
//             "name": "Finding Nemo"
//            }]
//          console.log("film is in the form of array") 
//          res.send(filmsArr); 
           
//     })

//     // 5-->
//     router.get("/films/:id", function(req, res){
//         let filmsArr1=[ {
//             "id": 1,
//             "name": "The Shining"
//            }, {
//             "id": 2,
//             "name": "Incendies"
//            }, {
//             "id": 3,
//             "name": "Rang de Basanti"
//            }, {
//             "id": 4,
//             "name": "Finding Nemo"
//            }]
//           for(let i=0; i<filmsArr1.length ; i++){
//             if(filmsArr1[i].id == req.params.id){
//                 res.send(filmsArr1[i])
//                 break;
//             }
//             if(filmsArr1[i].id>filmsArr1.length-1){
//                 res.send("No films exist with this id")
//                 break;
//             }
//            }
//    })

   router.get("/sol1", function(req, res){

    let arr=[1,2,3,4,5,7,8,9]
    let sum=arr.length+1
    let total= sum*(sum + 1)/2
    let result=0
    for(let i=0; i< arr.length ; i++){
        result += arr[i];
    }
    let missingNumber=(total - result)
    res.send({data:missingNumber})
   })


  router.get("/sol2", function(req, res){
    let arr1=[33,34,35,37,38]
    let sum1= arr1.length+1
    let result1= sum1* (arr1[0] + arr1[arr1.length-1])/2
    let a=0
    for (let i=0; i< arr1.length; i++){
        a += arr1[i]
    }
    let missingNumber=result1-a;
    res.send({missingNumber})
  })
    
     


module.exports = router;