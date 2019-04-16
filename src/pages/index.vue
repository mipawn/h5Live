<template>
    <div class="content">
        <div class="section" v-for="(item,index) in list" :key="index">
            <div class="home-item-photo" @click="toDetail(item.id,item.type)">
                <img :src="item.list_img" alt="网络不好呢">
            </div>
            <div class="home-item-desc">
                <div class="item-label">{{item.type | filter}}</div>
                <div class="item-title">{{item.title}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [] // 列表
        }
    },
    methods: { 
        toDetail (id) { // 查看详情
            this.$router.push({path: '/home/live', query:{id:id}})
        },
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
        }
    },
    mounted () {
        document.title = '现场直播'
          if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            const hack = document.createElement('iframe')
            hack.style.display = 'none'
            hack.src = '@/assets/fixIosTitle.html? r =' + Math.random()
            document.body.appendChild(hack)
            setTimeout(() => {
              document.body.removeChild(hack)
            },300)
          }
        this.getList()
    },
    filters:{
        filter (type) { // 判断直播类型
            if (type === 1) {
                return '图文'
            } else if (type === 2) {
                return '直播'
            } else if (type === 3) {
                return '视频'
            }
        }
    }
}
</script>
<style scoped>
    .content {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }
    .section {
        width: 100%;
        padding-top: 0.25rem;
        background: #efeff4;
    }
    .section:nth-of-type(1) {
        padding-top: 0;
    }
    .home-item-photo {
        width: 100%;
        height: 5rem;
    }
    .home-item-photo>img {
        width: 100%;
        height: 100%;
    }
    .home-item-desc {
        width: 100%;
        box-sizing: border-box;
        padding: 0.24rem;
        display: flex;
        align-items: center;
        background: #fff;
        border-bottom: 1px solid #ccc;
    }
    .item-title {
        margin-left: 0.3rem;
    }
    .item-label {
        min-width: 1rem;
        height: 0.4rem;
        background: #f5b5b5;
        text-align: center;
        line-height: 0.4rem;
        color: red;
    }
    .item-title{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
</style>
