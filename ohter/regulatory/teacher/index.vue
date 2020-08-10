<template>
	<div class="c-m-order-list" v-title="pageTitle">
		<div class="ui-panel" style="min-height:550px">
			<div class="panel-title">
				<i class="iconfont icon-classify2"></i>
				<span class="txt">课程订单列表</span>
			</div>
			<div class="list-content">
				<search-order v-on:fetchdata="changeFilter" :filter-data.sync='filter' :placeholder="placeholder" v-if="auth('res_manage_operate_order_export')">
					<el-button type="primary" class="skin-btn-primary" @click="downLoad">
						导出表格
					</el-button>
					<template slot="type">
						<el-select filterable v-model="filter.type" placeholder="请选择订单类型" @change="changeFilter" clearable>
							<el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</template>
				</search-order>
				<search-order v-on:fetchdata="changeFilter" :filter-data.sync='filter' :placeholder="placeholder" v-else style="margin-left:-120px">
				</search-order>
				<div class="table-content">
					<el-table :data="listData" border stripe class="skin-table" tooltip-effect="light">
						<el-table-column prop="orderNo" min-width="100" label="订单号" header-align="center" align="center">
						</el-table-column>
						<el-table-column prop="productName" min-width="100" label="订单内容" header-align="center" align="center">
							<template slot-scope="scope">
								<div v-if="scope.row.type==1">{{scope.row.productName}}</div>
								<div v-else-if="scope.row.type==2">VIP会员</div>
								<div v-else-if="scope.row.type==3">商品</div>
							</template>
						</el-table-column>
						<el-table-column prop="name" min-width="100" label="购买者" header-align="center" align="center">
						</el-table-column>
						<el-table-column prop="phone" min-width="100" label="联系方式" header-align="center" align="center">
						</el-table-column>
						<el-table-column prop="deptName" label="所属部门"  header-align="center" align="center">
						</el-table-column>
						<el-table-column prop="createTime" min-width="100" label="购买时间" header-align="center" align="center">
						</el-table-column>
						<el-table-column prop="orderPrice" :formatter="priceFormatter" min-width="150" label="支付费用(人民币)" header-align="center" align="center">
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="pagination skin-pagination">
				<el-pagination @current-change="pageChange" :page-size="filter.pageSize" :current-page.sync="filter.pageNum" layout="total, prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
const CODE = 'res_manage_regulatory_teacher';
import debounce from 'lodash/debounce';
import tableList from '@/mixin/table-list';
import { url as _url } from 'zy-utils';
import SearchOrder from '../../resource/course/regulate/search';
export default {
	mixins: [tableList],
	code: CODE,
	data() {
		return {
			pageTitle: '课程订单列表',
			placeholder: '请输入课程名,购买用户名或订单号',
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
		SearchOrder
	},
	created() {
		this.fetchDataHandle = debounce(this.fetchData, 200);
	},
	methods: {
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
<style lang="scss">
@import 'mixin';
.c-m-order-list {
	.list-content {
		margin-top: 40px;
	}
	.pagination {
		text-align: right;
		padding-top: 30px;
	}
	.primary {
		color: #20a0ff;
		margin-right: 10px;
	}
}
</style>



