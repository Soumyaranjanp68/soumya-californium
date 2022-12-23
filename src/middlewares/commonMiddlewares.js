
const mid1= function ( req, res, next) {
    let header=req.header.isFreeAppUser
    if(!isFreeAppUser==true)
    console.log("error:missing header")
    next()
}

// const mid2= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid2")
//     next()
// }

// const mid3= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid3")
//     next()
// }

// const mid4= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid4")
//     next()
// }

// const abc = function(req, res, next) {
//     //get the users IP
//     //save it in db
//     // console log
//     next()
// }

// const def = function(req, res, next) {
//    //get the users IP
//    //save it in db
//    // console log
//    next()
// }

// const xyz = function(req, res, next) {
//    //get the users IP
//    //save it in db
//    // console log
//    next()
// }

module.exports.mid1= mid1

