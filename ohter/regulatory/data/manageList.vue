<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<el-row>
				<el-col :span="12">
					<div class="panel-title">
						<i class="iconfont icon-classify2"></i>
						<span class="txt">监管数据——分场所列表</span>
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
							<span class="txt">场次信息</span>
						</div>
					</el-col>
				</el-row>
				<base-table
					:data-list="dataList"
					:config="tableConfig"
					:is-pagination="false"
				>
					<el-table-column prop="productName" label="场次状态" slot="status">
						<template slot-scope="scope">
							<span>{{scope.row.status | formatStatus}}</span>
						</template>
					</el-table-column>
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

				<el-row :gutter="20" class="search-wrap">
					<el-col :span="9">
						<el-input clearable placeholder="搜索学员姓名" v-model="filter.name" class="search-input" suffix-icon="iconfont icon-search"></el-input>
					</el-col>
					<el-col :span="15" style="text-align: right">
						<el-button type="primary" @click="exportData">导出</el-button>
					</el-col>
				</el-row>
				<base-table
					:data-list="detailList"
					:config="tableListConfig"
					:total="total"
					@handleSizeChange="handleSizeChange"
					@handleCurrentChange="handleCurrentChange"
				>
					<el-table-column prop="productName" min-width="100" label="订单内容" header-align="center" align="center" slot="operation">
						<template slot-scope="scope">
							<span class="oper-standard">去监管</span>
							<span class="oper-standard" @click="manageCount(scope.row)">学员详情</span>
						</template>
					</el-table-column>
				</base-table>
			</div>
		</div>
	</div>
</template>
<script>

	import { url as _url } from 'zy-utils';

	const CODE = 'res_manage_regulatory_manageList';

	import BaseTable from '../components/BaseTable';

	export default {
		name: 'manageList',
		code: CODE,
		data() {
			return {
				pageTitle: '场所管理',
				total: 0,
				pageNum: 1,
				pageSize: 10,
				dataList: [],
				tableConfig:[
					{
						label: '监管活动',
						prop: 'activityName'
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
					}
				],
				detailList:[],
				tableListConfig:[
					{
						label: '场所名称',
						prop: 'roomName'
					},
					{
						label: '场所备注',
						prop: 'remark'
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
				isEditSetting: false,
				filter: {
					name: ''
				},
				fatherData: {}
			};
		},
		components: {
			BaseTable
		},
		created() {
			this.fatherData = JSON.parse(this.$route.query.data);
			this.dataList = [...this.fatherData];
			this.getTableList();

		},
		methods: {
			//导出
			exportData(){
				if(!this.detailList.length){
					return this.$message({
						message: '暂无可导出项',
						type: 'warning'
					})
				}
				//todo: 接口地址未修改
				let URL = _url.completion(this.$cfg.API.regulatory.excelRoomData, {activeId: this.filter.activeId, name: this.filter.name, status: this.filter.status});
				window.location.href = URL;
			},

			//获取表格数据
			async getTableList(){
				const res = await this.$api(`${this.$cfg.API.regulatory.superviseRoomData}?pageNum=${this.pageNum}&pageSize=${this.pageSize}`, {activeId: this.fatherData.activeId, sessionId: this.fatherData.sessionId, name: this.filter.name});
				if(res){
					this.detailList = res.result.records;
					this.total = res.result.total;
				}
			},

			manageCount(type){
				let route = '/regulatory/data/manageDetail';
				this.$router.push({
					path: route,
					query: {
						data: JSON.stringify(type)
					}
				})
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
	.site-info{
		padding: 10px 20px;
		.search-bar{
			margin-top: 20px;
			margin-bottom: 20px;
		}
	}

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


