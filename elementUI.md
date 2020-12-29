### web 项目直接引用 element-ui

#### 通过 cdn 引入

在页面上引入 以下两个文件夹即可使用

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">

<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```



# el-switch

## (1) 基本结构

```vue
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

## (2) 相关需求

- 赋值

  ```vue
  v-model="value" //为el-switch绑定值，当切换时，值也会相应变化
  ```

- 修改开关背景颜色

  ```vue
  active-color="#13ce66" //打开时的背景色
  inactive-color="#ff4949" //关闭时的背景色
  ```

- 设置开关左右的文本描述

  ```vue
  active-text="否"  //打开时的文字描述
  inactive-text="是" //关闭时的文字描述
  
  #关于文本样式默认为蓝色，暂时还未遇到要修改颜色需求，以后添加
  ```

- 禁用开关

  ```vue
  disabled  //true为禁用
  ```

- change事件

  ```vue
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

## (3) 具体需求

- 表格中实现el-switch改值,并提示问题，且状态成功了进行切换

  ```vue
  demo 请看个人网站，目前还未编写
  ```

# el-dialog

## (1) 问题解决记录

- 当存在定位是，遮罩层会悬浮在弹窗之上

  ```vue
  //使用el-dialog以下属性
  	//遮罩层默认插入至Dialog的父元素上，设置modal-append-to-body，将插入到body中
  <el-dialog
      :modal-append-to-body="false"
  >
  </el-dialog>
  ```

# 需求：

## #表格中显示单选按钮,并切换



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
