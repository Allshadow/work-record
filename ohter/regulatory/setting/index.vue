<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<el-row>
				<el-col :span="12">
					<div class="panel-title">
						<i class="iconfont icon-classify2"></i>
						<span class="txt">监管配置</span>
					</div>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-button type="primary" @click="toConfig">监管配置设置</el-button>
				</el-col>
			</el-row>
			<div class="wrap-content">
				<div v-for="(item, index) in infoMap" :key="index" class="content-list">
					<span class="text-name">{{item.key}}：</span>
					<template>
						<span class="text-value" v-if="item.isFormat">{{item.value == 0? '是' : '否'}}</span>
						<span class="text-value" v-else>{{item.value}}</span>
					</template>
				</div>
			</div>
		</div>
		<the-dialog
			title="监管配置设置"
			:show-data.sync="isEditSetting"
			:isReset="true"
			@reset="resetForm"
			@submit="submit"
		>
			<the-setting-form
				:data-list="dataObj"
				ref="editForm"
				:key="Math.random()"
			/>
		</the-dialog>
	</div>
</template>
<script>
	const CODE = 'res_manage_regulatory_setting';

	import TheDialog from '../components/TheDialog';
	import TheSettingForm from '../components/TheSettingForm';


	export default {
		code: CODE,
		data() {
			return {
				pageTitle: '监管配置',
				isEditSetting: false,
				textConfig: [
					{
						name: '推流地址',
						value: 'pushDomain'
					},
					{
						name: '播流地址',
						value: 'playDomain'
					},
					{
						name: '直播KEY',
						value: 'authKey'
					},
					{
						name: '直播APP',
						value: 'appName'
					},
					{
						name: '截图地址',
						value: 'imageUrl'
					},
					{
						name: '点播地址',
						value: 'playUrl'
					},
					{
						name: '人工智能地址',
						value: 'aiUrl'
					},
					{
						name: '业务地址',
						value: 'serviceUrl'
					},
					{
						name: '人脸识别地址',
						value: 'faceUrl'
					},
					{
						name: '人脸识别查询地址',
						value: 'faceCheckUrl'
					}, {
						name: '心跳地址',
						value: 'checkUrl'
					},
					{
						name: '退出密码',
						value: 'exitPsw'
					},
					{
						name: '是否锁屏',
						value: 'locked'
					}
				],
				dataObj: {},
				infoMap: []
			};
		},
		components: {
			TheDialog,
			TheSettingForm
		},
		created() {
			this.getList();
		},

		mounted() {
		},
		methods: {
			//获取数据
			async getList() {
				const res = await this.$api(this.$cfg.API.regulatory.getConfig);
				if (res) {
					this.infoMap = [];
					this.dataObj = res.result;
					this.textConfig.forEach(ele => {
						for (const key in this.dataObj) {
							if (key == ele.value) {
								if (ele.value == 'locked') {
									this.infoMap.push({ key: ele.name, value: this.dataObj[key], isFormat: true });
								} else {
									this.infoMap.push({ key: ele.name, value: this.dataObj[key] });
								}


							}
						}
					});
				}
			},

			//提交数据接口
			async submitClose(val) {
				const res = await this.$api(this.$cfg.API.regulatory.addOrUpdate, val);
				this.isEditSetting = false;
				this.$message({
					message: '操作成功',
					type: 'success'
				});
				this.getList();
			},

			//提交表单
			submit() {
				this.$refs.editForm.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						const val = this.$refs.editForm.ruleForm;
						this.submitClose(val);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
				// console.log('refs', this.$refs.editForm.$refs);
			},

			//重置表单
			resetForm() {
				this.$refs.editForm.resetForm();
				this.isEditSetting = false;
			},

			//监管配置设置按钮
			toConfig() {
				this.isEditSetting = true;
			}
		},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.wrap-content {
		padding: 20px;

		.content-list {
			margin-bottom: 10px;

			.text-name {
				display: inline-block;
				text-align: right;
				width: 200px;
				margin-right: 20px;
				/*font-weight: bold;*/
				color: #222;
			}
		}
	}
</style>

<style lang="scss">
	@import 'mixin';

	.c-m-order-list {
		.list-content {
			margin-top: 40px;
		}

		.pagination {
			text-align: right;
			padding-top: 30px;
		}

		.primary {
			color: #20a0ff;
			margin-right: 10px;
		}
	}
</style>



