const fs = require('fs')
const axios = require('axios').default
const { dispathDDNS } = require('./dispatch');
const configPath = __dirname + "/config.json";


function getIP() {
    return axios
        // .get("https://jsonip.com/").then(res => res.data.ip) // 270ms
        // .get("http://httpbin.org/ip").then(res => res.data.origin) // 260ms
        // .get("http://pv.sohu.com/cityjson").then(res => res.data.ip) // 60ms, 返回的是一个变量, 需要处理
        // .get("http://checkip.amazonaws.com/").then(res => res.data.trim()) // 240ms
        .get("http://ip.threep.top/").then(res => res.data.trim()) // 100ms
        .catch(err => null)
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