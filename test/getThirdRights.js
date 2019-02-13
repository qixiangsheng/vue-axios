// 在这个文件中 尝试获取 主管角色下 所有的三级权限的 id
const role = require('./tree_data.js')

// 先定义 一个 空数组，keys 来保存 所有的 三级权限 的 id
const keys = []

// 获取所有三级权限的 ID 值
function getThirdRightsId(node, keys) {
  // 如果节点没有 children 属性，证明它是三级节点
  // 如果节点有 children 属性 但是 children 的数组 为空。这时候，不会进入 if 分支
  if (!node.children) {
    // 直接把 三级节点的 ID ，push 到 KEYS 中
    // 这就是结束条件，当没有 children 属性了。直接把 ID push 到 keys 中。从而结束 当前这个 递归链
    keys.push(node.id)
  } else {
    // 证明这个不是 第三级 节点 那么 这个节点 必然有 children 属性
    node.children.forEach(item => getThirdRightsId(item, keys))
  }
}

getThirdRightsId(role, keys)
console.log(keys)


