<template>
	<div class="base-table">
		<el-table
			:data="dataList"
			border stripe
			class="skin-table"
			tooltip-effect="light"
			@selection-change="handleSelectionChange"
		>
			<template v-for="item in config">
				<template v-if="item.slot">
					<slot :name="item.slot"></slot>
				</template>
				<el-table-column
					:type="item.type"
					:prop="item.prop"
					:min-width="item.minWidth || 'auto'"
					:label="item.label"
					:header-align="item.headerAlign || 'left'"
					:align="item.align || 'left'"
					:width="item.width || 'auto'"
					v-else
				/>
			</template>
		</el-table>
		<div class="pagination skin-pagination">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="pageCurrent"
				:page-size="pageSize"
				layout="total, prev, pager, next, jumper"
				:total="pageTotal"
				:pager-count="pageCount"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'BaseTable',
		props: {
			dataList:{
				type: Array,
				default: ()=> []
			},
			config:{
				type: Array,
				default: () => []
			},
			size: {
				type: Number,
				default: 10
			},
			total:{
				type: Number,
				default: 0
			},
			current:{
				type: Number,
				default: 1
			},
			pageCount:{
				type: Number,
			}
		},
		data(){
			return{
				pageTotal: 0,
				pageSize: 10,
				pageCurrent: 1
			}
		},

		created() {
		},

		mounted() {

		},

		methods:{
			//选中时触发
			handleSelectionChange(val){
				this.$emit('handleSelectionChange', val)
			},

			handleSizeChange(val) {
				this.$emit('handleSizeChange', val)
			},
			handleCurrentChange(val) {
				this.$emit('handleCurrentChange', val)
			}
		},

		watch:{
			total:{
				handler(newValue){
					this.pageTotal = newValue;
				},
				immediate: true
			},
			size:{
				handler(newValue){
						this.pageSize = newValue;
				},
				immediate: true
			},
			current:{
				handler(newValue){
					this.pageCurrent = newValue;
				},
				immediate: true
			}
		}
	};
</script>

<style scoped>

</style>
