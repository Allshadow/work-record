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

