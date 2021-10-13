<template>
  <div>
    <div class="Header">
      <h1 class="Headertitle">DisPlay</h1>
    </div>
    <div class="menu">
      <h1 class="menutitle">Setting</h1>
      <h3 class="menuStr">
        DisPlayを使用するために<br />習慣のスケジュールを<br />設定しましょう
      </h3>
      <h4 class="menuTimeStr">所要時間:約5分</h4>
      <router-link to="/setting">
        <button class="Login LandscapeButton">Start</button>
      </router-link>
    </div>
  </div>
</template>
<style scoped src="../static/css/Initial.css"></style>
<script>
export default {
  name: "Initial",
};
</script>