<template>
  <div class="detail">
    <div class="header">
      <video :src="'http://v.cztvcloud.com/' + info.files[0].path" controls></video>
    </div>
    <!-- <player :high="info.high"></player> -->
    <div class="content">
      <h1>{{info.title}}</h1>
      <div class="desc">
        <p>讲师介绍</p>
        <p>{{info.intro}}</p>
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
      this.$http({
        url: '/media/video?terminal=web&channel_id=6&data_id=' + id,
        method: 'get',
      }).then(res => {
        this.info = res.data
        this.updateHit()
      })
    },
    updateHit () {
      this.$http({
        url: 'http://c.cztvcloud.com/analysis/visit',
        method: "POST",
        data: {
          channel_id: 6,
          item_id: info.data_id,
          title: info.title,
          editor_id: editorId,
          terminal: 1,
          type: 3
        }
      })
    }
  },
  mounted () {
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
