<template>
  <div class="deleateConfirmation">
    <h2 class="confirmationText">習慣を削除しても<br />よろしいですか？</h2>
    <div class="verticalLine"></div>
    <div class="choices">
      <div class="hitBox">
        <h3 class="positiveText">いいえ</h3>
      </div>
      <div class="sideLine"></div>
      <div class="hitBox">
        <h3 class="negativeText">削除</h3>
      </div>
    </div>
  </div>
</template>
<style src="../static/css/DeleateConfirmation.css" scoped></style>
<script>
export default {
  name: "DeleateConfirmation",
};
</script>
