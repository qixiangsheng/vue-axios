<template>
   <div class="reports-container">
      <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/orders' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
       <div ref="echartsArea"  style="height:500px;width:1000px"></div>
    </el-card>
   </div>
</template>

<script>
import mix from './Reports-mixins.js'
export default{
  mixins: [mix]
}
</script>

<style lang="less" scoped>

</style>
