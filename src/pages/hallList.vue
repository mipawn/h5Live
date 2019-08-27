<template>
  <div class="award">
    <header>
      <h1>{{title}}</h1>
      <p>
        {{intro}}
      </p>
    </header>
    <section ref="outer">
      <div class="container" ref="inner">
        <ul class="nav">
          <li :class="idx === index ? 'active' : ''" @click="tabChange(index)" v-for="(item, index) in list" :key="index">{{item.title}}</li>
        </ul>
        <ul class="content">
          <li v-if="idx === index" v-for="(item, index) in list" :key="index" v-html="item.content">
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'award',
  data () {
    return {
      idx: 0,
      title: '',
      id: 0,
      list: null,
      intro: ''
    }
  },
  methods: {
    tabChange (index) {
      this.idx = index
    },
    setTitle () {
      document.title = '服务大厅'
      if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        const hack = document.createElement('iframe')
        hack.style.display = 'none'
        hack.src = '/index.html? r =' + Math.random()
        document.body.appendChild(hack)
        setTimeout(() => {
          document.body.removeChild(hack)
        },300)
      }
    },
    getList () {
      this.$http({
        url: `/media/latest?size=10&page=1&channel_id=6&category_id=${this.id}`
      }).then(res => {
        this.list = res.data.list.map(item => {
          return {
            title: item.title,
            id: item.data_id,
            content: ''
          }
        })
        this.getContent()
      })
    },
    getContent (id = this.list[0].id, index = 0) {
      this.$http({
        url: '/media/news?terminal=web&channel_id=6&data_id=' + id
      }).then(res => {
        this.list[index].content = res.data.content
      })
    },
    setIntro () {
      if (this.id === 13489) {
        this.intro = '为深入贯彻习近平新时代中国特色社会主义思想和党的十九大精神，紧贴市委、市政府“干好一一六，当好排头兵” 决策部署， 加快落实新区建设发展要求，深化实施职工素质提升工程，根据市总工会《关于开展2019年资助千名优秀外来务工人员上大学活动 的通知》 （杭总工办〔2019〕17号）文件要求，区总工会2019年继续开展资助优秀外来务工人员上大学活动。'
      } else if (this.id === 13490) {
        this.intro = '为贯彻落实习近平新时代中国特色社会主义思想和党的十九大精神，深化“中国梦·劳动美”主题教育活动，提升打造职工队伍的综合素质，促进职工队伍的精神文明建设。区总工会组织开办新区“钱塘职工大讲堂”。'
      }
      else if (this.id === 13491) {
        this.intro = ''
      }
      else if (this.id === 13492) {
        this.intro = '为深入贯彻落实杭州市委十二届六次全会精神，按照“干好一一六、当好排头兵”的决策部署，通过技能培训、技能帮带、技能竞赛、技能晋级、技能激励等技能提升机制，打造一支服务杭州经济社会高质量发展的知识型、技术型、创新型职工人才队伍，为杭州不断跨越经济发展高地，始终勇立新时代改革开放潮头做出更大贡献。'
      }
      else if (this.id === 13493) {
        this.intro = '为更好地服务全市工会会员，规范在职职工医疗互助参保和补助流程，实现互助金的良性运作，根据《杭州市在职职工医疗互助保障办法》（以下简称“办法”）的规定，制定本实施细则。'
      }
      else if (this.id === 13494) {
        this.intro = ''
      }
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.title = this.$route.query.name
    this.setTitle()
    this.setIntro()
    this.getList()
  },
  watch: {
    idx (val) {
      if (this.list[val].content) return
      this.getContent(this.list[val].id, val)
    }
  }
}
</script>

<style lang="stylus" scoped>
.award
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background url('../assets/imgs/bg.png')
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
    margin 0 .4rem .4rem
    background #ffffff
    flex 1
    .container
      .nav
        display flex
        background navbg
        li
          flex 1
          padding .3rem 0
          text-align center
          color navColor
          font-size .32rem
        .active
          color #ffffff
          background activebg
      .content
        padding .5rem .4rem
        li
          line-height 1.5
          font-size .32rem
          color #444
          img
            width 100%
            margin-top .4rem
          i
            color red
          b
            font-weight bold
</style>
<style scoped>
.award .content >>> p img {
  width: 100%;
}
</style>

