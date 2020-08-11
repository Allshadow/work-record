<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<div class="panel-title">
				<i class="iconfont icon-classify2"></i>
				<span class="txt">监管数据</span>
			</div>
			<el-row :gutter="20" class="search-wrap">
				<el-col :span="16">
					<el-input
						clearable
						placeholder="搜索场次名称"
						v-model="filter.name"
						class="search-input"
						suffix-icon="iconfont icon-search"
						@change="getTableList"
					/>
					<el-select filterable v-model="filter.activeId" placeholder="监管活动筛选" @change="getTableList" clearable>
						<el-option v-for="item in activeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-select filterable v-model="filter.status" placeholder="场所状态筛选" @change="getTableList" clearable>
						<el-option v-for="item in siteStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-col>
				<el-col :span="8" style="text-align: right">
					<el-button type="primary" @click="exportData">导出</el-button>
				</el-col>
			</el-row>
			<base-table
				:data-list="dataList"
				:config="tableConfig"
				:total="total"
				@handleSizeChange="handleSizeChange"
				@handleCurrentChange="handleCurrentChange"
			>
				<el-table-column prop="productName" label="场次状态" slot="status">
					<template slot-scope="scope">
						<span>{{scope.row.status | formatStatus}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="productName" min-width="100" label="操作" slot="operation">
					<template slot-scope="scope">
						<span class="oper-standard" @click="manageCount(scope.row)">分场所列表</span>
					</template>
				</el-table-column>
			</base-table>
		</div>
	</div>
</template>
<script>
	const CODE = 'res_manage_regulatory_data';

	import BaseTable from '../components/BaseTable';
	import { url as _url } from 'zy-utils';

	export default {
		code: CODE,
		data() {
			return {
				pageTitle: '监管活动',
				dataList: [],
				total: 0,
				pageNum: 1,
				pageSize: 10,
				tableConfig:[
					{
						label: '监管活动',
						prop: 'activityName',
					},
					{
						label: '监管场次',
						prop: 'sessionName'
					},
					{
						label: '监管时间',
						prop: 'superviseTime'
					},
					{
						label: '监管时长(分钟)',
						prop: 'superviseLongTime'
					},
					{
						slot: 'status'
					},
					{
						label: '实到：应到学员',
						prop: 'studentNum'
					},
					{
						label: '监管老师',
						prop: 'teacherNum'
					},
					{
						slot: 'operation'
					}
				],
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
				isEditSetting: false,
				activeList: [],
				filter: {
					name: '',
					activeId: '',
					status: ''
				}
			};
		},
		components: {
			BaseTable
		},
		created() {
			// this.fetchDataHandle = debounce(this.fetchData, 200);
			this.getTableList();
			this.getRoomList();
		},
		methods: {
			//获取活动名称
			async getRoomList(){
				const res = await this.$api(this.$cfg.API.regulatory.superviseData);
				if(res){
					this.activeList = [];
					res.result.forEach((ele) =>{
						this.activeList.push({
							label: ele.name,
							value: ele.activeId
						})
					})
				}
			},
			//获取表格数据
			async getTableList(){
				const res = await this.$api(`${this.$cfg.API.regulatory.dataListPage}?pageNum=${this.pageNum}&pageSize=${this.pageSize}`, {activeId: this.filter.activeId, name: this.filter.name, status: this.filter.status});
				if(res){
					this.dataList = res.result.records;
					this.total = res.result.total;
				}
			},

			//导出
			exportData(){
				if(!this.dataList.length){
					return this.$message({
						message: '暂无可导出项',
						type: 'warning'
					})
				}

				let URL = _url.completion(this.$cfg.API.regulatory.dataExportList, {activeId: this.filter.activeId, name: this.filter.name, status: this.filter.status});
				window.location.href = URL;
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

			//场次管理
			manageCount(type){
				let route = '/regulatory/data/manageList';
				this.$router.push({
					path: route,
					query: {
						data: JSON.stringify(type)
					}
				})
			}
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


