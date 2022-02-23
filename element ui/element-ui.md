### `element-Ui`

#### `el-input`

##### 标准`input`

```
<el-input
  placeholder="请输入内容"
  v-model="input"
>
</el-input>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
```

##### 可清除的输入框

```
// clearable 属性
<el-input clearable ></input>
```

##### 设置宽度

```
<el-input style="width: 200px"></input>
```

#### `el-select`

##### 标准`select`

```
<el-select v-model="value" placeholder="请选择">
	<el-option
		v-for="item in options"
		:key="item.value"
		:label="item.label"
		:value="item.value"
	>
	</el-option>
</el-select>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: ''
      }
    }
  }
</script>
```

##### 可清除的下拉框

```
<el-select clearable ></el-select>
```

##### 可多选的下拉框

展示全部

```
<el-select multiple></el-select>
```

展示 + 1

```
<el-select multiple collapse-tags></el-select>
```

##### 绑定事件

```
<!-- val 为当前选中值  -->
<el-select @change="(val)"></el-select>
```

##### 进阶

###### 处理 el-select 值

**需求分析**

使用 `el-select` 时，我们通常会将其 `value` 传递给后端，后端返回的值通常也是 `value` ，但是我们想要展示的一般来说是 `label`的值

**简单举例**

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

**处理 `value` 的值**

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
  		// val 是匹配值, 
  		// list 是 option 的列表， 
  		// listOpt 是匹配 el-select 的 key,value
      return (val, list, listOpt = {label: 'label', value: 'value'}) =>{
        if(val || val == 0){
          const arr = list.filter((ele) => ele[listOpt.value] == val);
					return arr[0][listOpt.label];
        }else{
          return ''
        }
      }
    }
  }
}
</script>
```

#### `el-form`

##### 引用外部校验

```
// 1.引入文件
import { xxx } from validator(详细的路径名称)

// data
rules: {
    pass: [
    	{ validator: xxx, trigger: 'blur' }
    ]
}

// 参照 gpx-web 目录下 lib 文件夹下 validator.js
```

##### 动态表单校验

有时候需要多个 `<el-form-item>`遍历时，可外面加 `div`遍历

```
<el-form
	:model="ruleForm"
	ref="ruleForm"
	label-width="80px"
	label-position="left"
>
	<div 
	  v-for="(item, index) in ruleForm.dataList" 
  	:key="index"
  >
  <el-form-item 
  	label="免考原因" 
  	:prop="'dataList.' + index + '.reason'"
  	:rules="{required: true, message: '请选择免考原因', trigger: 'change'}"
  >
  <el-select 
  	v-model="ruleForm.dataList[index].reason" 
  >
  	<!-- ... -->
  </el-select>
  </el-form-item>
  <el-form-item 
  	label="免考科目"
  	:prop="'dataList.' + index + '.reason'"
  	:rules="{required: true, message: '请选择免考原因', trigger: 'change'}"
  >
  	<!-- ... -->
  </el-form-item>
  </div>
</el-form>

<script>
export default{
	data(){
		return {
			ruleForm: {
        dataList: [
          {
            reason: '',
            subjectList: [],
            subjectValue: []
          }
        ]
			},
		}
	}
}
</script>
```

#### el-switch

##### 标准`el-switch`

```
//默认以左边为关闭，右侧为打开
<el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>

<script>
  export default {
    data() {
      return {
        value: true
      }
    }
  };
</script>
```

##### 赋值

```vue
v-model="value" //为el-switch绑定值，当切换时，值也会相应变化
```

##### 修改开关背景颜色

```vue
active-color="#13ce66" //打开时的背景色
inactive-color="#ff4949" //关闭时的背景色
```

##### 设置开关左右的文本描述

```vue
active-text="否"  //打开时的文字描述
inactive-text="是" //关闭时的文字描述

#关于文本样式默认为蓝色，暂时还未遇到要修改颜色需求，以后添加
```

##### 禁用开关

```vue
disabled  //true为禁用
```

##### 绑定事件

`@change`

```
<el-switch
  v-model="value"
  @change="handelChange"
>
</el-switch>

<script>
  export default {
    data() {
      return {
        value: true
      }
    },
    methods:{
      handelChange(val){
          console.log(val) //val 为改变后的状态值
      }  
    }
  };
</script>
```

#### `el-table`

##### 显示索引号

```
<el-table-column
	type="index" // type 为 index 即可
	width="50"
	label="序号" // 如果表头需要展示文字
>
```

##### 超出隐藏并 hover 提示

```
// 在 item 中使用
<el-table-column
	:show-overflow-tooltip="true || false"   // true 是生效 false 不生效
