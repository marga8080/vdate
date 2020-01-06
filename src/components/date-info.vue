<template>
  <div class="info">
    <div>
      {{model.ymd}}
    </div>
    <div class="lmd">
      {{model.lmd}}
    </div>
    <div class="gzr">
      {{model.gzr}}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: Object
    },
    watch:{
      data: function(v){
        this.item = v;
      }
    },
    data() {
      return {
        item: this.data,

      }
    },
    computed: {
      model() {
        let model = {};
        if (!this.item) {
          return {};
        }
        let ob = this.item.lun;
        let m = ob.Lmc;
        if (ob.Lmc === '十一') {
          m = '冬'
        } else if (ob.Lmc === '十二') {
          m = '腊';
        }
        model.lmd = ob.Lleap + m + "月" + ob.Ldc;
        model.gzr = ob.Lyear3 + '年 '+ ob.Lmonth2 + '月 ' + ob.Lday2 + '日';
        model.ymd = Ayear2year(ob.y) + '年' + ob.m + '月' + ob.d + '日' + '  星期' + JD.Weeks[ob.week];
        return model;
      },
    },
    created() {

    },
    methods: {

    }
  }
</script>

<style scoped lang="less">
.info {
  text-align: left;
  padding: 0 20px;
  .lmd {
    padding-top: 10px;
    color: crimson;
    font-size: 22px;
  }
  .gzr {
    padding-top: 10px;
  }
}

</style>
