import Vbutton from './button/index.vue'
import { i18n, lan } from '../../unit/const'
import store from '../../vuex/store'
import todo from '../../control/todo'
export default {
  props: ['filling'],
  data() {
    return {
      fillingNum: 0
    }
  },
  watch: {
    $props: {
      deep: true,
      handler(nextProps) {
        this.fillingNum = nextProps.filling + 20
      }
    }
  },
  computed: {
    keyboard() {
      return this.$store.state.keyboard
    },
    rotation: () => i18n.rotation[lan],
    labelLeft: () => i18n.left[lan],
    labelRight: () => i18n.right[lan],
    labelDown: () => i18n.down[lan],
    labelDropSpace: () => `${i18n.drop[lan]} (SPACE)`,
    labelResetR: () => `${i18n.reset[lan]}(R)`,
    labelSoundS: () => `${i18n.sound[lan]}(S)`,
    labelPauseP: () => `${i18n.pause[lan]}(P)`
  },
  mounted() {
    const touchEventCatch = {} // 对于手机操作, 触发了touchstart, 将作出记录, 不再触发后面的mouse事件

    // 在鼠标触发mousedown时, 移除元素时可以不触发mouseup, 这里做一个兼容, 以mouseout模拟mouseup
    const mouseDownEventCatch = {}
    document.addEventListener(
      'touchstart',
      e => {
        if (e.preventDefault) {
          e.preventDefault()
        }
      },
      true
    )
    document.addEventListener('touchend', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
    }, true);

    // 阻止双指放大
    document.addEventListener('gesturestart', (event) => {
      event.preventDefault();
    });
    
    document.addEventListener(
      'mousedown',
      e => {
        if (e.preventDefault) {
          e.preventDefault()
        }
      },
      true
    )
    Object.keys(todo).forEach(key => {
      this.$refs[`dom_${key}`].$el.addEventListener(
        'mousedown',
        () => {
          if (touchEventCatch[key] === true) {
            return
          }
          todo[key].down(store)
          mouseDownEventCatch[key] = true
        },
        true
      )
      this.$refs[`dom_${key}`].$el.addEventListener(
        'mouseup',
        () => {
          if (touchEventCatch[key] === true) {
            touchEventCatch[key] = false
            return
          }
          todo[key].up(store)
          mouseDownEventCatch[key] = false
        },
        true
      )
      this.$refs[`dom_${key}`].$el.addEventListener(
        'mouseout',
        () => {
          if (mouseDownEventCatch[key] === true) {
            todo[key].up(store)
          }
        },
        true
      )
      this.$refs[`dom_${key}`].$el.addEventListener(
        'touchstart',
        () => {
          touchEventCatch[key] = true
          todo[key].down(store)
        },
        true
      )
      this.$refs[`dom_${key}`].$el.addEventListener(
        'touchend',
        () => {
          todo[key].up(store)
        },
        true
      )
    })
  },
  components: {
    Vbutton
  }
}
