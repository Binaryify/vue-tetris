<template>
  <div class="next">
    <div v-for="(item,index) in block">
      <b :class="e ? 'c' : ''" v-for="(e,k2) in item" />
    </div>
  </div>
</template>

<script src="./index.js">
</script>


<style lang="less">
@import './index.less';
</style>