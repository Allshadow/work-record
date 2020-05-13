# 一、vue-cli安装

## 1. 卸载旧版

1.如果有全局安装了旧版本vue-cli (1.x 或者 2.x)，使用以下命令卸载

```
npm uninstall vue-cli -g
# OR
yarn global remove vue-cli
```

## 2. 安装

1.使用如下命令安装新的包

```npm
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

## 3.检查

1.使用一下命令检查安装版本是否正确

```
vue --version
```

# 二、创建一个新项目

```BASH
//Windows 上通过 minTTY 使用 Git Bash，交互提示符并不工作
$ winpty vue.cmd create [项目名称]
OR
$ vue create [项目名称]
```

