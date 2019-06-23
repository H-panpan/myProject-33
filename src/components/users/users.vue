<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="6">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
            <el-button slot="append" @click.prevent='search' icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button class="btn" type="success" plain>成功按钮</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="username" label="姓名" width="120"></el-table-column>
      <el-table-column property="email" label="邮箱" width="120"></el-table-column>
      <el-table-column property="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          {{ scope.row }}
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-row>
            <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
            <el-button type="warning" icon="el-icon-check" plain size="mini"></el-button>
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
      :total="total">
    </el-pagination>
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
      total: 0
    }
  },
  methods: {
    getDataList () {
      this.$http({
        method: 'get',
        url: `http://localhost:8888/api/private/v1/users?query=${
          this.query
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      })
        .then(res => {
          let { data, meta } = res.data
          if (meta.status === 200) {
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
}
.btn {
  margin-left: 10px;
  margin-top: 15px;
}
</style>
