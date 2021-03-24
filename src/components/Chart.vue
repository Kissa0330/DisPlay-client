<template>
  <div>
    <div id="chart"></div>
    <transition>
      <ScheduleDetail
        v-if="scheduleDetailView"
        @childEvent="scheduleDetailView = false"
        :task="task"
      />
    </transition>
  </div>
</template>
<style scoped src="../static/css/Chart.css"></style>
<script>
/* eslint-disable */
import * as d3 from "d3";
import depiction from "../static/js/depictionChart";
import { changeFavicon } from "../static/js/changeFavicon";
import gradients from "../assets/gradients";
import ScheduleDetail from "./SceduleDetail";
import { store, actions } from "../store/store";

export default {
  name: "Chart",
  components: {
    ScheduleDetail,
  },
  data: function () {
    return {
      task: [],
      scheduleDetailView: false,
    };
  },
  computed: {
    customs() {
      return store.customs;
    },
    token() {
      return store.token;
    },
    todos() {
      return store.todos;
    },
    todoHandler() {
      return store.todoHandler;
    },
  },
  mounted() {
    depiction.svg();
    depiction.createGradient("#fbfbff", "#ebebec", "lightGradient");
    depiction.createGrooveShadow();
    depiction.createDropShadow();
    depiction.createGroove();
    depiction.createClock();
    actions.getCustoms(this.token);
  },
  watch: {
    customs: {
      handler() {
        //set vue instance as
        let _this = this;
        let date = new Date();
        let dayOfWeek = date.getDay();

        // create task and set gradient
        for (let i = 0; i < this.customs.length; ++i) {
          // Judge Week days
          let repeatFlag = this.customs[i].repeat_flag.split("");
          if (repeatFlag[dayOfWeek]) {
            let number = this.customs[i].title.charCodeAt(0);
            let code = number.toString().split("").pop();

            //arrange start_time and end_time
            let start = this.customs[i].start_time.split(":");

            let end = this.customs[i].end_time.split(":");

            let startTime = Number(start[0]) + Number(start[1]) * 0.0166;

            let endTime = Number(end[0]) + Number(end[1]) * 0.0166;

            let displayStart = Number(start[0]) + ":" + start[1];
            let displayEnd = Number(end[0]) + ":" + end[1];
            this.customs[i].displayStart = displayStart;
            this.customs[i].displayEnd = displayEnd;

            if (startTime > endTime) {
              startTime = 0;
            }
            // console.log(
            //   "Customs" +
            //     i +
            //     " の startTimeは" +
            //     startTime +
            //     " endTimeは" +
            //     endTime
            // );
            this.customs[i].calculateStartTime = startTime;
            this.customs[i].calculateEndTime = endTime;
            actions.updateCustoms(this.customs);

            depiction.createGradient(
              gradients[code].color,
              gradients[code].color1,
              "taskGradient" + code
            );

            let id = i;

            depiction.createTask(startTime, endTime, code, id);

            document.getElementById(id).onclick = function () {
              let clickedNumber = this.id;
              _this.scheduleDetailView = true;
              _this.task = _this.customs[clickedNumber];
            };
          }
        }
        changeFavicon();
      },
    },
    todoHandler: {
      deep: true,
      handler() {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let _this = this;
        for (let i = 0; i < this.todos.length; ++i) {
          if (this.todos[i].start_time && this.todos[i].end_time) {
            let start_dates = this.todos[i].start_time.split("T")[0].split("-");
            let start_hours = this.todos[i].start_time.split("T")[1].split(":");
            let start_hour = Number(start_hours[0]);
            let start_minute = Number(start_hours[1]);
            let end_dates = this.todos[i].end_time.split("T")[0].split("-");
            let end_hours = this.todos[i].end_time.split("T")[1].split(":");
            let end_hour = Number(end_hours[0]);
            let end_minute = Number(end_hours[1]);
            if (
              start_dates[0] == year &&
              start_dates[1] == month &&
              start_dates[2] == day &&
              start_hour * 60 + start_minute <= end_hour * 60 + end_minute
            ) {
              let number = this.todos[i].title.charCodeAt(0);
              let code = number.toString().split("").pop();

              let startTime = start_hour + start_minute * 0.0166;
              let endTime = end_hour + end_minute * 0.0166;

              // Stringでないと文頭の0が省略されるので、minuteのみstart_hoursから取る
              let displayStart = start_hour + ":" + start_hours[1];
              let displayEnd = end_hour + ":" + end_hours[1];
              this.todos[i].displayStart = displayStart;
              this.todos[i].displayEnd = displayEnd;
              depiction.createGradient(
                gradients[code].color,
                gradients[code].color1,
                "taskGradient" + code
              );
              let id = i;
              depiction.createTask(startTime, endTime, code, "todos" + id);
              document.getElementById("todos" + id).onclick = function () {
                let clickedNumber = this.id.split("s")[1];
                _this.task = _this.todos[clickedNumber];
                _this.scheduleDetailView = true;
              };
              changeFavicon();
            }
          }
        }
      },
    },
  },
};
</script>
