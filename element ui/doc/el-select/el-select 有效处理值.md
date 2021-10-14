#### el-select 有效处理值

##### 需求分析

使用 `el-select` 时，我们通常会将其 `value` 传递给后端，后端返回的值通常也是 `value` ，但是我们想要展示的一般来说是 `label`的值

##### 简单举例

```
<template>
  <el-select
    v-model="searchParams.redo"
    placeholder="是否重做"
  >
  <el-option
    v-for="item in isRedoOpt"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  />
  </el-select>
</template>

<script>
	import { isRedoOpt } from '@/components/options'
	export default{
		data(){
			return {
				isRedoOpt, //通常我们会将这个放在 options.js 文件中进行管理，或者是公共接口返回
			}
		}
	}
</script>

// options.js 代码如下
// 是否重做
export const isRedoOpt = [
	{
    value: true,
		label: '是'
  },
  {
		value: false,
		label: '否'
	}
];
```

##### 处理 `value` 的值

如果用过滤器来过滤需要再重写一遍 options 方法，用计算属性直接复用 options.js

```
<template>
	<!-- item.value 为后端返回的 value 值 -->
	<div>comOption(item.value)</div>
</template>

<script>
import { isRedoOpt } from '@/components/options'

export default{
	data(){
  	return {
  		isRedoOpt, //通常我们会将这个放在 options.js 文件中进行管理，或者是公共接口返回
  	}
  },
  computed: {
  	comOption(){
  		// val 是匹配值, list 是 option 的 列表， listOpt 是匹配 el-select 的 key,value
      return (val, list, listOpt = {label: 'label', value: 'value'}) =>{
        if (val || val == 0) {
          const arr = list.filter((ele) => ele[listOpt.value] == val);
					return arr[0][listOpt.label];
				} else {
					return '';
				}
      }
    }
  }
}
</script>
```

