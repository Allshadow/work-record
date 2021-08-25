#### nvm

nvm 是 node.js 的版本管理工具

#### 安装包

##### 百度网盘

```
百度网盘上 work > nvm-setup > nvm-setup.exe
```

##### github

```
https://github.com/coreybutler/nvm-windows/releases
```

#### 常用命令

##### 简述

使用 GitBash 输入以下命令

##### 查看 npm 版本号

```
npm -v
```

##### 查看 node 版本号

```
node -v
```

##### 查看本地版本

```
nvm list
```

##### 查看帮助

```
nvm --help
```

##### 查看 node 可用版本

```
nvm list available
```

##### 使用哪个 node 版本

```
nvm use 版本号
```

##### 下载 node 版本

```
nvm install 版本号
```

##### 卸载

```
nvm uninstall 版本号
```

#### 问题解决

问题： node -v 不是内部命令或外部命令

```
解决： 将 nodejs 目录下有 etc 文件， 将其删除即可
```

问题：安装完 node 招不到

```
刚安装完node版本，需要重启计算机，否则有可能出现node找不到的问题
```

问题：node 安装失败

由于 npm git 官方地址变更，使用默认配置会导致 node 下载失败，修改 “nvm/settings.txt”

```
root: D:\nvm
path: D:\nodejs
// 添加以下代码
node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

