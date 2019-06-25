<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="6">
        <div class="mypage">
          <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
            <el-button slot="append" @click.prevent="search" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button class="btn" type="success" @click.prevent="addOpen" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="username" label="姓名"></el-table-column>
      <el-table-column property="email" label="邮箱"></el-table-column>
      <el-table-column property="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          {{ scope.row }}
          <el-switch
            v-model="scope.row.mg_state"
            @change="setchange(scope.row.id,scope.row.mg_state)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          {{scope.row.id}}
          <el-row>
            <el-button
              type="primary"
              @click.prevent="editopen(scope.row.id)"
              icon="el-icon-edit"
              plain
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              @click.prevent="deluser(scope.row.id)"
              icon="el-icon-delete"
              plain
              size="mini"
            ></el-button>
            <el-button
              type="warning"
              @click.prevent="roleuser(scope.row.id)"
              icon="el-icon-check"
              plain
              size="mini"
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="curChange"
      @size-change="sizeChange"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户信息对话框 -->
    <el-dialog title="添加用户" :visible.sync="showlable">
      {{formuser}}
      <el-form :model="formuser">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formuser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formuser.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formuser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formuser.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeuser">取 消</el-button>
        <el-button type="primary" @click.prevent="addUsers">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户信息对话框 -->
    <el-dialog title="添加用户" :visible.sync="edishowlable">
      {{edituser}}
      <el-form :model="edituser">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="edituser.username" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="edituser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="edituser.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edishowlable=false">取 消</el-button>
        <el-button type="primary" @click.prevent="editUsers">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="roleslable">
      <el-form :model="roleUser">
        <el-form-item label="当前用户" :label-width="formLabelWidth">
          <el-input v-model="roleUser.username" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色选择" :label-width="formLabelWidth">
          {{roleUser.rid}}
          <el-select v-model="roleUser.rid" placeholder="请选择">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="item in selroleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="roleslable=false">取 消</el-button>
        <el-button type="primary" @click.prevent="rolesUsersfn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 5,
      pagesizes: [5, 10, 15],
      total: 0,
      showlable: false,
      edishowlable: false,
      roleslable: false,
      formLabelWidth: '100px',
      formuser: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      edituser: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      },
      selroleList: [],
      roleUser: {
        username: '',
        id: '',
        rid: ''
      }
    }
  },
  methods: {
    getDataList () {
      this.$http({
        method: 'get',
        url: `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          if (data.users.length === 0 && this.pagenum !== 1) {
            this.pagenum--
            this.getDataList()
            return
          }
          this.tableData = data.users
          this.total = data.total
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    curChange (currentPage) {
      this.pagenum = currentPage
      // 重新请求数据
      this.getDataList()
    },
    sizeChange (pagesize) {
      // 将 pagesize 赋值给 this.pagesize
      this.pagesize = pagesize
      // 重新请求
      this.getDataList()
    },
    search () {
      this.pagenum = 1
      this.getDataList()
    },
    addOpen () {
      this.showlable = true
    },
    closeuser () {
      this.showlable = false
      this.formuser.username = ''
      this.formuser.password = ''
      this.formuser.email = ''
      this.formuser.mobile = ''
    },
    addUsers () {
      this.$http({
        method: 'post',
        url: 'users',
        data: this.formuser
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 201) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
        this.getDataList()
        this.showlable = false
        this.formuser.username = ''
        this.formuser.password = ''
        this.formuser.email = ''
        this.formuser.mobile = ''
      })
    },
    deluser (id) {
      this.$http({
        method: 'delete',
        url: `users/${id}`
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
        this.getDataList()
      })
    },
    editopen (id) {
      this.edishowlable = true
      this.$http({
        method: 'get',
        url: ` users/${id}`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.edituser.username = data.username
          this.edituser.email = data.email
          this.edituser.mobile = data.mobile
          this.edituser.id = data.id
        }
      })
    },
    editUsers () {
      this.$http({
        method: 'PUT',
        url: `users/${this.edituser.id}`,
        data: {
          email: this.edituser.email,
          mobile: this.edituser.mobile
        }
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
        this.edishowlable = false
        this.getDataList()
      })
    },
    roleuser (id) {
      this.roleslable = true
      this.$http({
        method: 'get',
        url: 'roles'
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.selroleList = data
          this.$http({
            method: 'get',
            url: `users/${id}`
          }).then(res => {
            console.log(res)
            let {data} = res.data
            this.roleUser.username = data.username
            this.roleUser.id = data.id
            this.roleUser.rid = data.rid
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    rolesUsersfn () {
      this.$http({
        method: 'put',
        url: `http://localhost:8888/api/private/v1/users/${
          this.roleUser.id
        }/role`,
        data: {
          rid: this.roleUser.rid
        }
      }).then(res => {
        let {meta} = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          this.roleslable = false
          this.getDataList()
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    setchange (uid, type) {
      this.$http({
        method: 'put',
        url: `users/${uid}/state/${type}`
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getDataList()
  }
}
</script>

<style>
.mypage {
  margin-top: 15px;
  margin-bottom: 7px;
}
.btn {
  margin-left: 10px;
  margin-top: 15px;
}
</style>
