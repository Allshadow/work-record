<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<div class="panel-title">
				<i class="iconfont icon-classify2"></i>
				<span class="txt">监管活动</span>
			</div>
			<el-row :gutter="20" class="search-wrap">
				<el-col :span="12">
					<el-input clearable placeholder="搜索活动名称" v-model="filter.name" class="search-input"
							  suffix-icon="iconfont icon-search" @change="getTableList"></el-input>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-button type="primary" @click="addActive({})">新增活动</el-button>
				</el-col>
			</el-row>
			<base-table
				:data-list="dataList"
				:config="tableConfig"
				:total="total"
				@handleSizeChange="handleSizeChange"
				@handleCurrentChange="handleCurrentChange"
			>
				<el-table-column prop="productName" label="操作" slot="operation" min-width="200">
					<template slot-scope="scope">
						<span @click="manageCount('count', scope.row)" class="oper-standard">场次管理</span>
						<span @click="manageCount('site', scope.row)" class="oper-standard">场所管理</span>
						<span @click="manageCount('student', scope.row)" class="oper-standard">学员管理</span>
						<span @click="manageCount('teacher', scope.row)" class="oper-standard">监管老师管理</span>
						<span class="oper-edit" @click="addActive(scope.row)">编辑活动</span>
						<span class="oper-del" @click="deleteActive(scope.row.activeId)">删除</span>
					</template>
				</el-table-column>
			</base-table>
		</div>
		<the-dialog
			:title="headTitle"
			:show-data.sync="isEditSetting"
			@submit="submit"
		>
			<the-active-dialog ref="editForm" :key="Math.random()" :id="dataId"/>
		</the-dialog>
	</div>
</template>
<script>
	const CODE = 'res_manage_regulatory_active';
	import TheDialog from '../components/TheDialog';
	import BaseTable from '../components/BaseTable';
	import TheActiveDialog from '../components/TheActiveDialog';

	export default {
		code: CODE,
		data() {
			return {
				pageTitle: '监管活动',
				pageNum: '1',
				pageSize: '10',
				total: 0,
				headTitle: '',
				dataList: [],
				tableConfig: [
					{
						label: '活动名称',
						prop: 'name',
						minWidth: '150'
					},
					{
						label: '场所数量',
						prop: 'roomNum',
						width: '150'
					},
					{
						label: '场次数量',
						prop: 'sessionNum',
						width: '150'
					},
					{
						label: '学员数量',
						prop: 'studentNum',
						width: '150'
					},
					{
						label: '退出密码',
						prop: 'exitPws',
						width: '150'
					},
					{
						slot: 'operation'
					}
				],
				isEditSetting: false,
				filter: {
					name: ''
				},
				dataId: ''
			};
		},
		components: {
			TheDialog,
			BaseTable,
			TheActiveDialog
		},
		created() {
			this.getTableList();
		},
		methods: {
			//获取活动列表
			async getTableList() {
				let params ={
					name: this.filter.name
				}
				const res = await this.$api(`${this.$cfg.API.regulatory.getActivityPage}?pageNum=${this.pageNum}&pageSize=${this.pageSize}`, params);
				if(res){
					this.dataList = res.result.records;
					this.total = res.result.total;
				}
			},

			//场次管理
			manageCount(type, obj) {
				let route,
					params;
				switch (type) {
					case 'count':
						route = '/regulatory/active/manageCount';
						break;
					case 'site':
						route = '/regulatory/active/manageSite';
						break;
					case 'student':
						route = '/regulatory/active/manageStudent';
						break;
					case 'teacher':
						route = '/regulatory/active/manageTeacher';
						break;
					default:
						break;
				}

				params = {
					title: obj.name,
					activeId: obj.activeId
				};
				this.$router.push({
					path: route,
					query: params
				});
			},


			//删除
			deleteActive(activeId){
				this.$confirm('确定删除该活动吗，删除该活动将删除该活动的监管数据，可先前往下载后在删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$api(this.$cfg.API.regulatory.getActivityDel, {activeId: activeId})
						.then(() =>{
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getTableList();
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},

			//新增/编辑
			addActive(row){
				if(JSON.stringify(row) != '{}'){
					this.headTitle = '编辑场次';
					this.dataId = row.activeId;
					this.isEditSetting = true;
				}else{
					this.headTitle = '新增场次';
					this.dataId = '';
					this.isEditSetting = true;
				}

			},

			//提交数据接口
			async submitClose(val, id) {
				if(id){
					const res = await this.$api(this.$cfg.API.regulatory.activityUpdate, val);
				}else{
					const res = await this.$api(this.$cfg.API.regulatory.activityAdd, val);
				}
				this.isEditSetting = false;
				this.$message({
					message: '操作成功',
					type: 'success'
				});
				this.filter.name = '';
				this.getTableList();
			},

			//提交表单
			submit(){
				this.$refs.editForm.$refs['activeForm'].validate((valid) => {
					if (valid) {
						let data = {};
						const val = this.$refs.editForm.activeForm;
						const _val = this.$refs.editForm.ruleForm;
						data = {...val, ..._val}
						this.submitClose(data, this.$refs.editForm.id);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			//重置按钮
			resetForm() {
				console.log('wo');
				this.$refs.editForm.$refs['activeForm'].resetFields();
				this.$refs.editForm.$refs['ruleForm'].resetFields();
				this.isEditSetting = false;
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
			}
		}
	};
</script>
<style scoped lang="scss">
	.search-wrap {
		margin-bottom: 20px;
		.search-input {
			width: 300px;
		}
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


