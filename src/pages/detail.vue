<template>
  <div class="detail">
    <div class="header">
      <video :src="info.high" controls></video>
    </div>
    <!-- <player :high="info.high"></player> -->
    <div class="content">
      <h1>{{info.title}}</h1>
      <div class="desc">
        <p>讲师介绍</p>
        <p>{{info.teacher}}，{{info.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import player from './player.vue'
export default {
  name: 'detail',
  components: {player},
  data () {
    return {
      info: {}
    }
  },
  methods: {
    getDetail (id) {
      let url = 'http://item.xianghunet.com/index/study/details'
      let data = new FormData()
      data.append('id', id)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(url, data, config)
        .then(res => {
          if (res.status === 200) {
            // console.log(res)
            this.info = res.data.res
          }
        })
    }
  },
  mounted () {
    // console.log(11111)
    this.getDetail(this.$route.query.id)
  }
}
</script>

<style lang="stylus" scoped>
.detail
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  overflow auto
  .header
    top 0
    position sticky
    padding-top 56%
    video
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background #000
      object-fit cover
  .content
    h1
      line-height 1.5
      font-size .32rem
      padding .2rem
      text-align center
      border-bottom 1px solid #eee
      margin-bottom .2rem
    .desc
      line-height 1.5
      padding 0 .2rem
      p
        font-size .28rem
        color #777
        &:first-child
          font-size .32rem
          margin-bottom .2rem
          color #000
</style>
