import Vbutton from './button/index.vue'
import { i18n, lan } from '../../unit/const'
import { useGameStore } from '../../stores/game'
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
      return useGameStore().keyboard
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
    // 阻止双指放大
    document.addEventListener('gesturestart', (event) => {
      event.preventDefault()
    })
  },
  components: {
    Vbutton
  },
  methods: {
    onMouseDown(key) { const store = useGameStore(); todo[key] && todo[key].down(store) },
    onMouseUp(key) { const store = useGameStore(); todo[key] && todo[key].up(store) },
    onMouseOut(key) { const store = useGameStore(); todo[key] && todo[key].up(store) },
    onTouchStart(key) { const store = useGameStore(); todo[key] && todo[key].down(store) },
    onTouchEnd(key) { const store = useGameStore(); todo[key] && todo[key].up(store) }
  }
}
