### 组件

#### 基础

##### 组件目录

```
// 组件目录一般在项目的 /components 下
// 若遵守 easycom 规范，则不用引入
```

##### `easycom`规范

```
只要组件安装在项目的components目录下或uni_modules目录下，并符合components/组件名称/组件名称.vue目录结构。就可以不用引用、注册，直接在页面中使用。
```

##### 引入组件

```
<template>
	<view>
		<uni text="1"></uni><!-- 3.使用组件 -->
	</view>
</template>
<script>
	import uni from '@/components/uni.vue';//1.导入组件
	export default {
		components:{ uni }//2.注册组件
	}
</script>
```

