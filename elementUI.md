# 一、时间选择

## 1、时间日期选择器

### 1）当天之前日期不能选

！！！此方法有个bug未完全解决:
	当选择时间时，会出现可以选超过的时间

解决：在@change里面进行校验

```vue
<el-date-picker             
   v-model="time"
   type="datetime" //选择器类型
   placeholder="选择结束时间" //选择器提示
   value-format="yyyy-MM-dd HH:mm:ss" //日期格式
   :picker-options="pickerOptions()"
></el-date-picker>
```

```js
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

# 二、Select选择器

## 1）知识总结

v-model 得值为当前选中得 el-option得value 属性值

## 2）基本结构

```vue
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
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
  }
</script>
```

### 4）关于select默认值

```vue
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
        value: '选项2' //填入value的值会自动展示label
      }
    }
  }
</script>
```

## 3）关于@change传参得方式

```vue
// 这种方法据说会改变 this 指向
<el-input-number 
@change="(value) => numberChange(value, scope.row)" />

// 使用$event
<el-input-number 
@change="numberChange($event,scope.row,scope.$index)" />
```

# 三、Form表单

## 1）校验单个项目名称

```js
//formName <el-form>上得 ref值
//prop <el-form-item>上得prop校验值, prop 为 string
this.$refs[formName].validateField(prop, getError => { //验证手机号码是否正确
  if (!getError) {//如果正确得话，执行里面得代码
    
  } else {
    return false;
  }
});
```

