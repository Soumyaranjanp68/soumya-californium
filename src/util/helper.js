function printDate(){
    let a = new Date();
    console.log(a);
}

function printMonth(){
    let b = new Date()
    console.log(b.getMonth()+1);
}

function getBatchInfo(){
    console.log("Californium, W3D4, the topic for today is Nodejs module system")
}

module.exports.printDate = printDate;
module.exports.printMonth = printMonth;
module.exports.getBatchInfo = getBatchInfo;