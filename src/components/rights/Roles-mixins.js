export default{
  data() {
    return {
      // 角色列表
      rolesList: [],
      // 控制 分配权限对话框的 此案适合隐藏
      setRoleDialogVisible: false,
      // 权限树形结构的数据
      treeData: [],
      treeProps: {
        label: 'authName', // 指定了 tree 中每个节点 展示的名称。所对应的属性
        children: 'children' // 指定了 树形结构中 使用哪个属性 进行嵌套
      },
      // 默认被勾选的 树形节点
      defaultCheckedKeys: [],
      // 被选中 的角色 id
      selectedRoleId: ''
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取所有的角色列表
    async getRolesList() {
      const {data: res} = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.rolesList = res.data
      // console.log(this.rolesList)
    },
    // 点击 tag 标签 移除角色下的指定权限
    async removeTag(scope, rightsId) {
      // 1.弹框提示用户是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该权限，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 2.用户取消了删除
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      // 3.执行删除的请求
      const {data: res} = await this.$http.delete(`roles/${scope.row.id}/rights/${rightsId}`)
      if (res.meta.status !== 200) return this.$message.error('删除权限失败')
      this.$message.success('删除权限成功')
      // 这里 当我们删除 某个权限以后，服务器将最新的 权限列表 返回给了我们。
      // 因此 我们只需要将 当前的 scope 更新成服务器返回给我们的数据即可
      // console.log(res)
      scope.row.children = res.data
    },
    // 点击按钮 展示 分配权限 的弹出层
    async showSetRoleDialog(scope) {
      // 把角色的 ID 保存到 data 中
      this.selectedRoleId = scope.row.id
      // 获取权限的 树形 结构数据
      const {data: res} = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('获取权限列表失败')
      this.treeData = res.data
      console.log(this.treeData)
      this.getLeafKeys(scope.row, this.defaultCheckedKeys)
      // console.log(this.defaultCheckedKeys)
      this.setRoleDialogVisible = true
    },
    // 递归获取所有三级权限的 ID
    getLeafKeys(node, keys) {
      if (!node.children) {
        keys.push(node.id)
      } else {
        node.children.forEach(item => this.getLeafKeys(item, keys))
      }
    },
    // 分配权限对话框关闭前 清空权限分配信息
    setRoleDialogClosed() {
      // 清空 属性结构的数据
      this.treeData = []
      // 清空默认选中项
      this.defaultCheckedKeys = []
    },
    // 权限选择完成，保存当前所选的权限，发送请求
    async saveRights() {
      // 1.获取 所有被 勾选的 权限
      // 2. 获取 所有 被 半选 的权限
      const k1 = this.$refs.tree.getCheckedKeys()
      const k2 = this.$refs.tree.getHalfCheckedKeys()
      // console.log(k1)  // 返回全选的节点，不分等级
      // console.log(k2) // 返回半选的节点  一般为第一层和第二层的节点
      //  es6 的展开运算符
      const keys = [...k1, ...k2]
      const {data: res} = await this.$http.post(`roles/${this.selectedRoleId}/rights`, {
        rids: keys.join(',')
      })
      if (res.meta.status !== 200) return this.$message.error('分配权限失败！')
      this.$message.success('分配权限成功')
      this.setRoleDialogVisible = false
      this.getRolesList()
    }
  }
}
