<template>
    <div class='mylogin'>
    <div class='myloginbox'>
        <h2>用户登录</h2>
       <el-form :rules="rules"  :model="useObj" label-position="top" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop='username' >
    <el-input type="text" v-model="useObj.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop='password'>
    <el-input type="password" v-model="useObj.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button class='loginbtn' type="primary" @click.prevent='login'>登录</el-button>

  </el-form-item>
</el-form>
    </div>

    </div>
</template>

<script>
export default {
  data () {
    return {
      useObj: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }

    }
  },
  methods: {
    login () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http({
            method: 'post',
            url: 'login',
            data: this.useObj
          }).then(res => {
            let {data, meta} = res.data
            if (meta.status === 200) {
              window.localStorage.setItem('token', data.token)
              this.$router.push('/')
              this.$message({
                message: meta.msg,
                type: 'success'
              })
            } else {
              this.$message.error(meta.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('不合法')
        }
      })
    }
  }
}
</script>

<style>
.mylogin{
    width: 100%;
    height: 100%;
    background-color: #324152;
    position: relative;
}
.myloginbox{
     width: 580px;
    height: 440px;
    background-color: #fff;
    position: absolute;
    top:50%;
    left: 50%;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    padding: 40px;
    box-sizing: border-box;

}
.loginbtn{
    width: 100%;
}
</style>
