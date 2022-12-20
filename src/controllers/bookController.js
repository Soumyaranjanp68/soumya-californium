// const { count } = require("console")
// const BookModel= require("../models/bookModel")

// const createBook= async function (req, res) {
//     let data= req.body

//     let savedData= await BookModel.create(data)
//     res.send({msg: savedData})
// }

// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find( {authorName : "HO" } )
//     console.log(allBooks)
//     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//     else res.send({msg: "No books found" , condition: false})
// }


// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )
     
//      res.send( { msg: allBooks})
// }

// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }




// // CRUD OPERATIONS:
// // CREATE
// // READ
// // UPDATE
// // DELETE



// module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData
// module.exports.updateBooks= updateBooks
// module.exports.deleteBooks= deleteBooks

const BookModel = require("../models/bookModel");
const AuthorModel = require("../models/authorModel.js");

let createBooks = async function(req , res){
    let data = req.body;
    if(data.author_id){
        let createAllBooks = await BookModel.create(data);
        res.send({msg:createAllBooks});
    }else{
        res.send("Could not able to save data.")
    }
    
}

let getBooksByChatanBhagat = async function(req , res){

    let authorObj = await AuthorModel.findOne({author_name:"Chetan Bhagat"});
    let authorId = authorObj.author_id;
    let BookListOfChetanBhagat = await BookModel.find({author_id:authorId});
    res.send({msg:BookListOfChetanBhagat});
}

let getAuthorOfTwoStatesAndUpdatePrice = async function(req, res){
    
    let updatedObj = await BookModel.findOneAndUpdate(
        {name:"Two states"},
        {$set:{price:100}},
        {new: true}
    ).select({author_id:1 , _id:0});
    let authorName = await AuthorModel.findOne(updatedObj).select({author_name:1 , _id:0});
    let updatedPrice = await BookModel.findOne({name:"Two states"}).select({price:1,_id:0});
    res.send({msg:authorName , updatedPrice})};
    
   


 let getBookPrice = async function(req,res){
    let bookPrice = await BookModel.find({price:{$gte:50, $lte:100}});
    let result = bookPrice.map(x => x.author_id);

    let allBooks = await AuthorModel.find({author_id:result}).select({author_name:1, _id:0});

    res.send({msg:allBooks});
}

module.exports.createBooks = createBooks;
module.exports.getBooksByChatanBhagat = getBooksByChatanBhagat;
module.exports.getAuthorOfTwoStatesAndUpdatePrice = getAuthorOfTwoStatesAndUpdatePrice;
module.exports.getBookPrice = getBookPrice;
