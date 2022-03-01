#### Dialog 弹出框

##### 点击确认不默认关闭

在组件调用时候，使用 @confirm 会默认关闭弹窗

```
// 使用 :beforeClose="xxx"

<van-dialog 
	@confirm="handleConfirm"
	:beforeClose="beforeClose"
>
</van-dialog>

methods:{
	beforeClose(action, done){
    if(action === 'confirm'){
      return done(false)
    }else{
      return done();
    }
  }
}

```

