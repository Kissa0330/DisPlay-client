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
            <VueTimepicker></VueTimepicker>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped src="../static/css/TodoPut.css"></style>
<script>
import { store, actions } from "../store/store";
import VueTimepicker from 'vue3-timepicker/src/VueTimepicker.vue'

export default {
  name: "TodoPut",
  components: {
    VueTimepicker
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
      if (
        this.hour + this.minute * 0.0166 <=
        this.hour2 + this.minute2 * 0.0166
      ) {
        for (let i = 0; i < store.customs.length; ++i) {
          let date = new Date();
          let dayOfWeek = date.getDay();
          let repeatFlag = store.customs[i].repeat_flag.split("");
          if (repeatFlag[dayOfWeek]) {
            if (
              !(
                store.customs[i].calculateStartTime <=
                  this.hour2 + this.minute2 * 0.0166 &&
                this.hour + this.minute * 0.0166 <=
                  store.customs[i].calculateEndTime
              )
            ) {
              if ((i = store.customs.length - 1)) {
                actions.putTodo(
                  true,
                  this.id,
                  this.title,
                  this.deadline_time,
                  this.start_time,
                  this.end_time,
                );
                this.$emit("childEvent");
              }
            } else {
              alert("タスクは習慣と時間が被っていない必要があります");
              return;
            }
          }
        }
      } else {
        alert("start_timeはend_timeより小さい必要があります");
        return;
      }
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
