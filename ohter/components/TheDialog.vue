<template>
	<div>
		<el-dialog
			class="dialog-form c-m-live-room-form"
			:title="title"
			:visible.sync="dialogShow"
			:lock-scroll="false"
			:close-on-click-modal="false"
			@closed="close"
			:destroy-on-close="true"
			:width="width">
			<slot></slot>
			<div slot="footer" class="dialog-footer">
				<!--此处只能使用 dialogShow = false , 若使用close方法，会执行两次关闭方法-->
				<el-button @click="dialogShow = false">{{cancel}}</el-button>
				<el-button type="primary" @click="exportData">{{sure}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>

	export default {
		name: 'TheDialog',
		props: {
			title: { //设置标题
				type: String,
				default: '设置'
			},
			width: { //弹窗宽度
				type: String,
				default: '1000px'
			},
			cancel: { //取消按钮名称
				type: String,
				default: '取 消'
			},
			sure: { //确定按钮名称
				type: String,
				default: '确 定'
			},
			showData: { //是否展示弹窗
				type: Boolean,
				default: false
			},
			isReset: {
				type: Boolean,
				default: false
			}
		},
		data(){
			return{
				dialogShow: false,
			}
		},

		created() {

		},

		mounted() {

		},

		methods:{
			close(){
				if(this.isReset){
					this.$emit('reset', false);
				}else{
					this.$emit('update:showData', false);
				}
			},
			exportData(){
				this.$emit('submit', false)
			}
		},

		watch:{
			showData:{
				handler(newValue){
					this.dialogShow = newValue;
				},
				immediate: true
			}
		}
	};
</script>

<style scoped>

</style>
