<template>
  <calendar
    class="calendar"
    @handleClickDay="handleClickDay"
    @handlePrevMonth="handlePrevMonth"
    @handleNextMonth="handleNextMonth"
  />
</template>

<script>
  import calendar from '@/components/calendar'

  export default {
    name: "index",
    components: {
      calendar
    },
    data() {
      return {

      }
    },
    methods: {
      handleClickDay() {

      },
      handlePrevMonth() {

      },
      handleNextMonth() {

      }
    }
  }
</script>

<style scoped>

</style>
