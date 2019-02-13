<template>
  <div class="goods-listcontainer">
    <!--搜索区域-->
    <el-row :gutter='20'>
        <el-col :span=6>
           <el-input placeholder="请输入内容" v-model="keywords" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
           </el-input>
        </el-col>
        <el-col :span=3>
           <el-button type="primary" @click="$router.push('/goods/add')">添加商品</el-button>
        </el-col>
    </el-row>

    <!--列表区域-->
    <el-table
        :data="goodslist"
        border
        stripe
        style="width: 100%">
         <el-table-column
          type="index"
          width="50">
        </el-table-column>
         <el-table-column
          prop="goods_name"
          label="商品名称"
          width="570">
        </el-table-column>
         <el-table-column
          prop="goods_price"
          label="商品价格(元)"
          width="95">
        </el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量">
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="创建时间"
          width="140">
          <template slot-scope="scope">
             {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="130">
          <template slot-scope="scope">
             <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
             <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeGoods(scope)"></el-button>
          </template>
        </el-table-column>
    </el-table>
    <!--分页-->
     <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import mix from './List-mixins.js'
export default{
  mixins: [mix]
}
</script>

<style lang="less" scoped>

</style>
