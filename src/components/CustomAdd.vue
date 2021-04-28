<template>
  <div class="customAdd">
    <div class="wrap">
      <div class="detailHeader">
        <div class="headerLeft">
          <h3 class="captionText">Title</h3>
          <img src="../assets/img/stick.svg" class="first stick" alt="stick" />
        </div>
        <img
          src="../assets/img/X.svg"
          alt="X"
          class="X"
          @click="sendCustomAddView"
        />
      </div>
      <div class="field">
        <h2 class="titleText">
          <input
            class="titleInputArea"
            type="text"
            v-model="title"
            placeholder="enter title"
          />
        </h2>
      </div>
    </div>
    <div class="wrap">
      <h3 class="captionText">Time</h3>
      <img src="../assets/img/stick.svg" class="stick" alt="stick" />
      <div class="field">
        <div class="timePicker">
          <vue-clock-picker
            mode="24"
            :defaultHour="hour"
            :defaultMinute="minute"
            :onTimeChange="timeChangeHandler"
          />
          <vue-clock-picker
            mode="24"
            :defaultHour="hour2"
            :defaultMinute="minute2"
            :onTimeChange="timeChangeHandler2"
          />
        </div>
      </div>
    </div>
    <div class="wrap">
      <h3 class="captionText">Repeat</h3>
      <img src="../assets/img/stick.svg" class="stick" alt="stick" />
      <div class="field">
        <div class="dayOfTheWeeks">
          <div
            class="dayOfTheWeek"
            v-for="dayOfTheWeek in dayOfTheWeeks"
            :key="dayOfTheWeek.id"
            @click="
              dayOfTheWeek.isActive = !dayOfTheWeek.isActive;
              isActiveChange = !isActiveChange;
            "
            :class="{ active: dayOfTheWeek.isActive }"
          >
            <p class="dayOfTheWeekText">{{ dayOfTheWeek.name }}</p>
          </div>
        </div>
        <div class="buttonsInDayOfTheWeeks">
          <button
            class="LandscapeButton inDayOfTheWeeks left"
            @click="allActive"
          >
            ALL
          </button>
          <button class="LandscapeButton inDayOfTheWeeks" @click="allDeActive">
            CLEAR
          </button>
        </div>
      </div>
    </div>
    <button class="LandscapeButton Login" @click="postCustom();sendCustomAddView()">Add</button>
  </div>
</template>
<style scoped src="../static/css/CustomAdd.css"></style>
<script>
import VueClockPicker from "vue-clock-picker";
import { actions } from "../store/store.js";

export default {
  name: "CustomAdd",
  components: {
    VueClockPicker,
  },
  data: function () {
    return {
      dayOfTheWeeks: [
        { name: "Su", id: "1", isActive: true },
        { name: "M", id: "2", isActive: true },
        { name: "Tu", id: "3", isActive: true },
        { name: "W", id: "4", isActive: true },
        { name: "Th", id: "5", isActive: true },
        { name: "F", id: "6", isActive: true },
        { name: "Sa", id: "7", isActive: true },
      ],
      title: "",
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      hour2: new Date().getHours() + 1,
      minute2: new Date().getMinutes(),
      isActiveChange: false,
    };
  },
  computed: {
    repeatFlag() {
      let flag = "";
      for (let i = 0; i < this.dayOfTheWeeks.length; i++) {
        if (this.dayOfTheWeeks[i].isActive) {
          flag = flag + "1";
        } else {
          flag = flag + "0";
        }
      }
      return flag;
    },
    start_time() {
      let time = String(this.hour) + ":" + String(this.minute) + ":00";
      return time;
    },
    end_time() {
      let time = String(this.hour2) + ":" + String(this.minute2) + ":00";
      return time;
    },
  },
  methods: {
    sendCustomAddView() {
      this.$emit("childEvent");
    },
    allActive() {
      for (let i = 0; i < this.dayOfTheWeeks.length; i++) {
        this.dayOfTheWeeks[i].isActive = true;
      }
    },
    allDeActive() {
      for (let i = 0; i < this.dayOfTheWeeks.length; i++) {
        this.dayOfTheWeeks[i].isActive = false;
      }
    },
    timeChangeHandler(e) {
      this.hour = e.hour;
      this.minute = e.minute;
    },
    timeChangeHandler2(e) {
      this.hour2 = e.hour;
      this.minute2 = e.minute;
    },
    postCustom() {
      actions.postCustom(
        this.title,
        this.start_time,
        this.end_time,
        this.repeatFlag
      );
    },
  },
};
</script>
