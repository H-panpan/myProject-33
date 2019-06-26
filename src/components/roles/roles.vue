<template>
  <div>
    <bread one="权限管理" two="角色列表"/>
    <el-button plain class="mybtn">添加角色</el-button>
    <el-table :data="rolesList" style="width: 100%" border>
       <el-table-column type="expand">
      <template slot-scope="scope">

        <el-row v-for="(item1,index1) in scope.row.children" :key="index1">
          <el-col :span='4'><el-tag @close="delRight(scope.row.id, item1.id, scope.row)" class="tag1" closable>{{item1.authName}} {{item1.id}}</el-tag><i class='el-icon-arrow-right'></i></el-col>
          <el-col :span='20'>
            <el-row v-for="(item2,index2) in item1.children" :key="index2">
              <el-col :span="5">
                                    <!-- 二级权限 -->
                                    <el-tag @close="delRight(scope.row.id, item2.id, scope.row)" class="tag2" closable type="success">{{ item2.authName }} {{ item2.id }} </el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>

             <el-col :span="19">
                                    <!-- 三级权限 -->
                                    <el-tag @close="delRight(scope.row.id, item3.id, scope.row)" class="tag3" v-for="(item3, index3) in item2.children" :key="index3" closable type="danger">{{ item3.authName }} {{ item3.id }} </el-tag>
                                </el-col>

              </el-row>
          </el-col>
        </el-row>
      </template>

    </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="526"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="526"></el-table-column>
      <el-table-column label="操作" width="526">

  <el-button type="primary" icon="el-icon-edit" plain size='mini'></el-button>
  <el-button type="danger" icon="el-icon-delete" plain size='mini'></el-button>
  <el-button type="warning" icon="el-icon-check" plain size='mini'></el-button>

      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import bread from '../layout/breadnav.vue'
export default {
  data () {
    return {
      rolesList: []
    }
  },
  components: {
    bread: bread
  },
  methods: {
    getrolesList () {
      this.$http({
        method: 'get',
        url: 'roles'
      }).then(res => {
        console.log(res)
        let {data, meta} = res.data
        if (meta.status === 200) {
          this.rolesList = data
        }
      })
    },
    delRight (roleId, rightId, scoperow) {
      this.$http({
        method: 'delete',
        url: `roles/${roleId}/rights/${rightId}`
      }).then(res => {
        let {data, meta} = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          scoperow.children = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getrolesList()
  }
}
</script>

<style>
.mybtn {
  margin-top: 15px;
  margin-bottom: 15px;
}
.tag1,.tag2,.tag3{
  margin-bottom: 10px;
}
.tag3{
  margin-right: 10px;
}
</style>
