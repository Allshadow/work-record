#### 脚手架安装

1）全局安装脚手架，使用 `npm` 安装，`yarn` 安装需要配置环境变量

```
npm install -g koa-generator
```

2）创建项目

```
koa // 在当前目录创建项目
koa2 manage-server // 在上级目录创建项目
```

#### 使用 `pm2`部署`koa`项目（一般不用用 `npm` 命令就好）

1）全局安装 `pm2`

```
npm install -g pm2
```

2）启动项目

```
// 启动单个项目
pm2 start app.js

// koa2 中启动
pm2 start ./bin/www 

// 自动重启
pm2 start ./bin/www --watch

```

3）相关命令

```
pm2 list // 查看所有已启动项目
pm2 start // 启动
pm2 restart www // 重启
pm2 stop www // 停止
pm2 delete www // 删除
```

#### 安装日志插件

1）`log4js`

```
yarn add log4js
```

2）`app.js` 引入`log4js` 

```
// 基础用法

// app.js
const log4js = require('log4js')
const loggers = log4js.getLogger();

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  loggers.level = "debug"; // bug 等级
  loggers.debug("Some debug messages"); // 打印日志
})
```

#### 关于 `mongo DB`

1）查看是否安装成功

```
mongod --version
```

2）配置环境变量

```
// 拷贝 bin 路径到环境变量中去
```

3）启动

```
mongod --config "目录+ \bin\mongod.cfg"

// 证明启动成功
http://localhost:27017
```

4）注册为windows 服务

```
mongod --config "目录 + \bin\mongod.cfg" --serviceName "mongoDB" --install
```

