<template>
  <div class="cc-calendar">
    <calendar-header
      :headTile="headTile"
      @handlePrevMonth='handlePrevMonth'
      @handleNextMonth='handleNextMonth'
      @handleToday='handleToday'
      @handleMenu="handleMenu"
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
          {'month-class': !item.isCurrentMonth},
          {todayBg: item.isCurrentDay},
          {handleDay: item.clickDay}
        ]"
          @click="handleClickDay(item)"
      >
        <div class="date-day"
              :style="dayStyle"
              :class="[
              {'opacity-class': !item.isCurrentMonth},
              {'weekend-class': isWeekend(item.date)}
              ]"
        >
          <span :class="[{'holiday-class': item.isHoliday},{'hworkday-class': item.isHworkday}]"></span>
          {{item.day}}
          <div class="lun-class">
            {{item.lund}}
          </div>
        </div>
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
        clickItem: null,
        selItem: null, // 当前选中的item
        holiday: [],
        hworkday: [],
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
        let mdays = this.getDays(year, month + 1);
        let monthDayNum = mdays + st; // 加上 上个月显示的天数
        if (monthDayNum % 7 !== 0) { // 除不尽则追加下个月几天
          monthDayNum += 7 - (monthDayNum % 7)
        }

        this.lun.yueLiCalc(year, month + 1);
        let calendarArr = [];
        let {year: currentYear, month: currentMonth, day: currentDay} = this.getNewDate(new Date());
        for (let i = 0; i < monthDayNum; i++) {
          let date = new Date(startTime + i * 24 * 60 * 60 * 1000);
          let item = {
            date,
            year: year,
            month: month + 1,
            day: date.getDate(),
            clickDay: false,
            isCurrentDay: false,
          };
          // 设置选中日期
          if (month === currentMonth && year === currentYear) {
            item.isCurrentDay = date.getDate() === currentDay;
            item.clickDay = item.isCurrentDay;
          } else {
            item.clickDay = i - st === 0;
          }
          if (this.clickItem) {
            item.clickDay = date.getDate() === this.clickItem.day && date.getMonth() === this.clickItem.date.getMonth();
          }
          if (i < st) {
            item.curM = -1;
          } else if (i >= st && i < mdays + st) {
            item.curM = 0;
          } else {
            item.curM = 1;
          }
          item.isCurrentMonth = item.curM === 0;
          if (i - st >= 0 && i - st < mdays) {
            let ob = this.lun.lun[i - st];
            item.lun = ob;
            let c = ob.jqmc;
            // if(ob.A) {
            //   c += this.substr2(ob.A, 4, '');
            // }
            // if(!c && ob.B && ob.B.indexOf("『") !== 0) {
            //   c = this.substr2(ob.B,2,'');
            //   console.log(ob.B)
            // }
            if(!c && ob.Ldc==="初一") {//农历历月(闰月及大小等)
              //(ob.Ldn==30?'大':'小')
              let m = ob.Lmc;
              if (ob.Lmc === '十一') {
                m = '冬'
              } else if (ob.Lmc === '十二') {
                m = '腊';
              }
              c = ob.Lleap + m +'月';
            }
            if(!c) {
              c = ob.Ldc;
            } //取农历
            item.lund = c;
          } else {
            item.lun = {};
            item.lund = '';
          }
          if (item.clickDay) {
            this.setCurSelItem(item);
          }
          // 判断放假和调休
          let fmtd = this.formaDate(date);
          if (this.holiday.indexOf(fmtd * 1) !== -1) {
            item.isHoliday = true;
          }
          if (this.hworkday.indexOf(fmtd * 1) !== -1) {
            item.isHworkday = true;
          }
          //console.log(data.lun)
          calendarArr.push(item)
        }
        this.headTile = this.formatHeadTitle(this.time);
        this.calendarList = calendarArr;
        return calendarArr
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
        this.clickItem = null;
        let prevMonth = this.getDate(this.time.year, this.time.month, 1);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        this.time = this.getNewDate(prevMonth);
        this.headTile = this.formatHeadTitle(this.time);
        this.$emit('handlePrevMonth');
      },
      // 下一个月
      handleNextMonth() {
        this.clickItem = null;
        let nextMonth = this.getDate(this.time.year, this.time.month, 1);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        this.time = this.getNewDate(nextMonth);
        this.headTile = this.formatHeadTitle(this.time);
        this.$emit('handleNextMonth');
      },
      // 点击回到今天
      handleToday() {
        this.clickItem = null;
        this.time = this.getNewDate(new Date());
        this.$emit('handleToday');
      },
      // 点击某一天
      handleClickDay(item) {
        this.$forceUpdate();
        this.$emit('handleClickDay', item);
        if (item.curM === -1) {
          this.handlePrevMonth();
        } else if (item.curM === 1) {
          this.handleNextMonth();
        }
        this.calendarList.map(x => {
          x.clickDay = false;
        });
        this.$set(item, 'clickDay', true);
        if (item.curM !== 0) {
          this.clickItem = item;
        }
      },

      setCurSelItem(item) {
        this.$emit('handleClickDay', item);
      },
      // 菜单
      handleMenu() {
        this.$emit('handleMenu');
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
      //截串(网页设计对过长的文字做截处理)
      substr2(s,n,end){
        s=s.replace(/(^\s*)|(\s*$)/g, "");
        if(s.length > n + 1) {
          return s.substr(0, n);
        }
        return s;
      },
      formatHeadTitle(d) {
        let month = d.month + 1;
        return `${d.year}年${month}月`;
      },
      formaDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return year + (month < 10 ? '0' : '') + month + (day < 10 ? '0' : '') + day;
      },
    },
    created() {
      this.lun = new Lunar();
      this.calendarTitleList = [];
      for (let i = this.weekStart; i < this.weekStart + 7; i++) {
        this.calendarTitleList.push(weeks[i % 7]);
      }
      this.holiday = config.holiday;
      this.hworkday = config.hworkday;
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
          color: #e02d2d;
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
          position: relative;
          padding: 8px 0;
          display: block;
          width: 100%;
          font-size: 18px;
          color: #424953;
          .lun-class {
            font-size: 12px;
          }
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
          color: #e02d2d;
        }
        .holiday-class {
          position: absolute;
          right: 2px;
          top: 2px;
          display: block;
          width: 15px;
          height: 15px;
          text-align: center;
          text-indent: 1px;
          line-height: 15px;
          overflow: hidden;
          color: #009900;
          font-size: 10px;
        }
        .holiday-class:after {
          content: '假';
        }
        .hworkday-class {
          position: absolute;
          right: 2px;
          top: 2px;
          display: block;
          width: 15px;
          height: 15px;
          color: red;
          text-align: center;
          text-indent: 1px;
          line-height: 15px;
          overflow: hidden;
          font-size: 10px;
        }
        .hworkday-class:after {
          content: '班';
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
        background: #DEB887;
        font-weight: bold;
        .date-day {
          color: #fff !important;
        }
      }
      .todayBg.handleDay {
        background: #FFBB00;
      }
      .todayBg.handleDay.opacity-class  {
        background: #DEB887;
      }
      .handleDay {
        border: 3px solid #FFBB00;
      }
    }
  }
</style>
