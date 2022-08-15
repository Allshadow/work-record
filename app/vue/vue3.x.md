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

