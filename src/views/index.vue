<template>
  <div>
    <calendar
      class="calendar"
      @handleClickDay="handleClickDay"
      @handlePrevMonth="handlePrevMonth"
      @handleNextMonth="handleNextMonth"
      @handleMenu="handleMenu"
    />
    <date-info :data="curItem"/>
    <drawer :show="open"/>
  </div>
</template>

<script>
  import Calendar from '@/components/calendar'
  import DateInfo from '@/components/date-info'
  import Drawer from '@/components/drawer'

  export default {
    name: "index",
    components: {
      Calendar,
      DateInfo,
      Drawer
    },
    data() {
      return {
        curItem: null,
        open: false,
      }
    },
    methods: {
      handleClickDay(item) {
        this.curItem = item;
      },
      handlePrevMonth() {

      },
      handleNextMonth() {

      },
      handleMenu() {
        this.open = Math.random();
      }
    }
  }
</script>

<style scoped>

</style>
