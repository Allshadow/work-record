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
							  suffix-icon="iconfont icon-search"></el-input>
				</el-col>
				<el-col :span="12" style="text-align: right">
					<el-button type="primary" @click="addActive">新增活动</el-button>
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
						<span @click="manageCount('count')" class="oper-standard">场次管理</span>
						<span @click="manageCount('site')" class="oper-standard">场所管理</span>
						<span @click="manageCount('student')" class="oper-standard">学员管理</span>
						<span @click="manageCount('teacher')" class="oper-standard">监管老师管理</span>
						<span class="oper-edit">编辑活动</span>
						<span class="oper-del">删除</span>
					</template>
				</el-table-column>
			</base-table>
		</div>
		<the-dialog
			title="新增活动"
			:show-data.sync="isEditSetting"
		>
			<the-active-dialog/>
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
				dataList: [],
				tableConfig: [
					{
						label: '活动名称',
						prop: 'name',
						minWidth: '150'
					},
					{
						label: '场所数量',
						prop: 'count',
						width: '150'
					},
					{
						label: '场次数量',
						prop: 'count',
						width: '150'
					},
					{
						label: '学员数量',
						prop: 'count',
						width: '150'
					},
					{
						label: '退出密码',
						prop: 'count',
						width: '150'
					},
					{
						slot: 'operation'
					}
				],
				isEditSetting: false,
				filter: {
					name: ''
				}
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
					this.dataList = res.result;
					this.total = res.total;
				}
			},

			//场次管理
			manageCount(type) {
				let route;
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

				this.$router.push({
					path: route,
					query: ''
				});
			},

			addActive(){
				this.isEditSetting = true;
			},

			//行变化
			handleSizeChange(val) {
				console.log('我执行了');
			},

			//列变化
			handleCurrentChange(val) {
				console.log('我执行了');
			},

			priceFormatter(row, column, cellValue, index) {
				return cellValue / 100 || 0;
			},
			changeFilter() {
				this.fetchDataHandle(false, {
					pageNum: 1
				});
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


