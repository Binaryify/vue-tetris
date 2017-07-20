import Decorate from './components/decorate/index.vue'
import Guide from './components/guide/index.vue'
import Next from './components/next/index.vue'
import Music from './components/music/index.vue'
import Pause from './components/pause/index.vue'
import Number from './components/number/index.vue'
import Point from './components/point/index.vue'
import Keyboard from './components/keyboard/index.vue'
import Logo from './components/logo/index.vue'
import { List } from 'immutable'
import Matrix from './components/matrix/index.vue'
import { mapState } from 'vuex'
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
  components: {
    Decorate,
    Guide,
    Next,
    Music,
    Pause,
    Number,
    Point,
    Logo,
    Keyboard,
    Matrix
  },
  computed: {
    pContent() {
      return this.cur ? i18n.cleans[lan] : i18n.startLine[lan]
    },
    level: () => i18n.level[lan],
    nextText: () => i18n.next[lan],
    ...mapState([
      'matrix',
      'keyboard',
      'music',
      'pause',
      'next',
      'cur',
      'speedStart',
      'speedRun',
      'startLines',
      'clearLines',
      'points',
      'max',
      'reset',
      'drop'
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
        if (ratio < 1.5) {
          scale = h / 960
        } else {
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
        // 将页面的焦点变换写入store
        document.addEventListener(
          visibilityChangeEvent,
          () => {
            states.focus(isFocus())
          },
          false
        )
      }

      if (lastRecord) {
        // 读取记录
        if (lastRecord.cur && !lastRecord.pause) {
          // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
          const speedRun = this.$store.state.speedRun
          let timeout = speeds[speedRun - 1] / 2 // 继续时, 给予当前下落速度一半的停留时间
          // 停留时间不小于最快速的速度
          timeout =
            speedRun < speeds[speeds.length - 1]
              ? speeds[speeds.length - 1]
              : speedRun
          states.auto(timeout)
        }

        if (!lastRecord.cur) {
          states.overStart()
        }
      } else {
        states.overStart()
      }
    }
  }
}
