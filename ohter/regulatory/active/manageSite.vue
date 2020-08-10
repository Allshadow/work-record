<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<el-row>
				<el-col :span="12">
					<div class="panel-title">
						<i class="iconfont icon-classify2"></i>
						<span class="txt">场所管理——{{$route.query.title}}</span>
					</div>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-button @click="goBack">返回</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="search-wrap">
				<el-col :span="12">
					<el-input
						clearable
						placeholder="搜索场所名称"
						v-model="filter.name"
						class="search-input"
						suffix-icon="iconfont icon-search"
						@change="getTableList"
					></el-input>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-button type="primary" @click="isEditSetting = true">新增场所</el-button>
					<el-button type="primary" @click="showImport">导入场所</el-button>
				</el-col>
			</el-row>
			<base-table
				:data-list="dataList"
				:config="tableConfig"
				:total="total"
				@handleSizeChange="handleSizeChange"
				@handleCurrentChange="handleCurrentChange"
			>
				<el-table-column prop="productName" min-width="100" label="操作" header-align="center" align="center" slot="operation">
					<template slot-scope="scope">
						<div v-if="scope.row.studentNum && scope.row.teacherNum">
							<span class="oper-edit" @click="editSite(scope.row)">编辑</span>
							<span class="oper-del" @click="del(scope.row.roomId)">删除</span>
						</div>
						<div v-else>
							<span style="padding-left: 5px; padding-right: 5px;">编辑</span>
							<span style="padding-left: 5px; padding-right: 5px;">删除</span>
						</div>
					</template>
				</el-table-column>
			</base-table>
		</div>
		<el-dialog
			class="dialog-form c-m-live-room-form"
			:title="title"
			:visible.sync="isEditSetting"
			:lock-scroll="false"
			:close-on-click-modal="false"
			width="500px"
			@close="resetForm('editForm')"
		>
			<el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
				<el-form-item label="场所名称" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input type="textarea" v-model="editForm.remark"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<!--此处只能使用 dialogShow = false , 若使用close方法，会执行两次关闭方法-->
				<el-button @click="isEditSetting = false">取 消</el-button>
				<el-button type="primary" @click="submit('editForm')">确 定</el-button>
			</div>
		</el-dialog>
		<excel-import @import="successDone" ref="import" :option="uploadOption"></excel-import>
	</div>
</template>
<script>

	const CODE = 'res_mobile_center_manageSite';

	import TheDialog from '../components/TheDialog';
	import BaseTable from '../components/BaseTable';
	import excelImport from '@/components/common/import';


	export default {
		name: 'manageCount',
		code: CODE,
		data() {
			return {
				pageTitle: '场所管理',
				fatherData: {},
				pageNum: 1,
				pageSize: 10,
				editForm:{
					name: '',
					remark: ''
				},
				rules:{
					name: [
						{ required: true, message: '请输入活场所名称', trigger: 'blur' },
					]
				},
				dataList: [],
				total: 0,
				tableConfig:[
					{
						label: '场所ID',
						prop: 'roomId'
					},
					{
						label: '场所名称',
						prop: 'name'
					},
					{
						label: '场所备注',
						prop: 'remark',
						width: '',
						minWidth: '',
					},
					{
						label: '学员人数',
						prop: 'studentNum',
						width: '',
						minWidth: '',
					},
					{
						label: '老师人数',
						prop: 'teacherNum',
						width: '',
						minWidth: '',
					},
					{
						slot: 'operation'
					}
				],
				isEditSetting: false,
				filter: {
					name: '',
				},
				title: '编辑表单',
				uploadOption: {
					url: this.$cfg.API.regulatory.uploadRoom,
					multipart_params:{}
				}
			};
		},
		components: {
			TheDialog,
			BaseTable,
			excelImport
		},
		created() {
			this.fatherData = this.$route.query;
			this.getTableList();
		},
		methods: {
			//上传成功回调
			successDone() {
				this.filter.name = '';
				this.getTableList();
			},

			//导入
			showImport() {
				this.uploadOption.multipart_params.activeId = this.fatherData.activeId;
				this.$refs.import.show();
			},

			//删除
			del(roomId){
				this.$confirm('确定删除该场所吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$api(this.$cfg.API.regulatory.deleteRoom, {roomId: roomId})
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

			//编辑场所
			editSite(row){
				this.editForm = {...row};
				this.isEditSetting = true;
			},

			//获取表格数据
			async getTableList(){
				const res = await this.$api(`${this.$cfg.API.regulatory.getRoonPage}?pageNum=${this.pageNum}&pageSize=${this.pageSize}`, {activeId: this.fatherData.activeId, name: this.filter.name});
				if(res){
					this.dataList = res.result.records;
					this.total = res.result.total;
				}
			},

			//保存数据接口
			async submitClose(val, id) {
				try{
					if(id){
						const res = await this.$api(this.$cfg.API.regulatory.superviseUpdate, val);
					}else{
						const res = await this.$api(this.$cfg.API.regulatory.addRoom, val);
					}
					this.$message({
						message: '操作成功',
						type: 'success'
					});
					this.isEditSetting = false;
					// this.getTableList();
				}catch (e) {
					this.$message({
						message: e.data.message,
						type: 'error'
					});
				}
			},

			submit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.editForm.activeId = this.fatherData.activeId;
						this.submitClose(this.editForm);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			//重置表单
			resetForm(formName){
				this.$refs[formName].resetFields();
				this.isEditSetting = false;
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
			}
		}
	};
</script>

<style scoped lang="scss">
	.search-wrap {
		margin-top: 20px;
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


