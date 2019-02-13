<template>
  <div class="goods-addcontainer">
    <!--提示条-->
     <el-alert
        title="添加商品信息"
        type="info"
        center
        :closeable="false"
        show-icon>
    </el-alert>

    <!--步骤条  和 Tab 栏 的 联动效果-->
     <el-steps :active="activeTabName-0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
     </el-steps>
     <!--tab 标签 栏-->
     <el-form  label-position="top" :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
       <el-tabs tab-position="left" style="margin-top:20px" v-model="activeTabName" @tab-click="handleTabClick">
          <el-tab-pane label="基本信息" name="0">
             <el-form-item label="商品名称" prop="goods_name">
               <el-input v-model="addForm.goods_name"></el-input>
             </el-form-item>
             <el-form-item label="商品价格" prop="goods_price">
               <el-input v-model="addForm.goods_price" type="number"></el-input>
             </el-form-item>
             <el-form-item label="商品重量" prop="goods_weight">
               <el-input v-model="addForm.goods_weight" type="number"></el-input>
             </el-form-item>
             <el-form-item label="商品数量" prop="goods_number">
               <el-input v-model="addForm.goods_number" type="number"></el-input>
             </el-form-item>
             <el-form-item label="商品分类" prop="goods_cat">
                <el-cascader
                  expand-trigger="hover"
                  :options="cateList"
                  :props="catePropsOption"
                  v-model="addForm.goods_cat"
                  @change="handleCateChange">
                </el-cascader>
             </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!--使用 v-for 循环渲染所有动态参数 项-->
              <el-form-item v-for="item in dymanicParams" :key="item.attr_id" :label="item.attr_name">
                <!--使用复选框组件，来渲染所有 动态参数下的 复选框-->
                <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox v-for="(cb, i) in item.attr_vals" :key="i" :label="cb" border></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
          </el-tab-pane>
          <!--第三个面板-->
          <el-tab-pane label="商品属性" name="2">
            <!--商品属性-->
            <!--渲染循环每一个静态属性-->
            <el-form-item v-for="item in staticParams" :key="item.attr_id" :label="item.attr_name">
                <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!--第四个面板-->
          <el-tab-pane label="商品图片" name="3">
            <!--注意： 在使用 el-upload 上传组件的时候 必须指定action 表示 图片上传到服务器的那个接口
              而且上传的 action 接口路径 必须是完整的路径
             -->
             <!--on-preview 表示 触发预览操作的时候 执行的业务逻辑-->
             <!--on-remove 表示 移除 图片的时候 执行的业务逻辑-->
            <el-upload
              action="https://www.liulongbin.top:8888/api/private/v1/upload"
              :headers="uploadHeaders"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
           </el-upload>
          </el-tab-pane>
          <!--第五个面板-->
          <el-tab-pane label="商品内容" name="4">
            <v-editor v-model="addForm.goods_introduce"></v-editor>
            <el-button type="primary" @click="addGoods">添加商品</el-button>
          </el-tab-pane>
      </el-tabs>
     </el-form>
     <!--图片预览-->
     <el-dialog
        title="图片预览"
        :visible.sync="previewDialogVisible"
        width="40%">
        <img :src="previewImgURL" style="width:100%;">
    </el-dialog>
  </div>
</template>

<script>
import mix from './Add-mixins.js'
// 导入 编辑器相关的内容
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor} from 'vue-quill-editor'
export default{
  mixins: [mix],
  // 那导入的第三方编辑器 注册为当前的 add 组件 的私有组件
  components: {
    'v-editor': quillEditor
  }
}
</script>

<style lang="less" scoped>
 .el-step__title {
    font-size: 12px;
    line-height: 38px;
}
.ql-editor {
  min-height:400px
}
</style>
