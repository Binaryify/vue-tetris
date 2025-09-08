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

<script>
import { i18n, lan } from '../../unit/const'
import { isMobile } from '../../unit'
export default {
  name: 'Guide',
  data() {
    return {
      isMobile: isMobile()
    }
  },
  computed: {
    linkTitle: () => i18n.linkTitle[lan],
    github: () => i18n.github[lan],
    QRCode: () => i18n.QRCode[lan],
    QRTitle: () => i18n.QRNotice[lan],
    QRSrc: () =>
      window.location.protocol +
      '//raw.githubusercontent.com/Binaryify/vue-tetris/master/static/qr.jpeg'
  },
  mounted() {
    window.addEventListener('resize', this.resize.bind(this), true)
  },
  methods: {
    resize() {
      this.isMobile = isMobile()
    }
  }
}
</script>

<style lang="less">
.background(@from, @to) {
    background: (@from + @to)/2;
    background: -webkit-gradient(linear, left top, left bottom, from(@from), to(@to));
    background: -moz-linear-gradient(top, @from, @from);
}

.guide {
    position: absolute;
    left: 115%;
    right: 115%;
    text-align: center;
    line-height: 1;
    white-space: nowrap;
    &.right { right: auto; bottom: 5%; }
    &.left { left: auto; bottom: 5%; }
    p { text-align: left; margin-bottom: 350px; opacity: .5; iframe { margin-top: 20px; } }
    .qr {
        position: absolute; left:50%; margin-left: -60px; bottom: 0; padding: 4px; width: 120px; border-radius: 5px;
        background: #eee; border: 1px solid #777; text-align: center; box-shadow: 0 2px 3px rgba(0,0,0,.2);
        img { width: 100%; height: 100%; }
        span { display: block; font-size: 12px; padding-top: 4px; color: #555; }
    }
}

.number {
    height: 24px; font-size: 14px; float: right;
    span { float: left; width: 14px; height: 24px; }
    .s_0 { background-position: -75px -25px; }
    .s_1 { background-position: -89px -25px; }
    .s_2 { background-position: -103px -25px; }
    .s_3 { background-position: -117px -25px; }
    .s_4 { background-position: -131px -25px; }
    .s_5 { background-position: -145px -25px; }
    .s_6 { background-position: -159px -25px; }
    .s_7 { background-position: -173px -25px; }
    .s_8 { background-position: -187px -25px; }
    .s_9 { background-position: -201px -25px; }
    .s_n { background-position: -215px -25px; }
    .s_d { background-position: -243px -25px; }
    .s_d_c { background-position: -229px -25px; }
}
</style>
