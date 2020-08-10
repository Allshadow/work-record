<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<el-row>
				<el-col :span="12">
					<div class="panel-title">
						<i class="iconfont icon-classify2"></i>
						<span class="txt">场次管理——{{$route.query.title}}</span>
					</div>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-button @click="goBack">返回</el-button>
				</el-col>
			</el-row>
			<div class="list-content">
				<el-row :gutter="20" class="search-wrap">
					<el-col :span="12">
						<el-input clearable placeholder="搜索活动名称" v-model="filter.name" class="search" suffix-icon="iconfont icon-search"></el-input>
					</el-col>
					<el-col :span="12" style="text-align: right">
						<el-button type="primary" @click="isEditSetting = true">新增场次</el-button>
					</el-col>
				</el-row>
			</div>
			<base-table
				:data-list="dataList"
				:config="tableConfig"
				:total="total"
				@handleSizeChange="handleSizeChange"
				@handleCurrentChange="handleCurrentChange"
			>
				<el-table-column prop="productName" min-width="100" label="是否发布" header-align="center" align="center" slot="isPublish">
					<template slot-scope="scope">
						<el-switch
							v-model="isValue"
							active-color="#13ce66"
							inactive-color="#ff4949">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="productName" min-width="100" label="是否开启" header-align="center" align="center" slot="isOpen">
					<template slot-scope="scope">
						<el-switch
							v-model="isValue"
							active-color="#13ce66"
							inactive-color="#ff4949">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="productName" min-width="100" label="订单内容" header-align="center" align="center" slot="operation">
					<template slot-scope="scope">
						<span class="oper-edit">编辑</span>
						<span class="oper-del">删除</span>
						<span class="oper-del">结束</span>
					</template>
				</el-table-column>
			</base-table>
		</div>
		<the-dialog
			:title="headTitle"
			:show-data.sync="isEditSetting"
			:is-reset="true"
			@reset="resetForm('editForm')"
			@submit="submit('editForm')"
		>
			<el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
				<el-form-item label="场次名称" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="监管时长" prop="superviseLongTime">
					<el-input v-model="editForm.superviseLongTime"></el-input>
				</el-form-item>
				<el-form-item label="监管时间" prop="superviseTime">
					<el-date-picker
						v-model="editForm.superviseTime"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						format="yyyy-MM-dd HH:mm"
						value-format="yyyy-MM-dd HH:mm"
					>
					</el-date-picker>
				</el-form-item>
			</el-form>
		</the-dialog>
	</div>
</template>
<script>

	const CODE = 'res_manage_regulatory_manageCount';

	import TheDialog from '../components/TheDialog';
	import BaseTable from '../components/BaseTable';

export default {
	name: 'manageCount',
	code: CODE,
	data() {
		return {
			pageTitle: '场次管理',
			fatherData: {},
			pageNum: 1,
			pageSize: 10,
			total: 0,
			isValue: true,
			headTitle: '新增场次',
			editForm:{
				name: '',
				superviseLongTime: '',
				superviseTime: ''
			},
			rules:{
				name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' }
				],
				superviseLongTime: [
					{ required: true, message: '请输入监管时长', trigger: 'blur' }
				],
				superviseTime: [
					{ required: true, message: '请选择监管时间', trigger: 'change' }
				],
			},
			dataList: [],
			tableConfig:[
				{
					label: '场次ID',
					prop: 'sessionId',
				},
				{
					label: '场次名称',
					prop: 'name',
				},
				{
					label: '监管时长(分钟)',
					prop: 'superviseLongTime',
					width: '',
					minWidth: '',
				},
				{
					label: '监管时间',
					prop: 'count',
					width: '',
					minWidth: '',
				},
				{
					slot: 'status'
				},
				{
					slot: 'isPublish'
				},
				{
					slot: 'isOpen'
				},
				{
					slot: 'operation'
				}
			],
			isEditSetting: false,
			filter: {
				name: '',
			}
		};
	},
	components: {
		TheDialog,
		BaseTable
	},
	created() {
		this.fatherData = this.$route.query;
		this.getTableList();
	},
	methods: {
		//获取列表数据
		async getTableList(){
			try{
				const res = await this.$api(`${this.$cfg.API.regulatory.supervisepage}?pageNum=${this.pageNum}&pageSize=${this.pageSize}`, {activeId: this.fatherData.activeId});
				if(res){
					this.dataList = res.result.records;
					this.total = res.result.total;
				}
			}catch (e) {
				// console.log(e.data);
				this.$message({
					showClose: true,
					message: e.data.message,
					type: 'error'
				});
			}
		},

		//返回
		goBack(){
			this.$router.go(-1);
		},

		//行变化
		handleSizeChange(val) {
			this.pageSize = val;
			this.getTableList();
		},

		//列变化
		handleCurrentChange(val) {
			this.pageNum = val;
			this.getTableList();
		},

		//保存数据接口
		async submitClose(val, id) {
			try{
				if(id){
					const res = await this.$api(this.$cfg.API.regulatory.superviseUpdate, val);
				}else{
					const res = await this.$api(this.$cfg.API.regulatory.superviseAdd, val);
				}
				this.isEditSetting = false;
				this.$message({
					message: '操作成功',
					type: 'success'
				});
				this.filter.name = '';
				this.getTableList();
			}catch (e) {
				this.$message({
					showClose: true,
					message: e.data.message,
					type: 'error'
				});
			}
		},


		//提交表单
		submit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let params = {...this.ruleForm};
					params.superviseBeginTime = this.editForm.superviseTime[0];
					params.superviseEndTime = this.editForm.superviseEndTime[1];
					params.activeId = this.fatherData.activeId;
					this.submitClose(this.editForm, params.id);
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},

		//重置表单
		resetForm(formName){
			console.log('refs', this.$refs[formName]);
			this.$refs[formName].resetFields();
			this.isEditSetting = false;
		}
	}
};
</script>

<style scoped lang="scss">
	.search{
		width: 300px;
	}

	.list-content{
		margin: 20px 0;
	}

	@mixin basic {
		padding-left: 5px;
		padding-right: 5px;
		cursor: pointer;
	}

	.oper-standard {
		color: #67C23A;
		@include basic;
	}

	.oper-edit {
		@include basic;
		color: #409EFF;
	}

	.oper-del {
		@include basic;
		color: #F56C6C;
	}
</style>


