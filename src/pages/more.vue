<template>
  <div class="more">
    <ul>
      <li v-for="item of videoList" :key="item.id" @click="toDetail(item)">
        <div class="pre">
          <img :src="item.url" />
        </div>
        <div class="title">{{item.title}}</div>
        <div class="teacher">{{item.teacher}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'more',
  data () {
    return {
      videoList: [
      ]
    }
  },
  methods: {
    toDetail (item) {
      this.$router.push({
        name: 'detail',
        params: {
          data: item
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.more
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
        padding 0 .2rem .2rem
        font-size 12px
        color #777
</style>
