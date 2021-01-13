<template>
  <div class="CustomAdd">
    <div class="wrap">
      <div class="detailHeader">
        <div class="headerLeft">
          <h3 class="captionText">Title</h3>
          <img src="../assets/img/stick.svg" class="first stick" alt="stick" />
        </div>
        <div class="link">
          <img src="../assets/img/X.svg" alt="X" class="X" />
        </div>
      </div>
      <div class="field">
        <h2 class="titleText">Title</h2>
      </div>
    </div>
    <div class="wrap">
      <h3 class="captionText">Time</h3>
      <img src="../assets/img/stick.svg" class="stick" alt="stick" />
      <div class="field">
        <h2 class="titleText">12:00~13:00</h2>
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
          >
            <p class="dayOfTheWeekText">{{ dayOfTheWeek.name }}</p>
          </div>
        </div>
        <div class="buttonsInDayOfTheWeeks">
          <button class="LandscapeButton inDayOfTheWeeks left">ALL</button>
          <button class="LandscapeButton inDayOfTheWeeks">CLEAR</button>
        </div>
      </div>
    </div>
    <button class="LandscapeButton Login">Add</button>
  </div>
</template>
<style scoped src="../static/css/CustomAdd.css"></style>
<script>
export default {
  name: "CustomAdd",
  data: function () {
    return {
      dayOfTheWeeks: [
        { name: "Su", id: "1" },
        { name: "M", id: "2" },
        { name: "Tu", id: "3" },
        { name: "W", id: "4" },
        { name: "Th", id: "5" },
        { name: "F", id: "6" },
        { name: "Sa", id: "7" },
      ],
    };
  },
};
</script>
