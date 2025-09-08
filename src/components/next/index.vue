<template>
  <div class="next">
    <div v-for="(item,index) in block">
      <b :class="e ? 'c' : ''" v-for="(e,k2) in item" />
    </div>
  </div>
</template>

<script>
import { blockShape } from '../../unit/const'
const xy = { I: [1,0], L:[0,0], J:[0,0], Z:[0,0], S:[0,0], O:[0,1], T:[0,0] }
const makeEmpty = (rows=4, cols=4) => Array.from({length: rows}, () => Array.from({length: cols}, () => 0))
export default {
  props: ['data'],
  mounted() { this.build(this.data) },
  data() { return { block: makeEmpty(2,4) } },
  watch: { $props: { deep: true, handler(next){ this.build(next.data) } } },
  methods: {
    build(type) {
      const shape = blockShape[type]
      const block = makeEmpty(4,4)
      if (!shape || !xy[type]) { this.block = block; return }
      shape.forEach((m, k1) => {
        m.forEach((n, k2) => {
          if (!n) return
          const r = k1 + xy[type][0]
          const c = k2 + xy[type][1]
          if (r>=0 && r<4 && c>=0 && c<4) block[r][c]=1
        })
      })
      this.block = block
    }
  }
}
</script>


<style lang="less">
.next { div { height: 22px; width: 88px; float: right; } }
</style>
