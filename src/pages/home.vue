<template>
  <div class="home">
    <header>
      <div class="logo">汇服务</div>
      <swiper :options="swiperOption" ref="newSwiper" class="container">
        <swiper-slide v-for="item in imgs" :key="item" class="sliders">
          <img class="gallery-img" :src="item" alt="" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </header>
    <section>
      <h1>特色服务</h1>
      <div class="nav">
        <dl v-for="item of list" :key="item.name" @click="goto(item.path)">
          <dd :class="item.icon">
            <i class=""></i>
          </dd>
          <dt>{{item.name}}</dt>
        </dl>
      </div>
    </section>
    <section>
      <h1>风采展示</h1>
      <div class="nav">
        <dl v-for="item of elegant" :key="item.name" @click="goto(item.path)">
          <dd :class="item.icon">
            <i class=""></i>
          </dd>
          <dt>{{item.name}}</dt>
        </dl>
      </div>
    </section>
    <router-view class="bg"></router-view>
    <div class="preload"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      imgs: [
        require('@/assets/imgs/header.png'),
        require('@/assets/imgs/header2.jpg'),
        require('@/assets/imgs/header3.jpg')
      ],
      list: [
        {
          icon: 'icon university',
          name: '上大学',
          path: 'university'
        },
        {
          icon: 'icon rest',
          name: '疗休养',
          path: 'rest'
        },
        {
          icon: 'icon award',
          name: '高技能人才奖励',
          path: 'award'
        },
        {
          icon: 'icon stage',
          name: '爱心驿家',
          path: 'stage'
        }
      ],
      elegant: [
        {
          icon: 'icon worker',
          name: '职工风采',
          path: 'worker'
        },
        {
          icon: 'icon male',
          name: '青年风采',
          path: 'male'
        },
        {
          icon: 'icon female',
          name: '巾帼风采',
          path: 'female'
        }
      ],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: true
      }
    }
  },
  methods: {
    goto (path) {
      this.$router.push({
        path
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  display flex
  flex-direction column
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  overflow-y auto
  background-color #efefef
  header
    padding-top 50%
    position relative
    .logo
      position absolute
      width 100%
      font-size .7rem
      letter-spacing 5px
      color #fff
      top 1rem
      left 0
      z-index 2
      text-align center
      pointer-events none
    .container
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      .sliders
        img
          width 100%
          height 100%
  section
    margin-top .2rem
    background-color #fff
    h1
      font-size .32rem
      line-height 2.8
      padding-left .6rem
      position relative
      &:before
        content ''
        position absolute
        left -.1rem
        top .2rem
        width .5rem
        height .5rem
        border-radius 0 1rem 1rem 0
        background orange
    .nav
      display grid
      grid-template-columns 1fr 1fr 1fr
      padding 0 .3rem
      dl
        display flex
        flex-direction column
        justify-content center
        align-items center
        padding .2rem 0
        dd
          width 1.2rem
          height 1.2rem
          border-radius 50%
          display flex
          justify-content center
          align-items center
          i
            width .7rem
            height .7rem
            background url('')no-repeat
            background-size contain
            background-position center center
        .university
          background-color #e00024
          i
            background-image url('~@/assets/imgs/icon1.png')
        .treatment
          background-color #00b034
          i
            background-image url('~@/assets/imgs/icon2.png')
        .rest
          background-color #ff8a00
          i
            background-image url('~@/assets/imgs/icon3.png')
        .award
          background-color #01a8ec
          i
            background-image url('~@/assets/imgs/icon4.png')
        .stage
          background-color #f59fbc
          i
            background-image url('~@/assets/imgs/icon5.png')
        .female
          background-color #ffc1c1
          i
            background-image url('~@/assets/imgs/icon6.png')
        .male
          background-color #b0daf6
          i
            background-image url('~@/assets/imgs/icon7.png')
        .worker
          background-color #efcaac
          i
            background-image url('~@/assets/imgs/icon8.png')
        dt
          text-align center
          font-size .28rem
          line-height 2
          color #777
  .bg
    background url('~@/assets/imgs/bg.png')no-repeat
    background-size cover
    z-index 3
  .preload
    display none
    background-image url('~@/assets/imgs/bg.png')
</style>
