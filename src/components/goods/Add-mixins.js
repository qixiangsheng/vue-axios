export default {
  data() {
    return {
      // 被激活的 标签页 的 名称
      activeTabName: '0',
      // 添加商品的表单对象
      addForm: {
        // 商品名称
        goods_name: '',
        // 选中的 商品 分类
        goods_cat: [],
        // 商品价格
        goods_price: '',
        // 商品数量
        goods_number: '',
        // 商品重量
        goods_weight: '',
        // 商品的描述
        goods_introduce: '',
        // 商品的图片
        pics: [],
        // 商品的属性,包含了 动态参数和静态参数
        attrs: []
      },
      // 添加商品的表单验证规则
      addFormRules: {
        // 商品名称
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        // 选中的 商品 分类
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ],
        // 商品价格
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        // 商品数量
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        // 商品重量
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      },
      // 所有商品的分类
      cateList: [],
      // 分类选择框中的每条数据的配置对象
      catePropsOption: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 动态参数
      dymanicParams: [],
      // 静态属性
      staticParams: [],
      // 上传文件的请求头
      uploadHeaders: {
        // 注意 必须这么写
        Authorization: sessionStorage.getItem('token')
      },
      // 默认不展示 预览图片的对话框
      previewDialogVisible: false,
      // 预览图片的地址
      previewImgURL: ''
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取所有分类的列表数据
    async getCateList() {
      const {data: res} = await this.$http.get('categories', {
        params: {
          type: 3
        }
      })
      if (res.meta.status !== 200) return this.$message.error('获取所有数据失败')
      this.cateList = res.data
    },
    // 每当分类 选中项改变 触发此改变
    handleCateChange() {
      console.log(this.addForm.goods_cat)
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    // 监听 tab 栏 页签 的 点击事件
    async handleTabClick() {
      // 在点击事件中 获取到当前 被选中的面板 的 name 名字
      console.log(this.activeTabName)
      // 如果 当前激活的 tab 也前的名称 等于 1 或者 2，表示用户进入了 商品参数 或 商品属性的面板
      if (this.activeTabName === '1' || this.activeTabName === '2') {
        // 如果没有选中 商品分类 则直接提示用户 需要选择一下
        if (this.addForm.goods_cat.length !== 3) this.$message.error('请选择商品分类')
        // 获取 动态参数 或 静态属性
        const {data: res} = await this.$http.get(`categories/${this.addForm.goods_cat[2]}/attributes`, {
          params: {
            sel: this.activeTabName === '1' ? 'many' : 'only'
          }
        })
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('获取商品参数失败')
        // 判断 当前的 页签 是否为 “商品参数” 如果是
        // 则需要 把 res.data 数组中 的每一项 进行 forEach 循环 把每一项 的 attr_vals 分割成数组
        if (this.activeTabName === '1') {
          //  证明是 商品参数 面板
          res.data.forEach(item => {
            item.attr_vals = item.attr_vals.trim().length <= 0 ? [] : item.attr_vals.split(',')
          })
          this.dymanicParams = res.data
        } else {
          // 证明是 商品静态属性 页面 不需要将 attr_vals 进行分割
          this.staticParams = res.data
        }
      }
    },
    // 预览图片执行的操作
    handlePreview(info) {
      console.log(info)
      this.previewDialogVisible = true
      this.previewImgURL = info.response.data.url
    },
    // 删除图片执行的操作
    handleRemove(file) {
      // 1.获取到 要删除的 那张 图片的路径
      // 2.从this.addForm.pics 数组中，找到 tmp_path 所对应的那个 对象的索引
      // 3.使用数组的 splice 方法，根据索引，删除对应的 对象
      const path = file.response.data.tmp_path
      const index = this.addForm.pics.findIndex(item => item.pic === path)
      this.addForm.pics.splice(index, 1)
      console.log(this.addForm.pics)
    },
    // 图片上传成功的事件
    uploadSuccess(response) {
      // console.log(response)
      // 可以拿到 图片 上传成功以后的 相对路径 我们可以整理成一个对象
      // push 到addForm.pics 数组中
      const o = {pic: response.data.tmp_path}
      this.addForm.pics.push(o)
      // console.log(this.addForm.pics)
    },
    // 添加商品
    addGoods(obj) {
      // 1.表单验证
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写必要的商品信息')
        // console.log(this.addForm)
        // 这样的方法，不可以，因为页面上的分类 选择框 ，还是用 v-model 指令，引用者 this.addForm.goods_cat
        // 所以，必须要求 this.addForm.goods_cat 是一个数组， 不能被重新赋值为 字符串
        // this.addForm.goods_cat = this.addForm.goods_cat.join(',') 这样写是不行的
        //  浅拷贝（引用传递,知识单纯的把 对象1 的引用，交给了 对象2 ，浅拷贝的结果 就是 对象1 和对象2 共同想用各一份内存）
        // const o2 = this.addForm
        // 深拷贝--把对象上的每个属性，重新开辟一块内存存储，拷贝的结果，得到两个完全独立的对象
        // 展开--运算符
        const o = {...this.addForm}
        o.goods_cat = o.goods_cat.join(',')
        // 循环渲染数组 dymanicParams 数组 把动态参数数组中的每一项，处理一下。得到（attr_id:'动态参数id',attr_value:动态参数值）
        console.log(this.dymanicParams)
        // map 数的新方法 把 原数组 中的每一项 做某些操作 返回并得到一个新数组
        // const arr1 = this.dymanicParams.map(item => {
        //   return {attr_id: item.attr_id, attr_value: item.attr_vals}
        // })
        const arr1 = this.dymanicParams.map(item => ({attr_id: item.attr_id, attr_value: item.attr_vals}))
        const arr2 = this.staticParams.map(item => ({attr_id: item.attr_id, attr_value: item.attr_vals}))
        //  完成 对静态参数 和 动态属性 的处理过程
        o.attrs = [...arr1, ...arr2]

        // 发起请求 添加商品
        const {data: res} = await this.$http.post('goods', o)
        if (res.meta.status !== 201) return this.$message.error('添加商品失败')
        // 跳转到列表页
        this.$router.push('/goods/list')
      })
    }
  }
}
