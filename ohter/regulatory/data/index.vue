<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<div class="panel-title">
				<i class="iconfont icon-classify2"></i>
				<span class="txt">监管数据</span>
			</div>
			<div class="list-content">
				<el-row :gutter="20" class="search-wrap">
					<el-col :span="6">
						<el-input clearable placeholder="搜索老师名称" v-model="filter.idNumber" class="search" suffix-icon="iconfont icon-search"></el-input>
					</el-col>
					<el-col :span="3">
						<el-select filterable v-model="filter.type" placeholder="监管活动筛选" @change="changeFilter" clearable>
							<el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="3">
						<el-select filterable v-model="filter.type" placeholder="监管活动筛选" @change="changeFilter" clearable>
							<el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="12" style="text-align: right">
						<el-button type="primary" @click="isEditSetting = true">导出</el-button>
					</el-col>
				</el-row>
			</div>
			<base-table
				:data-list="dataList"
				:config="tableConfig"
				:total="20"
				:current="2"
				@handleSelectionChange="handleSelectionChange"
			>
				<el-table-column prop="productName" min-width="100" label="订单内容" header-align="center" align="center" slot="operation">
					<template slot-scope="scope">
						<span @click="manageCount">分场所列表</span>
					</template>
				</el-table-column>
			</base-table>
		</div>
		<the-dialog
			title="新增活动"
			:show-data.sync="isEditSetting"
		>
			<the-active-dialog />
		</the-dialog>
	</div>
</template>
<script>
	const CODE = 'res_manage_regulatory_data';

	import TheDialog from '../components/TheDialog';
	import BaseTable from '../components/BaseTable';
	import TheActiveDialog from '../components/TheActiveDialog';

	import { url as _url } from 'zy-utils';
	export default {
		code: CODE,
		data() {
			return {
				pageTitle: '监管活动',
				placeholder: '请输入课程名,购买用户名或订单号',
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
						type: 'selection'
					},
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
					{
						slot: 'operation'
					}
				],
				isEditSetting: false,
				TABLE_CONFIG: {
					field: {
						id: 'subjectId'
					},

					api: {
						query: this.$cfg.API.order.queryAdmin
					}
				},
				orderType:[{
					id:1,
					name:'课程订单'
				},{
					id:2,
					name:'vip订单'
				},{
					id:3,
					name:'商品订单'
				}],

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
			// this.fetchDataHandle = debounce(this.fetchData, 200);
		},
		methods: {
			//场次管理
			manageCount(type){
				let route = '/regulatory/data/manageList';
				this.$router.push({
					path: route,
					query: ''
				})
			},

			//选中行变化
			handleSelectionChange(val){
				console.log('我触发了');
			},

			//行变化
			handleSizeChange(val){
				console.log('我执行了');
			},

			//列变化
			handleCurrentChange(val){
				console.log('我执行了');
			},

			priceFormatter(row, column, cellValue, index) {
				return cellValue / 100 || 0;
			},
			changeFilter() {
				this.fetchDataHandle(false, {
					pageNum: 1
				});
			},
			downLoad() {
				let vm = this;
				if (vm.listData.length == 0) {
					vm.$message({
						message: '无符合条件的数据',
						type: 'warning'
					});
					return false;
				}
				let URL = _url.completion(vm.$cfg.API.order.download, {
					keyWord: vm.filter.keyWord,
					beginTime: vm.filter.beginTime,
					endTime: vm.filter.endTime
				});
				window.location.href = URL;
			}
		}
	};
</script>
<style scoped lang="scss">
	.search-wrap{
		margin-bottom: 20px;
	}
</style>


