<template>
  <div class="cc-calendar">
    <calendar-header
      :headTile="headTile"
      @handlePrevMonth='handlePrevMonth'
      @handleNextMonth='handleNextMonth'
      @handleToday='handleToday'
    />
    <ul class="calendar-week clear">
      <li v-for="(item, index) in calendarTitleList" :key="index" class="week-item" >
        <span :class="[{'weekend-class': item === weeks[0] || item === weeks[6]}]">
           {{item}}
        </span>
      </li>
    </ul>
    <ul class="calendar-view clear">
      <li v-for="(item, index) in visibleCalendar"
          :key="index"
          class="date-view"
          :class="[
          {'month-class': !isCurrentMonth(item.date)},
          {todayBg: isCurrentDay(item.date)},
          {handleDay: item.clickDay}
        ]"
          @click="handleClickDay(item)"
      >
        <span class="date-day"
              :style="dayStyle"
              :class="[
              {'opacity-class': !isCurrentMonth(item.date)},
              {'weekend-class': isWeekend(item.date)}
              ]"
        >
          {{item.day}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  import CalendarHeader from '@/components/calendar-head';

  const weeks = ['日', '一', '二', '三', '四', '五', '六',];

  export default {
    name: 'Calendar',
    components: {
      CalendarHeader,
    },
    data() {
      let {year, month, day} = this.getNewDate(new Date());
      return {
        weekStart: 0, // 一周的第一天 0标识周日
        weeks,
        headTile: '',
        time: {year, month, day},
        calendarList: [],
        calendarTitleList: [],
      }
    },


    computed: {
      dayStyle: function () {
        return {
          textAlign: 'center',
        }
      },
      visibleCalendar() {
        let {year, month, day} = this.getNewDate(this.getDate(this.time.year, this.time.month, 1));
        let currentFirstDay = this.getDate(year, month, 1);
        // 获取当前月第一天星期几
        let weekDay = currentFirstDay.getDay();
        let st = weekDay - this.weekStart;
        if (weekDay < this.weekStart) {
          st = 7 + weekDay - this.weekStart;
        }
        let startTime = currentFirstDay - st * 24 * 60 * 60 * 1000;
        //当前天数
        let allday = this.getDays(year, month);
        let monthDayNum = allday + st; // 加上 上个月显示的天数
        if (monthDayNum % 7 !== 0) { // 除不尽则追加下个月几天
          monthDayNum += 7 - (monthDayNum % 7)
        }

        let calendatArr = [];
        for (let i = 0; i < monthDayNum; i++) {
          calendatArr.push({
            date: new Date(startTime + i * 24 * 60 * 60 * 1000),
            year: year,
            month: month + 1,
            day: new Date(startTime + i * 24 * 60 * 60 * 1000).getDate(),
            clickDay: false,
          })
        }
        this.headTile = this.formatHeadTitle(this.time);
        return calendatArr
      }
    },
    methods: {
      // 是否是当前月
      isCurrentMonth(date) {
        let {year: currentYear, month: currentMonth} = this.getNewDate(this.getDate(this.time.year, this.time.month, 1));
        let {year, month} = this.getNewDate(date);
        return currentYear === year && currentMonth === month
      },
      // 是否是今天
      isCurrentDay(date) {
        let {year: currentYear, month: currentMonth, day: currentDay} = this.getNewDate(new Date());
        let {year, month, day} = this.getNewDate(date);
        return currentYear === year && currentMonth === month && currentDay === day;
      },
      // 是否周末
      isWeekend(date) {
        return date.getDay() === 0 || date.getDay() === 6;
      },
      // 获取当月天数
      getDays(year, month) {
        let allday = 30;
        if (month !== 2) {
          if (month === 4 || month === 6 || month === 9 || month === 11) {//判断是否是相同天数的几个月，二月除外
            allday = 30;
          } else {
            allday = 31;
          }
        }
        else {
          if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {//判断是否是闰年，进行相应的改变
            allday = 29;
          } else {
            allday = 28;
          }
        }
        return allday;
      },
      // 上一个月
      handlePrevMonth() {
        let prevMonth = this.getDate(this.time.year, this.time.month, 1);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        this.time = this.getNewDate(prevMonth);
        this.headTile = this.formatHeadTitle(this.time);
        this.$emit('handlePrevMonth');
      },
      // 下一个月
      handleNextMonth() {
        let nextMonth = this.getDate(this.time.year, this.time.month, 1);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        this.time = this.getNewDate(nextMonth);
        this.headTile = this.formatHeadTitle(this.time);
        this.$emit('handleNextMonth');
      },
      // 点击回到今天
      handleToday() {
        this.time = this.getNewDate(new Date());
        this.$emit('handleToday');
      },
      // 点击某一天
      handleClickDay(item) {
        this.$forceUpdate();
        this.$emit('handleClickDay', item);
        this.calendarList.map(x => {
          x.clickDay = false;
        });
        this.$set(item, 'clickDay', true);
      },

      getNewDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        return {year, month, day};
      },

      getDate(year, month, day) {
        return new Date(year, month, day);
      },


      formatHeadTitle(d) {
        return `${d.year}年${d.month}月`;
      }

    },
    created() {
      this.calendarList = this.visibleCalendar;
      this.calendarTitleList = [];
      for (let i = this.weekStart; i < this.weekStart + 7; i++) {
        this.calendarTitleList.push(weeks[i % 7]);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  ul, ol, li {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ul, ol {
    list-style: none;

  }
  .clear:after {
    display: block;
    height: 0;
    content: "";
    clear: both
  }

  .cc-calendar {
    padding: 15px 1px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .calendar-week {
      width: 100%;
      height: 36px;
      line-height: 36px;
      border: 1px solid #E4E7EA;
      border-right: none;
      .week-item {
        float: left;
        width: 14.285%;
        text-align: center;
        font-size: 14px;
        color: #424953;
        border-right: 1px solid #E4E7EA;
        .weekend-class {
          color: red;
        }
      }
    }
    .calendar-view {
      width: 100%;
      border-left: 1px solid #E4E7EA;
      .date-view {
        float: left;
        width: 14.285%;
        height: 55px;
        border-right: 1px solid #E4E7EA;
        border-bottom: 1px solid #E4E7EA;
        cursor: pointer;
        .date-day {
          padding: 8px 0;
          display: block;
          width: 100%;
          font-size: 16px;
          color: #7F8794;
        }
        .calendar-num {
          margin-top: 6px;
          display: block;
          width: 100%;
          text-align: center;
          font-size: 30px;
          color: #424953;
        }
        .weekend-class {
          color: red;
        }
      }
      .opacity-class {
        opacity: .5;
      }
      .month-class {
        background-image: linear-gradient(45deg, rgba(000, 000, 000, .03) 25%, transparent 25%, transparent 50%, rgba(000, 000, 000, .03) 50%, rgba(000, 000, 000, .03) 75%, transparent 75%, transparent);
        background-size: 20px 20px;
      }
      .todayBg {
        background: #FFFDEF;
        font-weight: bold;
      }
      .handleDay {
        background: #2061FF !important;
        .date-day {
          color: #BCCFFF !important;
        }
        .calendar-num {
          color: #fff !important;
        }
      }
    }
  }
</style>
