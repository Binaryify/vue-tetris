<template>
  <div v-show="!isMobile">
    <div class="guide right">
      <div class="up">
        <em style="transform:translate(0,-3px) scale(1,2)" />
      </div>
      <div class="left">
        <em style="transform:translate(-7px,3px) rotate(-90deg) scale(1,2)" />
      </div>
      <div class="down">
        <em style="transform: translate(0,9px) rotate(180deg) scale(1,2)" />
      </div>
      <div class="right">
        <em style="transform: translate(7px,3px)rotate(90deg) scale(1,2)" />
      </div>
    </div>
    <div class="guide left">
      <p>
        <a href="https://github.com/Binaryify/vue-tetris" rel="noopener noreferrer" target="_blank" v-bind="{title:linkTitle}">{{github}}:</a>
        <br />
        <iframe src="https://ghbtns.com/github-btn.html?user=Binaryify&repo=vue-tetris&type=star&count=true" frameBorder="0" scrolling="0" width="170px" height="20px" style="transform: scale(1.68);transform-origin: center left" />
        <br />
        <iframe src="https://ghbtns.com/github-btn.html?user=Binaryify&repo=vue-tetris&type=fork&count=true" frameBorder="0" scrolling="0" width="170px" height="20px" style="transform: scale(1.68);transform-origin: center left" />
      </p>
      <div class="space">SPACE</div>
    </div>
    <div class="guide qr">
      <img :src="QRSrc" v-bind="{title:QRTitle,alt:QRCode}" />
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>