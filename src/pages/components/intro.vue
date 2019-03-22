<template>
  <div class="introduce">
    <div class="paragraph" v-html="details.introduce"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: '',
      id: ''
    }
  },
  methods: {
    getDetails () { // 获取详情
      this.$axios({
        url: this.baseUrl+'v1/live/details',
        params: {
          id: this.id
        },
        method: 'get'
      }).then(res => {
        if (res.data.code === 200) {
          this.details = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getDetails()
  }
}
</script>

<style>
  .introduce {
    padding: 0.4rem;
    line-height: 1.5;
  }
  .paragraph{
    margin-top: 0.3rem;
    word-wrap: break-word;
  }
  .paragraph:nth-of-type(1) {
    margin: 0;
  }
</style>
