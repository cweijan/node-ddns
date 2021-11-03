

const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser');
const cors = require('cors');
const { getCofnig,requestDispath,startCron } = require('./core');
const app = express()
const open = require('open');

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
        const result = await requestDispath()
        console.log(result)
        res.json({})
    })
    .listen(port, () => {
        startCron();
        const target = `http://127.0.0.1:${port}`;
        console.log(`启动DDNS程序成功! 访问地址为: ${target}!`);
        open(target)
    });