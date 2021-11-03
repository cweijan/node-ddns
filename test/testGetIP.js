const { getIP } = require("../core");

async function testGetIP(){

    const ip=await getIP()
    console.log(ip)

}
testGetIP()