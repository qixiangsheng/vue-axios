<template>
  <div class="rights-container">
     <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
        <el-table
          :data="rightLists"
          border
          style="width: 100%"
          stripe>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="authName"
            label="权限名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="path"
            label="路径">
          </el-table-column>
          <el-table-column
            label="权限等级">
            <template slot-scope='scope'>
              <el-tag v-if='scope.row.level === "0"'>一级</el-tag>
              <el-tag v-if='scope.row.level === "1"' type="success">二级</el-tag>
              <el-tag v-if='scope.row.level === "2"' type="warning">三级</el-tag>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
import mix from './Rights-mixins.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>

</style>
