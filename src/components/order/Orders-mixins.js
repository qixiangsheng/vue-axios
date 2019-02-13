import areas from './city_data2017_element.js'
export default{
  data() {
    return {
      // 搜索的关键字
      keywords: '',
      // 订单列表数据
      orderList: [],
      // 展示第几页的 订单
      pagenum: 1,
      // 每页显示多少条记录
      pagesize: 10,
      // 总记录数
      total: 0,
      // 编辑，地址的对话框是否显示
      editAddressDialogVisible: false,
      editAddressForm: {
        // 省 市 区 /县
        lev1Address: [],
        // 详细地址
        lev2Address: ''
      },
      editAddressFormRules: {
        // 省 市 区 / 县
        lev1Address: [{required: true, message: '请输入省市区/县', trigger: 'blur'}],
        lev2Address: [{required: true, message: '请输入详细地址', trigger: 'blur'}]
      },
      // 所有省 市 区县的数据
      areas: areas,
      // 每一项的对应关系
      propsOption: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      // 物流对话框 是否显示
      logisticsDialogVisible: false,
      // 物流信息地址
      logisticsAddress: []
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // 获取订单数据
    async getOrderList() {
      const {data: res} = await this.$http.get('orders', {
        params: {
          query: this.keywords,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (res.meta.status !== 200) return this.$message.error('获取订单列表失败')
      this.total = res.data.total
      this.orderList = res.data.goods
      // console.log(res.data)
    },
    // 分页的pagesize改变
    handleSizeChange(newSize) {
      this.pagesize = newSize
      this.getOrderList()
    },
    // 页码值变化
    handleCurrentChange(newPage) {
      this.pagenum = newPage
      this.getOrderList()
    },
    // 监听省市区县改变的事件
    handleAreasChanged() {
      console.log(this.editAddressForm.lev1Address)
    },
    async showLogisticsDialog(scope) {
      // 写死一个订单号
      const orderNo = '1106975712662'
      // 获取物流信息
      const {data: res} = await this.$http.get('kuaidi/' + orderNo)
      if (res.meta.status !== 200) return this.$message.error('获取物流失败')
      this.logisticsAddress = res.data.reverse()
      console.log(res.data)
      // 展示物流对话框
      this.logisticsDialogVisible = true
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
