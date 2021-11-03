

const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser');
const cors = require('cors');
const {dispathDDNS} = require('./dispatch');
const app = express()

const configPath = __dirname + "/config.json";
const port = 7231;
app.use(cors()).use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(express.static(__dirname + '/dist'))
    .get("/config", async (req, res) => {
        res.json(await getCofnig());
    })
    .post("/config", async (req, res) => {
        fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2))
        res.json(await getCofnig())
    })
    .get("/startDDNS", async (req, res) => {
        const result=await dispathDDNS(await getCofnig())
        console.log(result)
        res.json({})
    })
    .listen(port, () => {
        console.log(`Node ddns client start success! port is ${port}!`);
    });


function getCofnig() {
    const defaultSetting = {
        provider:"aliyun",
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

function requestSign(authorization) {

}