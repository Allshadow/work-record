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

##### 图文排列不居中

```
// 因为图片是行级块元素，默认对齐方式是 base-line
// 设置 img 样式 
img{
	vertical-align: middle;
}
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

