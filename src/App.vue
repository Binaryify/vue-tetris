<template>
  <div class="app" :style="size">
    <div class="rect" :class="drop?'drop':''">
      <Decorate/>
      <div class="screen">
        <div class="panel">
          <Matrix :propMatrix="matrix" :cur="cur" :reset="reset" />
          <Logo :cur="!!cur" :reset="reset" />
          <div class="state">
            <Point :cur="!!cur" :max="max" :point="points" />
            <p>{{pContent}}</p>
            <Number :number='cur ? clearLines : startLines' />
            <p>{{level}}</p>
            <Number :number='cur?speedRun:speedStart' :length="1" />
            <p>{{nextText}}</p>
            <Next :data="next" />
            <div class="bottom">
              <Music :data="music" />
              <Pause :data="pause" />
              <Number :propTime="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Keyboard :filling='filling' />
    <Guide/>
  </div>
</template>

<script>
import Decorate from './components/decorate/index.vue'
import Guide from './components/guide/index.vue'
import Next from './components/next/index.vue'
import Music from './components/music/index.vue'
import Pause from './components/pause/index.vue'
import Number from './components/number/index.vue'
import Point from './components/point/index.vue'
import Keyboard from './components/keyboard/index.vue'
import Logo from './components/logo/index.vue'
import Matrix from './components/matrix/index.vue'
import { mapState } from 'pinia'
import { useGameStore } from './stores/game'
import { transform, lastRecord, speeds, i18n, lan } from './unit/const'
import { visibilityChangeEvent, isFocus } from './unit/'
import states from './control/states'
export default {
  mounted() {
    this.render()
    window.addEventListener('resize', this.resize.bind(this), true)
  },
  data() {
    return {
      size: {},
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
      filling: ''
    }
  },
  components: { Decorate, Guide, Next, Music, Pause, Number, Point, Logo, Keyboard, Matrix },
  computed: {
    pContent() { return this.cur ? i18n.cleans[lan] : i18n.startLine[lan] },
    level: () => i18n.level[lan],
    nextText: () => i18n.next[lan],
    ...mapState(useGameStore, [
      'matrix','keyboard','music','pause','next','cur','speedStart','speedRun','startLines','clearLines','points','max','reset','drop'
    ])
  },
  methods: {
    render() {
      let filling = 0
      const size = (() => {
        const w = this.w
        const h = this.h
        const ratio = h / w
        let scale
        let css = {}
        if (ratio < 1.5) { scale = h / 960 } else {
          scale = w / 640
          filling = (h - 960 * scale) / scale / 3
          css = {
            'padding-top': Math.floor(filling) + 42 + 'px',
            'padding-bottom': Math.floor(filling) + 'px',
            'margin-top': Math.floor(-480 - filling * 1.5) + 'px'
          }
        }
        css[transform] = `scale(${scale})`
        return css
      })()
      this.size = size
      this.start()
      this.filling = filling
    },
    resize() {
      this.w = document.documentElement.clientWidth
      this.h = document.documentElement.clientHeight
      this.render()
    },
    start() {
      if (visibilityChangeEvent) {
        document.addEventListener(
          visibilityChangeEvent,
          () => { states.focus(isFocus()) },
          false
        )
      }
      if (lastRecord) {
        if (lastRecord.cur && !lastRecord.pause) {
          const speedRun = this.speedRun || 1
          let timeout = speeds[speedRun - 1] / 2
          timeout = speedRun < speeds[speeds.length - 1] ? speeds[speeds.length - 1] : speedRun
          states.auto(timeout)
        }
        if (!lastRecord.cur) { states.overStart() }
      } else {
        states.overStart()
      }
    }
  }
}
</script>

<style lang="less">
html, body, #root {
    height: 100%;
    overflow: hidden;
}
body {
    background: #009688;
    padding: 0;
    margin: 0;
    font: 20px/1 "HanHei SC", "PingHei", "PingFang SC", "STHeitiSC-Light", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    cursor: default;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings: 'liga', 'kern';
    direction: ltr;
    text-align: left;
}

.r { float: right; }
.l { float: left; }
.clear { clear: both; }
b {
    display: block;
    width: 20px;
    height: 20px;
    padding: 2px;
    border: 2px solid #879372;
    margin: 0 2px 2px 0;
    float: left;
    &:after {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        background: #879372;
        overflow: hidden;
    }
    &.c { border-color: #000; &:after { background: #000; } }
    &.d { border-color: #560000; &:after { background: #560000; } }
}
.bg {
    background: url('//img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png') no-repeat;
    overflow: hidden;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

.app {
    width: 640px;
    padding-top: 42px;
    box-shadow: 0 0 10px #fff inset;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -480px 0 0 -320px;
    background: #efcc19;
}

.rect {
    width: 480px;
    padding: 45px 0 35px;
    border: #000 solid;
    border-width: 0 10px 10px;
    margin: 0 auto;
    position: relative;
    &.drop { -webkit-transform: translateY(5px); transform: translateY(5px); }
}

.screen {
    width: 390px;
    height: 478px;
    border: solid 5px;
    border-color: #987f0f #fae36c #fae36c #987f0f;
    margin: 0 auto;
    position: relative;
    .panel {
        width: 380px;
        height: 468px;
        margin: 0 auto;
        background: #9ead86;
        padding: 8px;
        border: 2px solid #494536;
    }
}

.state {
    width: 108px;
    position: absolute;
    top: 0;
    right: 15px;
    p { line-height: 47px; height: 57px; padding: 10px 0 0; white-space: nowrap; clear: both; }
    .bottom { position: absolute; width: 114px; top: 426px; left: 0; }
}

/* loader.less */
.load {
    @-webkit-keyframes loads {
        0%, 80%, 100% { box-shadow: 0 0 #efcc19; height: 4em }
        40% { box-shadow: 0 -2em #efcc19; height: 5em }
    }
    @keyframes loads {
        0%, 80%, 100% { box-shadow: 0 0 #efcc19; height: 4em }
        40% { box-shadow: 0 -2em #efcc19; height: 5em }
    }
    width:240px; height:240px; float:left; position:relative; color:#fff; text-align:center; position:absolute; top:50%; left:50%; margin:-120px 0 0 -120px;
    p { position: absolute; bottom: 0; left: -25%; width: 150%; white-space: nowrap; display: none; }
    .loader {
        &, &:before, &:after { background: #efcc19; -webkit-animation: loads 1s infinite ease-in-out; animation: loads 1s infinite ease-in-out; width: 1em; height: 4em }
        &:before, &:after { position: absolute; top: 0; content: '' }
        &:before { left: -1.5em; -webkit-animation-delay: -0.32s; animation-delay: -0.32s }
        text-indent:-9999em; margin:8em auto; position:relative; font-size:11px; -webkit-animation-delay:-0.16s; animation-delay:-0.16s;
        &:after { left: 1.5em }
    }
}
</style>
