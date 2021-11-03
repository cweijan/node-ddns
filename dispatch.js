const AliyunDNS = require('./provider/aliyun');

async function dispathDDNS(config) {
  const { provider, type, domain, subDomain,ip } = config;
  switch (provider) {
    case "aliyun":
      const { accessKey, accessKeySecret } = config;
      const client = AliyunDNS.createClient(accessKey, accessKeySecret, true);
      return client.saveSubDomain({
        subDomain, domain, type, ip
      });
  }
}

module.exports = { dispathDDNS }