<template>
  <div class="login-container">
    <!--登录框-->
    <div class="login-box">
      <div class="avactor"><img src="../assets/logo.png" alt=""></div>
       <!--登录表单-->
    <el-form :model="loginForm" :rules="loginFormrules" ref="loginFormRef"  class="demo-ruleForm">
      <el-form-item  prop="username">
        <el-input
          placeholder="登录名称"
          v-model="loginForm.username">
          <!--使用 i 标签的 slot 设置文本框的小图标-->
          <i slot="prefix" class="iconfont icon-user"></i>
        </el-input>
      </el-form-item>
       <el-form-item  prop="password">
        <el-input
          placeholder="登录密码"
          :type="isPwd ? 'password':'text'"
          v-model="loginForm.password">
          <!--<i slot="prefix" v-if="isPwd===true" class="iconfont icon-3702mima" @click="isPwd = !isPwd"></i>
          <i slot="prefix" v-if="isPwd===false" class="iconfont icon-showpassword" @click="isPwd = !isPwd"></i>-->
          <!--使用 vue 的方式，设置类名-->
          <i slot="prefix" :class="['iconfont', isPwd ? 'icon-3702mima':'icon-showpassword']" @click="isPwd = !isPwd"></i>
        </el-input>
      </el-form-item>
      <el-row>
        <el-col>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    </div>
  </div>
  </template>

<script>
// 导入属于自己的mixins文件
import Mix from './Login-mixins.js'

export default {
  mixins: [Mix]
}
</script>

<style scoped lang="less">
 /*如果要让 style 标签 支持 less语法*/
 /*
 1.添加 lang="less" 属性
 2.安装 cnpm i less-loader less -D
 */
.login-container{
  height:100%;
  background-color:#2B4B6B;
  .login-box{
    width: 450px;
    height: 304px;
    background-color:#fff;
    position: absolute;
    top: 20%;
    left: 50%;
    transform:translateX(-50%);
    border-radius:10px;
    .avactor{
      width: 120px;
      height: 120px;
      padding:10px;
      border:1px solid #eee;
      box-shadow:0px 1px 5px #eee;
      border-radius:50%;
      background-color: #fff;
      position:relative;
      top:-60px;
      left:50%;
      transform:translateX(-50%);
      img{
        width: 100%;
        height:100%;
        border-radius:50%;
        background-color:#eee;
      }
    }
    .el-col{
      display:flex;
      justify-content: flex-end;
    }
    .el-form{
      padding:15px;
      position: relative;
      top:-40px;
    }
  }
}
.icon-showpassword,
.icon-3702mima{
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover{
    color:darkred
  }
}

</style>
