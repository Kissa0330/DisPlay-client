<template>
  <div class="optionWrapper">
    <transition name="error">
      <Error v-if="errorView" />
    </transition>
    <header>
      <router-link to="/">
        <img src="../assets/img/arrow.svg" class="arrow" alt="arrow" />
      </router-link>
      <h1 class="headerTitle">Option</h1>
    </header>
    <div class="customOptionHeader">
      <h3 class="customOptionTitle">Custom</h3>
      <router-link to="/setting">
        <button class="LandscapeButton ResetingButton">Reseting</button>
      </router-link>
    </div>
    <CustomTable />
    <div class="logout Section">
      <h3 class="logout Title">Logout</h3>
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
    <div class="Contact Section">
      <h3 class="terms Title">Contact us</h3>
      <a
        href="mailto:displayapp.management@gmail.com"
        rel="noopener"
        target="blank"
      >
        <button class="terms LandscapeButton">Gmail</button>
      </a>
    </div>
    <div class="terms Section">
      <h3 class="terms Title">Terms of service</h3>
      <a
        href="https://raika.notion.site/fb89da1abe7b4e5caf091a7e33f82404"
        rel="noopener"
        target="blank"
      >
        <button class="terms LandscapeButton">Browse</button>
      </a>
    </div>
    <div class="delete Section">
      <h3 class="delete Title">Delete account</h3>
      <button class="Logout LandscapeButton" @click="delConView = true">
        Delete
      </button>
      <transition name="deleteConfirmation">
        <DeleteConfirmation
          v-if="delConView"
          @childEvent="delConView = false"
          :typeCheck="type"
        />
      </transition>
    </div>
  </div>
</template>
<style scoped src="../static/css/Option.css"></style>
<script>
import CustomTable from "../components/CustomTable";
import LogoutConfirmation from "../components/LogoutConfirmation.vue";
import DeleteConfirmation from "../components/DeleteConfirmation.vue";
import Error from "../components/Error.vue";
import { store } from "../store/store";
export default {
  name: "Option",
  components: { CustomTable, LogoutConfirmation, Error, DeleteConfirmation },
  data: function () {
    return {
      logoutConView: false,
      delConView: false,
      type: "account",
    };
  },
  computed: {
    errorView() {
      return store.errorFlag;
    },
  },
};
</script>
