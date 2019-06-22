<template>
  <div>
    我是ues
    <el-button type="success" round>成功按钮</el-button>
    <el-switch v-model="value" active-color="#000" inactive-color="yellow"></el-switch>
    {{value1}}
    <el-select v-model="value1" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      value1: '',
      options: [
        {label: '上海', value: 'sahnghai'},
        {label: '北京', value: 'beijing'}
      ]
    }
  }
}
</script>

<style>
</style>
