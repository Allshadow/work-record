#### el-select 分页加载

##### 需求分析

当后端返回的筛选数据过多的时候一下子加载会使滚动下拉卡顿，所以将 `el-select` 分页加载。

##### 基本代码

**模板语法**

```
<template>
  <el-select 
    filterable 
    clearable 
    placeholder="请选择按钮搜索" 
    v-model="filter.showId" 
    @change="filterChange"
    v-selectscroll="handleScroll" // 这个是自定义指令，监听滚动高度的
  >
    <el-option 
      v-for="item in btnList" 
      :key="item.id" 
      :label="item.showName" 
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>
```

 **js 写法**

```
<script>
	import Selectscroll from '@/directive/selectscroll' // 自定义指令我专门放一个目录下

	export default {
		directives:{ // 引入自定指令
    	Selectscroll
    },
    data(){
    	retrun {
      	btnList: [],
      	project:{ // 定义需要用到的变量
      		pageNum: 1,
      		pageSize: 10
      	},
      	btnMount:{}
    	}
    },
  }
</script>
```

我将方法单独放置

```
method: {
  handleScroll(param){
    const updateData = (arr, total) =>{ // 判断是否已经请求完成
    	if(arr.length >= total){
    		if(arr.length >= total){
          return false
        }else{
          return true
        }
    	}
    }
    
    if(param){
      // 请求下一页数据
      let flag = updateData(this.btnList, this.btnMount.total)
      if(flag){
        this.project.pageNum ++
        this.getBtnList()
      }
    }
  }，
  
	async getBtnList(){
    try{
      let data = {
      	pageNum: this.project.pageNum,
      	pageSize: this.project.pageSize
      }
      let res = await this.$api(this.$cfg.API.regulate.showTypeList, data)

      if(item){
        this.btnList = []
        this.btnList = res.result.records
      }else{
      	this.btnList = this.btnList.concat(res.result.records)
      }
      	this.btnMount = res.result
      }catch(e){
      	console.log(e.message) // 异常处理
      }				
	}
}
```

##### demo



