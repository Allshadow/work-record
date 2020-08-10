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
					<el-select filterable v-model="filter.type" placeholder="场次筛选" @change="changeFilter" clearable>
						<el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-select filterable v-model="filter.type" placeholder="场所筛选" @change="changeFilter" clearable>
						<el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-select filterable v-model="filter.type" placeholder="场所状态" @change="changeFilter" clearable>
						<el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-col>
				<el-col :span="8" style="text-align: right">
					<el-button type="primary" @click="editSite">新增老师</el-button>
				</el-col>
			</el-row>
			<base-table
				:data-list="dataList"
				:config="tableConfig"
				v-on="$listeners"
				:total="20"
				:current="2"
			>
				<el-table-column prop="productName" min-width="100" label="订单内容" header-align="center" align="center" slot="operation">
					<template slot-scope="scope">
						<span class="oper-del">删除</span>
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
				<el-form-item label="场次名称">
					<el-select v-model="editForm.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="场所名称">
					<el-select v-model="editForm.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="姓名">
					<el-select v-model="editForm.value" filterable placeholder="请选择" multiple>
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
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

	import TheDialog from '../components/TheDialog';
	import BaseTable from '../components/BaseTable';
	import TheActiveDialog from '../components/TheActiveDialog';


	export default {
		name: 'manageCount',
		code: CODE,
		data() {
			return {
				pageTitle: '监管老师管理',
				title: '',
				isValue: true,
				editForm:{
					name: '',
					region: '',
					cardName: '',
					desc: '',
					value: ''
				},
				rules:{
					name: [
						{ required: true, message: '请输入活动名称', trigger: 'blur' },
						{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
				},
				dataList: [
					{
						name: '123',
						count: '233'
					},
					{
						name: '123',
						count: '233'
					}
				],
				tableConfig:[
					{
						label: '场次名称',
						prop: 'name',
						width: '',
						minWidth: '',
					},
					{
						label: '场所名称',
						prop: 'count',
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
						label: '老师姓名',
						prop: 'count',
						width: '',
						minWidth: '',
					},
					{
						label: '部门',
						prop: 'count',
						width: '',
						minWidth: '',
					},
					{
						label: '场次状态',
						prop: 'count',
						width: '',
						minWidth: '',
					},
					{
						slot: 'operation'
					}
				],
				isEditSetting: false,
				filter: {
					keyWord: '', //课程名称,课程代码或创建者模糊查询
					beginTime: '',
					endTime: '',
					type: ''
				}
			};
		},
		components: {
			TheDialog,
			BaseTable,
			TheActiveDialog
		},
		created() {
		},
		methods: {
			//编辑老师
			editSite(row){
				this.isEditSetting = true;
				this.title = "新增老师"
			},

			//返回
			goBack(){
				this.$router.go(-1);
			},

			//行变化
			handleSizeChange(val){
				console.log('我执行了');
			},

			//列变化
			handleCurrentChange(val){
				console.log('我执行了');
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


