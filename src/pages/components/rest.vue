<template>
  <div class="rest">
    <header>
      <h1>疗休养</h1>
      <p>
        职工的劳动保护和休息休养权益是法律赋予劳动者的基本权利。开展职工疗休养活动，是保护和促进广大职工身心健康、落实全心全意依靠工人阶级根本方针的具体体现，也是党和政府赋予工会组织的一项职责。做好职工疗休养工作，要以国家法律法规和中央有关规定为准则，把维护职工权益与严守纪律规定结合起来，有步骤、有计划地组织好单位职工的疗休养工作，不断提升职工群众疗休养的获得感。
      </p>
    </header>
    <section ref="outer">
      <div class="container" ref="inner">
        <ul class="nav">
          <li :class="{active:idx===1}" @click="tabChange(1)">对象及范围</li>
          <li :class="{active:idx===2}" @click="tabChange(2)">时间及地点</li>
          <li :class="{active:idx===3}" @click="tabChange(3)">经费及报销</li>
        </ul>
        <ul class="content">
          <li v-if="idx === 1">
            <p>疗休养面向机关事业单位和国有企业的在职干部职工。涉及到领导干部疗休养的，按干部管理权限由组织单位报备或审批。</p>
            <br><p>每人每年参加疗休养的次数原则上不能超过一次。如参加跨省疗休养的，则每人三年一次，但不影响其在其他年份参加省内疗休养活动。</p>
          </li>
          <li v-if="idx === 2">
            <P>疗休养地点立足本省的同时，可按规定组织部分职工（当年可出行数的1/3以内）赴对口支援（帮扶、合作）省（市）、自治区和沪苏皖闽赣5个周边省（市）开展跨省疗休养活动。每次只能在一个省域内进行，按一地多点的原则开展活动。（目前对口支援地区：新疆阿克苏市、西藏那曲县、青海德令哈市、重庆涪陵区；对口帮扶地区：贵州黔东南州、湖北恩施州；对口合作地区：吉林长春市、长白山保护开发区）</p>
            <br><P>一次疗休养活动时间在5天（含）以内（包括在途时间）。跨省因交通原因可视情延长在途时间，但需经单位（部门）同意，且原则上不占用工作时间。职工疗休养活动，占用法定休假和休息日的，不能补休。</p>
          </li>
          <li v-if="idx === 3">
            <p>疗休养费用支出途经调整为由财政部门根据福利费提取情况给予保障，原则上不高于每人每次2000元的限额标准，超标准部分由参加疗休养的职工个人承担。</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'rest',
  data () {
    return {
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
.rest
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
