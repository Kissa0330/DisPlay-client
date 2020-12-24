<template>
  <div class="TodoPut">
    <div class="wrap">
      <div class="detailHeader">
        <h2 class="putCaption">Add schedule</h2>
        <div class="link">
          <div class="editText" @click="todoPut">Add</div>
          <img
            src="../assets/img/X.svg"
            alt="X"
            class="X"
            @click="sendTodoPutView"
          />
        </div>
      </div>
      <div class="wrap">
        <h3 class="putCaptionText">Date</h3>
        <img src="../assets/img/stick.svg" class="putStick" alt="stick" />
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
    </div>
  </div>
</template>
<style scoped src="../static/css/TodoPut.css"></style>
<script>
import VueClockPicker from "vue-clock-picker";
import { store, actions } from "../store/store";

export default {
  name: "TodoPut",
  components: {
    VueClockPicker,
  },
  data() {
    return {
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      hour2: new Date().getHours() + 1,
      minute2: new Date().getMinutes(),
    };
  },
  computed: {
    token() {
      return store.token;
    },
    deadline_time() {
      return this.date + "T" + this.time + "+09:00";
    },
    start_time() {
      let date = new Date();
      return (
        date.getFullYear() +
        "-" +
        date.getMonth() +
        "-" +
        date.getDate() +
        "T" +
        this.hour +
        ":" +
        this.minute +
        ":00+09:00"
      );
    },
    end_time() {
      let date = new Date();
      return (
        date.getFullYear() +
        "-" +
        date.getMonth() +
        "-" +
        date.getDate() +
        "T" +
        this.hour2 +
        ":" +
        this.minute2 +
        ":00+09:00"
      );
    },
  },
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  methods: {
    todoPut() {
      actions.putTodo(
        this.id,
        this.title,
        this.deadline_time,
        this.start_time,
        this.end_time,
        store.token
      );
    },
    sendTodoPutView() {
      this.$emit("childEvent");
    },
    timeChangeHandler(e) {
      this.hour = e.hour;
      this.minute = e.minute;
    },
    timeChangeHandler2(e) {
      this.hour2 = e.hour;
      this.minute2 = e.minute;
    },
  },
};
</script>
