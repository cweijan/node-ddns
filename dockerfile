FROM node.js/12.0
LABEL MAINTAINER=WeiJan

RUN mkdir -p /home/node-ddns
WORKDIR /home/node-ddns

EXPOSE 7231
COPY ./dist /home/node-ddns
ENTRYPOINT ["node","app.js"]
