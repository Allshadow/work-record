#### 自定义步骤条

```
//v-if可以判断是否需要此图标
<el-steps>
  <el-step title="xxx">
        <i :class="icon" slot="icon" v-if="active == 0"></i>
  </el-step>
</el-steps>
```

#### 竖直步骤条不居中解决

```
<!--在el-step 加上 text-align: center-->
<el-steps direction="vertical" :active="active">
  <el-step title="等待开标" style="text-align: center"></el-step>
  <el-step title="公布投标人" style="text-align: center"></el-step>
</el-steps>
```

#### 文字跟图标不对称

```
//因为有默认的margin-top: 20
.el-step__title{
  margin-top: 0;
}
```

