<template>
  <div class="container">
    <div class="theme"><img src="../assets/imgs/head-theme.png" alt=""></div>
    <section class="list">
      <div class="item" @click="goList(13489, '学历提升')">
        <img src="../assets/imgs/hall-1.png" alt="学历提升">
        <div>学历提升</div>
      </div>
      <div class="item" @click="goList(13490, '技能培训')">
        <img src="../assets/imgs/hall-2.png" alt="技能培训">
        <div>技能培训</div>
      </div>
      <div class="item" @click="goList(13491, '劳模工匠')">
        <img src="../assets/imgs/hall-3.png" alt="劳模工匠">
        <div>劳模工匠</div>
      </div>
      <div class="item" @click="goList(13492, '技能奖励')">
        <img src="../assets/imgs/hall-4.png" alt="技能奖励">
        <div>技能奖励</div>
      </div>
      <div class="item" @click="goList(13493, '医疗互助')">
        <img src="../assets/imgs/hall-5.png" alt="医疗互助">
        <div>医疗互助</div>
      </div>
      <div class="item" @click="goList(13494, '困难帮扶')">
        <img src="../assets/imgs/hall-6.png" alt="困难帮扶">
        <div>困难帮扶</div>
      </div>
      <div class="item" @click="goMap">
        <img src="../assets/imgs/hall-7.png" alt="爱心驿站">
        <div>爱心驿家</div>
      </div>
      <div class="item" @click="goHouse">
        <img src="../assets/imgs/hall-8.png" alt="妈咪小屋">
        <div>妈咪小屋</div>
      </div>
      <div class="item" @click="goList(14272, '基层组建')">
        <img src="../assets/imgs/hall-9.png" alt="基层组建">
        <div>基层组建</div>
      </div>
      <div class="item" @click="goReport('', '活动报名')">
        <img src="../../static/img/youngth-more.png" alt="活动报名">
        <div>活动报名</div>
      </div>
      <div class="item" @click="goOther">
        <img src="../assets/imgs/hall-more.png" alt="更多">
        <div>更多</div>
      </div>
      <div class="item" style="width: 1.193rem;">
       
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },
  methods: {
    setTitle () {
      document.title = '服务大厅'
      if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        const hack = document.createElement('iframe')
        hack.style.display = 'none'
        hack.src = './index.html'
        document.body.appendChild(hack)
        setTimeout(() => {
          document.body.removeChild(hack)
        },300)
      }
    },
    goOther () {
      this.$router.push({name: 'other'})
    },
    goMap (id, name) {
      this.$router.push({name: 'map' })
    },
    goHouse () {
      this.$router.push({name: 'house'})
    },
    goList (id, name) {
      if (id == 13494 || id == 13491 || id == 14272 || id == 13490) {
        this.$router.push({name: 'list', query: {categoryid: id, name: name}})
        return
      }
      this.$router.push({name: 'hallList', query: {id: id, name: name}})
    },
    goReport (id, name) {
      this.$router.push({name: 'report', query: { name: name}})
    }
  },
  mounted () {
    this.setTitle()
  }
}
</script>

<style scoped>
.container {
  background: #f5f5f5;
}
.theme {
  width: 100%;
  height: 5.48rem;
}
.theme img {
  width: 100%;
  height: 100%;
}
section {
  padding: 0 0.96rem 0.78rem;
  background: #ffffff;
}
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.item {
  font-size: 0.24rem;
  font-family: 'MicrosoftYaHeiLight';
  font-weight:300;
  color:#717171;
  text-align: center;
  margin: 0.56rem 0 0 0.99rem;
}
.item img {
  width: 1.193rem;
  height: 1.192rem;
}
.item div {
  margin-top: 0.34rem;
}
.item:nth-child(3n - 2) {
  margin-left: 0;
}
.title {
  height: 1.08rem;
  text-align: center;
  line-height: 1.08rem;
  font-size: 0.24rem;
  font-family: 'MicrosoftYaHeiLight';
  font-weight:300;
  color:#717171;
}
</style>
