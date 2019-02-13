export default{
  data() {
    return {
      // 权限列表
      rightLists: []
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    // 获取权限列表
    async getRightsList() {
      // 根据接口文档 rights/:type 传递一个 type(list or tree) 来显示不同样式的权限列表
      const {data: res} = await this.$http.get('rights/list')
      if (res.meta.status !== 200) return this.$message.error('获取权限列表失败')
      this.rightLists = res.data
      // console.log(res)
    }
  }
}
