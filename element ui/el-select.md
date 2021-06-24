#### @change传参方式

```vue
// 这种方法据说会改变 this 指向
<el-input-number 
@change="(value) => numberChange(value, scope.row)" />

// 使用$event
<el-input-number 
@change="numberChange($event,scope.row,scope.$index)" />
```

#### 修改右侧图标

```scss
::v-deep i.el-select__caret {
  /*很关键：将默认的select选择框样式清除*/
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
  /*自定义图片*/  
  background: url('~@/assets/audit/img/xiala.png') no-repeat scroll center center transparent;
  /*自定义图片的大小*/  
  background-size: 7px 6px;
  /*图片的角度*/  
  transform: rotateZ(0deg)!important;
}
/*将小箭头的样式去去掉*/ 
::v-deep .el-icon-arrow-up:before {
    content: '';
}
```

#### el-select 设置默认值

v-model 得值为当前选中得 el-option得value 属性值

```
<template>
<el-select v-model="value" placeholder="请选择">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
</el-select>
</template>

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
        value: ''     //带默认值得下拉列表 value: '我是默认值' 
      }
    }
  }
</script>
```

#### 通过遍历的 el-select

```
<div v-for="(item, index) in dataList">
<el-select v-model="selectData[index]" placeholder="请选择包计价方式" >
    <el-option 
        v-for="list in options"
        :label="list.dictName"
        :key="list.dictValue"
        :value="list.dictValue"
    >
  	</el-option>
</el-select>
</div>

<script>
  export default {
    data() {
      return {
        selectData: {},
        options:[]
      }
    }
    methods:{
        getData(){
            ...请求回来的数据
            this.dataList.forEach((ele, index)=>{
              this.$set(this.selectData, index, ele.dictName); //设置默认值
           }
        }
    }
  }
</script>
```

### el-select 选项分页加载

https://juejin.cn/post/6844903710972182536

https://blog.csdn.net/qq_22227087/article/details/112233061

time.js         // 使用时间转化库