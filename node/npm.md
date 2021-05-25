### 常用命令

#### 生成 package.json

```
npm init
```

#### 安裝模块依赖

```
npm install
```

#### 查看当前使用 npm 源

```
npm config get registry
```

#### 清除 node_modules, 再安装

```
rm -rf node_modules
rm package-lock.json
npm cache clear --force
npm install
```

### nrm

nrm 用来管理 npm 源

#### 下载

```
npm install -g nrm
```

#### 添加 npm 源

```
nrm add npm http://registry.npmjs.org
nrm add taobao https://registry.npm.taobao.org
```

#### 切换源地址

```
nrm use npm
nrm use taobao
```

