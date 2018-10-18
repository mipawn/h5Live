<template>
  <div class="award">
    <header>
      <h1>高技能人才奖励</h1>
      <p>
        高技能人才是人才队伍的重要组成部分，是推动技术创新和实现科技成果转化的中坚力量。按照规定，晋级高级工的，每人奖励500元；晋级技师的，每人奖励600元；晋级高级技师的，每人奖励800元。奖励费用由市总工会承担。同一对象一年内多次参加培训、多次晋升职业技能等级的，按就高不就低原则奖励一次。
      </p>
    </header>
    <section ref="outer">
      <div class="container" ref="inner">
        <ul class="nav">
          <li :class="{active:idx===1}" @click="tabChange(1)">对象条件</li>
          <li :class="{active:idx===2}" @click="tabChange(2)">职业范围</li>
          <li :class="{active:idx===3}" @click="tabChange(3)">奖励标准</li>
          <li :class="{active:idx===4}" @click="tabChange(4)">申领程序</li>
        </ul>
        <ul class="content">
          <li v-if="idx === 1">
            <p>奖励对象需同时符合以下条件：</p>
            <p>1.本市工会会员。</p>
            <p>2.本年度晋级，并取得由浙江省、杭州市本级及区县（市）人社部门或部分国家相关行业主管部门核发的高级工以上（含高级工）
              职业资格证书（职业资格证书发证时间为2017年12月1日至2018年11月30日）。或符合2017年度奖励条件，但未申请2017年度奖励
              （职业资格证书发证时间为2016年12月1日至2017年11月30日）。</p>
          </li>
          <li v-if="idx === 2">
            <p>1.由浙江省、杭州市本级及区县（市）人社部门核发资格证书的职业（工种）。</p>
            <br><p>2.各地各产业工会结合本地本系统产业特色和经济发展需求，报市总工会审核同意并备案的部分由国家相关行业主管部门核发资格证书的行业特有工种。
              各地各产业工会自行申报工种不多于3项。</p>
          </li>
          <li v-if="idx === 3">
            <p>晋级高级工的，每人奖励500元；晋级技师的，每人奖励600元；晋级高级技师的，每人奖励800元。奖励费用由市总工会承担。同一对象一年内多次参加培训、
              多次晋升职业技能等级的，按就高不就低原则奖励一次。</p>
          </li>
          <li v-if="idx === 4">
            <p>1.高技能人才奖励申报有两种方式：单位统一申报和职工个人网上申报，职工采取个人网上申报的需进行工会会员网上实名认证。</p>
            <br><p>2.市总工会职工服务中心负责受理申请，对相关资料真实性进行审核确认后，统一核发奖励费用，直接打入高技能人才奖励人员的银行卡，并短信通知个人。</p>
            <br><p>3.市总工会经济部负责政策说明、指导检查等相关服务协调工作。</p>
            <br><p>4.申报截止时间为2018年12月15日前。</p>
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
.award
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
