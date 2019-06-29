<template>
   <el-menu :router='true' class="mymenu el-menu-vertical-demo" :unique-opened='true'>

          <el-submenu v-for="(item,index) in mumelist" :key="index" :index="item.path">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item v-for="(item1,index1) in item.children" :key="index1" :index="'/'+item1.path">
              <i class="el-icon-menu"></i>
              <span>{{item1.authName}}</span>
              </el-menu-item>
          </el-submenu>
        </el-menu>
</template>

<script>
export default {
  data () {
    return {
      mumelist: []
    }
  },
  methods: {
    getmemulist () {
      this.$http({
        url: 'menus'
      }).then(res => {
        let {meta, data} = res.data
        if (meta.status === 200) {
          this.mumelist = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getmemulist()
  }
}
</script>

<style>

</style>
