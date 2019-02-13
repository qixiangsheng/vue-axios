export default{
  data() {
    return {
      menus: [],
      menuIcons: ['icon-users', 'icon-tijikongjian', 'icon-shangpingouwudai2', 'icon-danju-tianchong', 'icon-baobiao'],
      isCollapse: false
    }
  },
  created() {
    this.getMenus()
  },
  methods: {
    // 点击退出登录
    logout() {
      sessionStorage.removeItem('token')
      // 编程式导航
      this.$router.push('/login')
    },
    // 获取左侧导航条数据
    async getMenus() {
      const {data: res} = await this.$http.get('menus')
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取左侧菜单数据失败')
      this.menus = res.data
      console.log(this.menus)
    }
  }
}
