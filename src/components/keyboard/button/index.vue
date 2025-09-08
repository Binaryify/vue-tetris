<template>
  <div
    class="button"
    :class="color+' '+size"
    :style="'top:'+top+'px;'+'left:'+left+'px'"
    @mousedown="$emit('mousedown', $event)"
    @mouseup="$emit('mouseup', $event)"
    @mouseout="$emit('mouseout', $event)"
    @touchstart.prevent="$emit('touchstart', $event)"
    @touchend.prevent="$emit('touchend', $event)"
  >
    <i :class="{'active':active}" />
    <em :style="'transform:'+arrow+' scale(1,2)'" v-show="size==='s1'" />
    <span :class="position?'position':''">
      {{label}}
    </span>
  </div>
</template>
<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>
