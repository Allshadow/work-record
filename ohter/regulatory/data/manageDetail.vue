<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<el-row>
				<el-col :span="12">
					<div class="panel-title">
						<i class="iconfont icon-classify2"></i>
						<span class="txt">监管数据——分场所列表——学员详情</span>
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
					<el-col :span="12">
						<el-input clearable placeholder="搜索学员姓名" v-model="filter.name" class="search-input" suffix-icon="iconfont icon-search" @click="getTableList"></el-input>
						<el-select filterable v-model="filter.attend" placeholder="未到/已到筛选" @change="getTableList" clearable>
							<el-option v-for="item in activeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-col>
					<el-col :span="12" style="text-align: right">
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
					<el-table-column prop="productName" min-width="100" label="操作" header-align="center" align="center" slot="operation">
						<template slot-scope="scope">
							<span class="oper-standard" @click="showDetail(scope.row)">登录详情</span>
							<span class="oper-standard" @click="showFaceDetail(scope.row)">人脸识别</span>
						</template>
					</el-table-column>
				</base-table>
			</div>
		</div>
		<el-dialog
			title="登录详情"
			:visible.sync="isEditSetting"
			width="300px"
		>
			<el-card class="box-card">
				<h1 class="login-time"><span>登录总次数</span>{{studentDetail.num}}</h1>
				<div v-for="(item, index) in studentDetail.loginDetail" :key="item.createTime">
					<div class="login-info"><span>第{{index}}次登录</span>{{item.createTime}}</div>
				</div>
			</el-card>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isEditSetting = false">取 消</el-button>
			</div>
		</el-dialog>

		<el-dialog
			title="人脸识别"
			:visible.sync="showFace"
			width="600px"
		>
			<div class="wrap" style="width: 500px; margin: 0 auto">
				<el-row :gutter="20">
					<el-col :span="12">
						<div class="img-wrap">
<!--							<img :src="faceDetail.studentDetail.originImage" alt="" >-->
						</div>
					</el-col>
					<el-col :span="12">
						<h1 style="font-size: 22px; font-weight: bold;">{{faceDetail.studentDetail.name}}</h1>
						<div class="student-title">准考证号</div>
						<div>{{faceDetail.studentDetail.ticket}}</div>
						<div class="student-title">证件号码</div>
						<div>{{faceDetail.studentDetail.idNumber}}</div>
						<div class="student-title">单位</div>
						<div>{{faceDetail.studentDetail.workName}}</div>
					</el-col>
				</el-row>
				<el-row :gutter="20" style="margin-top: 20px;margin-bottom: 20px">
					<el-col :span="12">识别次数：{{faceDetail.studentDetail.faceLogNum}}</el-col>
					<el-col :span="12">未通过次数：{{faceDetail.studentDetail.faceFailNum}}</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12" v-for="item in faceDetail.studentCheckFaceDetailPage.records" :key="item.createTime">
						<div style="text-align: center">{{item.createTime}}</div>
						<div style="border: 1px solid #000; width: 60%;margin: 0 auto;height: 200px" >
							<img src="" alt="">
						</div>
						<div style="text-align: center">{{item.status ==1? '通过': '不通过'}}</div>
					</el-col>
				</el-row>
				<el-pagination
					@size-change="sizeChange"
					@current-change="currentChange"
					:current-page.sync="pageCurrent"
					:page-size="pageSizes"
					layout="->,total, prev, pager, next, jumper"
					:total="pageTotal"
				>
				</el-pagination>
			</div>
		</el-dialog>
	</div>
