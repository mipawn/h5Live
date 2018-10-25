<template>
  <div class="university">
    <header>
      <h1>职工风采</h1>
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
          name: '首届大江东工匠  戴学臣',
          src: require('@/assets/imgs/职工风采/首届大江东工匠  戴学臣.jpg')
        },
        {
          id: '2',
          name: '首届大江东工匠  李捷',
          src: require('@/assets/imgs/职工风采/首届大江东工匠  李捷.jpg')
        },
        {
          id: '3',
          name: '首届大江东工匠 吕华根',
          src: require('@/assets/imgs/职工风采/首届大江东工匠 吕华根.jpg')
        },
        {
          id: '4',
          name: '首届大江东工匠 钱丽根',
          src: require('@/assets/imgs/职工风采/首届大江东工匠 钱丽根.jpg')
        },
        {
          id: '5',
          name: '首届大江东工匠 沈亮',
          src: require('@/assets/imgs/职工风采/首届大江东工匠 沈亮.jpg')
        },
        {
          id: '6',
          name: '首届大江东工匠 王占奎',
          src: require('@/assets/imgs/职工风采/首届大江东工匠 王占奎.jpg')
        },
        {
          id: '7',
          name: '首届大江东工匠 许泽辉',
          src: require('@/assets/imgs/职工风采/首届大江东工匠 许泽辉.jpg')
        },
        {
          id: '8',
          name: '首届大江东工匠陈慧群',
          src: require('@/assets/imgs/职工风采/首届大江东工匠陈慧群.jpg')
        },
        {
          id: '9',
          name: '首届大江东工匠卢斌',
          src: require('@/assets/imgs/职工风采/首届大江东工匠卢斌.jpg')
        },
        {
          id: '10',
          name: '首届大江东工匠周海燕',
          src: require('@/assets/imgs/职工风采/首届大江东工匠周海燕.jpg')
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
