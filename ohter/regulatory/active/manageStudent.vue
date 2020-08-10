<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<el-row>
				<el-col :span="12">
					<div class="panel-title">
						<i class="iconfont icon-classify2"></i>
						<span class="txt">学员管理——xxx</span>
					</div>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-button @click="goBack">返回</el-button>
				</el-col>
			</el-row>
			<div class="list-content">
				<el-row :gutter="20" class="search-wrap">
					<el-col :span="6">
						<el-input clearable placeholder="搜索活动名称" v-model="filter.idNumber" class="search" suffix-icon="iconfont icon-search"></el-input>
					</el-col>
					<el-col :span="6">
						<el-select filterable v-model="filter.type" placeholder="活动状态筛选" @change="changeFilter" clearable>
							<el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="12" style="text-align: right">
						<el-button type="primary" @click="isEditSetting = true">新增学员</el-button>
						<el-button type="primary" @click="isEditSetting = true">导入学员</el-button>
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
						<span>编辑</span>
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
				<el-form-item label="场所名称">
					<el-select v-model="editForm.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="准考证号">
					<el-input v-model="editForm.cardName"></el-input>
				</el-form-item>
				<el-form-item label="学员姓名">
					<el-input v-model="editForm.cardName"></el-input>
				</el-form-item>
				<el-form-item label="身份证号">
					<el-input v-model="editForm.cardName"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="editForm.cardName"></el-input>
				</el-form-item>
				<el-form-item label="单位名称">
					<el-input v-model="editForm.cardName"></el-input>
				</el-form-item>
				<el-form-item label="学员照片">
					<el-input v-model="editForm.cardName"></el-input>
				</el-form-item>
			</el-form>
		</the-dialog>
	</div>
</template>
<script>

	const CODE = 'res_manage_regulatory_manageStudent';

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
					region: '',
					cardName: '',
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
						label: '准考证号',
						prop: 'name',
						width: '',
						minWidth: '',
					},
					{
						label: '学员姓名',
						prop: 'count',
						width: '',
						minWidth: '',
					},
					{
						label: '身份证号',
						prop: 'count',
						width: '',
						minWidth: '',
					},
					{
						label: '手机号',
						prop: 'count',
						width: '',
						minWidth: '',
					},
					{
						label: '单位名称',
						prop: 'count',
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


