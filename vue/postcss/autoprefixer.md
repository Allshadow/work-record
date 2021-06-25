#### 功能

自动补全 css 前缀

#### 安装

```
yarn add --dev postcss  // 是一个用 JavaScript 工具和插件转换 CSS 代码的工具

yarn add --dev autoprefixer // 自动补全插件
```

#### 修改 browserList

修改 package.json 文件中的 browserList

```
"browserslist": [
    "> 1%",
    "last 3 versions",
    "not ie <= 8",
    "chrome >= 14",
    "safari >= 3",
    "ios >= 8",
    "android >= 4.0"
 ]
```

#### 新建 postcss.config.js 文件

在根目录新建文件，写入，重启项目即可

```
module.exports = {
    plugins: {
    	autoprefixer: {}
    }
}
```

#### 问题

运行后报错 Error: PostCSS plugin autoprefixer requires PostCSS 8.Migration guide for end-users

```
解决方案： 降低 autoprefixer 的版本

yarn add --dev autoprefixer@8.0.0
```

#### 参考

```
https://www.jianshu.com/p/c8dc12afb5ce
```

