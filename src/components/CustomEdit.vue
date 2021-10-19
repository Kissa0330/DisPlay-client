<template>
  <div class="customEdit">
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
          @click="sendcustomEditView"
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
          <VueTimepicker
            hide-clear-button
            format="HH:mm"
            v-model="timepicker1"
          ></VueTimepicker>
          <p class="centerText">~</p>
          <VueTimepicker
            hide-clear-button
            format="HH:mm"
            v-model="timepicker2"
          ></VueTimepicker>
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
    <button
      class="LandscapeButton Login"
      @click="
        putCustom();
        sendcustomEditView();
      "
    >
      Update
    </button>
  </div>
</template>
<style scoped src="../static/css/CustomEdit.css"></style>
<script>
import { actions } from "../store/store.js";
import VueTimepicker from "vue3-timepicker/src/VueTimepicker.vue";

export default {
  name: "customEdit",
  components: { VueTimepicker },
  data: function () {
    let time = [
      this.custom.start_time.split(":")[0],
      this.custom.end_time.split(":")[0],
      this.custom.start_time.split(":")[1],
      this.custom.end_time.split(":")[1],
    ];
    for (let i; i < time.length; i++) {
      if (time[i] < 10) {
        time[i] = "0" + time[i];
      } else {
        time[i] = time[i] + "";
      }
    }
    return {
      dayOfTheWeeks: [
        { name: "Su", id: "1", isActive: false },
        { name: "M", id: "2", isActive: false },
        { name: "Tu", id: "3", isActive: false },
        { name: "W", id: "4", isActive: false },
        { name: "Th", id: "5", isActive: false },
        { name: "F", id: "6", isActive: false },
        { name: "Sa", id: "7", isActive: false },
      ],
      title: this.custom.title,
      hour: Number(this.custom.start_time.split(":")[0]),
      minute: Number(this.custom.start_time.split(":")[1]),
      hour2: Number(this.custom.end_time.split(":")[0]),
      minute2: Number(this.custom.end_time.split(":")[1]),
      timepicker1: {
        HH: time[0],
        mm: time[3],
      },
      timepicker2: {
        HH: time[1],
        mm: time[2],
      },
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
      let time;
      const minute1 = this.timepicker1.mm;
      const minute2 = this.timepicker2.mm;
      if(this.timepicker1.HH == this.timepicker2.HH)
      {
        let minute = minute1 >= minute2 ? minute2 : minute1;
      time =
        String(this.timepicker1.HH) + ":" + String(minute) + ":00";
      }
      else
      {
      time =
        String(this.timepicker1.HH) + ":" + String(this.timepicker1.mm) + ":00";
      }
      return time;
    },
    end_time() {
      let time;
      const minute1 = this.timepicker1.mm;
      const minute2 = this.timepicker2.mm;
      if(this.timepicker1.HH == this.timepicker2.HH)
      {
        let minute = minute1 >= minute2 ? minute1 : minute2;
      time =
        String(this.timepicker2.HH) + ":" + String(minute) + ":00";
      }
      else
      {
      time =
        String(this.timepicker2.HH) + ":" + String(minute2) + ":00";
      }
      return time;
    },
  },
  props: ["custom"],
  methods: {
    sendcustomEditView() {
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
    putCustom() {
      console.log(this.start_time);

      actions.putCustom(
        this.title,
        this.repeatFlag,
        this.start_time,
        this.end_time,
        this.custom.id
      );
    },
  },
  mounted() {
    let flag = this.custom.repeat_flag.split("");
    console.log(flag);
    for (let i = 0; i < flag.length; i++) {
      console.log("今回は" + i + "回目のループです");
      if (Number(flag[i])) {
        this.dayOfTheWeeks[i].isActive = true;
        console.log("is Activeをtrueに設定しました");
      } else {
        this.dayOfTheWeeks[i].isActive = false;
        console.log("is Activeをfalseに設定しました");
      }
    }
  },
};
</script>
