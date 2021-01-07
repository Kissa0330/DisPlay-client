<template>
  <div class="setting">
    <header>
      <h2 class="headerTitle">Setting</h2>
      <p class="headerDescription">
        情報は<a>プライバシーポリシー</a>に則って管理されます
      </p>
    </header>
    <div class="background">
      <div class="customSetting">
        <h4 class="customTitle">習慣を登録してください</h4>
        <p class="customDescription">(睡眠、仕事、学校、読書など)</p>
        <div class="customList">
          <div class="custom" v-for="custom in customs" :key="custom.id">
            <div class="customRight">
              <h3 class="customName">
                {{ custom.name
                }}<img class="Pen" src="../assets/img/Pen.svg" alt="pen" />
              </h3>
              <p class="customTime">{{ custom.times }}</p>
            </div>
            <div class="customLeft">
              <img
                class="Trashcan"
                src="../assets/img/Trashcan.svg"
                alt="trashcan"
              />
            </div>
          </div>
        </div>
        <button class="LandscapeButton Login Add">Add</button>
        <button class="LandscapeButton Login Next">Next</button>
      </div>
    </div>
  </div>
</template>
<style scoped src="../static/css/Setting.css"></style>
<script>
export default {
  name: "Setting",
  data: function () {
    return {
      customs: [
        {
          id: "1",
          name: "朝食",
          times: "毎日 7:00~7:30",
        },
        {
          id: "2",
          name: "昼食",
          times: "毎日 12:00~12:30",
        },
      ],
    };
  },
};
</script>
