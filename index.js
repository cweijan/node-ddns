

const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser');
const cors = require('cors');
const { getCofnig, requestDispath, startCron } = require('./core');
const app = express()
const tcpPortUsed = require('tcp-port-used');
const open = require('open');
const { sep } = require("path");
const { platform } = require('os');
const { log } = require('./util');
const { exec } = require('child_process');

const isProd = __filename.split(sep).pop() == 'app.js';
const port = 7231;
const target = `http://127.0.0.1:${port}`;

tcpPortUsed.check(port, '127.0.0.1').then((inUse) => {
    if (inUse) {
        log('DDNS程序已经启动..')
        open(target)
        return;
    }
    const configPath = __dirname + "/config.json";
    app.use(cors()).use(bodyParser.urlencoded({ extended: true }))
        .use(bodyParser.json())
        .use(express.static(isProd ? __dirname : __dirname + '/dist'))
        .get("/n2n",async (req,res)=>{
            exec(`echo "" | nc -u localhost 5645|awk '{ if ($3 ~ /10/) printf "%-20s %s\\n", $9, $3 }'`,(err,stdout)=>{
                res.send(stdout)
            })
            setTimeout(() => {
                exec("pkill nc.exe")
            }, 5);
        })
        .get("/config", async (req, res) => {
            res.json(await getCofnig());
        })
        .post("/config", async (req, res) => {
            fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2))
            res.json(await getCofnig())
        })
        .get("/startDDNS", async (req, res) => {
            const result = await requestDispath()
            log(result)
            res.json({})
        })
        .listen(port, () => {
            startCron();
            log(`启动DDNS程序成功! 访问地址为: ${target}!`);
            fs.writeFileSync(__dirname + "/ddns.pid", process.pid+"")
            if (platform() == "win32") {
                open(target)
            }
        });

});

process.on('unhandledRejection', (error) => {
    console.log('unhandledRejection', error)
});

process.on('uncaughtException', (error) => {
    console.log('uncaughtException', error)
});