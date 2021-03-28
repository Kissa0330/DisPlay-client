<template>
  <div class="optionWrapper">
    <header>
      <router-link to="/">
        <img src="../assets/img/arrow.svg" class="arrow" alt="arrow" />
      </router-link>
      <h1 class="headerTitle">Option</h1>
    </header>
    <div class="customOptionHeader">
      <h3 class="customOptionTitle">Custom</h3>
      <router-link to="/setting">
        <button class="LandscapeButton RessetingButton">Resseting</button>
      </router-link>
    </div>
    <CustomTable />
    <div class="logoutSection">
      <h3 class="logoutTitle">Logout</h3>
      <button class="Logout LandscapeButton" @click="logout">Logout</button>
    </div>
  </div>
</template>
<style scoped src="../static/css/Option.css"></style>
<script>
import CustomTable from "../components/CustomTable";
export default {
  name: "Option",
  components: { CustomTable },
  methods: {
    logout() {
      document.cookie = "token=; max-age=0";
      location.reload();
    },
  },
};
</script>
