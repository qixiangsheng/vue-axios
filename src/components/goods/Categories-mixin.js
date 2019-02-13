export default {
  data() {
    return {
      treeData: [],
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
          width: '200px'
        },
        {
          label: '是否有效',
          prop: 'cat_deleted',
          width: '200px',
          // 指定这一列 使用 模板进行渲染
          type: 'template',
          // 指定要使用那个 模板
          template: 'isok'
        },
        {
          label: '排序',
          prop: 'cat_level',
          width: '200px'
        },
        {
          label: '操作',
          width: '200px',
          type: 'template',
          template: 'btns'
        }
      ],
      type: 3, // 获取 3 级分类嵌套关系
      pagenum: 1, // 当前页码数
      pageSize: 5, // 每页显示多少条数据
      total: 0, // 总计有多少条
      addCatedialogVisible: false, // 控制 添加分类的 显示和隐藏
      addCateForm: {
        cat_name: '', // 分类的名称
        cat_pid: '', // 父分类的 id
        cat_level: '' // 分类的层级
      },
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      // 存储已选的 父分类的 ID
      selectedCategoriesList: [],
      // 所有分类的列表
      cateoptions: [],
      // 配置级联选择框中 每一个 item  项的属性配置
      itemOption: {
        label: 'cat_name',
        value: 'cat_id',
        childern: 'children'
      },
      // 控制 编辑分类的对话框 的显示 和 隐藏
      editCateDialogVisible: false,
      // 编辑分类的 表单
      editCateForm: {},
      // 编辑分类的 表单检验规则
      editCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类列表
    async getCateList() {
      const {data: res} = await this.$http.get('categories', {
        params: {
          type: this.type,
          pagenum: this.pagenum,
          pagesize: this.pageSize
        }
      })
      if (res.meta.status !== 200) return this.$message.error('获取商品分类失败')
      // console.log(res.data)
      this.treeData = res.data.result
      this.total = res.data.total
    },
    // 监听页码值改变的 方法
    handlePageChange(newPage) {
      // console.log(newPage)
      this.pagenum = newPage
      this.getCateList()
    },
    // 展示添加分类的对话框
    async showAddCateDialog() {
      // 点击按钮 获取 两级 分类
      const {data: res} = await this.$http.get('categories', {
        params: {
          type: 2 // 获取所有前两级分类
          // 不传 pagenum 和 pagesize 默认获取全部
        }
      })
      if (res.meta.status !== 200) return this.$message.error('获取分类列表失败')
      // console.log(res)
      this.cateoptions = res.data
      // 显示对话框
      this.addCatedialogVisible = true
    },
    // 当选择分类 改变 时触发
    cateChange() {
      // console.log(this.selectedCategoriesList)
    },
    // 关闭对话框 清空表单
    resetAddCateForm() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedCategoriesList = []
    },
    // 点击按钮 添加新分类
    addNewCate() {
      // 默认用户要添加 一级 分类
      let Pid = 0
      // 默认，用户添加的当前分类 的 等级为 一级 分类
      let lV = 0
      if (this.selectedCategoriesList.length !== 0) {
        // 用户选择了父分类
        Pid = this.selectedCategoriesList[this.selectedCategoriesList.length - 1]
        // 重新设置 当前所添加的分类的 分类等级
        lV = this.selectedCategoriesList.length
      }
      // 发起请求 添加分类
      // 验证表单
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('categories', {
          cat_pid: Pid,
          cat_name: this.addCateForm.cat_name,
          cat_level: lV
        })
        if (res.meta.status !== 201) return this.$message.error('添加分类失败')
        this.$message.success('添加分类成功')
        // 成功以后 的数据
        this.getCateList()
        this.addCatedialogVisible = false
        this.selectedCategoriesList = []
      })
    },
    // 点击 编辑 按钮 展示编辑分类 的对话框
    async showEditCateDialog(scope) {
      const {data: res} = await this.$http.get('categories/' + scope.row.cat_id)
      if (res.meta.status !== 200) return this.$message.error('获取编辑分类失败')
      // console.log(res.data)
      //  查询到的数据 保存到 data 上。以后会使用
      this.editCateForm = res.data
      this.editCateDialogVisible = true
    },
    // 重置编辑表单
    resetEditForm() {
      this.$refs.editCateFormRef.resetFields()
    },
    // 点击  确定按钮  提交编辑好的 分类
    saveCat() {
      this.$refs.editCateFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写正确信息')
        const {data: res} = await this.$http.put('categories/' + this.editCateForm.cat_id, {
          cat_name: this.editCateForm.cat_name
        })
        if (res.meta.status !== 200) return this.$message.error('编辑分类失败')
        this.$message.success('编辑分类成功')
        this.getCateList()
        this.editCateDialogVisible = false
      })
    },
    // 根据 id 删除对应的 分类信息
    async removeCate(scope) {
      const confirmResult = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 判断
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }

      const {data: res} = await this.$http.delete(`categories/${scope.row.cat_id}`)
      if (res.meta.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除分类成功')
      this.getCateList()
    }
  }
}
