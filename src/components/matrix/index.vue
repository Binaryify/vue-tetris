<template>
  <div class="matrix">
    <p v-for="(row, r) in drawMatrix" :key="r">
      <b v-for="(cell, c) in row" :key="c" :class="(cell === 1 ? 'c' : '') + (cell === 2 ? 'd' : '')" />
    </p>
  </div>
  </template>

<script>
import { isClear } from '../../unit/'
import { fillLine, blankLine, blankMatrix } from '../../unit/const'
import states from '../../control/states'

export default {
  props: ['cur', 'reset', 'propMatrix'],
  data() {
    return {
      clearLines: false,
      animateColor: 2,
      isOver: false,
      overState: null
    }
  },
  computed: {
    drawMatrix() {
      if (this.isOver) {
        return this.overState || blankMatrix
      }
      return this.getResult()
    }
  },
  watch: {
    $props: {
      handler(val = {}) {
        this.propsChange(val)
      },
      deep: true
    }
  },
  methods: {
    propsChange(nextProps) {
      const clears = isClear(nextProps.propMatrix)
      const overs = nextProps.reset
      setTimeout(() => {
        this.clearLines = clears
        this.isOver = overs
      }, 0)
      if (clears && !this.clearLines) {
        this.clearAnimate(clears)
      }
      if (!clears && overs && !this.isOver) {
        this.over(nextProps)
      }
    },
    getResult(props) {
      if (!props) props = this.$props
      const cur = props.cur
      const shape = cur && cur.shape
      const xy = cur && cur.xy
      const base = Array.isArray(props.propMatrix) ? props.propMatrix : blankMatrix
      let matrix = base.map(row => row.slice())
      const clearLines = this.clearLines
      if (clearLines) {
        const animateColor = this.animateColor
        clearLines.forEach(index => {
          matrix[index] = [
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor
          ]
        })
      } else if (shape) {
        shape.forEach((m, k1) =>
          m.forEach((n, k2) => {
            if (n && xy[0] + k1 >= 0) {
              // 竖坐标可以为负
              let line = matrix[xy[0] + k1]
              let color
              if (line[xy[1] + k2] === 1 && !clearLines) {
                // 矩阵与方块重合
                color = 2
              } else {
                color = 1
              }
              line[xy[1] + k2] = color
              matrix[xy[0] + k1] = line
            }
          })
        )
      }
      return matrix
    },
    clearAnimate() {
      const anima = callback => {
        setTimeout(() => {
          this.animateColor = 0
          setTimeout(() => {
            this.animateColor = 2
            if (typeof callback === 'function') callback()
          }, 100)
        }, 100)
      }
      anima(() => {
        anima(() => {
          anima(() => {
            setTimeout(() => {
              states.clearLines(this.propMatrix, this.clearLines)
            }, 100)
          })
        })
      })
    },
    over(nextProps) {
      let overState = this.getResult(nextProps)
      this.overState = [...overState]
      const exLine = index => {
        if (index <= 19) {
          overState[19 - index] = fillLine
        } else if (index >= 20 && index <= 39) {
          overState[index - 20] = blankLine
        } else {
          states.overEnd()
          return
        }
        this.overState = [...overState]
      }
      for (let i = 0; i <= 40; i++) {
        setTimeout(exLine.bind(null, i), 40 * (i + 1))
      }
    }
  }
}
</script>

<style lang="less">
.matrix {
  border: 2px solid #000;
  padding: 3px 1px 1px 3px;
  width: 228px;
  p { width: 220px; height: 22px; }
}
</style>
