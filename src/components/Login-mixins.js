export default {
  data() {
    return {
      msg: '登录页面',
      isPwd: true,
      // 登录表单对象
      loginForm: {
        username: '',
        password: ''
      },
      // 登录表单验证规则
      loginFormrules: {
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击按钮重置表单
    reset() {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录方法
    login() {
      // 验证表单的完整性
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return this.$message.box('请填写完整登录信息')
        const {data: res} = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.message.error('登录失败!')
        this.$message.success('登录成功！')
        // console.log(res)
        // 当登录成功后，将服务端发的令牌 保存到sessionStorage中
        sessionStorage.setItem('token', res.data.token)
        // sessionStorage.setItem('token', 'token')
        // 通过 编程式导航，跳转到咱们的后台首页 路由地址 /home
        this.$router.push('/home')
      })
    }
  }
}
