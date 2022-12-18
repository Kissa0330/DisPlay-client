<template>
  <div>
    <div class="CustomTables">
      <div id="CustomTable" />
      <div id="CustomTable" />
      <div id="CustomTable" />
      <div id="CustomTable" />
      <div id="CustomTable" />
      <div id="CustomTable" />
      <div id="CustomTable" />
    </div>
    <transition name="customEdit">
      <CustomEdit
        v-if="customEditView"
        @childEvent="(customEditView = false), (selectedCustom = '')"
        :custom="selectedCustom"
      ></CustomEdit>
    </transition>
  </div>
</template>
<style scoped>
.CustomTables {
  display: flex;
  justify-content: center;
  margin: 35px 0 0 0;
}
#CustomTable {
  margin: 0 3px 0 3px;
}
</style>
<script>
import depiction from "../static/js/depictionCustomTable";
import gradients from "../assets/gradients";
import CustomEdit from "./CustomEdit";
import { store, actions } from "../store/store";

export default {
  name: "CustomTable",
  components: { CustomEdit },
  data: function () {
    return {
      customEditView: false,
      selectedCustom: "",
    };
  },
  computed: {
    customs() {
      return store.customs;
    },
  },
  mounted() {
    actions.getCustoms();
    depiction.svg();
    depiction.createGradient("#FFFFFF", "#F8F8F8", "baseGradient");
    depiction.base();
  },
  watch: {
    customs() {
      let i;
      let _this = this;
      for (i = 0; i < this.customs.length; i++) {
        const repeatFlagLength = this.customs[i].repeat_flag.length;
        let childnthNumber = 1;
        for (let j = 0; j < repeatFlagLength; j++) {
          let id = "CT" + i + "r" + childnthNumber;
          depiction.removeCustom(id);
          const repeatFlag = this.customs[i].repeat_flag[j];
          if (repeatFlag == 1) {
            let textNum = this.customs[i].title.charCodeAt(0);
            let colorCode = textNum.toString().split("").pop();
            let startTime = this.customs[i].start_time.split(":");
            startTime.pop();
            let endTime = this.customs[i].end_time.split(":");
            endTime.pop();
            // console.log("Start time is " + startTime);
            // console.log("End time is " + endTime);
            depiction.createGradient(
              gradients[colorCode].color,
              gradients[colorCode].color1,
              "customGradient" + colorCode
            );
            depiction.custom(
              childnthNumber,
              startTime,
              endTime,
              this.customs[i].title,
              colorCode,
              id
            );
            document.getElementById(id).onclick = function () {
              let clickedNumber = this.id.split("CT")[1].split("r")[0];
              console.log(clickedNumber);
              console.log(id);
              _this.selectedCustom = _this.customs[clickedNumber];
              _this.customEditView = true;
            };
          } else console.log("repeat flag is false");
          childnthNumber++;
        }
      }
    },
  },
};
</script>
