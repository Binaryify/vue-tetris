<template>
  <div class="logo" :style="'display:'+display">
    <div class="bg dragon" :class="style" />
    <p v-html="titleCenter" />
  </div>
</template>

<script src="./index.js">
</script>


<style lang="less">
@import './index.less';
</style>