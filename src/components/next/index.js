import { blockShape } from '../../unit/const'
const xy = {
  // 方块在下一个中的坐标
  I: [1, 0],
  L: [0, 0],
  J: [0, 0],
  Z: [0, 0],
  S: [0, 0],
  O: [0, 1],
  T: [0, 0]
}
const empty = [[0, 0, 0, 0], [0, 0, 0, 0]]

export default {
  props: ['data'],
  mounted() {
    this.build(this.data)
  },
  data() {
    return {
      block: empty
    }
  },
  watch: {
    $props: {
      deep: true,
      handler(nextProps) {
        this.build(nextProps.data)
      }
    }
  },
  methods: {
    build(type) {
      const shape = blockShape[type]
      const block = empty.map(e => [...e])
      shape.forEach((m, k1) => {
        m.forEach((n, k2) => {
          if (n) {
            block[k1 + xy[type][0]][k2 + xy[type][1]] = 1
          }
        })
      })
      this.block = block
    }
  }
}
