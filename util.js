const fs = require('fs')

function log(message) {
    if((message instanceof Object)){
        message=JSON.stringify(message)
    }
    console.log(message)
    fs.writeFileSync(__dirname + "/ddns.log",message+"\n")
}

module.exports = { log }