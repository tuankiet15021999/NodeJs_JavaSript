const fs = require('fs').promises
const path = require('path')
const fileName = path.join(__dirname,'../Logs','logs.log')
const logEvents = async msg =>{
    try {
        fs.appendFile(fileName,msg)
    } catch (error) {
        console.log(error);
    }
}

module.exports = logEvents