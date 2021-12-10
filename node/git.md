# Git

#### 升级 Git

```
git update-git-for-windows
```

## 分支的强制覆盖

有时候，想将develop分支上的内容强制覆盖到master分支



1）切换到develop分支下，并保证本地已经同步了远程仓库的代码

```bash
git checkout develop
git pull
```

2）把本地的develop分支强制（-f）推送到远程仓库master

```bash
git push origin develop:master -f (develop:master 为当前分支名称：需要覆盖的分支名称)
```

3）切换到旧分支

```bash
git checkout master
```

4）下载远程仓库的最新内容，不作合并

```bash
git fetch --all
```

5）把HEAD指向master最新版本

```bash
git reset --hard origin/master
```



## 远程仓库设置

### 设置ssh

1）判断本地是否存在.ssh目录

打开 Git Bash，输入命令检查目录是否存在

```bash
//输入以下代码（一般在 C:\Users\lenovo\.ssh 目录下）
$ ls -al ~/.ssh 
# ls: cannot access '/c/Users/lenovo/.ssh': No such file or directory //返回此说明没有这个目录
```

2）如果存在，会有以下两个文件

```
id_rsa  //私钥，不能泄露出去
id_rsa.pub //公钥，可以放心告诉别人
```

3）创建sshkey（若文件存在跳过此步）

```bash
//以下邮件地址需要换成自己的邮件地址
//然后一路回车，使用默认值即可
$ ssh-keygen -t rsa -C "youremail@example.com"
```

4）登陆GitHub

```
1.点击右侧头像---settings---SSH and GPG keys
2.点击New SSH key 按钮
3. 填上title(可以随意的title),Key为文本框里粘贴id_rsa.pub文件的内容（C:\Users\lenovo\.ssh windows路径）
4.保存即可
```

### 添加远程仓库

1）点击右侧头像---your Repositories-- new

![](git.assets/gitnew1.png)

2）公开的只要填name即可

![](git.assets/gitnew2.png)

### 关联远程仓库

1）在本地仓库运行命令

```bash
$ git remote add origin git@github.com:Allshadow/WorkFile.git //ssh传输

$ git remote add origin https://github.com/Allshadow/WorkFile.git //此为https协议的链接，会不断重复输入密码...

//此时，取消本地关联仓库，执行ssh传输
1.git remote rm origin
```

### 推送远程仓库

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

## 常用命令

1）批量添加文件到暂存区

```bash
$ git add -A
```

2）更新线上分支

```bash
git remote update origin --prune
```

3）git设置用户名与邮箱

```bash
git config --global user.name "Your Name" 
git config --global user.email "email@example.com"
//--global 如果用了这个参数，这台电脑上的所有Git仓库都会使用这个配置
```

4）放弃当前rebase状态

```bash
git rebase --abort
```

5）重置为当前最初状态

```bash
git reset --hard origin/branch/hotfix/V5.0.10.16_GPX_200313 
//后面为当前版本
```

6）取消上一次提交状态

```bash
git reset --soft HEAD^
```

## 常见错误

### Sourcetree

git status失败 错误代码128：error :bad signature 0x0000000

```bash
//打开 git bash

//1.删除 index
rm -f .git/index

//2.重新创建（可以使用如下命令，不用质疑）
git reset
```

