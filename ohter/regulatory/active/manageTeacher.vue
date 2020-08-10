<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<el-row>
				<el-col :span="12">
					<div class="panel-title">
						<i class="iconfont icon-classify2"></i>
						<span class="txt">监管老师管理——xxx</span>
					</div>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-button @click="goBack">返回</el-button>
				</el-col>
			</el-row>
			<div class="list-content">
				<el-row :gutter="10" class="search-wrap">
					<el-col :span="6">
						<el-input clearable placeholder="搜索老师姓名" v-model="filter.idNumber" class="search" suffix-icon="iconfont icon-search"></el-input>
					</el-col>
					<el-col :span="3">
						<el-select filterable v-model="filter.type" placeholder="场次筛选" @change="changeFilter" clearable>
							<el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="3">
						<el-select filterable v-model="filter.type" placeholder="场所筛选" @change="changeFilter" clearable>
							<el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="3">
						<el-select filterable v-model="filter.type" placeholder="场所状态" @change="changeFilter" clearable>
							<el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="9" style="text-align: right">
						<el-button type="primary" @click="isEditSetting = true">新增老师</el-button>
					</el-col>
				</el-row>
			</div>
			<base-table
				:data-list="dataList"
				:config="tableConfig"
				v-on="$listeners"
				:total="20"
				:current="2"
			>
				<el-table-column prop="productName" min-width="100" label="订单内容" header-align="center" align="center" slot="operation">
					<template slot-scope="scope">
						<span>删除</span>
					</template>
				</el-table-column>
			</base-table>
		</div>
		<the-dialog
			title="新增场所"
			:show-data.sync="isEditSetting"
		>
			<el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
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
		</the-dialog>
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
	.search{
		width: 300px;
	}

	.list-content{
		margin: 20px 0;
	}
</style>


