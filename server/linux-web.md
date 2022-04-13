### 服务器端

本项目是在 `centos8` 下安装使用，并且拥有`root`权限

#### 安装`Nginx`

`Nginx`安装教程，请看我`Nginx`搭建`web`服务器这篇文章

#### 安装`node.js`

##### 起步

1）下载`node`版本为`v14.19.1`

```
wget https://npmmirror.com/mirrors/node/v14.19.1/node-v14.19.1-linux-x64.tar.xz
```

2）解压

```
tar -xvf node-v14.19.1-linux-x64.tar.xz
```

3）放置到合适目录

```
cd /usr/local
mv /myimage/node-v14.19.1-linux-x64 .  // . 表示移至当前目录
mv node-v14.19.1-linux-x64 nodejs // 重命名
```

4）全局生效

```
ln -s /usr/local/nodejs/bin/npm /usr/local/bin/
ln -s /usr/local/nodejs/bin/node /usr/local/bin/
```

5）查看是否安装成功

```
node -v
npm -v
```

#### 安装`git`

##### 起步

1）下载`git2.35.1`

```
wget https://www.kernel.org/pub/software/scm/git/git-2.9.5.tar.gz
yum install perl-ExtUtils-MakeMaker -y
```

2）解压

```
tar -zxvf git-2.9.5.tar.gz
```

3）编译

```
cd git-2.35.1
./configure --prefix=/usr/local/git
make && make install
```

4) 全局配置

```
echo "export PATH=$PATH:/usr/local/git/bin" > /etc/profile.d/git.sh
source /etc/profile.d/git.sh
ln -s /usr/local/git/bin/git-upload-pack /usr/bin/git-upload-pack
git --version
```

##### 配置`git`仓库

1）添加`git`用户

```
adduser git // 添加用户git
passwd git // 不用添加密码
```

2）收集用户公钥，创建证书登录

```
cd /home/git/
mkdir .ssh
chmod 755 .ssh
touch .ssh/authorized_keys
chmod 644 .ssh/authorized_keys

// 将 id_rsa.pub 写进 authorized_keys 文件中，一行一个
```

3）初始化仓库

```
cd /home
mkdir hexo #创建仓库文件夹
chown git hexo/ #更改所属用户

cd hexo
git init --bare hexo.git #初始化仓库

chown -R git:git hexo.git #更改所属用户为git非常重要
```

4）检查仓库是否能用

```
git clone git@ip:/home/hexo/hexo.git
```

5）其他

如果用户需要连接此仓库，只需要在客户端配置`ssh`公钥并保存到`/home/git/.ssh`目录下`authorized_keys`中即可，参考以上第**2**条

### 