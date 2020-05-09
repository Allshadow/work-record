---
![gitnew1](/Git/gitnew1.png)typora-root-url: assets
---

# 远程仓库

## 1.设置远程仓库

### 设置ssh

判断本地是否存在.ssh目录

1.打开 Git Bash

2.输入命令检查目录是否存在

```bash
C:\Users\lenovo\.ssh //一般目录在这个位置

$ ls -al ~/.ssh //输入如下代码
# ls: cannot access '/c/Users/lenovo/.ssh': No such file or directory //返回此说明没有这个目录
```

3.如果存在，会有以下两个文件

```
id_rsa  //私钥，不能泄露出去
id_rsa.pub //公钥，可以放心告诉别人
```

4.创建sshkey（若文件存在跳过此步）

```bash
//以下邮件地址需要换成自己的邮件地址
//然后一路回车，使用默认值即可
$ ssh-keygen -t rsa -C "youremail@example.com"
```

5.登陆GitHub

```
1.点击右侧头像---settings---SSH and GPG keys
2.点击New SSH key 按钮
3. 填上title(可以随意的title),Key为文本框里粘贴id_rsa.pub文件的内容（C:\Users\lenovo\.ssh windows路径）
4.保存即可
```

### 添加远程仓库

1.点击右侧头像---yourRepositories-- new

![](E:\WorkFile\assets\Git\gitnew1.png)

2.公开的只要填name即可

![](E:\WorkFile\assets\Git\gitnew2.png)

### 关联远程仓库

1.在本地仓库运行命令

```bash
$ git remote add origin https://github.com/Allshadow/WorkFile.git
```

### 推送远程仓库

1.在本地仓库运行命令

```bash
$ git push -u origin master
```

