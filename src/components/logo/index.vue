<template>
  <div class="logo" :style="'display:'+display">
    <div class="bg dragon" :class="style" />
    <p v-html="titleCenter" />
  </div>
</template>

<script>
import { i18n, lan } from '../../unit/const'
let Logo = { timeout: null }
export default {
  props: ['cur', 'reset'],
  data() { return { style: 'r1', display: 'none' } },
  watch: {
    $props: {
      deep: true,
      handler(nextProps, oldProps) {
        this.animate(nextProps)
        if (([oldProps.cur, nextProps.cur].indexOf(false) !== -1 && oldProps.cur !== nextProps.cur) || oldProps.reset !== nextProps.reset) {
          this.animate(nextProps)
        }
      }
    }
  },
  computed: { titleCenter() { return i18n.titleCenter[lan] } },
  beforeMount() { this.animate(this.$props) },
  methods: {
    animate({ cur, reset }) {
      clearTimeout(Logo.timeout)
      this.style = 'r1'
      this.display = 'none'
      if (cur || reset) { this.display = 'none'; return }
      let m = 'r', count = 0
      const set = (func, delay) => { if (!func) return; Logo.timeout = setTimeout(func, delay) }
      const show = func => { set(() => { this.display = 'block'; if (func) func() }, 150) }
      const hide = func => { set(() => { this.display = 'none'; if (func) func() }, 150) }
      const eyes = (func, d1, d2) => { set(() => { this.style = m + 2; set(() => { this.style = m + 1; if (func) func() }, d2) }, d1) }
      const run = func => { set(() => { this.style = m + 4; set(() => { this.style = m + 3; count++; if ([10,20,30].includes(count)) m = m === 'r' ? 'l' : 'r'; if (count < 40) { run(func); return } this.style = m + 1; if (func) set(func, 4000) }, 100) }, 100) }
      const dra = () => { count = 0; eyes(() => { eyes(() => { eyes(() => { this.style = m + 2; run(dra) }, 150, 150) }, 150, 150) }, 1000, 1500) }
      show(() => { hide(() => { show(() => { hide(() => { show(() => { dra() }) }) }) }) })
    }
  }
}
</script>


<style lang="less">
.logo {
    width: 224px; height: 200px; position: absolute; top: 100px; left: 12px; text-align: center; overflow: hidden;
    p { position: absolute; width: 100%; line-height: 1.4; top: 100px; left: 0; font-family: initial; letter-spacing: 6px; text-shadow: 1px 1px 1px rgba(255,255,255,.35); }
    .dragon {
        width: 80px; height: 86px; margin: 0 auto; background-position: 0 -100px;
        &.r1, &.l1 { background-position: 0 -100px; }
        &.r2, &.l2 { background-position: -100px -100px; }
        &.r3, &.l3 { background-position: -200px -100px; }
        &.r4, &.l4 { background-position: -300px -100px; }
        &.l1, &.l2, &.l3, &.l4 { transform: scale(-1,1); -webkit-transform: scale(-1,1); -ms-transform: scale(-1,1); -moz-transform: scale(-1,1); -o-transform: scale(-1,1); }
    }
}
</style>
