<template>
  <div>
    <p>{{label}}</p>
    <Number :number="number"/>
  </div>
</template>
<script>
import { i18n, lan } from '../../unit/const'
const DF = i18n.point[lan]
const ZDF = i18n.highestScore[lan]
const SLDF = i18n.lastRound[lan]
let Point = { timeout: null }
import Number from '../number/index.vue'
export default {
  props: ['cur', 'point', 'max'],
  mounted() { this.onChange(this.$props) },
  components:{ Number },
  data() { return { label: '', number: 0 } },
  watch:{ $props:{ deep:true, handler(next){ this.onChange(next) } } },
  methods: {
    onChange({cur, point, max}) {
      clearInterval(Point.timeout)
      if (cur) {
        this.label = point >= max ? ZDF : DF
        this.number = point
      } else {
        const toggle = () => {
          this.label = SLDF; this.number = point
          Point.timeout = setTimeout(() => {
            this.label = ZDF; this.number = max
            Point.timeout = setTimeout(toggle, 3000)
          }, 3000)
        }
        if (point !== 0) { toggle() } else { this.label=ZDF; this.number=max }
      }
    }
  }
}
</script>
