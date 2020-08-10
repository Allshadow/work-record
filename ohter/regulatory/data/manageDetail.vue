<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<el-row>
				<el-col :span="12">
					<div class="panel-title">
						<i class="iconfont icon-classify2"></i>
						<span class="txt">监管数据——分场所列表——学院详情</span>
					</div>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-button @click="goBack">返回</el-button>
				</el-col>
			</el-row>
			<div class="site-info">
				<el-row>
					<el-col :span="24">
						<div class="panel-title">
							<i class="iconfont icon-classify2"></i>
							<span class="txt">场所信息</span>
						</div>
					</el-col>
				</el-row>
				<base-table
					:data-list="dataList"
					:config="tableConfig"
					:total="20"
					:current="2"
				>
				</base-table>
			</div>
			<div class="site-info">
				<el-row>
					<el-col :span="24">
						<div class="panel-title">
							<i class="iconfont icon-classify2"></i>
							<span class="txt">分场所列表</span>
						</div>
					</el-col>
				</el-row>

				<el-row :gutter="20" class="search-bar">
					<el-col :span="6">
						<el-input clearable placeholder="搜索场所名称" v-model="filter.idNumber" class="search" suffix-icon="iconfont icon-search"></el-input>
					</el-col>
					<el-col :span="3">
						<el-select filterable v-model="filter.type" placeholder="场次状态筛选" @change="changeFilter" clearable>
							<el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="15" style="text-align: right">
						<el-button type="primary" @click="isEditSetting = true">导出</el-button>
					</el-col>
				</el-row>
				<base-table
					:data-list="dataList"
					:config="tableListConfig"
					:total="20"
					:current="2"
				>
					<el-table-column prop="productName" min-width="100" label="订单内容" header-align="center" align="center" slot="operation">
						<template slot-scope="scope">
							<span>去监管</span>
							<span>学院详情</span>
						</template>
					</el-table-column>
				</base-table>
			</div>
		</div>
		<the-dialog
			title="新增场所"
			:show-data.sync="isEditSetting"
		>
			<el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
				<el-form-item label="场次名称" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="活动形式">
					<el-input type="textarea" v-model="editForm.desc"></el-input>
				</el-form-item>
			</el-form>
		</the-dialog>
	</div>
</template>
<script>

	const CODE = 'res_manage_regulatory_manageDetail';

	import TheDialog from '../components/TheDialog';
	import BaseTable from '../components/BaseTable';
	import TheActiveDialog from '../components/TheActiveDialog';


	export default {
		name: 'manageCount',
		code: CODE,
		data() {
			return {
				pageTitle: '场所管理',
				placeholder: '搜索场所名称',
				isValue: true,
				editForm:{
					name: '',
					desc: ''
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
						label: '监管活动',
						prop: 'name',
						width: '',
						minWidth: '',
					},
					{
						label: '监管场次',
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
						label: '监管时长',
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
						label: '实到：应到学员',
						prop: 'count',
						width: '',
						minWidth: '',
					},
					{
						label: '监管老师',
						prop: 'count',
						width: '',
						minWidth: '',
					},

				],

				tableListConfig:[
					{
						type: 'selection'
					},
					{
						label: '场所名称',
						prop: 'name',
						width: '',
						minWidth: '',
					},
					{
						label: '场所备注',
						prop: 'count',
						width: '',
						minWidth: '',
					},
					{
						label: '实到:应到学院',
						prop: 'count',
						width: '',
						minWidth: '',
					},
					{
						label: '监管老师',
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
	.site-info{
		padding: 10px 20px;
		.search-bar{
			margin-top: 20px;
			margin-bottom: 20px;
		}
	}

	.search{
		width: 300px;
	}

	.list-content{
		margin: 20px 0;
	}
</style>


