<template>
  <div
        class="keyboard"
        :style="'margin-top:'+fillingNum+'px'"
      >
        <vbutton
          color="blue"
          size="s1"
          :top="0"
          :left="374"
          :label="rotation"
          arrow="translate(0, 63px)"
          :position="true"
          :active="keyboard['rotate']"
          @mousedown="onMouseDown('rotate')"
          @mouseup="onMouseUp('rotate')"
          @mouseout="onMouseOut('rotate')"
          @touchstart="onTouchStart('rotate')"
          @touchend="onTouchEnd('rotate')"
          ref="dom_rotate"
        />
        <vbutton
          color="blue"
          size="s1"
          :top="180"
          :left="374"
          :label="labelDown"
          arrow="translate(0,-71px) rotate(180deg)"
          :active="keyboard['down']"
          @mousedown="onMouseDown('down')"
          @mouseup="onMouseUp('down')"
          @mouseout="onMouseOut('down')"
          @touchstart="onTouchStart('down')"
          @touchend="onTouchEnd('down')"
          ref="dom_down"
        />
        <vbutton
          color="blue"
          size="s1"
          :top="90"
          :left="284"
          :label="labelLeft"
          arrow="translate(60px, -12px) rotate(270deg)"
          :active="keyboard['left']"
          @mousedown="onMouseDown('left')"
          @mouseup="onMouseUp('left')"
          @mouseout="onMouseOut('left')"
          @touchstart="onTouchStart('left')"
          @touchend="onTouchEnd('left')"
          ref="dom_left"
        />
        <vbutton
          color="blue"
          size="s1"
          :top='90'
          :left='464'
          :label="labelRight"
          arrow="translate(-60px, -12px) rotate(90deg)"
          :active="keyboard['right']"
          @mousedown="onMouseDown('right')"
          @mouseup="onMouseUp('right')"
          @mouseout="onMouseOut('right')"
          @touchstart="onTouchStart('right')"
          @touchend="onTouchEnd('right')"
          ref="dom_right"
        />
        <vbutton
          color="blue"
          size="s0"
          :top="100"
          :left="52"
          :label="labelDropSpace"
          :active="keyboard['drop']"
          @mousedown="onMouseDown('space')"
          @mouseup="onMouseUp('space')"
          @mouseout="onMouseOut('space')"
          @touchstart="onTouchStart('space')"
          @touchend="onTouchEnd('space')"
          ref="dom_space"
        />
        <vbutton
          color="red"
          size="s2"
          :top="0"
          :left="196"
          :label="labelResetR"
          :active="keyboard['reset']"
          @mousedown="onMouseDown('r')"
          @mouseup="onMouseUp('r')"
          @mouseout="onMouseOut('r')"
          @touchstart="onTouchStart('r')"
          @touchend="onTouchEnd('r')"
          ref="dom_r"
        />
        <vbutton
          color="green"
          size="s2"
          :top="0"
          :left="106"
          :label="labelSoundS"
          :active="keyboard['music']"
          @mousedown="onMouseDown('s')"
          @mouseup="onMouseUp('s')"
          @mouseout="onMouseOut('s')"
          @touchstart="onTouchStart('s')"
          @touchend="onTouchEnd('s')"
          ref="dom_s"
        />
        <vbutton
          color="green"
          size="s2"
          :top="0"
          :left="16"
          :label="labelPauseP"
          :active="keyboard['pause']"
          @mousedown="onMouseDown('p')"
          @mouseup="onMouseUp('p')"
          @mouseout="onMouseOut('p')"
          @touchstart="onTouchStart('p')"
          @touchend="onTouchEnd('p')"
          ref="dom_p"
        />
      </div>
</template>
<script>
import Vbutton from './button/index.vue'
import { i18n, lan } from '../../unit/const'
import { useGameStore } from '../../stores/game'
import todo from '../../control/todo'
export default {
  props: ['filling'],
  data() {
    return { fillingNum: 0 }
  },
  watch: {
    $props: {
      deep: true,
      handler(nextProps) { this.fillingNum = nextProps.filling + 20 }
    }
  },
  computed: {
    keyboard() { return useGameStore().keyboard },
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
    document.addEventListener('gesturestart', (event) => { event.preventDefault() })
  },
  components: { Vbutton },
  methods: {
    onMouseDown(key) { const store = useGameStore(); todo[key] && todo[key].down(store) },
    onMouseUp(key) { const store = useGameStore(); todo[key] && todo[key].up(store) },
    onMouseOut(key) { const store = useGameStore(); todo[key] && todo[key].up(store) },
    onTouchStart(key) { const store = useGameStore(); todo[key] && todo[key].down(store) },
    onTouchEnd(key) { const store = useGameStore(); todo[key] && todo[key].up(store) }
  }
}
</script>

<style lang="less">
.keyboard {
  width: 580px;
  height: 330px;
  margin: 20px auto 0;
  position: relative;
}
</style>

