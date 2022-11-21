### 安装

#### 环境

##### 下载`nginx`安装包

```
wget http://nginx.org/download/nginx-1.20.2.tar.gz
```

##### 安装编译环境

```
yum -y install gcc gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel
```

#### 安装

##### 解压

```
tar -zxvf nginx-1.20.2.tar.gz
```

##### 安装

```
cd nginx-1.20.2
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module // 安装指定目录
make && make install
```

#### 命令

##### 启动

```
// 启动
/usr/local/nginx/sbin/nginx

// 静默启动
/usr/local/nginx/sbin/nginx -s reload
```

##### 停止

```
 /usr/local/nginx/sbin/nginx -s stop
```

### 升级

#### 预备

需要下载新的`nginx`安装包，替换`/sbin/nginx`文件

```
// 下载包
wget http://nginx.org/download/nginx-1.22.0.tar.gz

// 解压
tar -zxvf nginx-1.20.0.tar.gz

cd nginx-1.22.0
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module // 安装指定目录
make // 注意不要 make install(会覆盖)
```

#### 替换

```
// 备份原来的
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak

// 复制 nginx 到 sbin 下，要将nginx 关掉
cp ./objs/nginx /usr/local/nginx/sbin/

// 启动
```



### 启动设置

#### 设置成服务

在`/etc/init.d` 下创建文件 `nginx`

```
vim /etc/init.d/nginx
```

配置

```
# chkconfig: - 85 15
# description: nginx is a World Wide Web server. It is used to serve

nginx="/usr/local/nginx/sbin/nginx" //修改成nginx执行程序的路径。

NGINX_CONF_FILE="/usr/local/nginx/conf/nginx.conf" //修改成nginx.conf文件的路径。
```

设置执行权限

```
chmod a+x /etc/init.d/nginx
```

通过下面命令启动停止

```
/etc/init.d/nginx start
/etc/init.d/nginx stop
```

#### 使用 `service` 命令

```
chkconfig --add /etc/init.d/nginx
```

##### 命令

```
service nginx start
service nginx stop
service nginx restart
```

#### 设置开机自动启动

```
chkconfig nginx on
```

### 配置

#### 配置多个域名路径

##### 配置文件位置

```
vim /usr/local/nginx/conf/nginx.conf
```

##### `nginx.conf`

```
server {
    listen          80;
    server_name     www.codeliu.com;

    location / {
        root    /usr/lib/apache-tomcat-8.5.33/webapps/CodeliuDemo;
        index   index.html index.htm;
    }
}


server {
    listen          80;
    server_name     test1.codeliu.com;

    location / {
        root   /usr/lib/apache-tomcat-8.5.33/webapps/Test1Demo;
        index  index.html index.htm;
    }
}

```

##### 检查与重启

```
/usr/local/nginx/sbin/nginx -t
/usr/local/nginx/sbin/nginx -s reload
```

