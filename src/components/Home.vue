<template>
  <el-container>
    <el-header>
      <img src="../assets/images/logo.png" alt="">
      <h3 class="title">电商后台管理系统</h3>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :style="{width:isCollapse ? '65px':'200px'}">
         <div class="toggleBar" @click="isCollapse = !isCollapse">|||</div>
         <el-menu :collapse-transition="false" :collapse="isCollapse" default-active="2" background-color="#333744" text-color="white" :unique-opened="true" :router="true">
            <el-submenu :index="(i+1).toString()" v-for="(item, i) in menus" :key="item.id" :style="{width:isCollapse ? '65px':'200px'}">
              <template slot="title">
                <i :class="['iconfont',menuIcons[i]]" style="margin-right:10px"></i>
                <span style="font-size:13px">{{item.authName}}</span>
              </template>
              <el-menu-item style="font-size:13px" :index="'/'+ subitem.path" v-for="(subitem) in item.children" :key="subitem.id"><i class="el-icon-menu"></i>{{subitem.authName}}</el-menu-item>
            </el-submenu>
         </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import mix from './Home-mixin.js'
export default{
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.el-container{
  widows: 100%;
  height: 100%;
  .el-header{
    background-color: #373d41;
    height: 60px;
    padding: 0;
    user-select:none;
    .title{
      float:left;
      color:white;
      margin-left:15px;
      font-weight:200;
      user-select:none;
    }
    img{
      float:left;
    }
    .el-button{
      float:right;
      margin:10px 20px 0 0;
    }
  }
  .el-aside{
    background-color: #333744;
     user-select:none;
    .toggleBar{
      background-color:#4a5064;
      color:#fff;
      font-size:12px;
      line-height:26px;
      text-align: center;
      letter-spacing:0.2em;
      cursor:pointer;
      user-select:none;
    }
  }
}
</style>
