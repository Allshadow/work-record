### 整体

#### 根据窗口改变自适应

```
setTimeout(function (){
  window.onresize = function () {
    subjectChart.resize();
  }
},200)
```

#### x轴未从起始点开始

配置 `xAxis` 的` boundayGap` 值

```js
xAxis: {
	boundaryGap: false,
},
```

### 散点图

#### `x`轴

##### 设置`x`轴标题在底部

```
xAxis: {
	name: this.xName,
	nameLocation: 'center'
},
```

##### 标题与轴线的距离

```
 xAxis: {
 	nameGap: 30 
 }
```

#### `y`轴

##### 设置`y`轴标题在左侧

```
yAxis: {
	name: this.yName,
	nameLocation: 'center'
}
```

##### 标题与轴线的距离

```
 yAxis: {
 	nameGap: 30 
 }
```

#### `x,y`轴通用

##### 设置网格线样式

```
xAxis/yAxis: {
  splitLine: { // 网格线配置
    show: true, // 显示或隐藏网格线
    lineStyle:{ // 网格线样式
      color: ['#315070'],
      width: 1,
      type: 'solid'
    }
  }
}
```

