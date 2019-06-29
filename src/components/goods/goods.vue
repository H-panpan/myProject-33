<template>
  <div>
    <bread one="商品管理" two="商品列表"/>
    <el-row>
      <el-col :span="6">

        <el-input placeholder="请输入内容" v-model="query" class="input-with-select myinput">
          <el-button slot="append" @click.prevent="search" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-button class="mygoodsbtn" type="success" @click="addgoods" plain>添加商品</el-button>
    </el-row>
    <el-table :data="goodsData" style="width: 100%" border>
      <el-table-column prop="goods_name" label="商品名称" width="600"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" ></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="goods_number" label="商品数量"></el-table-column>

      <el-table-column prop="add_time" label="创建时间"><template slot-scope="scope">{{scope.row.add_time | dateFormat}}</template></el-table-column>

      <el-table-column  label="操作">
        <el-button type="primary" size="mini" icon="el-icon-edit" plain></el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" plain></el-button>
      </el-table-column>
    </el-table>
    <el-pagination
     @size-change="sizechange"
      @current-change="currchange"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import bread from '../layout/breadnav.vue'

export default {
  data () {
    return {
      goodsData: [],
      query: '',
      pagenum: 1,
      pagesize: 10,
      total: 0,
      pagesizes: [10, 20, 30]

    }
  },
  components: {
    bread: bread
  },
  methods: {
    getgoodslist () {
      this.$http({
        url: `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      }).then(res => {
        let {meta, data} = res.data
        if (meta.status === 200) {
          this.goodsData = data.goods
          this.total = data.total
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    sizechange (sizechange) {
      this.pagesize = sizechange
      this.getgoodslist()
    },
    currchange (currchange) {
      this.pagenum = currchange
      this.getgoodslist()
    },
    search () {
      this.getgoodslist()
    },
    addgoods () {
      this.$router.push('/goods/add')
    }
  },
  mounted () {
    this.getgoodslist()
  }
}
</script>

<style>
.myinput {
  margin: 20px 0px;
}
.mygoodsbtn {
  margin: 20px 0px;
  margin-left: 10px;
}
</style>
