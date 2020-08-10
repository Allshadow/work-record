<template>
	<div class="ui-search-bar c-m-regulate-search">
		<el-row :gutter="20">
			<el-col :sm="8" :lg="6">
<!--				<el-input v-model="filterData.keyWord" @change="fetchDatas" clearable :placeholder="placeholder" suffix-icon="iconfont icon-search"></el-input>-->
				<el-input clearable :placeholder="inputPlaceholder" v-model="filter.idNumber" class="search" suffix-icon="iconfont icon-search" @change="filterChange">
					</el-input>
			</el-col>
			<el-col :sm="8" :lg="6">
<!--				<el-select filterable v-model="filter.type" placeholder="请选择订单类型" @change="changeFilter" clearable>-->
<!--					<el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
<!--				</el-select>-->
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		props: {

		},
		data() {
			return {
				filter
			};
		},
		methods: {

		}
	};
</script>

<style lang="scss">

</style>
