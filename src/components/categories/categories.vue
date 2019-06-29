<template>
  <div>
    <bread one="商品管理" two="商品分类"/>
    <el-button class="clbtn" @click="cateadd" type="success" plain>添加分类</el-button>
    <el-table :data="pagecatelist" style="width: 100%" border v-loading="loading">
      <el-table-tree-column
        file-icon="icon icon-file"
        folder-icon="icon icon-folder"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        prop="cat_name"
        label="分类名称"
        width="200"
      ></el-table-tree-column>
      <el-table-column label="级别" width="180">
        <template
          slot-scope="scope"
        >{{scope.row.cat_level===0? '一级':scope.row.cat_level===1?'二级':'三级'}}</template>
      </el-table-column>
      <el-table-column label="是否有效" width="180">
        <template slot-scope="scope">{{scope.row.cat_deleted?'无效':'有效'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" size="mini" icon="el-icon-edit" plain></el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" plain></el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizechage"
      @current-change="currentchange"
      :page-sizes="pagesize"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageleng"
    ></el-pagination>
    <!-- 新增分类页面 -->
    <el-dialog title="新增分类" :visible.sync="showcate">
      <el-form>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model='cascvalue'></el-input>
        </el-form-item>
        <el-form-item label="选择分类" :label-width="formLabelWidth">
          {{casevalue}}
          <el-cascader placeholder='默认添加一级分类' clearable v-model='casevalue' :options="optionsarr" :props="propsObj"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showcate = false">取 消</el-button>
        <el-button type="primary" @click="cascaddfn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bread from '../layout/breadnav.vue'
export default {
  data () {
    return {
      cltableData: [],
      pageleng: 0,
      pagesize: [5, 15, 20],
      pagenum: 1,
      pageall: 5,
      pagecatelist: [],
      loading: true,
      formLabelWidth: '80px',
      showcate: false,
      optionsarr: [],
      casevalue: [],
      propsObj: { expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        checkStrictly: true},
      cascvalue: ''
    }
  },
  components: {
    bread: bread
  },
  methods: {
    getcllist () {
      this.$http({
        url: 'categories'
      }).then(res => {
        console.log(res)

        let { meta, data } = res.data
        this.pageleng = data.length

        if (meta.status === 200) {
          this.cltableData = data
          this.getpage()
          setTimeout(() => {
            this.loading = false
          }, 0.5)
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    getpage () {
      let begin = this.pageall * (this.pagenum - 1)
      let and = this.pageall * this.pagenum
      this.pagecatelist = this.cltableData.slice(begin, and)
    },
    currentchange (currpage) {
      this.pagenum = currpage
      this.getcllist()
    },
    sizechage (sizeChane) {
      this.pageall = sizeChane
      this.getcllist()
    },
    cateadd () {
      this.showcate = true
      this.$http({
        url: 'categories?type=2'
      }).then(res => {
        console.log(res)

        let { meta, data } = res.data
        if (meta.status === 200) {
          this.optionsarr = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    cascaddfn () {
      let pid = this.casevalue.length === 0 ? 0 : this.casevalue[this.casevalue.length - 1]
      this.$http({
        method: 'post',
        url: 'categories',
        data: {
          cat_pid: pid,
          cat_name: this.cascvalue,
          cat_level: this.casevalue.length
        }
      }).then(res => {
        let {meta} = res.data
        if (meta.status === 201) {
          this.$message.success(meta.msg)
          this.getcllist()
        } else {
          this.$message.error(meta.msg)
        }
      })

      this.showcate = false
    }
  },
  mounted () {
    this.getcllist()
  }
}
</script>

<style>
.clbtn {
  margin: 15px 0;
}
</style>
