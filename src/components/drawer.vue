<template>
  <div class="drawer">
    <div :class="open ? 'mask' : ''" @click="close"></div>
    <div :class="open ? 'open' : 'close'">
      <div class="header">
        <p class="fl">标题</p>
      </div>
      <div class="item">
        <router-link class="link" :to="{path:'/'}">万年历</router-link>
      </div>
      <div class="item">
        <router-link class="link" :to="{path:'/bazi'}">算八字</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: [String, Number, Boolean]
    },
    watch: {
      show: function (v) {
        this.open = !!v;
      }
    },
    data() {
      return {
        open: false,
      }
    },
    methods: {
      close() {
        this.open = false
      }
    }
  }
</script>

<style scoped lang="less">
  .drawer {

    .mask {
      position: fixed;
      z-index: 10;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .1);
    }

    .close {
      position: absolute;
      z-index: 10;
      left: -200px;
      top: 0;
      width: 200px;
      height: 100%;
      background: #fff;
      transition: left linear 0.5s;
    }

    .open {
      position: absolute;
      z-index: 10;
      left: 0;
      top: 0;
      width: 200px;
      height: 100%;
      background: #fff;
      transition: left linear 0.5s;

      .header {
        margin: 0;
        height: 56px;
        border-bottom: 1px solid silver;
        p {
          margin-top: 18px;
        }

      }

      .item {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px silver solid;
        text-align: left;
        cursor: pointer;
        margin: 0;
        padding: 0 10px;
        .link {
          width: 100%;
          height: 100%;
          display: block;
        }

        a {
          text-decoration:none;
          color: #000000;
        }
      }
    }
  }

</style>
