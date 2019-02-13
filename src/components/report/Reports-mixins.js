// 导入 echarts
import echarts from 'echarts'
// 导入 _
import _ from 'lodash'
export default {
  data() {
    return {
      // 定义报表数据为空对象
      reportData: {},
      // 报表实例
      myChart: '',
      // 折线图的一些配置项
      options: {
        tiele: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ]
        }
      }
    }
  },
  methods: {
    // 获取报表的数据
    async getReportsData() {
      const {data: res} = await this.$http.get('reports/type/1')
      if (res.meta.status !== 200) return this.$message.error('获取报表失败')
      // console.log(res)
      // 把 服务器返回来的报表数据 赋值给 reportData
      this.reportData = res.data

      const newData = _.merge(this.options, res.data)

      // 绘制图表 调用 setOption 初始化 myChart的数据
      this.myChart.setOption(newData)
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById('main'))
    this.myChart = echarts.init(this.$refs.echartsArea)
    this.getReportsData()
  }
}
