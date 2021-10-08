#### 分页多选

使用 `row-key` 和 `reserve-selection`

```
<el-table row-key="id">
  <el-table-column 
  	type="selection" 
  	reserve-selection
  >
  </el-table-column>
</el-table>
```

##### 常见问题

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

#### 布局错乱

1）原因： 使用动态布局或使用 fixed 定位造成以下问题

![image-20210622173304014](el-table.assets/image-20210622173304014.png)

2）解决： 重新计算布局

```js
this.$nextTick(() =>{
	this.$refs.dataTable.doLayout() // el-table 标签上的 ref 属性
})
```

3）案例代码

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

#### 实现单选操作

1）示例

![image-20210618160611077](el-table.assets/image-20210618160611077.png)

2）实现

```
<template>
<el-table
	ref="multipleTable"
	:data="tableData"
>
	<el-table-column label="选择" width="100">
		<template slot-scope="scope">
			<el-radio 
				v-model="radio" 
				:label="scope.row.name"
				@change.native="handleSelectRow(scope.row, scope.$index)"
			></el-radio>
		</template>
	</el-table-column>
	<el-table-column
		label="日期"
		width="120"
	>
		<template slot-scope="scope">{{ scope.row.date }}</template>
	</el-table-column>
</el-table>
</template>

<script>
export default {
data() {
	return {
		tableData: [
			{
				date: '2016-05-03',
				name: '1',
			}, 
			{
				date: '2016-05-02',
				name: '2',
			}, 
			{
				date: '2016-05-04',
				name: '3',
			}, 
			{
				date: '2016-05-01',
				name: '4',
			}
		],
		radio: ''
	}
},
methods: {
	// 获取选中行
	handleSelectRow(row, index){
		console.log('row', row)
		console.log('index', index)
	}
}
}
</script>
```

3）demo

```
./demo/el-table/select 
```

#### 校验表格中必填项

```
<template>
<el-form 
	:model="inServForm" 
	ref="inServForm"  
	:rules="rules" 
>
	<el-table 
		ref="infiledList" 
		:data="inServForm.infiledList"  // 这个必须要
	>
		<el-table-column 
			prop="matnrid"  
			label="物料编码"  
		>
			<template scope="scope">
				<el-form-item 
					:prop="'infiledList.'+scope.$index+'.matnrid'" 				
					:rules="rules.matnrid"
				>
					<el-input v-model="scope.row.matnrid"></el-input>
				</el-form-item>
			</template>
		</el-table-column>
	</el-table>
</el-form>
</template>

<script>
export default {
	return {
		inServForm: {
			infiledList:[],
		},
		rules: {
			matnrid:[
				{ required: true, message: "物料编码不能为空", trigger: "blur" }
			],
		}
	}
}
</script>
```

#### 默认选中

1）单选框默认选中

```
this.$refs['singleTable'].setCurrentRow(row, true)
```

2）多选框默认选中

```
this.$refs['multipleTable'].toggleRowSelection(row, true)
```

#### 清除选中

```
this.$refs['singleTable'].clearSelection();
```

#### 多选排序

1）例子

```
./demo/el-table/multOrder
```