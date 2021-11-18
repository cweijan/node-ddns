const { requestDispath } = require('./core');
const { log } = require('./util');
requestDispath().then(res => {
    log(res)
})
