<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<el-row>
				<el-col :span="12">
					<div class="panel-title">
						<i class="iconfont icon-classify2"></i>
						<span class="txt">学员管理——{{$route.query.title}}</span>
					</div>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-button @click="goBack">返回</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="search-wrap">
				<el-col :span="12">
					<el-input clearable placeholder="搜索准考证号" v-model="filter.name" class="search-input" suffix-icon="iconfont icon-search" @change="getTableList"></el-input>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-button type="primary" @click="editSite({})">新增学员</el-button>
					<el-button type="primary" @click="showImport">导入学员</el-button>
				</el-col>
			</el-row>
			<base-table
				:data-list="dataList"
				:config="tableConfig"
				:total="total"
				@handleSizeChange="handleSizeChange"
				@handleCurrentChange="handleCurrentChange"
			>
				<el-table-column prop="productName" min-width="100" label="操作" slot="operation">
					<template slot-scope="scope">
						<span class="oper-edit" @click="editSite(scope.row)">编辑</span>
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
			width="800px"
			@close="resetForm('editForm')"
		>
			<el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
				<el-form-item label="场所名称" prop="roomId">
					<el-select v-model="editForm.roomId" placeholder="请选择场所名称">
						<el-option
							v-for="item in roomList"
							:label="item.label"
							:value="item.value"
							:key="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="准考证号" prop="ticket">
					<el-input v-model="editForm.ticket" placeholder="请输入准考证号"></el-input>
				</el-form-item>
				<el-form-item label="学员姓名" prop="name">
					<el-input v-model="editForm.name" placeholder="请输入学员姓名"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="idNumber">
					<el-input v-model="editForm.idNumber" placeholder="请输入身份证号"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input v-model="editForm.mobile" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="单位名称" prop="workName">
					<el-input v-model="editForm.workName" placeholder="请输入单位名称"></el-input>
				</el-form-item>
				<el-form-item label="学员照片" prop="headImage">
					<el-input v-model="editForm.headImage" placeholder="请输入base64的学员照片"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isEditSetting = false">取 消</el-button>
				<el-button type="primary" @click="submit('editForm')">确 定</el-button>
			</div>
		</el-dialog>
		<excel-import @import="successDone" ref="import" :option="uploadOption"></excel-import>
	</div>
</template>
<script>

	const CODE = 'res_manage_regulatory_manageStudent';

	import BaseTable from '../components/BaseTable';
	import excelImport from '@/components/common/import';

	export default {
		name: 'manageStudent',
		code: CODE,
		data() {
			return {
				pageTitle: '场所管理',
				pageNum: 1,
				pageSize: 10,
				fatherData: {},
				title: '新增学员',
				editForm:{
					roomId: '',
					ticket: '',
					name: '',
					idNumber: '',
					mobile: '',
					workName: '',
					headImage: ''
				},
				rules:{
					roomId: [
						{ required: true, message: '请选择场所名称', trigger: 'change' }
					],
					ticket: [
						{ required: true, message: '请输入准考证号', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入学员姓名', trigger: 'blur' }
					],
					idNumber: [
						{ required: true, message: '请输入身份证号', trigger: 'blur' }
					],
					mobile: [
						{ required: true, message: '请输入手机号', trigger: 'blur' }
					],
					workName: [
						{ required: true, message: '请输入单位名称', trigger: 'blur' }
					],
					headImage: [
						{ required: true, message: '请输入base64的学员照片', trigger: 'blur' }
					]
				},
				dataList: [],
				tableConfig:[
					{
						label: '准考证号',
						prop: 'ticket'
					},
					{
						label: '学员姓名',
						prop: 'name'
					},
					{
						label: '身份证号',
						prop: 'idNumber'
					},
					{
						label: '手机号',
						prop: 'mobile'
					},
					{
						label: '单位名称',
						prop: 'workName'
					},
					{
						label: '场所名称',
						prop: 'roomName'
					},
					{
						slot: 'operation'
					}
				],
				isEditSetting: false,
				filter: {
					name: ''
				},
				roomList: [],
				uploadOption: {
					url: this.$cfg.API.regulatory.excelStudent,
					multipart_params:{}
				}
			};
		},
		components: {
			BaseTable,
			excelImport
		},
		created() {
			this.fatherData = this.$route.query;
			this.getTableList();
			this.getRoomList();
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


			//提交表单
			submit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.editForm.activeId = this.fatherData.activeId;
						this.submitClose(this.editForm, this.editForm.studentId);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			//保存数据接口
			async submitClose(val, id) {
				try{
					if(id){
						const res = await this.$api(this.$cfg.API.regulatory.studentUpdate, val);
					}else{
						const res = await this.$api(this.$cfg.API.regulatory.studentAdd, val);
					}
					this.$message({
						message: '操作成功',
						type: 'success'
					});
					this.isEditSetting = false;
					this.getTableList();
				}catch (e) {
					this.$message({
						message: e.data.message,
						type: 'error'
					});
				}
			},

			//获取场所名称
			async getRoomList(){
				const res = await this.$api(this.$cfg.API.regulatory.getRoomList, {activeId: this.fatherData.activeId});
				if(res){
					this.roomList = [];
					res.result.forEach((ele) =>{
						this.roomList.push({
							label: ele.name,
							value: ele.roomId
						})
					})
				}
			},

			//获取表格数据
			async getTableList(){
				const res = await this.$api(`${this.$cfg.API.regulatory.studentPage}?pageNum=${this.pageNum}&pageSize=${this.pageSize}`, {activeId: this.fatherData.activeId, name: this.filter.name});
				if(res){
					this.dataList = res.result.records;
					this.total = res.result.total;
				}
			},

			//编辑学员
			editSite(row){
				this.isEditSetting = true;
				if(JSON.stringify(row) !== '{}'){
					this.title = '编辑学员'
					this.$nextTick(()=>{
						this.editForm = {...row};
					})
				}else{
					this.title = "新增学员"
				}
			},

			//返回
			goBack(){
				this.$router.go(-1);
			},

			//行变化
			handleSizeChange(val){
				this.pageSize = val;
				this.getTableList();
			},

			//列变化
			handleCurrentChange(val){
				this.pageNum = val;
				this.getTableList();
			},

			//重置表单
			resetForm(formName){
				this.$refs[formName].resetFields();
				this.isEditSetting = false;
			},
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


