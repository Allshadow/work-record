<template>
	<div class="the-setting-form">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
			<el-form-item label="推流地址" prop="pushDomain">
				<el-input v-model="ruleForm.pushDomain"></el-input>
			</el-form-item>
			<el-form-item label="播流地址" prop="playDomain">
				<el-input v-model="ruleForm.playDomain"></el-input>
			</el-form-item>
			<el-form-item label="直播KEY" prop="authKey">
				<el-input v-model="ruleForm.authKey"></el-input>
			</el-form-item>
			<el-form-item label="直播APP" prop="appName">
				<el-input v-model="ruleForm.appName"></el-input>
			</el-form-item>
			<el-form-item label="截图地址" prop="imageUrl">
				<el-input v-model="ruleForm.imageUrl"></el-input>
			</el-form-item>
			<el-form-item label="点播地址" prop="playUrl">
				<el-input v-model="ruleForm.playUrl"></el-input>
			</el-form-item>
			<el-form-item label="人工智能地址" prop="aiUrl">
				<el-input v-model="ruleForm.aiUrl"></el-input>
			</el-form-item>
			<el-form-item label="业务地址" prop="serviceUrl">
				<el-input v-model="ruleForm.serviceUrl"></el-input>
			</el-form-item>
			<el-form-item label="人脸识别地址" prop="faceUrl">
				<el-input v-model="ruleForm.faceUrl"></el-input>
			</el-form-item>
			<el-form-item label="人脸识别查询地址" prop="faceCheckUrl">
				<el-input v-model="ruleForm.faceCheckUrl"></el-input>
			</el-form-item>
			<el-form-item label="心跳地址" prop="checkUrl">
				<el-input v-model="ruleForm.checkUrl"></el-input>
			</el-form-item>
			<el-form-item label="退出密码" prop="exitPsw">
				<el-input v-model="ruleForm.exitPsw"></el-input>
			</el-form-item>
			<el-form-item label="是否锁屏" prop="locked">
				<el-select v-model="ruleForm.locked" placeholder="请选择是否锁屏">
					<el-option label="是" :value="0"></el-option>
					<el-option label="否" :value="1"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>

	export default {
		name: 'TheSettingForm',
		props: {
			dataList:{
				type: Object,
				default: ()=> {}
			}
		},
		data(){
			return{
				ruleForm: {
					pushDomain: '',
					playDomain: '',
					authKey: '',
					appName: '',
					imageUrl: '',
					playUrl: '',
					aiUrl: '',
					serviceUrl: '',
					faceUrl: '',
					faceCheckUrl: '',
					checkUrl: '',
					exitPsw:'',
					locked: '',
				},
				rules: {
					pushDomain: [
						{ required: true, message: '请输入推流地址', trigger: 'blur' }
					],
					playDomain: [
						{ required: true, message: '请输入播流地址', trigger: 'blur' }
					],
					authKey: [
						{ required: true, message: '请输入直播KEY', trigger: 'blur' }
					],
					appName: [
						{ required: true, message: '请输入直播APP', trigger: 'blur' }
					],
					imageUrl: [
						{ required: true, message: '请输入截图地址', trigger: 'blur' }
					],
					playUrl: [
						{ required: true, message: '请输入点播地址', trigger: 'blur' }
					],
					aiUrl: [
						{ required: true, message: '请输入人工智能地址', trigger: 'blur' }
					],
					serviceUrl: [
						{ required: true, message: '请输入业务地址', trigger: 'blur' }
					],
					faceUrl: [
						{ required: true, message: '请输入人脸识别地址', trigger: 'blur' }
					],
					faceCheckUrl: [
						{ required: true, message: '请输入人脸识别查询地址', trigger: 'blur' }
					],
					checkUrl: [
						{ required: true, message: '请输入心跳地址', trigger: 'blur' }
					],
					exitPsw: [
						{ required: true, message: '请输入退出密码', trigger: 'blur' }
					],
					locked: [
						{ required: true, message: '请选择是否锁屏', trigger: 'change' }
					]
				}
			}
		},

		created() {

		},

		mounted() {

		},

		methods:{
			// submitForm() {
			// 	this.$refs['ruleForm'].validate((valid) => {
			// 		if (valid) {
			// 			// this.$attrs.isEditSetting = false;
			// 			this.$emit('submitClose', this.ruleForm)
			// 		} else {
			// 			console.log('error submit!!');
			// 			return false;
			// 		}
			// 	});
			// },
			resetForm() {
				this.$refs['ruleForm'].resetFields();
			}
		},

		watch:{
			dataList: {
				handler(newValue){
					this.ruleForm = {...newValue};
				},
				immediate: true,
				deep: true
			}
		}
	};
</script>