</template>
<script>

	import { url as _url } from 'zy-utils';

	const CODE = 'res_manage_regulatory_manageDetail';

	import BaseTable from '../components/BaseTable';


	export default {
		name: 'manageDetail',
		code: CODE,
		data() {
			return {
				pageTitle: '场所管理',
				total:0,
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
						label: '监管场所',
						prop: 'roomName'
					},
					{
						label: '监管时间',
						prop: 'superviseTime'
					},
					{
						label: '监管时长',
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
						label: '老师姓名',
						prop: 'teacherName'
					}
				],
				detailList: [],
				tableListConfig:[
					{
						label: '学员姓名',
						prop: 'name'
					},
					{
						label: '准考证号',
						prop: 'ticket'
					},
					{
						label: '身份证号',
						prop: 'idNumber'
					},
					{
						label: '出席状态',
						prop: 'attend'
					},
					{
						label: '登陆次数',
						prop: 'loginNum'
					},
					{
						label: '人脸识别次数',
						prop: 'faceLogNum'
					},

					{
						slot: 'operation'
					}

				],
				isEditSetting: false,
				showFace: false,
				filter: {
					name: '',
					attend: ''
				},
				fatherData:{},
				pageCurrent: 1,
				pageSizes: 10,
				pageTotal: 0,
				dNum: 1,
				dSize: 10,
				activeList:[
					{
						label: '已到',
						value: 1
					},
					{
						label: '未到',
						value: 2
					}
				],
				studentDetail: {},
				faceDetail:{
					studentDetail:{},
					studentCheckFaceDetailPage: {
						records: []
					}
				},
				currentObj: {}, //当前点击的行数据
			};
		},
		components: {
			BaseTable
		},
		created() {
			this.fatherData = JSON.parse(this.$route.query.data);
			this.teacherName();
			this.getTableList();
		},
		methods: {
			exportData(){
				if(!this.detailList.length){
					return this.$message({
						message: '暂无可导出项',
						type: 'warning'
					})
				}
				let URL = _url.completion(this.$cfg.API.regulatory.excelStudentEx, {roomId: this.fatherData.roomId, name: this.filter.name, attend: this.filter.attend});
				window.location.href = URL;
			},

			//人脸识别
			async showFaceDetail(obj){
				this.currentObj = {...obj}
				await this.toFaceList();
				this.showFace = true;
			},

			//人脸识别方法
			async toFaceList(){
				const res = await this.$api(`${this.$cfg.API.regulatory.loginFace}?pageNum=${this.dNum}&pageSize=${this.dSize}`, {roomId:  this.fatherData.roomId,studentId: this.currentObj.studentId});
				if(res){
					this.faceDetail = res.result;
					this.pageTotal = res.result.studentCheckFaceDetailPage.total;
				}
			},

			//登录详情
			async showDetail(obj){
				const res = await this.$api(this.$cfg.API.regulatory.loginDetail, {studentId: obj.studentId});
				if(res){
					this.studentDetail = res.result;
					this.isEditSetting = true;
				}
			},

			//获取表格数据
			async getTableList(){
				const res = await this.$api(`${this.$cfg.API.regulatory.studentInfo}?pageNum=${this.pageNum}&pageSize=${this.pageSize}`, {roomId: this.fatherData.roomId, name: this.filter.name, attend: this.filter.attend});
				if(res){
					this.detailList = res.result.records;
					this.total = res.result.total;
				}
			},

			//获取老师姓名
			async teacherName(){
				const res = await this.$api(this.$cfg.API.regulatory.teacherName, {roomId: this.fatherData.roomId});
				if(res){
					this.dataList = [];
					this.dataList = [...this.fatherData]
					this.dataList[0].teacherName = res.result.map((ele)=> ele.name).join(',');
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
			//行变化
			sizeChange(val){
				this.dSize = val;
				this.toFaceList();
			},

			//列变化
			currentChange(val){
				this.dNum = val;
				this.toFaceList();
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

	.login-time{
		font-weight: bold;
		line-height: 40px;
		span{
			display: inline-block;
			width: 120px;
		}
	}
	.login-info{
		span{
			display: inline-block;
			width: 120px;
		}
	}

	.wrap{
		.img-wrap{
			margin: 0 auto;
			width: 150px;
			height: 200px;
			border: 1px solid #000;
		}
		.student-title{
			color: #969fbc;
			font-size: 16px;
			margin-top: 5px;
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


