### 布局

#### `flex`

```
// flex 是由 flex-grow flex-shrink flex-basis 缩写
flex: 1; // flex: 1 1 auto;
```

### 属性

#### `background`

根据容器的宽度自适应背景图

```
../demo/css/background/01_根据宽度自适应.html
```



#### 水平居中

##### `text-align`

块级元素

```
// 1. 块级元素的文本居中
<div class="main">我会居中</div>

.main{
	text-align: center;
}

// 2. 块级元素的子元素为行级块元素或者行内元素时



// inline-block
<span class="main"></span>

.main{
	/** span 是 inline */
	display: inline-block; 
	text-align: center;
	/** 需要加上宽度才看的明显 */
	width: 100px; 
}
```

##### `margin`

```
// 定宽元素

```



#### @font-face

##### 简介

@font-face 是 css3 中允许使用自定义字体的一个模块

##### 字体格式

- TureTpe( .ttf ) 格式

  .ttf 格式字体是 windows 和 Mac 最常见的字体 , 支持此字体的浏览器 [IE9 +, Firefox3.5+, Chrome4+, Safari3+, Opera10+, IOS Mobile Safari4.2+]

- OpenType(.otf) 格式

  .otf 字体被认为是一种原始的字体格式，支持此字体格式的浏览器有 [Firefox3.5+, Chrome4.0+, Safari3.1+, Opera10.0+, iOS Mobile Safari4.2+]

- Web Open Font Format(.woff) 格式

  支持此字体格式的浏览器 [IE9+, Firefox3.5+, Chrome6+, Safari3.6+, Opera11.1+]

- Embedded Open Type(.eot)格式

  .eot 是 ie 专用字体，支持这种字体的有 [IE4+]

- SVG(.svg) 格式

  [Chrome4+, Safari3.1+, Opera10.0+, iOS Mobile Safari3.2+]

##### 兼容性写法

@font-face 中我们至少需要 .woff .eot 两种格式字体，甚至还需要 .svg 等字体达到更多浏览器版本的支持

```
@font-face {
	font-family: 'YourWebFontName';
	src: url('YourWebFontName.eot'); /* IE9 Compat Modes */
	src: url('YourWebFontName.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('YourWebFontName.woff') format('woff'), /* Modern Browsers */
         url('YourWebFontName.ttf')  format('truetype'), /* Safari, Android, iOS */
         url('YourWebFontName.svg#YourWebFontName') format('svg'); /* Legacy iOS */
    font-weight: normal;
  	font-style: normal;
}
```

##### 页面中使用

```
font-family:  'YourWebFontName'
```







#### 常见问题

##### `marin`

```
margin： 0 auto; // 需要设置width
```

##### 图文排列不居中

```
// 因为图片是行级块元素，默认对齐方式是 base-line
// 设置 img 样式 
img{
	vertical-align: middle;
}
```

##### 超出文本打点

1）单行文本超出打点

```css
.ellipsis{ 
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap
}
```

2）多行文本超出打点

```css
.ellipsis-2{ 
  margin-top: .15rem; 
  display: -webkit-box; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  word-wrap: break-word; 
  word-break: break-all; 
  white-space: normal !important; 
  -webkit-line-clamp: 2; /*修改此处为行数即可*/
  -webkit-box-orient: vertical;
}
```

##### 单行文本居右，多行文本居左

```html
//详细样式查看html文件夹下，202005141056.html
<div>
  <p>只有一行时居中显示文字</p>
</div>
<div>
  <p>只有一行时居中显示文字，多行居左显示多行居左显示</p>
</div>

<style>
  div{
    text-align: center;
    width: 400px;
    height: 400px;
    background: #ddd;
    margin: 30px auto;
    font-size: 20px;
  }

  p{
    display: inline-block;
    text-align: left;
  }
</style>
```

##### 文本两端对齐

```css
// html
<div>姓名</div>
<div>手机号码</div>
<div>账号</div>
<div>密码</div>

// css
div {
  margin: 10px 0; 
  width: 100px;
  border: 1px solid red;
  text-align: justify;
  text-align-last:justify
}
div:after{
  content: '';
  display: inline-block;
  width: 100%;
}
```

##### 清除浮动

```
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear:both;
  visibility: hidden;
}
.clearfix{
	*zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
```

##### 元素水平居中

1）块元素水平居中

```
//需设置宽度才能生效
//根据规范margin-top: auto; 和margin-bottom: auto;  其计算值为0
margin : auto;    
margin : 0 auto;
```

2）图片水平居中

```
img{
  display: block;
  margin: 0 auto;
}
```

##### 表单

```
outline:0px;
```

1）修改input框的文字样式

```
//通过伪元素来修改
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color: red;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: red;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: red;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: red;
}
```

##### 画半圆

```
.left-round{
	// 根据哪个半圆定义长宽
	width: 14rpx;
	height: 28rpx;
	background: #F4F5F9;
	// 根据圆角修改 border-radius
	border-radius: 0 28rpx 28rpx 0;
}
```



##### 样式穿透

```
// 1、在stylus 中使用
>>>.el-dialog .el-dialog__body{
  padding 0;
  text-align center;
  border-radius 0 0 4px 4px;
}

//2、在less和sass中使用
/deep/.el-dialog .el-dialog__body{
  padding 0;
  text-align center;
  border-radius 0 0 4px 4px;
}

//3、vue 中样式使用
::v-deep .el-dialog{}

// vue3中使用
:deep(.el-dialog){}
```

#### 样式初始化

##### reset.css

```css
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
  text-decoration: none;
}
```

