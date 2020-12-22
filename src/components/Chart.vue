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
  },
  //TODO 401errorが出るたびにtokenを取得し直す機能を追加
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
    customs: function () {
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

          let startTime = (start[0] + start[1] * 0.166) * 0.1;

          let endTime = (end[0] + end[1] * 0.166) * 0.1;

          let displayStart = Number(start[0]) + ":" + start[1];
          let displayEnd = Number(end[0]) + ":" + end[1];
          this.customs[i].start_time = displayStart;
          this.customs[i].end_time = displayEnd;

          if (startTime > endTime) {
            startTime = 0;
          }

          depiction.createGradient(
            gradients[code].color,
            gradients[code].color1,
            "taskGradient" + code
          );

          let id = this.customs[i].id;

          depiction.createTask(startTime, endTime, code, id);

          document.getElementById(id).onclick = function () {
            let clickedNumber = this.id - 1;
            // console.log("クリックしたタスクは" + clickedNumber + "番でよ");
            _this.scheduleDetailView = true;
            _this.task = _this.customs[clickedNumber];
          };
        }
      }
      changeFavicon();
    },
  },
};
</script>
