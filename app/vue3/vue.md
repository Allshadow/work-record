### 创建项目

#### 安装脚手架

##### 安装

```shell
npm install @vue/cli -g

# 或者
yarn global add @vue/cli
```

##### 升级版本

```shell
npm update -g @vue/cli

# 或者
yarn global upgrade --lasest @vue/cli
```

##### 卸载旧版本 `vue-cli`

```shell
npm uninstall vue-cli

# 或者
yarn global remove vue-cli
```

##### 版本查看

```
vue --version  // 目前 4.x 以上支持创建vue3项目
```

##### 创建项目

```
vue create [name]
```

#### 通过 `vite` 创建项目

##### 创建项目

```shell
// 不需要全局安装，以插件形式安装
npm init vite

# 或者
yarn create vite [name]
```

##### 安装项目所需插件

```shell
# 安装项目生产依赖
yarn add vue-router@next vuex@next element-plus axios

# 安装项目开发依赖
yarn add --dev sass 
```

##### 目录规范

```
vite-demo
--| src
	--| api  # 接口放置
	--| assets # 资源静态文件
	--| components # 项目组件
	--| config # 项目配置
	--| router # 路由
	--| store # vuex
	--| utils # 工具函数
	--| views # 页面结构
--| .env.dev # 配置环境变量
--| .env.test
--| .env.prod

// 环境变量查看 vite 的 mode 值
```

### `vue`知识

#### `ref`与`reactive`区别

```
import { ref, reactive } from 'Vue'

setup(){
	let num = ref(100) // 一般来说定义基本数据类型
	let obj = reactive({data: 1}) // 一般定义响应数据类型
	
	// 打印 num
	console.log(num.value)
	
	// 打印 obj
	console.log(obj)
}
```

#### 路由跳转

组合式api

```
script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const goHome = () => {
    router.push('/welcome')
  }
</script>
```

### 

### 指令

#### `v-model`

使用 `v-model`绑定组件

```
// 组件上的 v-model 使用 modelValue 作为 prop 和 update:modelValue 作为事件

// 父组件
<child v-model="isShow"></child>

// 子组件
<el-button 
	@click="$emit('update:modelValue', false)"
>
取消
</el-button>

export default {
	props: {
		modelValue:{
			
		}
	}
}
```

