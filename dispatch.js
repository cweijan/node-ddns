const AliyunDNS = require('./provider/aliyun');

async function dispathDDNS(config) {
  try {
    const { provider, type, domain, subDomain, ip } = config;
    switch (provider) {
      case "aliyun":
        const { accessKey, accessKeySecret } = config;
        const client = AliyunDNS.createClient(accessKey, accessKeySecret, true);
        return client.saveSubDomain({
          subDomain, domain, type, ip
        });
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = { dispathDDNS }