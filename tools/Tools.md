### `PS`

#### 报错

##### 移动工具不能使用

问题：不能使用移动工具，因为没有选择图层

![image-20220601111154945](tools.assets/image-20220601111154945.png)

解决：这个关掉不行，要打开

![image-20220601111433488](tools.assets/image-20220601111433488.png)

### 谷歌浏览器

#### 谷歌插件

##### `vue-devtools`

1）谷歌浏览器版本

```
版本号：5.3.3
网盘所属：本人
下载地址：链接：https://pan.baidu.com/s/12wdwFgMv4SDXHL4EkxSvYg 
提取码：z14g 
```

2）使用方法

使用谷歌浏览器访问： [chrome://extensions/](chrome://extensions/)

打开右侧的开发者模式，并且点击 '加载已解压的扩展程序'，选取文件

![image-20210621110717783](tools.assets/image-20210621110717783.png)

3）弹出的选择文件弹窗，选择文件加压后的 `E:\project\vue-devtools-dev\packages\shell-chrome`，点选择文件夹即可

##### 谷歌标签与码云同步

1）插件下载

```
百度网盘： /工具/谷歌插件/标签同步码云
```

2）码云 `token`

```
15a6b5b6080d5a934b99e7fa7a57c537

// 获取码云token 以及其他信息查看 码云仓库的 readme.md
```

##### `cookie-editor`

```
// 百度网盘： /工具/谷歌插件
// 直接点击 '加载已解压的扩展程序' 直接引入目录
```

##### `axure`

```
// 百度网盘： /工具/Axure
```

#### 操作方式

##### 强制刷新

```
// 方式一
shift + 鼠标左键

// 方式二
ctrl + F5
```

### `webstorm`

#### 安装包位置

#百度网盘（work 目录下）

#### 基础设置

#启动时不默认打开工程

```
File --> Settings --> Appearance & Behavior --> System Settings 
去掉 Reopen last project on startup
```

#设置代码补全

```
File --> Settings --> Editor --> Live Templates
```

#### 激活码激活网址

```
//激活码激活易过期，并且作者并不会直接更新
地址1：
http://lookdiv.com/  钥匙：lookdiv
地址2：
https://niceyoo.lanzous.com/icd3rkf
```

#### 永久激活方法

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

#### 常用快捷键

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

#### 支持jsx语法

```
路径： File | Settings | Languages & Frameworks | JavaScript 
修改： javaScript language version 选择 jsx
```

### .md

##### 目录结构生成器

```
npm install mddir -g //下载目录结构生成器
```

##### 使用

```bash
// 进入文件目录 
mmdir //在文件目录下会生成一个directoryList.md文件
```

#### 