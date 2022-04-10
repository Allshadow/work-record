### 安装`docker`

#### 卸载

如果安装过需要卸载

```
yum remove docker \
           docker-client \
           docker-client-latest \
           docker-common \
           docker-latest \
           docker-latest-logrotate \
           docker-logrotate \
           docker-engine
```

#### 设置 `yum` 仓库

1）安装依赖

```
yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

2）设置仓库

```
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

#### 安装

```
yum install -y docker-ce docker-ce-cli containerd.io
```

#### 启动并设置开机启动

```
systemctl start docker

systemctl enable docker
```

验证是否安装成功

```
docker version

docker run hello-world
```

#### 重启

```
service docker restart
```

### 命令

#### 查看运行容器

```
docker ps
```

#### 关闭运行容器

```
docker stop id
```

#### 内部容器

##### 进入容器

```
docker exec -it 镜像id
```

##### 退出容器

```
exit
```

### 新建镜像

#### 构建镜像

##### 新建目录

```
mkdir /myimage
```

##### 创建并编写`dockerfile`

```
vim Dockerfile

#基于centos镜像
FROM centos

#维护人的信息
MAINTAINER The CentOS Project <303323496@qq.com>

#安装httpd软件包
RUN yum -y update
RUN yum -y install httpd

#开启80端口
EXPOSE 80

#复制网站首页文件至镜像中web站点下
ADD index.html /var/www/html/index.html

#复制该脚本至镜像中，并修改其权限
ADD run.sh /run.sh
RUN chmod 775 /run.sh

#当启动容器时执行的脚本文件
CMD ["/run.sh"]
```

##### 创建脚本文本`run.sh`

```
#!/bin/bash

#清空httpd缓存文件
rm -rf /run/httpd/*

#启动httpd服务
exec /usr/sbin/apachectl -D FOREGROUND
```

##### 创建网站首页文件

```
echo "Thiss is Nginx webapp." > index.html
```

##### 生成镜像

使用命令 `docker build`

```
https://zhuanlan.zhihu.com/p/33365859

未完成

docker build -t fronted .

-t // 指定要创建的目标镜像名
. Dockerfile 文件所在目录，可以指定Dockerfile 的绝对路径
```

