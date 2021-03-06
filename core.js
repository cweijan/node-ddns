const fs = require('fs')
const axios = require('axios').default
const { dispathDDNS } = require('./dispatch');
const configPath = __dirname + "/config.json";
const format = require('date-format');
const { log } = require('./util');

function getIP() {
    return axios
        // .get("https://jsonip.com/").then(res => res.data.ip) // 270ms
        // .get("http://httpbin.org/ip").then(res => res.data.origin) // 260ms
        // .get("http://pv.sohu.com/cityjson").then(res => res.data.ip) // 60ms, 返回的是一个变量, 需要处理
        // .get("http://checkip.amazonaws.com/").then(res => res.data.trim()) // 240ms
        .get("http://ip.threep.top/").then(res => res.data.trim()) // 100ms
        .catch(err => null)
}

function getConfig() {
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
    const curDate = format('yyyy-MM-dd hh:mm:ss', new Date());
    log(`开始进行DDNS请求, 日期为${curDate}.`)
    return dispathDDNS({ ...await getConfig(), ip: await getIP() })
}

function startCron() {
    requestDispath();
    setInterval(async () => {
        const result = await requestDispath();
        log(`ddns结果为:${JSON.stringify(result)}`)
    }, 1 * 30 * 1000);
}


module.exports = { getCofnig: getConfig, requestDispath, startCron, getIP }