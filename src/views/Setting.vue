<template>
  <div class="setting">
    <header>
      <h2 class="headerTitle">Setting</h2>
      <p class="headerDescription">
        情報は<a @click="polycyViewChange">プライバシーポリシー</a
        >に則って管理されます
      </p>
    </header>
    <div class="background">
      <div class="customSetting">
        <h4 class="customTitle">習慣を登録してください</h4>
        <p class="customDescription">(睡眠、仕事、学校、読書など)</p>
        <div class="customList">
          <div class="custom" v-for="custom in customs" :key="custom.id">
            <div class="customRight" @click="customEditViewChange(custom)">
              <h3 class="customName">
                {{ custom.title
                }}<img class="Pen" src="../assets/img/Pen.svg" alt="pen" />
              </h3>
              <p class="customTime">{{ custom.times }}</p>
            </div>
            <div class="customLeft" @click="delConViewChange(custom.id, setID)">
              <img
                class="Trashcan"
                src="../assets/img/Trashcan.svg"
                alt="trashcan"
              />
            </div>
          </div>
        </div>
        <button class="LandscapeButton Login Add" @click="customAddView = true">
          Add
        </button>
        <div class="Adjustment">
          <router-link to="/">
            <button class="LandscapeButton Login Next">Confirm</button>
          </router-link>
        </div>
      </div>
    </div>
    <transition name="customAdd">
      <CustomAdd
        v-if="customAddView"
        @childEvent="customAddView = false"
      ></CustomAdd>
    </transition>
    <transition name="customAdd">
      <CustomEdit
        v-if="customEditView"
        @childEvent="customEditView = false"
        :custom="selectedCustom"
      ></CustomEdit>
    </transition>
    <transition>
      <Polycy v-if="polycyView"> </Polycy>
    </transition>
    <transition name="deleteConfirmation">
      <deleteConfirmation
        v-if="delConView"
        @childEvent="delConView = false"
        :id="setID"
        :typeCheck="type"
      >
      </deleteConfirmation>
    </transition>
  </div>
</template>
<style scoped src="../static/css/Setting.css"></style>
<script>
/* eslint-disable */
import CustomAdd from "../components/CustomAdd";
import CustomEdit from "../components/CustomEdit";
import Polycy from "../components/Polycy";
import deleteConfirmation from "../components/DeleteConfirmation";
import { store, actions } from "../store/store";
export default {
  name: "Setting",
  components: {
    CustomAdd,
    Polycy,
    deleteConfirmation,
    CustomEdit,
  },
  data: function () {
    return {
      customAddView: false,
      customEditView: false,
      polycyView: false,
      delConView: false,
      selectedCustom: undefined,
      setID: 0,
      custom: "",
      type: "custom",
    };
  },
  computed: {
    token() {
      return store.token;
    },
    customs() {
      for (let i = 0; i < store.customs.length; i++) {
        let repeatFlagSplit = store.customs[i].repeat_flag.split("");
        let repeatFlagSum =
          Number(repeatFlagSplit[0]) +
          Number(repeatFlagSplit[1]) +
          Number(repeatFlagSplit[2]) +
          Number(repeatFlagSplit[3]) +
          Number(repeatFlagSplit[4]) +
          Number(repeatFlagSplit[5]) +
          Number(repeatFlagSplit[6]);
        let frequency;
        if (repeatFlagSum >= 7) {
          frequency = "毎日";
        } else {
          frequency = Number(repeatFlagSplit[0]) ? "月曜日" : "";
          frequency = Number(repeatFlagSplit[1])
            ? frequency + " 火曜日"
            : frequency;
          frequency = Number(repeatFlagSplit[2])
            ? frequency + " 水曜日"
            : frequency;
          frequency = Number(repeatFlagSplit[3])
            ? frequency + " 木曜日"
            : frequency;
          frequency = Number(repeatFlagSplit[4])
            ? frequency + " 金曜日"
            : frequency;
          frequency = Number(repeatFlagSplit[5])
            ? frequency + " 土曜日"
            : frequency;
          frequency = Number(repeatFlagSplit[6])
            ? frequency + " 日曜日"
            : frequency;
        }
        let startTimeSpilit = store.customs[i].start_time.split(":");
        let endTimeSpilit = store.customs[i].end_time.split(":");
        let displayTime =
          Number(startTimeSpilit[0]) +
          ":" +
          startTimeSpilit[1] +
          "~" +
          Number(endTimeSpilit[0]) +
          ":" +
          endTimeSpilit[1];
        store.customs[i].times = frequency + displayTime;
      }
      return store.customs;
    },
  },
  mounted() {
    const _this = this;
    function addSampleCustom() {
      console.log("addSampleCustom is runnning");
      if (!store.customs.length) {
        const sampleCustoms = [
          {
            title: "朝食",
            start_time: "07:00:00",
            end_time: "07:30:00",
            repeatFlag: "1111111",
          },
          {
            title: "昼食",
            start_time: "12:00:00",
            end_time: "13:00:00",
            repeatFlag: "1111111",
          },
          {
            title: "夕食",
            start_time: "19:00:00",
            end_time: "20:00:00",
            repeatFlag: "1111111",
          },
          {
            title: "睡眠",
            start_time: "23:00:00",
            end_time: "07:00:00",
            repeatFlag: "1111111",
          },
          {
            title: "入浴",
            start_time: "22:00:00",
            end_time: "23:30:00",
            repeatFlag: "1111111",
          },
        ];
        for (let i = 0; i < sampleCustoms.length; i++) {
          actions.postCustom(
            _this.token,
            sampleCustoms[i].title,
            sampleCustoms[i].start_time,
            sampleCustoms[i].end_time,
            sampleCustoms[i].repeatFlag
          );
          console.log(i + "番のタスクを設定しました");
        }
        console.log("初期値を設定しました");
        setTimeout(actions.getCustoms(_this.token), 50);
      } else {
        console.log("初期値は設定されませんでした");
      }
    }
    actions.initialCustomSetting(this.token);
  },
  methods: {
    polycyViewChange() {
      alert("このページは現在実装されていません");
      // this.polycyView = !this.polycyView;
    },
    customEditViewChange(custom) {
      this.selectedCustom = custom;
      console.log(this.selectedCustom);
      this.customEditView = true;
    },
    delConViewChange(id) {
      // console.log("id is " + id);
      this.setID = id;
      // console.log("this.setID is " + this.setID);
      this.delConView = true;
    },
  },
};
</script>
