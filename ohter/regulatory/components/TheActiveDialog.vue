<template>
	<div class="the-active-dialog">
		<el-row :gutter="24">
			<el-col :span="12">
				<el-form :model="activeForm" :rules="activeRules" ref="activeForm" label-width="100px">
					<el-form-item label="活动名称" prop="name">
						<el-input v-model="activeForm.name"></el-input>
					</el-form-item>
					<el-form-item label="监管场所" prop="name" v-if="!this.id">
						<el-select v-model="activeForm.autoStatus" placeholder="请选择活动区域">
							<el-option label="自动排监管场所" :value="true"></el-option>
							<el-option label="自定义监管场所" :value="false"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="学员人数" prop="studentNum" v-if="activeForm.autoStatus && !this.id">
						<el-input v-model.number="activeForm.studentNum"></el-input>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :span="12">
				<el-form :model="ruleForm" ref="ruleForm" label-width="140px">
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
							<el-option label="是" value="0"></el-option>
							<el-option label="否" value="1"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import TheSettingForm from './TheSettingForm';

	export default {
		name: 'TheActiveDialog',
		props: {
			id:{
				default: '',
			}
		},

		components:{
			TheSettingForm
		},

		data(){
			return{
				activeForm: {
					name: '',
					autoStatus: '',
					studentNum: ''
				},
				activeRules: {
					name: [
						{ required: true, message: '请输入活动名称', trigger: 'blur'},
					],
					autoStatus: [
						{ required: true, message: '请选择监管场所', trigger: 'change'},
					],
					studentNum: [
						{ required: true, message: '请输入学员人数', trigger: 'blur'},
					]
				},

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
					exitPsw: '',
				}
			}
		},

		created() {
			if(this.id){
				this.getInfo();
			}
		},

		mounted() {

		},

		methods:{
			async getInfo(){
				const res = await this.$api(this.$cfg.API.regulatory.getActivityInfo, {'activeId': this.id});
				if(res){
					this.activeForm.name = res.result.name;
					this.activeForm.autoStatus = res.result.autoStatus;
					this.activeForm.studentNum = res.result.studentNum;
					this.ruleForm = {...res.result};
					delete this.ruleForm.name;
					delete this.ruleForm.autoStatus;
					delete this.ruleForm.studentNum;
				}
			}
		}
	};
</script>

<style scoped>

</style>
