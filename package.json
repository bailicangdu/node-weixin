{
  "name": "node-weixin",
  "version": "1.0.0",
  "description": "wechat",
  "main": "index.js",
  "scripts": {
    "dev": "cross-env NODE_ENV=development supervisor --harmony index.js",
    "local": "cross-env NODE_ENV=local supervisor --harmony index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "cross-env NODE_ENV=production pm2 start index.js --node-args='--harmony' --name 'node-weixin'",
    "stop": "cross-env NODE_ENV=production pm2 stop index.js --name 'node-weixin'",
    "restart": "cross-env NODE_ENV=production pm2 restart index.js --node-args='--harmony' --name 'node-weixin'"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/bailicangdu/node-weixin.git"
  },
  "keywords": [
    "node",
    "vue"
  ],
  "author": "cangdu",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/bailicangdu/node-weixin/issues"
  },
  "homepage": "https://github.com/bailicangdu/node-weixin#readme",
  "dependencies": {
    "babel": "^6.23.0",
    "babel-core": "^6.24.1",
    "babel-plugin-transform-async-to-generator": "^6.24.1",
    "babel-plugin-transform-es2015-classes": "^6.24.1",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.24.1",
    "babel-plugin-transform-export-extensions": "^6.22.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-3": "^6.24.1",
    "config-lite": "^1.5.0",
    "connect-flash": "^0.1.1",
    "connect-history-api-fallback": "^1.3.0",
    "connect-mongo": "^1.3.2",
    "cookie-parser": "^1.4.3",
    "cross-env": "^5.0.0",
    "express": "^4.15.3",
    "express-session": "^1.15.3",
    "mongodb": "^2.2.27",
    "mongoose": "^4.10.4",
    "node-fetch": "^1.7.0",
    "socket.io": "^2.0.1",
    "supervisor": "^0.12.0",
    "time-formater": "^1.0.1"
  }
}
