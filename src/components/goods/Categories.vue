<template>
  <div class="category-container">
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区域-->
    <el-card>
      <el-button type="primary" style="margin-bottom:15px;" @click="showAddCateDialog">添加分类</el-button>
      <!--表格 用的是 vue-table-with-tree-grid  带树形结构的表格-->
      <!--https://npm.taobao.org/package/vue-table-with-tree-grid-->
      <tree-grid ref="table" index-text="#" :expand-type="false"  :data="treeData" :columns='columns' :border="true" :show-index="true" :selection-type="false">
         <template slot="isok" slot-scope="scope">
            <i class="el-icon-circle-close" v-if="scope.row.cat_deleted" style="color:red"></i>
            <i class="el-icon-circle-check" v-else style="color:#009961" ></i>
         </template>
         <template slot="btns" slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditCateDialog(scope)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click=removeCate(scope)>删除</el-button>
         </template>
      </tree-grid>
      <!--分页-->
      <el-pagination
        @current-change="handlePageChange"
        :current-page="pagenum"
        :page-size="pageSize"
        :total="total"
        style="margin-top:15px">
      </el-pagination>
    </el-card>
    <!--添加分类的对话框-->
    <el-dialog
        title="添加分类"
        :visible.sync="addCatedialogVisible"
        width="40%"
        @close="resetAddCateForm">
      <el-form ref="addCateFormRef" :model="addCateForm" :rules="addCateFormRules" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!--hover 出发的级联选择器-->
          <el-cascader
          expand-trigger="hover"
          :options="cateoptions"
          :props="itemOption"
          v-model="selectedCategoriesList"
          style="width:100%"
          :change-on-select="true"
          @change="cateChange">
        </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCatedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewCate">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑分类对话框-->
    <el-dialog
      title="提示"
      :visible.sync="editCateDialogVisible"
      width="40%"
      @close="resetEditForm">
      <!--编辑的表单-->
      <el-form ref="editCateFormRef" :model="editCateForm" :rules="editCateFormRules" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mix from './Categories-mixin.js'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>

</style>
