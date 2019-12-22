<template>
  <div class="button" :class="color+' '+size" :style="'top:'+top+'px;'+'left:'+left+'px'">
    <i :class="{'active':active}">
      <slot></slot>
    </i>
  </div>
</template>
<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>