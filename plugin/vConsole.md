## 简介

移动端的开发调试，使用此插件比较实用

## 模块化条件下引入使用

### 安装

```
yarn add --dev vconsole || npm install vconsole
```

### 引入

```
//在 main.js 引入

// 开发环境下面使用vConsole进行调试
if (process.env.NODE_ENV === 'development') {
  const VConsole = require('vconsole')
  new VConsole()
}
```

