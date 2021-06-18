### 实现单选操作

#### 示例

![image-20210618160611077](el-table.assets/image-20210618160611077.png)

#### 实现

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

#### demo

```
./demo/el-table/select 
```

### 校验表格中必填项

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

### 默认选中

#### 单选框默认选中

```
this.$refs['singleTable'].setCurrentRow(row, true)
```

#### 多选框默认选中

```
this.$refs['multipleTable'].toggleRowSelection(row, true)
```

