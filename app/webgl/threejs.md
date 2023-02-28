### 使用`parcel`搭建`threejs`

1）初始化`package.json`

```
yarn init -y
```

2）安装`parcel`

```
yarn add parcel-bundler -D
```

3）新建文件

```
// 1.新建 src 目录
// 2.新建 src/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- 引入资源文件 -->
  <link rel="stylesheet" href="./assets/css/index.css">
</head>
<body>
  <!-- 引入主入口文件 -->
  <script src="./main.js" type="module"></script>
</body>
</html>
```

4）修改`package.json`运行命令

```
{
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel src/index.html"
  }
}

```

5）使用`three.js`

```
// 安装 three.js
yarn add three gsap dat.gui
// main.js 引入
import * as THREE from 'three'
```

6）运行

```
// 开发
yarn run dev
// 打包
yarn run build
```



### `基础`

#### 常用命令

```
// 判断three.js 是否运行，查看是否打印出版本号
console.log('three', THREE.REVISION)
```

