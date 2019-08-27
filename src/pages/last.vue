<template>
  <div class="last">
    <ul>
      <li v-for="item of videoList" :key="item.id" @click="toDetail(item.id)">
        <div class="pre">
          <img :src="require('@/assets/imgs/' + item.id + '.png')" />
        </div>
        <div class="title">{{item.title}}</div>
        <div class="teacher">
          <b>{{item.teacher}}</b>
          <span><i class="iconfont icon-eye"></i> <b>{{item.num}}</b></span>
        </div>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'last',
  data () {
    return {
      videoList: []
    }
  },
  methods: {
    toDetail (id) {
      this.$router.push({
        name: 'detail',
        query: {
          id
        }
      })
    },
    getList () {
      let url = 'http://item.xianghunet.com/index/study/index'
      let data = new FormData()
      data.append('sort', 'new')
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(url, data, config)
        .then(res => {
          if (res.status === 200) {
            // console.log(res)
            this.videoList = res.data.res
          }
        })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="stylus" scoped>
.last
  ul
    padding .2rem
    display grid
    grid-template-columns 1fr 1fr
    li
      background #ffffff
      margin .1rem
      display flex
      flex-direction column
      border-radius 3px
      overflow hidden
      .pre
        hegiht 0
        padding-top 50%
        position relative
        img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
      .title
        font-size .28rem
        padding .1rem .2rem
        line-height 1.3
        flex 1
      .teacher
        padding 0 .2rem .1rem
        font-size 12px
        color #777
        span
          float right
        b,i
          vertical-align middle
</style>
