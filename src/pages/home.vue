<template>
  <div class="home">
    <header>
      <div class="logo"></div>
    </header>
    <section>
      <div class="nav">
        <dl v-for="item of list" :key="item.name" @click="goto(item.path)">
          <dd :class="item.icon">
            <i class=""></i>
          </dd>
          <dt>{{item.name}}</dt>
        </dl>
      </div>
    </section>
    <router-view class="bg"></router-view>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      list: [
        {
          icon: 'icon university',
          name: '上大学',
          path: 'university'
        },
        {
          icon: 'icon treatment',
          name: '医疗互助',
          path: 'treatment'
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
      ]
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
  header
    padding-top 50%
    background url('~@/assets/imgs/header.png')no-repeat
    background-size cover
  section
    flex 1
    .nav
      display grid
      grid-template-columns 1fr 1fr
      padding .5rem 0
      dl
        display flex
        flex-direction column
        justify-content center
        align-items center
        padding .2rem 0
        dd
          width 1.8rem
          height 1.8rem
          border-radius 50%
          display flex
          justify-content center
          align-items center
          i
            width 1rem
            height 1rem
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
        .else
          background-color #dadada
          i
            background-image url('~@/assets/imgs/icon6.png')
        dt
          text-align center
          font-size .32rem
          line-height 2
          color #777
  .bg
    background url('~@/assets/imgs/bg.png')no-repeat
    background-size cover
</style>
