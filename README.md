# Node-DDNS

开发步骤

1. 安装依赖: npm i
2. 进行编译: npm run build && npm run build-web
3. 启动容器服务: docker-compose up
4. 重新构建并以守护模式启动: npm run build && docker-compose up -d --build

创建Windows服务

- 创建服务: scx 0ddns "D:\dev\developKit\nodejs\node.exe D:\git\node-ddns\dist\app.js"
- **服务参数注册表位置**: 计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\0ddns\Parameters
