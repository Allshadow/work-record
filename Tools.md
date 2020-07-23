# 一、Git

## 1.远程仓库设置

#设置ssh

判断本地是否存在.ssh目录

1）打开 Git Bash

2）输入命令检查目录是否存在

```bash
C:\Users\lenovo\.ssh //一般目录在这个位置

$ ls -al ~/.ssh //输入如下代码
# ls: cannot access '/c/Users/lenovo/.ssh': No such file or directory //返回此说明没有这个目录
```

3）如果存在，会有以下两个文件

```
id_rsa  //私钥，不能泄露出去
id_rsa.pub //公钥，可以放心告诉别人
```

4）创建sshkey（若文件存在跳过此步）

```bash
//以下邮件地址需要换成自己的邮件地址
//然后一路回车，使用默认值即可
$ ssh-keygen -t rsa -C "youremail@example.com"
```

5）登陆GitHub

```
1.点击右侧头像---settings---SSH and GPG keys
2.点击New SSH key 按钮
3. 填上title(可以随意的title),Key为文本框里粘贴id_rsa.pub文件的内容（C:\Users\lenovo\.ssh windows路径）
4.保存即可
```

#添加远程仓库

1）点击右侧头像---your Repositories-- new

![](E:\WorkFile\assets\Git\gitnew1.png)

2）公开的只要填name即可

![](E:\WorkFile\assets\Git\gitnew2.png)

#关联远程仓库

1）在本地仓库运行命令

```bash
$ git remote add origin git@github.com:Allshadow/WorkFile.git //ssh传输

$ git remote add origin https://github.com/Allshadow/WorkFile.git //此为https协议的链接，会不断重复输入密码...

//此时，取消本地关联仓库，执行ssh传输
1.git remote rm origin
```

#推送远程仓库

1）初始化本地仓库

```bash
$ git init
```

2）提交文件到暂存区

```bash
$ git add -A
```

3）提交文件到版本库

```bash
$ git commit -m ''
```

4）在本地仓库运行命令

```bash
$ git push -u origin master
```

## 2.常用命令

#批量添加文件到暂存区

```bash
$ git add -A
```

#更新线上分支

```bash
git remote update origin --prune
```

#git设置用户名与邮箱

```bash
git config --global user.name "Your Name" 
git config --global user.email "email@example.com"
//--global 如果用了这个参数，这台电脑上的所有Git仓库都会使用这个配置
```

#放弃当前rebase状态

```bash
git rebase --abort
```

#重置为当前最初状态

```bash
git reset --hard origin/branch/hotfix/V5.0.10.16_GPX_200313 
//后面为当前版本
```

#取消上一次提交状态

```bash
git reset --soft HEAD^
```

# 二、webstorm

## 1.安装包位置

#百度网盘（work 目录下）

## 2.基础设置

#启动时不默认打开工程

```
File --> Settings --> Appearance & Behavior --> System Settings 
去掉 Reopen last project on startup
```

#设置代码补全

```
File --> Settings --> Editor --> Live Templates
```

## 2.激活码激活网址

```
//激活码激活易过期，并且作者并不会直接更新
地址1：
http://lookdiv.com/  钥匙：lookdiv
地址2：
https://niceyoo.lanzous.com/icd3rkf
```

## 3.永久激活方法

```
//更新于2020-05-13
//适用与webstorm2020.1以下
//适用与windows/mac
```

#下载地址

```
//百度网盘（work目录下）

//教程地址
https://macstore.info/a/Jetbrainscrack.html
```

#激活步骤

```
1.如果你之前使用的是旧版本的配置方式想切换成新的配置方式，请先点击Help -> Edit Custom VM Options ..，在打开的 xxx.vmoptions中将之前添加的配置文件删除即可，继续使用旧的配置方式也是可以的
2.解压 JetBrains破解文件.zip，将 jetbrains-agent.jar、important.txt这两个文件放到你喜欢放的任意位置。
3.启动你的IDE如WebStorm，如果启动后需要注册激活，请选择『试用』，（Evaluate for free）。
4.将 jetbrains-agent.jar 拖进IDE窗口，点 『Restart』 按钮重启IDE。
5.在弹出的 JetbrainsAgent 配置助手 对话框中，选择激活方式，点击『安装』按钮，然后点击『是』（如果你是无外网环境，在对话框中勾选：我无法访问外网 选项，如银行、公安内网）。
6.重启你的IDE。
```

## 4.常用快捷键

```
Ctrl + Alt + L //格式化代码
Ctrl + w //选择中当前代码，继续按会选中其以后的代码，以及代码块
Ctrl + j //插入模板
例如： 输入字母a, 按下 Ctrl + j 会出现很多模板进行选择
Ctrl + Shift + j //合并行
Ctrl + g //定位到指定行数
alt + j //选择同样的编辑
alt + 鼠标左键 //选择多个进行编辑
/** + enter //函数代码注释
alt + 左键  //切换标签（切换编辑区的窗口）
```

自定义keyMap：

```
Shift + L  //删除行
```

## 5.支持jsx语法

```
路径： File | Settings | Languages & Frameworks | JavaScript 
修改： javaScript language version 选择 jsx
```

# 三、.md

## 1.目录结构生成器

```
npm install mddir -g //下载目录结构生成器
```

## 2.使用

```bash
// 进入文件目录 
mmdir //在文件目录下会生成一个directoryList.md文件
```

# 四、Mark Man

## 1.下载地址

```
http://www.getmarkman.com/ //官网目前可以免费使用
```

## 2.在用版本

```
v2.7.21
```

## 3.网盘下载

```
//如果下载得.air文件无法双击安装，需要下载Adobe AIR
Adobe AIR 下载地址： https://get.adobe.com/cn/air/

//百度网盘（work目录下）
```

# 五、vue-devtools

## 1.下载地址



# 六、Axure9

## 1.激活码链接

```
https://www.chinavid.com/axure-authorizationcode.html
```

## 2.可用信息

```
License： AX9001
key: iy9uUKbS7pEZwE5hbHTGigOcu48TdY4JXWbJYHxXLuvAzRL8qmry9J2mS5wXO7y3
```

## 3.下载地址

```
百度网盘work目录下
```

# 七、谷歌标签与github同步

## 1.插件下载

```
百度网盘（work/谷歌插件/bookMark）
```

## 2.参考链接

```
https://www.cnblogs.com/gongkiro/p/13221739.html
```

# 八、Typora

## 1.用途

#基于MarkDown的文本编辑器

## 2.下载

```
百度网盘（work/MarkDown）

//导出特殊文档时需要使用,直接下载即可
work/MarkDown/pandoc-2.10-windows-x86_64.msi
```

