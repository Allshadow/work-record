目前创建的项目是基于`vite3`

### 基础

#### 创建应用

比较习惯于用 `GitBash` 来操作命令行，当创建`vue3`应用时，发现左右箭头选择不了。选择`windows PowerShell`来创建`vue`应用。

##### 打开`powerShell`

按住`shift`键，点击鼠标右键，在弹窗出来后选择 【在此处打开`PowerShell`窗口】

##### 创建

使用以下命令创建，并安装依赖

```
// 选择 yes/no 时使用键盘左右键
npm init vue@latest

// 安装依赖
yarn

// 运行
yarn run dev
```

##### 目录规范

```
vite
--| src
	--| api  # 接口放置
	--| assets # 资源静态文件
	--| components # 项目组件
	--| config # 项目配置
	--| router # 路由
	--| stores # pinia
	--| utils # 工具函数
	--| views # 页面结构
	--| App.vue # 组件页面
	--| main.js # 入口文件
--| .env.dev # 配置环境变量
--| .env.test
--| .env.prod

// 环境变量查看 vite 的 mode 值
```

#### 依赖

##### `sass`

1）下载

```
yarn add sass
```

// 引入全局`sass`组件

```
https://www.jianshu.com/p/eb210e72b898
```

### 问题解决

1）访问路径被限制

```
Unrestricted file system access to "/[object Object]"
```

```
// 在 vite.config.js 配置

server: {
	fs:{
		strict: false
	}
},
```

### 整理

#### 总结

##### 关于`type=module`

`<script type="module >`

```
<!-- 要想浏览器识别 ES6 语法，需要加上 type="module", 才能识别 import 语法 -->
<script type="module" src="/src/main.js"></script>
```

