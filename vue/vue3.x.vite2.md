### 创建项目

#### node 版本要求

```
Vite 需要 Node.js 版本 >= 12.0.0
```

#### 创建 vue 项目

使用 yarn 命令

```
yarn create vite my-vue-app --template vue
```

#### 依赖

```
yarn add sass
```

### 常见问题

访问路径被限制

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

### 知识

`<script type="module >`

```
<!-- 要想浏览器识别 ES6 语法，需要加上 type="module", 才能识别 import 语法 -->
<script type="module" src="/src/main.js"></script>
```

