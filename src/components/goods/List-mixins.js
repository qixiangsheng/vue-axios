export default {
  data() {
    return {
      // 搜索的关键字
      keywords: '',
      // 商品列表数据
      goodslist: [],
      // 当前显示的页码值
      pagenum: 1,
      // 默认每页显示多少条数据
      pagesize: 10,
      // 总的数据条数
      total: 0
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表
    async getGoodsList() {
      const {data: res} = await this.$http.get('goods', {
        params: {
          query: this.keywords,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (res.meta.status !== 200) return this.$message.error('获取商品列表失败')
      this.goodslist = res.data.goods
      this.total = res.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.pagesize = newSize
      this.getGoodsList()
    },
    // 监听 页码值改变的事件
    handleCurrentChange(newPage) {
      this.pagenum = newPage
      this.getGoodsList()
    },
    // 根据 id 删除对应的商品
    async removeGoods(scope) {
      // 提示用户是否要删除
      const confirmResult = await this.$confirm('此操作将永远删除该商品，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 用户取消了删除
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      // 发起请求
      const {data: res} = await this.$http.delete('goods/' + scope.row.goods_id)
      if (res.meta.status !== 200) return this.$message.error('删除商品失败')
      this.$message.success('删除商品成功')
      this.getGoodsList()
    }
  },
  filters: {
    //  格式化时间 的 过滤器
    dateFormat(originVal) {
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1).toString().padStart(2, '0')
      const d = dt.getDate().toString().padStart(2, '0')

      const hh = dt.getHours().toString().padStart(2, '0')
      const mm = dt.getMinutes().toString().padStart(2, '0')
      const ss = dt.getSeconds().toString().padStart(2, '0')

      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
  }
}
