<template>
  <div class="goods-container">
     <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/goods' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--这是将来 列表组件 和 添加组件 都会放到这个容器中-->
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>

</script>

<style lang="less" scoped>

</style>
