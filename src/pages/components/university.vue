<template>
  <div class="university">
    <header>
      <h1>上大学</h1>
      <p>
        开展资助优秀职工上大学活动是杭州市总工会职工学历提升工程的重要内容，也是集聚区总工会服务企业职工的一项重点实事，更是工会组织积极响应职工群众的需求，培育和弘扬工匠精神的具体举措。
      </p>
    </header>
    <section ref="outer">
      <div class="container" ref="inner">
        <ul class="nav">
          <li :class="{active:idx===1}" @click="tabChange(1)">学校介绍</li>
          <li :class="{active:idx===2}" @click="tabChange(2)">资助对象</li>
          <li :class="{active:idx===3}" @click="tabChange(3)">自助标准</li>
          <li :class="{active:idx===4}" @click="tabChange(4)">报名事项</li>
        </ul>
        <ul class="content">
          <li v-if="idx === 1">
            <p>专科教育由浙江工商大学继续教育学院（大江东函授站）和杭州科技职业技术学院提供。</p>
            <img :src="img" alt="">
          </li>
          <li v-if="idx === 2">
            <p>凡在集聚区工作，已签订劳动合同，并加入工会组织，缴纳6个月以上社会保险，年满18周岁的企业职工（含外来务工人员）。</p>
            <br><p><i>受资助的对象在学习期间离开大江东工作单位，即视为自动放弃受助资格，毕业后不享受学费资助。</i></p>
          </li>
          <li v-if="idx === 3">
            <p>集聚区总工会资助承办院校优惠后学费的<i>60%</i>，最高资助标准为<i>4000元</i>（杭州科技职业技术学院：文科资助3240元，理科资助3600元；
            浙江工商大学继续教育学院：文科资助4000元），其余部分和教材费、资料费由学生自行承担。</p>
            <br><p><b>毕业前被评为大江东及以上工匠荣誉，市级以上劳动模范、“五一”劳动奖章的给予全额资助学费。</b></p>
          </li>
          <li v-if="idx === 4">
            <p>1.报名时间：每年5月至8月（以当年大江东总工会文件为准）。</p>
            <br><p>2.报名方式：报考专科的职工通过“大江东群团汇”微信公众号查看相关规定进行报名；报考本科的职工通过下载“杭工e家”APP报名。</p>
            <br><p>申请对象需参加活动当年全国成人高校统一入学考试，成绩合格被承办院校正式录取方可享受相应的资助。<b>为保证学员能顺利通过入学考试，
            各承办院校将开设考前免费辅导班，2018年成人高考复习班将于9月开始上课。</b></p>
            <br><p>职工通过国家统一组织的成人高考,达到分数线被录取后，才能成为正式在籍大专学生。职工在校学习实行自学为主，面授为辅的教学形式。
            学生按照教学计划修完规定课程，符合毕业要求，颁发国家承认的高等学历继续教育专科毕业证书。</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'university',
  data () {
    return {
      img: require('@/assets/imgs/university.png'),
      idx: 1
    }
  },
  methods: {
    tabChange (i) {
      this.idx = i
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
