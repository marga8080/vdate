<template>
  <div class="info">
    <div class="yl">
      <span class="ymd">{{model.ymd}}</span>
      <span class="xiz">{{model.xiz}}</span>
    </div>
    <div class="nl">
      <span class="lmd">{{model.lmd}}</span>
      <span class="jq">{{model.jq}}</span>
    </div>
    <div class="gz">
      <span class="gzr">{{model.gzr}}</span>
      <span class="shx">【{{model.shx}}】</span>
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
        //console.log(ob)
        let m = ob.Lmc;
        if (ob.Lmc === '十一') {
          m = '冬'
        } else if (ob.Lmc === '十二') {
          m = '腊';
        }
        model.lmd = ob.Lleap + m + "月" + ob.Ldc; // 农历
        model.shx = '属' + obb.ShX[ obb.Zhi.indexOf(ob.Lyear3.substr(1))];
        model.gzr = ob.Lyear3 + '年 '+ ob.Lmonth2 + '月 ' + ob.Lday2 + '日'; // 农历干支
        model.ymd = Ayear2year(ob.y) + '年' + ob.m + '月' + ob.d + '日' + '  星期' + JD.Weeks[ob.week]; // 公历年月日
        model.xiz = ob.XiZ;
        model.jq = "";
        if (ob.jqmc) {
          model.jq = ob.jqmc + ` (${ob.jqsj})`; // 节气
        }
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
  .yl {
    position: relative;
    height: 22px;
    .ymd {

    }
    .xiz {
      position: absolute;
      top: 0;
      right: 0px;
      font-size: 14px;
      border: 1px solid darkred;
      padding: 1px 4px;
      border-radius: 4px;
      color: darkred;
    }
  }

  .nl {
    padding-top: 10px;
    color: crimson;
    .lmd {
      font-size: 22px;
    }
    .jq {
      //font-size: 14px;
      margin-left: 5px;
    }
  }

  .gz {
    padding-top: 10px;
    .gzr {

    }
    .shx {
      margin-left: 2px;
    }
  }
}

</style>
