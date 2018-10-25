<template>
  <div class="university">
    <header>
      <h1>巾帼风采</h1>
    </header>
    <section ref="outer">
      <dl v-for="item of imgs" :key="item.id">
        <dd><img :src="item.src" alt=""></dd>
        <dt>{{item.name}}</dt>
      </dl>
    </section>
  </div>
</template>

<script>
export default {
  name: 'female',
  data () {
    return {
      imgs: [
        {
          id: '1',
          name: '杭州市基层优秀妇女干部  陈丽琴',
          src: require('@/assets/imgs/巾帼风采/杭州市基层优秀妇女干部  陈丽琴.jpg')
        },
        {
          id: '2',
          name: '杭州市三八红旗手  陈秋平',
          src: require('@/assets/imgs/巾帼风采/杭州市三八红旗手  陈秋平.jpg')
        },
        {
          id: '3',
          name: '杭州市十佳“最美女村官”  钱条仙',
          src: require('@/assets/imgs/巾帼风采/杭州市十佳“最美女村官”  钱条仙.jpg')
        },
        {
          id: '4',
          name: '杭州市最美女村官  宣美丽',
          src: require('@/assets/imgs/巾帼风采/杭州市最美女村官  宣美丽.jpg')
        },
        {
          id: '5',
          name: '浙江省百名最美妇女主任  高丽娟',
          src: require('@/assets/imgs/巾帼风采/浙江省百名最美妇女主任  高丽娟.jpg')
        },
        {
          id: '6',
          name: '浙江省巾帼建功标兵  徐国娟',
          src: require('@/assets/imgs/巾帼风采/浙江省巾帼建功标兵  徐国娟.jpg')
        },
        {
          id: '7',
          name: '浙江省三八红旗手  田昕',
          src: require('@/assets/imgs/巾帼风采/浙江省三八红旗手  田昕.jpg')
        },
        {
          id: '8',
          name: '浙江省优秀妇联干部  邵雪利',
          src: require('@/assets/imgs/巾帼风采/浙江省优秀妇联干部  邵雪利.jpg')
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.university
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background mainbg
  display flex
  flex-direction column
  overflow-y auto
  header
    margin 0.4rem
    color #ffffff
    h1
      font-size .44rem
      text-align center
      padding .4rem 0
    p
      font-size .32rem
      text-indent .64rem
      line-height 1.5
  .hidden
    overflow-y hidden
  section
    margin 0 .4rem
    dl
      text-align center
      margin-bottom .6rem
      dd
        img
          max-width 100%
      dt
        color #ffffff
        font-size .36rem
        line-height 2
</style>
