<template>
  <div id="scheduleDetail-js" class="scheduleDetail">
    <div class="wrap">
      <div class="detailHeader">
        <div class="headerLeft">
          <h3 class="captionText">Title</h3>
          <img src="../assets/img/stick.svg" class="first stick" alt="stick" />
        </div>
        <div class="link">
          <img
            src="../assets/img/X.svg"
            alt="X"
            class="X"
            @click="sendScheduleDetailView"
          />
        </div>
      </div>
      <div class="field">
        <h2 class="titleText">{{ task.title }}</h2>
      </div>
    </div>
    <div class="wrap">
      <h3 class="captionText">Date</h3>
      <img src="../assets/img/stick.svg" class="stick" alt="stick" />
      <div class="field">
        <h2 class="dateText">{{ task.start_time }}~{{ task.end_time }}</h2>
      </div>
    </div>
    <!-- <div class="wrap">
      <h3 class="date captionText">Memo</h3>
      <img src="../assets/img/stick.svg" class="stick" alt="stick" />
      <div class="field">
        <h2 class="memoText">{{ task.memo }}</h2>
      </div>
    </div> -->
  </div>
</template>
<style scoped src="../static/css/scheduleDetail.css"></style>
<script>
export default {
  name: "ScheduleDetail",
  props: ["task"],
  methods: {
    sendScheduleDetailView() {
      this.$emit("childEvent");
    },
  },
};
</script>
