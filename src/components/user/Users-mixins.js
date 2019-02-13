export default {
  data() {
    return {
      // 搜索关键字
      keywords: '',
      // 当前页码值
      nowPage: 1,
      // 每页显示几条数据
      pageSize: 2,
      // 总共有几条数据
      total: 0,
      userList: [],
      dialogVisible: false,
      // 添加用户的数据
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户数据的表单验证规则
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ]
      },
      // 控制编辑用户的显示和隐藏
      editUserDialogVisible: false,
      // 编辑用户的表单
      editUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: -1
      },
      // 编辑用户的表单的验证规则
      editUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
        ]
      },
      // 展示分配角色对话框的显示和隐藏
      setRoleDialogVisible: false,
      // 分配权限的表单数据
      setRoleForm: {
        // 用户新角色的ID
        newRoleId: ''
      },
      // 获取角色列表
      rolesList: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      // 发起请求  获取用户数据列表
      const {data: res} = await this.$http.get('users', {params: {query: this.keywords, pagenum: this.nowPage, pagesize: this.pageSize}})
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userList = res.data.users
      // 获取当前总共有几条数据
      this.total = res.data.total
      console.log(this.userList)
    },
    // 每当用户的状态被修改以后 触发这个回调
    async stateChanged(row) {
      // console.log(newstate)
      // console.log(row.id + '-----' + row.mg_state)
      const {data: res} = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
      if (res.meta.status !== 200) return this.$message.error('修改用户状态失败')
      this.$message.success('修改用户状态成功')
    },
    // 每页显示多少条数据
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.pageSize = newSize
      this.getUserList()
    },
    // 当前显示的是第几页
    handleCurrentChange(pageNum) {
      // console.log(pageNum)
      this.nowPage = pageNum
      this.getUserList()
    },
    // 清空表单数据
    resetDialog() {
      this.$refs.addUserFormRef.resetFields()
    },
    // 点击按钮 添加 新用户
    addUser() {
      // 1.要验证表单是否合法
      // 2.如果合法，发起请求，添加用户
      // 3.如果添加成功，则重新刷新列表
      this.$refs.addUserFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('users', this.addUserForm)
        if (res.meta.status !== 201) return this.$message('添加用户失败')
        this.$message.success('添加用户成功')
        this.getUserList()
        // 关闭对话框
        this.dialogVisible = false
      })
    },
    // 删除用户
    async removeUser(scope) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // console.log(confirmResult)
      // 用户取消了删除
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      // 发起用户删除请求
      const {data: res} = await this.$http.delete('users/' + scope.row.id)
      if (res.meta.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getUserList()
    },
    // 重置编辑页面的form表单
    resetEditForm() {
      this.$refs.editUserFormRef.resetFields()
    },
    // 点击按钮 保存用户信息
    editUser() {
      // 验证表单
      this.$refs.editUserFormRef.validate(async valid => {
        if (!valid) return
        // 发起请求
        const {data: res} = await this.$http.put('users/' + this.editUserForm.id, {
          email: this.editUserForm.email,
          mobile: this.editUserForm.mobile
        })
        // 判断是否 提交成功
        if (res.meta.status !== 200) return this.$message.error('编辑用户信息失败')
        this.$message.success('编辑用户信息成功')
        this.getUserList()
        this.editUserDialogVisible = false
      })
    },
    // 点击编辑按钮 展示编辑对话框
    async showEditDialog(scope) {
      this.editUserDialogVisible = true
      // this.editUserForm = scope.row 这样不能保证数据是最新的
      // 因此我们要根据 ID 来查询数据，保证其是最新的
      const {data: res} = await this.$http.get('users/' + scope.row.id)
      // console.log(res)
      // if (res.meta.status !== 200) return this.$message.error('获取数据失败')
      this.editUserForm.username = res.data.username
      this.editUserForm.email = res.data.email
      this.editUserForm.mobile = res.data.mobile
      // 把 id 存储到 表单中，从而方便 保存
      this.editUserForm.id = res.data.id
    },
    // 点击按钮 展示分配角色对话框
    async showSetRoleDialog(scope) {
      // 查询用户信息
      const id = scope.row.id
      const {data: res} = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('获取用户信息失败')
      // 当获取用户信息成功 显示对话框
      this.setRoleDialogVisible = true
      // 注意，根据 ID 从服务器获取回来的数据中，不包含 用户当前的角色名称
      // this.setRoleForm = res.data
      this.setRoleForm.id = res.data.id
      this.setRoleForm.username = res.data.username
      // 从 scope 上 获取用户 当前的角色名称
      this.setRoleForm.role_name = scope.row.role_name
      // 调用接口，获取所有角色的名称
      const {data: roles} = await this.$http.get('roles')
      console.log(roles)
      if (roles.meta.status !== 200) this.$message.error('获取角色列表失败')
      this.rolesList = roles.data
    },
    // 点击按钮，设置新的角色
    async setNewRole() {
      // console.log(this.setRoleForm)
      const {data: res} = await this.$http.put(`users/${this.setRoleForm.id}/role`, {rid: this.setRoleForm.newRoleId})
      if (res.meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      this.getUserList()
      this.setRoleDialogVisible = false
    }
  }
}