>
</el-table-column>
```

##### 默认选中节点

单选框默认选中

```
row // 需要渲染中数组的对象，自己拼的不能用
this.$refs['singleTable'].setCurrentRow(row, true)
```

多选框默认选中

```
// 需要渲染中数组的对象，自己拼的不能用
this.$refs['multipleTable'].toggleRowSelection(row, true)
```

##### 清除选中

```
this.$refs['singleTable'].clearSelection();
```

##### 翻页选中

`<el-table>`默认切换到下一页时不保留选中的数据，使用 `row-key` 和 `reserve-selection`可以保留

```
<el-table row-key="id">
  <el-table-column 
  	type="selection" 
  	reserve-selection
  >
  </el-table-column>
</el-table>
```

注意事项：

`row-key` 中可以使用 `String`  或者 `Function` 传参

错误用法 一

```
// 使用 string 时 使用 :row-key="id"  // 这个不生效的
```

错误用法 二

```
// row-key   需要绑定数据的唯一值，不然不生效
```

错误用法 三

```
使用 function 语法时， reserve-selection 要绑定在 type="selection" 的列中
```

##### 常见问题

1）遍历 `<el-table>`情况下，删除中间某个数组值，底部选中的数据会被清空

```
demo/关于elementui/el-table/02-处理遍历表格的删除
```

2）多列排序

```
demo/关于elementui/el-table/03-多列排序
```

3）设置某行不能选择

```
// 使用 Table-column 的 selectable 属性

// tempalete
<el-table>
	<el-table-column 
		type="selection"
    :selectable="checkSelect"
  >
  </el-table-column>
</el-table>

// methods
checkSelect(row, index) {
	return row.id ? true : false;  // true 可选 false 不可选
},

Demo:
demo/关于elementui/el-table/01-设置某行不能选择.html
```

4）单选表格

示例：

![](element-ui.assets/image-20210618160611077.png)

```
demo/关于elementui/el-table/04-单选表格
```

5）解决布局错乱

原因： 使用动态布局或使用 fixed 定位造成以下问题

![image-20210622173304014](element-ui.assets/image-20210622173304014.png)

解决： 重新计算布局

```js
this.$nextTick(() =>{
	this.$refs.dataTable.doLayout() // el-table 标签上的 ref 属性
})
```

案例代码

```vue
// 因为我是在 el-select 改变时改变布局，则
<el-select 
	v-model="custom" 
	@change="handleTableColumn"
>
	...
</el-select>

methods: {
	handleTableColumn(){
		this.$nextTick(() =>{
			this.$refs.dataTable.doLayout()
		})
	},
}
```

6）校验表格中必填项

```
demo/关于elementui/el-table/05-校验表格中必填项
```

#### `el-tree`

##### 标准可选择树形节点

```
<el-tree
  :data="dataList"
  show-checkbox
  node-key="deptId"
  :check-strictly="true"
  ref="tree"
  highlight-current
  :props="defaultProps"
  >
</el-tree>

<script>
export deafult {
	data (){
	 return {
	 
	 }
	}
}
</script>
```

#### `el-dialog`

##### 插入弹窗到 `body`中

当存在定位是，遮罩层会悬浮在弹窗之上

```
//使用el-dialog以下属性
	//遮罩层默认插入至Dialog的父元素上，设置modal-append-to-body，将插入到body中
<el-dialog
    :modal-append-to-body="false"
>
</el-dialog>
```

#### `el-upload`

```

```

#### 时间日期选择器

##### `DatePicker`

```
format // 指定输入框的格式，这个为选择后值展示的格式

value-format  // 指定值得格式，获取值的格式时候用这个参数
```

##### 当天之前日期不能选

！！！此方法有个bug未完全解决: 当选择时间时，会出现可以选超过的时间

解决：在@change里面进行校验

```
<el-date-picker             
   v-model="time"
   type="datetime" //选择器类型
   placeholder="选择结束时间" //选择器提示
   value-format="yyyy-MM-dd HH:mm:ss" //日期格式
   :picker-options="pickerOptions()"
></el-date-picker>
```

```
data() {
  return {
    pickerOptions: {
      disabledDate(time) {//此处会执行展示得日期，筛选之后得日期值， time为日期值
        return time.getTime() < new Date().getTime() - 86400000; //86400000为24小时的秒数
      },
    },
  }
},

methods:{
  pickerOptions(){
    const _this = this
    return {
      disabledDate(time){
        if (_this.info.startTime) {
          return new Date(_this.info.startTime).getTime() < time.getTime()
        }
      }
    }
  }, 
}

```



### 问题集合

#### `refs`

使用`this.$refs.xxx`调用弹窗时，有时候`dom`未被识别，可使用

```
this.$set(this.ruleForm, 'major', arr)
```

#### 直接引用`element-ui`

##### 通过 `cdn` 引入

在页面上引入 以下两个文件夹即可使用

```
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">

<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```
