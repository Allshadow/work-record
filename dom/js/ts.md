#### 安装

##### 安装命令

```
yarn add typescript -g
```

##### 查看是否安装成功

```
tsc -v
```

#### 常见问题

##### windows

如果在 windows 系统中执行 tsc 命令报以下错误

```
... 此系统上禁止运行脚本 ...
```

需要以管理员身份执行 `powerShell`, 然后执行以下命令，在出现的提示选择  `Y`

```
set-ExecutionPolicy RemoteSigned
```

