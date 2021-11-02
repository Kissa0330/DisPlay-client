<template>
  <div class="LP">
    <header>
      <div class="appName">DisPlay</div>
      <router-link to="/signin">
        <button class="userConductor">サインイン</button>
      </router-link>
    </header>
    <div class="samneil">
      <img src="../assets/img/eating.svg" alt="eating" />
      <div class="samneilCaption">
        <h1 class="samneilTitle">DisPlay</h1>
        <h3 class="samneilString">
          習慣を管理し、空き時間を明確にする<br />あなたの自由な時間が増える
        </h3>
        <router-link to="/signin">
          <button class="Signin">無料でサインインする</button>
        </router-link>
      </div>
    </div>
    <h2 class="explainString">
      <span class="br">食事・睡眠・入浴…『習慣』の</span
      ><span class="br">管理をサポートし</span
      ><br />あなたの自由時間を増やします
    </h2>
    <div class="schema One">
      <img src="../assets/img/circle.svg" alt="clock" />
      <div class="schemaText">
        <h1 class="schemaTitle">習慣を可視化</h1>
        <h3 class="schemaString">
          あなたが『いつ何を行っているか』を<br />視覚的に表示
          <br />空いている時間を一目で把握
        </h3>
      </div>
    </div>
    <div class="schema Two">
      <img class="Todo" src="../assets/img/Todolist.svg" alt="Todolist" />
      <img class="smallTodo" src="../assets/img/smallTodolist.svg" alt="Todolist" />
      <div class="schemaText">
        <h1 class="schemaTitle">タスクを消化</h1>
        <h3 class="schemaString">
          空き時間にTodoをスケジューリング<br />
          円滑なタスク消化を実現
        </h3>
      </div>
    </div>
    <div class="schema Three">
      <img src="../assets/img/smartphone.svg" alt="smartphone" />
      <div class="schemaText">
        <h1 class="schemaTitle">素晴らしい体験</h1>
        <h3 class="schemaString">
          PWAを使っているからブラウザで<br />インストール可能<br />
          どんな端末でも快適に使用可能
        </h3>
      </div>
    </div>
    <router-link to="/signin">
      <button class="SigninBottom">無料でサインインする</button>
    </router-link>
  </div>
</template>
<style src="../static/css/landingpage.css"></style>
<script>
export default {
  name: "LandingPage",
};
</script>
