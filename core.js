const fs = require('fs')
const axios = require('axios').default
const { dispathDDNS } = require('./dispatch');
const configPath = __dirname + "/config.json";


function getIP() {
    return axios.get("https://jsonip.com/").then(res=>{
        return res.data.ip;
    }).catch(err=>null)
}

function getCofnig() {
    const defaultSetting = {
        provider: "aliyun",
        type: "A"
    }
    if (fs.existsSync(configPath)) {
        const config = fs.readFileSync(configPath, 'utf-8')
        try {
            return JSON.parse(config)
        } catch (error) {
            return defaultSetting;
        }
    }
    return defaultSetting;
}

async function requestDispath() {
    return dispathDDNS({ ...await getCofnig(), ip: '127.0.0.1' })
}

function startCron() {
    setInterval(() => {
        requestDispath();
    }, 12 * 60 * 60 * 1000);
}


module.exports = { getCofnig, requestDispath, startCron, getIP }