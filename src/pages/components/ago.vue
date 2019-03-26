<template>
  <div class="ago">
    <div class="item-box" v-for="(item, index) in list" :key="index" @click="toDetail(item.id, item.type)">
      <div class="item-photo">
        <img :src="item.list_img" alt="">
      </div>
      <div class="item-desc">
        <div class="item-title">{{item.title}}</div>
        <div class="item-info">
          <div class="item-time">{{item.start_time}}</div>
          <div class="item-num">1.88万人次</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      list: '' // 列表
    }
  },
  methods: {
    getList () { // 获取列表
      this.$axios({
          url: this.baseUrl+'v1/live/lists',
          data: '',
          method: 'get'
      }).then(res =>{
          if (res.data.code == 200) {
              this.list = res.data.data
          }
      }).catch(err => {
          console.log(err)
      })
    },
    toDetail (id,type) { // 查看详情
      this.$router.push({path: '/home/live', query:{id:id,type:type}})
      this.$emit('goLive',this.$route.query)
      window.location.reload()
    },
  },
  mounted () {
    this.id = this.$route.query.id
    this.getList()
  }
}
</script>

<style>
  .ago {
    padding: 0.4rem;
  }
  .item-box {
    box-shadow: 0 0 10px #ccc;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-top: 0.2rem;
  }
  .item-box:nth-of-type(1) {
    margin: 0;
  }
  .item-photo {
    max-width: 3.2rem;
    height: 1.7rem;
    min-width: 3rem;
  }
  .item-photo>img {
    width: 100%;
    height: 100%;
  }
  .item-desc {
    display: flex;
    height: 1.7rem;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    margin-left: 0.5rem;
  }
  .item-title {
    font-size: 0.32rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-wrap: break-word;
    line-height: 1.2;
  }
  .item-time {
    font-size: 0.2rem;
    color: #9c9b9b;
  }
  .item-num {
    font-size: 0.2rem;
    margin-top: 0.1rem;
    color: #9c9b9b;
  }
</style>
