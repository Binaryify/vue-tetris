import { i18n, lan } from '../../unit/const'
const DF = i18n.point[lan]
const ZDF = i18n.highestScore[lan]
const SLDF = i18n.lastRound[lan]
let Point = {
  timeout: null
}
import Number from '../number/index.vue'
export default {
  props: ['cur', 'point', 'max'],
  mounted() {
    this.onChange(this.$props)
  },
  components:{
    Number
  },
  data() {
    return {
      label: '',
      number: 0
    }
  },
  watch:{
    $props:{
      deep:true,
      handler(nextProps){
        this.onChange(nextProps);
      }
    }
  },
  methods: {
    onChange({cur, point, max} ) {
      clearInterval(Point.timeout)
      if (cur) {
        // 在游戏进行中
        this.label = point >= max ? ZDF : DF
        this.number = point
      } else {
        // 游戏未开始
        const toggle = () => {
          // 最高分与上轮得分交替出现
          this.label = SLDF
          this.number = point
          Point.timeout = setTimeout(() => {
            this.label = ZDF
            this.number = max
            Point.timeout = setTimeout(toggle, 3000)
          }, 3000)
        }

        if (point !== 0) {
          // 如果为上轮没玩, 也不用提示了
          toggle()
        } else {
          this.label=ZDF
          this.number=max
        }
      }
    }
  }
}
