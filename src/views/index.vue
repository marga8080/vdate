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
