
<template>
  <div class="container">
    <section>
      <div class="title">
        <img src="../../static/img/works.png" alt="">
        <span>职工风范</span>
      </div>
      <div class="content">
        <div class="item" @click="goList(item)" v-for="(item, index) in works" :key="index" v-if="index < 4 || worksMore">
          <img :src="`./static/img/works-more.png`" alt="" v-if="index === 3 && !worksMore">
          <img :src="`./static/img/works-${index}.png`" alt="" v-else>
          <span>{{item.name}}</span>
        </div>

      </div>
    </section>
    <section>
      <div class="title">
        <img src="../../static/img/youngth.png" alt="">
        <span>青春出彩</span>
      </div>
      <div class="content">
        <div class="item" @click="goList(item)" v-for="(item, index) in youngth" :key="index" v-if="index < 4 || youngthMore">
          <img :src="`./static/img/youngth-more.png`" alt="" v-if="index === 3 && !youngthMore">
          <img :src="`./static/img/youngth-${index}.png`" alt="" v-else>
          <span>{{item.name}}</span>
        </div>
      </div>
    </section>
    <section>
      <div class="title">
        <img src="../../static/img/woman.png" alt="">
        <span>巾帼力量</span>
      </div>
      <div class="content">
        <div class="item" @click="goList(item)" v-for="(item, index) in woman" :key="index" v-if="index < 4 || womanMore">
          <img :src="`./static/img/woman-more.png`" alt="" v-if="index === 3 && !womanMore" >
          <img :src="`./static/img/woman-${index}.png`" alt="" v-else>
          <span>{{item.name}}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data () {
    return {
      thumb: 0,
      works: [
        {
          name: '劳动模范',
          id: 13456
        },
        {
          name: '新区工匠',
          id: 13457
        },
        {
          name: '五一劳动奖章(状)',
          id: 13469
        },
        {
          name: '更多',
          id: 'more1'
        },
        {
          name: '工人先锋号',
          id: 13458
        },
        {
          name: '其他',
          id: 13475
        }
      ],
      youngth: [
        {
          name: '先进集体',
          id: 13873
        },
        {
          name: '先进个人',
          id: 13470
        },
        {
          name: '青年岗位能手',
          id: 13459
        },
        {
          name: '更多',
          id: 'more2'
        },
        {
          name: '优秀志愿者',
          id: 13460
        },
        {
          name: '其他',
          id: 13471
        }
      ],
      woman: [
        {
          name: '三八红旗手',
          id: 13461
        },
        {
          name: '巾帼文明岗',
          id: 13462
        },
        {
          name: '妇女先进',
          id: 13472
        },
        {
          name: '更多',
          id: 'more3'
        },
        {
          name: '最“美”家庭',
          id: 13473
        },
        {
          name: '其他',
          id: 13474
        }
      ],
      worksMore: false,
      youngthMore: false,
      womanMore: false
    }
  },
  methods: {
    setTitle () {
      document.title = '钱塘之星'
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
    goList (e) {
      if (e.id === 'more1') {
        this.works.splice(3,1)
        this.worksMore = true
        return
      } else if (e.id === 'more2') {
        this.youngth.splice(3,1)
        this.youngthMore = true
        return
      } else if (e.id === 'more3') {
        this.woman.splice(3,1)
        this.womanMore = true
        return
      }
      this.$router.push({name: 'list', query: {categoryid: e.id, name: e.name}})
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
  padding: 0.26rem;
}
section {
  margin-bottom: 0.44rem;
  background: #fff;
  box-shadow: 0 0 0.16rem 0 rgba(98,98,98,0.2);
}
.title {
  height: 0.95rem;
  border-bottom: 1px solid #EDEDED;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.3rem;
  font-family:'MicrosoftYaHei';
  font-weight: 400;
  color: #000000;
}
.title img {
  width: 0.46rem;
  height: 0.46rem;
  margin-right: 0.16rem;
}
.content {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 49.92%;
  height: 1.7rem;
  border-bottom: 0.01rem solid #EDEDED;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item:nth-child(odd) {
  border-right: 0.01rem solid #EDEDED;
}
.item > img {
  width: 0.62rem;
  height: 0.62rem;
  margin-right: 0.24rem;
}
</style>
