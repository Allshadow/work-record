# 一、时间选择

## 1、时间日期选择器当天之前日期不能选

```vue
<el-date-picker             
   v-model="time"
   type="datetime" //选择器类型
   placeholder="选择结束时间" //选择器提示
   value-format="yyyy-MM-dd HH:mm:ss" //日期格式
   :picker-options="pickerOptions"
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
}
```

