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
      <button class="Logout LandscapeButton" @click="logoutConView = true">
        Logout
      </button>
      <transition name="logoutConfirmation">
        <LogoutConfirmation
          v-if="logoutConView"
          @childEvent="logoutConView = false"
        />
      </transition>
    </div>
  </div>
</template>
<style scoped src="../static/css/Option.css"></style>
<script>
import CustomTable from "../components/CustomTable";
import LogoutConfirmation from "../components/LogoutConfirmation.vue";
export default {
  name: "Option",
  components: { CustomTable, LogoutConfirmation },
  data: function () {
    return {
      logoutConView: false,
    };
  },
};
</script>
