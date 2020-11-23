## 插件

```
1、Bracket Pair Colorizer 2 //括号变颜色，左侧会vue显示节点
2、Live Sass Compiler //将sass or scss 实时编译为 css
3、minapp //支持小程序标签
4、wechat-snippet //小程序功能辅助
5、wxml //wxml高亮显示
6、open in broswer //在浏览器窗口打开
7、Live Server //监听页面实时刷新
```

## 快捷键

```
1、ctrl + enter //换行
```

## 同步vscode插件

1）安装 Setting Sync 插件

2）登录github操作

```bash
1. setting - Developer setting - personal access tokens - generate new token 
2. 输入名称，勾选Gist, 提交
3. github token: 81496edd0d856f99aba8caa86926200cf7b0e845
```

3）配置 access token

```bash
1. ctrl + shift + P 
2. 输入 sync
3. 选择 sync: Advanced Options
4. sync:编辑本地扩展设置
5. 在 json 中找到 token,并填入
```

4）保存 Gist ID

```bash
1. Crtl + Shift + p 打开命令面板
2. 输入sync,找到 update/upload settings 这个选项
3. 上传成功后会返回Gist ID,保存此Gist ID
Gist ID:13dbf9bdc6bb7796aa17f214a2d2eb23。
```

5）找到 Gist ID

```
文件- 首选项 - 设置，然后输入 Sync 进行搜索
```

## 去除Teleport Ultra冗余代码

1）用正则表达式批量替换

```
清除tppabs标签：

html文件中：

查找： \btppabs="h[^"]*"  （可以加个空格，把tppabs空格去掉）
替换：（空）

css文件中的图片链接（以gif图片为例）：

查找：tpa=http://[^\s]*.gif

替换：（空）

css文件中的注释：

查找：/\*tpa.*?\*/

替换：（空）
```

## 报错

### Terminal禁止运行命令

报错信息：

http-server : 无法加载文件 C:\Program Files\nodejs\http-server.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。

解决：

按下 win + x ，使用管理员身份运行 power shell

输入命令 set-executionpolicy remotesigned

输入 ‘Y’ , 回车

