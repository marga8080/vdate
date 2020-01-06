<template>
  <div>
    <calendar
      class="calendar"
      @handleClickDay="handleClickDay"
      @handlePrevMonth="handlePrevMonth"
      @handleNextMonth="handleNextMonth"
    />
    <date-info :data="curItem"/>
  </div>
</template>

<script>
  import Calendar from '@/components/calendar'
  import DateInfo from '@/components/date-info'

  export default {
    name: "index",
    components: {
      Calendar,
      DateInfo
    },
    data() {
      return {
        curItem: null,
      }
    },
    methods: {
      handleClickDay(item) {
        this.curItem = item;
         //console.log(item)
        let ob = item.lun;
        let s = "";
        if(ob.yxmc) s += ob.yxmc+' '+ob.yxsj+' ';
        if(ob.jqmc) s += '定'+ob.jqmc+' '+ob.jqsj+'<br>';
        else { if(ob.Ljq) s += ob.Ljq+'<br>';}
        if(ob.A)    s += ob.A +' ';
        if(ob.B)    s += ob.B +' ';
        if(ob.C)    s += ob.C;
        console.log(s)
      },
      handlePrevMonth() {

      },
      handleNextMonth() {

      },
    }
  }
</script>

<style scoped>

</style>
