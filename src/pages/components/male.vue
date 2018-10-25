<template>
  <div class="university">
    <header>
      <h1>青年风采</h1>
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
          name: '杭州市“优秀青年岗位能手”  劳聪杰',
          src: require('@/assets/imgs/青年风采/杭州市“优秀青年岗位能手”  劳聪杰.jpg')
        },
        {
          id: '2',
          name: '杭州市“优秀青年岗位能手”刘方兴',
          src: require('@/assets/imgs/青年风采/杭州市“优秀青年岗位能手”刘方兴.png')
        },
        {
          id: '3',
          name: '杭州市“优秀青年岗位能手”王占魁',
          src: require('@/assets/imgs/青年风采/杭州市“优秀青年岗位能手”王占魁.png')
        },
        {
          id: '4',
          name: '杭州市“优秀青年岗位能手”徐寿刚',
          src: require('@/assets/imgs/青年风采/杭州市“优秀青年岗位能手”徐寿刚.png')
        },
        {
          id: '6',
          name: '杭州市“优秀青年岗位能手”徐晓彬',
          src: require('@/assets/imgs/青年风采/杭州市“优秀青年岗位能手”徐晓彬.png')
        },
        {
          id: '5',
          name: '市级青年文明号   大江东行政审批局经济发展科',
          src: require('@/assets/imgs/青年风采/市级青年文明号   大江东行政审批局经济发展科.jpg')
        },
        {
          id: '7',
          name: '市级青年文明号  杭州萧山供水有限公司义蓬营业所',
          src: require('@/assets/imgs/青年风采/市级青年文明号  杭州萧山供水有限公司义蓬营业所.jpg')
        },
        {
          id: '8',
          name: '中建三局杭州智慧谷项目部',
          src: require('@/assets/imgs/青年风采/中建三局杭州智慧谷项目部.jpg')
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
