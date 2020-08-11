<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<el-row>
				<el-col :span="12">
					<div class="panel-title">
						<i class="iconfont icon-classify2"></i>
						<span class="txt">监管老师管理——{{$route.query.title}}</span>
					</div>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-button @click="goBack">返回</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="search-wrap">
				<el-col :span="16">
					<el-input
						clearable
						placeholder="搜索场所名称"
						v-model="filter.name"
						class="search-input"
						suffix-icon="iconfont icon-search"
						@change="getTableList"
					/>
					<el-select filterable v-model="filter.sessionId" placeholder="场次筛选" @change="getTableList" clearable>
						<el-option v-for="item in siteList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-select filterable v-model="filter.roomId" placeholder="场所筛选" @change="getTableList" clearable>
						<el-option v-for="item in roomList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-select filterable v-model="filter.status" placeholder="场所状态筛选" @change="getTableList" clearable>
						<el-option v-for="item in siteStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-col>
				<el-col :span="8" style="text-align: right">
					<el-button type="primary" @click="editSite">新增老师</el-button>
				</el-col>
			</el-row>
			<base-table
				:data-list="dataList"
				:config="tableConfig"
				:total="total"
				@handleSizeChange="handleSizeChange"
				@handleCurrentChange="handleCurrentChange"
			>
				<el-table-column prop="productName" min-width="100" label="监管时间" slot="time">
					<template slot-scope="scope">
						<span>{{scope.row.superviseBeginTime}}——{{scope.row.superviseEndTime}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="productName" min-width="100" label="场次状态" slot="status">
					<template slot-scope="scope">
						<span>{{scope.row.status | formatStatus}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="productName" min-width="100" label="操作" slot="operation">
					<template slot-scope="scope">
						<span class="oper-del" @click="deleteActive(scope.row.teacherId)">删除</span>
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
			<el-form :model="editForm" :rules="rules" ref="editForm" label-width="130px">
				<el-form-item label="场次名称" prop="sessionId">
					<el-select v-model="editForm.sessionId" placeholder="请选择场次名称">
						<el-option v-for="item in siteList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="场所名称" prop="roomId">
					<el-select v-model="editForm.roomId" placeholder="请选择场所名称">
						<el-option v-for="item in roomList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="姓名" prop="userIds">
					<el-select v-model="editForm.userIds" filterable placeholder="请选择姓名" multiple>
						<el-option
							v-for="item in teacherList"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isEditSetting = false">取 消</el-button>
				<el-button type="primary" @click="submit('editForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>

	const CODE = 'res_manage_regulatory_manageTeacher';

	import BaseTable from '../components/BaseTable';


	export default {
		name: 'manageTeacher',
		code: CODE,
		data() {
			return {
				pageTitle: '监管老师管理',
				title: '',
				total: 0,
				pageNum: 1,
				pageSize: 10,
				isValue: true,
				editForm:{
					sessionId: '',
					roomId:'',
					userIds: ''
				},
				rules:{
					sessionId: [
						{ required: true, message: '请选择场次名称', trigger: 'blur' }
					],
					roomId: [
						{ required: true, message: '请选择场所名称', trigger: 'blur' }
					],
					userIds: [
						{ required: true, message: '请选择姓名', trigger: 'blur' }
					],
				},
				dataList: [],
				tableConfig:[
					{
						label: '场次名称',
						prop: 'sessionName'
					},
					{
						label: '场所名称',
						prop: 'roomName'
					},
					{
						slot: 'time'
					},
					{
						label: '老师姓名',
						prop: 'name'
					},
					{
						slot: 'status'
					},
					{
						slot: 'operation'
					}
				],
				isEditSetting: false,
				siteList:[],
				roomList: [],
				siteStatus: [
					{
						label: '未开始',
						value: 0,
					},
					{
						label: '监管中',
						value: 1,
					},
					{
						label: '已结束',
						value: 2,
					},
				],
				teacherList: [],
				filter: {
					keyWord: '', //课程名称,课程代码或创建者模糊查询
					beginTime: '',
					endTime: '',
					type: ''
				}
			};
		},
		components: {
			BaseTable,
		},
		created() {
			this.fatherData = this.$route.query;
			this.getTableList();
			this.getRoomList();
			this.getSiteList();
			this.getTeacherList();
		},
		methods: {
			//删除老师
			deleteActive(val){
				this.$confirm('确定删除该老师吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$api(this.$cfg.API.regulatory.teacherId, {teacherId: val})
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

			//获取老师名称
			async getTeacherList(){
				const res = await this.$api(this.$cfg.API.regulatory.teacherList, {activeId: this.fatherData.activeId});
				if(res){
					this.teacherList = res.result;
				}
			},

			//提交表单
			submit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = {...this.editForm}
						params.userIds = params.userIds.join(',');
						params.activeId = this.fatherData.activeId;
						this.submitClose(params, params.studentId);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			//保存数据接口
			async submitClose(val, id) {
				try{
					const res = await this.$api(this.$cfg.API.regulatory.taacherAdd, val);
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

			//获取场次名称
			async getSiteList(){
				const res = await this.$api(this.$cfg.API.regulatory.sessionList, {activeId: this.fatherData.activeId});
				if(res){
					this.siteList = [];
					res.result.forEach((ele) =>{
						this.siteList.push({
							label: ele.name,
							value: ele.sessionId
						})
					})
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
				const res = await this.$api(`${this.$cfg.API.regulatory.teacherPage}?pageNum=${this.pageNum}&pageSize=${this.pageSize}`, {activeId: this.fatherData.activeId, name: this.filter.name, sessionId: this.filter.sessionId, roomId: this.filter.roomId, status: this.filter.status});
				if(res){
					this.dataList = res.result.records;
					this.total = res.result.total;
				}
			},

			//编辑老师
			editSite(){
				this.isEditSetting = true;
				this.title = "新增老师"
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
			handleSizeChange(val){
				this.pageSize = val;
				this.getTableList();
			},

			//列变化
			handleCurrentChange(val){
				this.pageNum = val;
				this.getTableList();
			},
		},
		filters:{
			formatStatus(val){
				if(val || val == 0){
					switch (val) {
						case 0:
							return '未开始';
						case 1:
							return '监管中';
						case 2:
							return '已结束'
						default:
							return ''
					}
				}
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


