#### 移除表单校验结果

同一个输入框的有时候需要校验，有时候不需要校验。

然而校验后会出现表单未填提示，需要清除

```
this.$refs[formName].clearValidate(['name']);

// formName 是 <el-form> 上的 ref 属性
// clearValidate 可以是字符串，可以是数组
```

#### 校验单个项目

有时候只需要校验一单个项目是否已经填写

```
this.$refs[formName].validateField(prop, getError => { //验证手机号码是否正确
  if (!getError) {//如果正确得话，执行里面得代码
    
  } else {
    return false;
  }
});

// formName <el-form>上得 ref值
// prop <el-form-item>上得prop校验值, prop 为 string, 也可以为数组（但数组没测试过）
```

#### 存在两个需要校验时间的解决方法

```
//第一个校验
<el-form-item label="招标文件的时间期限" prop="getBidFileStartTime"> 
  <el-row>
    <el-col :span="11">
      <div style="padding: 0">
        <el-date-picker
          :disabled="noticeGetFileForm.getBidFileStartTimeDisabled"
          v-model="noticeGetFileForm.getBidFileStartTime"
          type="datetime"
          placeholder="选择起始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </div>
    </el-col>
    <el-col :span="2">
      <div style="padding: 0 4px">至</div>
    </el-col>
    <el-col :span="11">
      <div style="padding: 0">
        <el-form-item prop="getBidFileEndTime">  //插入一个el-form-item
          <el-date-picker
            :disabled="noticeGetFileForm.getBidFileEndTimeDisabled"
            v-model="noticeGetFileForm.getBidFileEndTime"
            type="datetime"
            placeholder="选择结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
      </div>
    </el-col>
  </el-row>
</el-form-item>
```

#### 判断开始时间不大于结束时间

```
<el-form-item prop="starttime">
    <el-date-picker
      v-model="temp.starttime"
      type="date"
      :picker-options="starttime"
      value-format="yyyy-MM-dd"
      placeholder="开始时间"
    />
</el-form-item>
  <el-form-item prop="endTime">
    <el-date-picker
      v-model="temp.endTime"
      type="date"
      :picker-options="endTime"
      value-format="yyyy-MM-dd"
      placeholder="结束时间"
    />
</el-form-item>

return{
// 开始时间
      starttime: {
        disabledDate: time => {
          if (this.temp.endtime) {
            return (
              time.getTime() > new Date(this.temp.endtime).getTime()
            )
          } else {
            // 不能大于当前日期
            return time.getTime() > Date.now()
          }
        }
      },
      // 结束时间
      endTime: {
        disabledDate: time => {
          if (this.temp.starttime) {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < new Date(this.temp.starttime).getTime() - 8.64e7 // 加- 8.64e7则表示包当天
            )
          } else {
            return time.getTime() < Date.now()
          }
        }
      },
}
```

