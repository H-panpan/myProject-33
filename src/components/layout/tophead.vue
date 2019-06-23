<template>

      <el-row class="mylogo">
        <el-col :span="4">
          <img src="../../assets/imges/logo.png" alt>
        </el-col>
        <el-col :span="14">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="6">
          <a href="#" @click.prevent="logout">退出</a>
        </el-col>
      </el-row>

</template>

<script>
export default {
  methods: {
    logout () {
      this.$confirm('你确定要退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('token')
        // this.$router.push('/login')
        this.$router.push({name: 'login'})
        this.$message({
          message: '退出成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style>

</style>
