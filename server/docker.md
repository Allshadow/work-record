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
yum install docker-ce docker-ce-cli containerd.io
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

