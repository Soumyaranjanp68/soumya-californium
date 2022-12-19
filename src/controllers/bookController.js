const BookModel = require("../models/bookModel")

let createBook = async function(req , res){
    let data = req.body;
    let allBooksData = await BookModel.create(data);
    res.send({msg : allBooksData});
}

let bookList = async function(req , res){
    let getBookList = await BookModel.find({bookName: "Harry Potter 1" , author: "J.K Rowling"});
    res.send({msg : getBookList});
}

let booksInYear = async function(req , res){
    let data = req.query;
    let getBooksInYear = await BookModel.find(data);
    res.send({msg: getBooksInYear});
}

let getParticularBooks = async function(req , res){
    let data = req.body;
    let getSpecificBooks = await BookModel.find(data);
    res.send({msg: getSpecificBooks});
}

let getXINRBooks = async function(req , res){
    let getBooksOnPrice = await BookModel.find({"prices.indianPrice":{$in:["100INR","200INR","500INR"]}});
    res.send({msg:getBooksOnPrice});
}

let getRandomBooks = async function(req , res){
    let getRandomBooksOnStocksOrPages = await BookModel.find({$or:[{stockAvailable:true} , {totalPages:{$gte:500}}]});
    res.send({msg:getRandomBooksOnStocksOrPages});
}

module.exports.createBook = createBook;
module.exports.bookList = bookList;
module.exports.booksInYear = booksInYear;
module.exports.getParticularBooks = getParticularBooks;
module.exports.getXINRBooks = getXINRBooks;
module.exports.getRandomBooks = getRandomBooks;