<template>
  <div class="treatment">
    <header>
      <h1>医疗互助</h1>
      <p>
        杭州市在职职工医疗互助是对城镇职工基本医疗保险的补充，是建立在城镇职工基本医疗保险基础上的，对职工个人自负医疗费（符合医保开支的住院和规定病种门诊医疗费）进行补助。有效缓解职工患大病住院高额治疗费用的压力，避免家庭发生因病致贫现象，增强职工抵御大病的风险能力。
      </p>
    </header>
    <section ref="outer">
      <div class="container" ref="inner">
        <ul class="nav">
          <li :class="{active:idx===1}" @click="tabChange(1)">保障项目</li>
          <li :class="{active:idx===2}" @click="tabChange(2)">参加须知</li>
          <li :class="{active:idx===3}" @click="tabChange(3)">补助须知</li>
        </ul>
        <ul class="content">
          <li v-if="idx === 1">
            <p>2018年医疗互助保障办法有三种项目：</p>
            <br><p>第一种，住院和规定病种门诊自负医疗费互助保障，交费标准为每人36元/年（2018年大江东总工会补助每人18元），保障内容为二级以上医院住院自负医疗费和规定病种门诊自负医疗费，一个互助期内最高可享受补助金30200元；</p>
            <br><p>第二种，重大疾病和住院生活补助互助保障，交费标准为每人60元/年，保障内容为30种重大疾病、二级以上医院住院生活补助和原位癌，一个互助期内最高可享受补助金15000元；</p>
            <br><p>第三种，女职工特殊疾病互助保障，交费标准为每人20元/年，保障内容为6种原发性妇科癌症、原位癌及6种妇科癌症以外的子宫全切术，一个互助期内最高可享受补助金20000元。</p>
          </li>
          <li v-if="idx === 2">
            <p>1.参加对象：参加大江东（杭州市）城镇职工医疗保险的，与大江东产业集聚区单位签订正式劳动合同的在职职工。</p>
            <br><p>2.参加时限：每年10月15日-12月15日</p>
            <br><p>3.参加程序</p>
            <p>职工申请参加医疗互助，由所在单位工会以团体形式组织参加，不接受个人申请参加。互助金由所在工会统一收交，并将单位的团体申请表、参加人员名单和社保结算表报所属街道、片区工会确认。各街道、片区工会应将各参加互助单位的团体申请表、人员名册和社保结算表上传至智慧工会管理平台。</p>
          </li>
          <li v-if="idx === 3">
            <p>1.补助对象：</p>
            <p>参加当期医疗互助活动的在职职工，如发生符合条件的情形，均可在规定期限内申请补助。</p>
            <br><p>2.补助时限：</p>
            <p>截至次年3月31日，女职工生育截至次年5月31日。</p>
            <br><p>3.材料清单：</p>
            <p><b>（1）住院和规定病种门诊自负医疗费补助</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;①补助申请表一式一份</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;②申请人身份证和银行卡复印件</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;③申请住院自负医疗费补助的，需提供住院结算单、出院记录和发票的原件或复印件</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;④申请规定病种门诊自负医疗费补助的，需提供1-6月或1-12月的《基本医疗保险个人费用查询单》和规定病种病历本封面复印件。</p>
            <p><b>（2）重大疾病和住院生活补助</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;①补助申请表一式一份</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;②申请人身份证和银行卡复印件</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;③申请住院生活补助的，需提供出院记录和发票原件或复印件。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;④申请重大疾病补助的，需提供出院记录、术后病理报告单或其他验证材料。</p>
            <br><p>注：重大疾病经杭州市职工服务中心送审材料并核定病理之后予以补助。</p>
            <br><p><b>（3）女职工特殊疾病补助</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;①补助申请表一式一份</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;②申请人身份证和银行卡复印件</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;③术后病理报告或血液检查结果等报告单</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;④出院记录</p>
            <br><p>注：女职工特殊疾病经市总服务中心送审材料并核定病理之后予以补助。</p>
            <br><p>4.补助程序：</p>
            <p>职工申请医疗互助补助可以直接在“杭工e家”APP或杭州工会网上服务大厅自行申请，也可到区总工会职工服务中心窗口办理。
              由区总工会职工服务中心核准（其中第二、第三种互助项目由市总工会审核通过）后，将补助金打入申请人银行卡。</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'treatment',
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
.treatment
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
