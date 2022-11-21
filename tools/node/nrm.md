#### 简介

`nrm` 用来管理 `npm` 源

#### 下载

```
npm install -g nrm
```

#### 常用指令

```
// 添加 npm 源
nrm add npm http://registry.npmjs.org
nrm add taobao https://registry.npm.taobao.org/

// 切换源地址
nrm use [源名称]
// 例如
nrm use taobao

// 查看当前源，若前面有 * 则表示当前使用的是此源地址，若无请使用 npm get registry 查看
nrm ls
```

