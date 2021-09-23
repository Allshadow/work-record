### 微信浏览器

#### 视频跳转到某个位置

```
player.currentTime()
```

##### `player.currentTime()` 未生效

使用 `currentTime()` 在 `ios` 上 不能使用，安卓端有时能用有时不能使用

```
//添加视频准备完成后的回调函数
player.on('loadedmetadata', function() {
	player.play();  //自动播放
	player.currentTime(100); //跳转
});
```

