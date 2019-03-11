<template>
  <remote :type="this.type" :src="this.url" @load-js-finish="this.jsLoadCallBack"></remote>
</template>

<script>
  export default {
    components: {
      'remote': {
        render (createElement) {
          var self = this
          console.log(this.type, this.src)
          if (this.type === 'js') {
            return createElement('script', {
              attrs: { type: 'text/javascript', src: this.src },
              on: {
                load: function () {
                  self.$emit('load-js-finish')
                }
              }
            })
          } else if (this.type === 'css') {
            return createElement('link', {
              attrs: { rel: 'stylesheet', href: this.src },
              on: {
                load: function () {
                  self.$emit('load-css-finish')
                }
              }
            })
          }
        },
        props: {
          type: { type: String, required: true},
          src: { type: String, required: true }
        }
      }
    },
    props: {
      type: { type: String, required: true},
      url: { type: String, required: true },// 需要加载的外部url
      jsLoadCallBack: Function// 外部js加载完成回调
    }
  }
</script>
