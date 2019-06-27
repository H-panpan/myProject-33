<template>
  <div>
    <bread one="权限管理" two="角色列表"/>
    <el-button plain class="mybtn">添加角色</el-button>
    <el-table :data="rolesList" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item1,index1) in scope.row.children" :key="index1">
            <el-col :span="4">
              <el-tag
                @close="delRight(scope.row.id, item1.id, scope.row)"
                class="tag1"
                closable
              >{{item1.authName}} {{item1.id}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,index2) in item1.children" :key="index2">
                <el-col :span="5">
                  <!-- 二级权限 -->
                  <el-tag
                    @close="delRight(scope.row.id, item2.id, scope.row)"
                    class="tag2"
                    closable
                    type="success"
                  >{{ item2.authName }} {{ item2.id }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>

                <el-col :span="19">
                  <!-- 三级权限 -->
                  <el-tag
                    @close="delRight(scope.row.id, item3.id, scope.row)"
                    class="tag3"
                    v-for="(item3, index3) in item2.children"
                    :key="index3"
                    closable
                    type="danger"
                  >{{ item3.authName }} {{ item3.id }}</el-tag>
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
        <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        <el-button type="warning" @click="openroles(scope.row.children,scope.row.id)" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="rolesDialog">
      <el-tree  ref='mytree'
        :default-expand-all="true"
        :data="rolesdata"
        show-checkbox
        node-key="id"
        :default-checked-keys="roleskeys"
        :props="propsObj"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesDialog = false">取 消</el-button>
        <el-button @click='rolesfn' type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bread from '../layout/breadnav.vue'
export default {
  data () {
    return {
      rolesList: [],
      rolesDialog: false,
      rolesdata: [],
      propsObj: {
        label: 'authName'
      },
      roleskeys: [],
      roleId: 0
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
        let { data, meta } = res.data
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
        let { data, meta } = res.data
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
    },
    openroles (dataList, roleId) {
      this.roleId = roleId
      this.roleskeys = []
      this.$http({
        url: 'rights/tree'
      }).then(res => {
        let { meta, data } = res.data
        if (meta.status === 200) {
          this.rolesdata = data
          dataList.forEach((item1) => {
            item1.children.forEach((item2) => {
              item2.children.forEach((item3) => {
                this.roleskeys.push(item3.id)
              })
            })
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
      this.rolesDialog = true
    },
    rolesfn () {
      let allIds = this.$refs.mytree.getCheckedKeys()
      // 得到半选
      let halfIds = this.$refs.mytree.getHalfCheckedKeys()
      // 接收
      let rids = [...allIds, ...halfIds]
      this.$http({
        method: 'post',
        url: `roles/${this.roleId}/rights`,
        data: {
          rids: rids.join(',')
        }
      }).then(res => {
        let {meta} = res.data
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          this.rolesDialog = false
          this.getrolesList()
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
.tag1,
.tag2,
.tag3 {
  margin-bottom: 10px;
}
.tag3 {
  margin-right: 10px;
}
</style>
