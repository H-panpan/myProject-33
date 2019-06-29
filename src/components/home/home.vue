<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
    <TopHead />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏 -->
       <SideBar />
      </el-aside>
      <el-main>
        <!-- 内容区 -->
       <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TopHead from '@/components/layout/tophead'
import SideBar from '@/components/layout/sidebar'
export default {
  components: {
    TopHead: TopHead,
    SideBar: SideBar
  },
  mounted () {
    // let token = window.localStorage.getItem('token')
    // if (!token) {
    //   this.$router.push('/login')
    //   this.$message.error('你还没登录,请先登录')
    // }
  }
}
</script>

<style>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}

.mylogo img {
  float: left;
}
.mylogo h2 {
  margin: 0;
  padding: 0px;
  color: #fff;
}
.mylogo a {
  float: right;
  text-decoration: none;
  color: red;
}
.mymenu{
  height: 100%;
}
</style>
