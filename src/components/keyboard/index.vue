<template>
  <div
        class="keyboard"
        :style="'margin-top:'+fillingNum+'px'"
      >
        <vbutton
          color="black"
          size="s1"
          :top="0"
          :left="374"
          :label="rotation"
          arrow="translate(0, 63px)"
          :position="true"
          :active="keyboard['rotate']"
          ref="dom_rotate"
        >
          <i class="material-icons arrows">loop</i>
        </vbutton>
        <vbutton
          color="black"
          size="s1"
          :top="180"
          :left="374"
          :label="labelDown"
          arrow="translate(0,-71px) rotate(180deg)"
          :active="keyboard['down']"
          ref="dom_down"
        >
          <i class="material-icons arrows">keyboard_arrow_down</i>
        </vbutton>
        <vbutton
          color="black"
          size="s1"
          :top="90"
          :left="284"
          :label="labelLeft"
          arrow="translate(60px, -12px) rotate(270deg)"
          :active="keyboard['left']"
          ref="dom_left"
        >
          <i class="material-icons arrows">keyboard_arrow_left</i>
        </vbutton>
        <vbutton
          color="black"
          size="s1"
          :top='90'
          :left='464'
          :label="labelRight"
          arrow="translate(-60px, -12px) rotate(90deg)"
          :active="keyboard['right']"
          ref="dom_right"
        >
          <i class="material-icons arrows">keyboard_arrow_right</i>
        </vbutton>
        <vbutton
          color="black"
          size="s0"
          :top="100"
          :left="52"
          :label="labelDropSpace"
          :active="keyboard['drop']"
          ref="dom_space"
        >
          <i class="material-icons arrows">vertical_align_bottom</i>
        </vbutton>
        <vbutton
          color="red"
          size="s2"
          :top="0"
          :left="196"
          :label="labelResetR"
          :active="keyboard['reset']"
          ref="dom_r"
        >
          <i class="material-icons">priority_high</i>
        </vbutton>
        <vbutton
          color="gray"
          size="s2"
          :top="0"
          :left="106"
          :label="labelSoundS"
          :active="keyboard['music']"
          ref="dom_s"
        >
          <i class="material-icons">audiotrack</i>
        </vbutton>
        <vbutton
          color="gray"
          size="s2"
          :top="0"
          :left="16"
          :label="labelPauseP"
          :active="keyboard['pause']"
          ref="dom_p"
        >
          <i class="material-icons">pause</i>
        </vbutton>
      </div>
</template>
<style lang="less">
 @import './index.less';
</style>

<script src="./index.js">
</script>
