<template>
  <div>
    <bread one="商品管理" two="商品列表"/>
    <el-alert class="myalert" title="消息提示的文案" type="info" center show-icon></el-alert>
    <el-steps :active="active" :space="200" align-center finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-tabs v-model="activeName" @tab-click="nexalert" :tab-position="tabPosition" class="mytabs">
      <el-tab-pane label="基本信息" name="first">
        <el-form ref="form" label-width="80px" label-position="top">
          <el-form-item label="商品名称" label-width="80px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品价格" label-width="80px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品重量" label-width="80px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品数量" label-width="80px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品分类" label-width="80px">
            {{cateCas}}
            <el-cascader v-model="cateCas" :options="classify" :props="propsObj" clearable></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="second">
        <div  v-for="(item,index) in goodsmany" :key="index">
          <div class="mydiv">{{item.attr_name}}</div>
          <el-checkbox v-for="(item1,index1) in item.attr_vals.split(',')" :key="index1" v-model="checked" class="mycheck" border>{{item1}}</el-checkbox>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="third">
        <el-form ref="form" label-position='top'>
          <el-form-item  label-width="80px" v-for="(item,index) in goodsonly" :key="index" :label="item.attr_name">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>

        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="fourth">
        <el-upload
  class="upload-demo"
  action="http://localhost:8888/api/private/v1/upload"
  :headers='uploadhimg'
  :on-success='imgsuccess'
  :on-remove='imgremove'
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  {{fileList}}

</el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="five">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import bread from '../layout/breadnav.vue'
export default {
  data () {
    return {
      tabPosition: 'left',
      active: 1,
      activeName: 'first',
      checked: true,
      classify: [],
      propsObj: { expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id' },
      cateCas: [],
      goodsmany: [],
      goodsonly: [],
      uploadhimg: {
        Authorization: window.localStorage.getItem('token')
      },
      fileList: []
    }
  },
  components: {
    bread: bread
  },
  methods: {
    nexalert (event) {
      this.active = +event.index
      if (event.index === '1') {
        this.getgoodslist('many')
      }
      if (event.index === '2') {
        this.getgoodslist('only')
      }
    },
    getclassify () {
      this.$http({
        url: 'categories'
      }).then(res => {
        console.log(res)
        let { meta, data } = res.data
        if (meta.status === 200) {
          this.classify = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    getgoodslist (sel) {
      if (this.cateCas.length !== 0) {
        this.$http({
          url: `categories/${this.cateCas[this.cateCas.length - 1]}/attributes?sel=${sel}`
        }).then(res => {
          let {meta, data} = res.data
          if (meta.status === 200) {
            if (sel === 'many') {
              this.goodsmany = data
            } else {
              this.goodsonly = data
            }
          } else {
            this.$message.error(meta.msg)
          }
        })
      } else {
        this.$message.error('请选择分类')
      }
    },
    imgsuccess (response, file, fileList) {
      this.fileList.push(response.data.tmp_path)
    },
    imgremove (file, fileList) {
      let img = file.response.data.tmp_path
      this.fileList.forEach((item, index) => {
        if (item === img) {
          this.fileList.splice(index, 1)
        }
      })
    }
  },
  mounted () {
    this.getclassify()
  }
}
</script>

<style>
.myalert {
  margin: 20px 0px;
}
.el-step__title {
  font-size: 12px;
}
.mytabs {
  margin-top: 20px;
}
.mycheck {
  margin-top: 10px;
  margin-bottom: 30px;
}
.el-checkbox {
  margin-right: 0px;
}
.mydiv {
  font-size: 14px;
}
</style>
