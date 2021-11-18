const { getIP } = require("../core");
const { log } = require('./util');

async function testGetIP(){
    const ip=await getIP()
    log(ip)
}
testGetIP()