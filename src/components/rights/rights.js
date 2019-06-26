import bread from '../layout/breadnav.vue'

export default {
  data () {
    return {
      rightslable: []
    }
  },
  components: {
    bread: bread
  },
  methods: {
    getjxlist () {
      this.$http({
        method: 'get',
        url: 'rights/list'
      }).then(res => {
        let {data, meta} = res.data
        if (meta.status === 200) {
          this.rightslable = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getjxlist()
  }
}
