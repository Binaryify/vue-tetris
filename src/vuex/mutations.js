import { getNextType } from '../unit'
import Block from '../unit/block'
const mutations = {
  nextBlock(state, data) {
    if (!data) {
      data = getNextType()
    }
    state.next = data
  },
  moveBlock(state, data) {
    state.cur = data.reset === true ? null : new Block(data)
  },
  speedStart(state, data) {
    state.speedStart = data
  },
  speedRun(state, data) {
    state.speedRun = data
  },
  startLines(state, data) {
    state.startLines = data
  },
  matrix(state, data) {
    state.matrix = data
  },
  lock(state, data) {
    state.lock = data
  },
  clearLines(state, data) {
    state.clearLines = data
  },
  points(state, data) {
    state.points = data
  },
  max(state, data) {
    state.max = data
  },
  reset(state, data) {
    state.reset = data
  },
  drop(state, data) {
    state.drop = data
  },
  pause(state, data) {
    state.pause = data
  },
  music(state, data) {
    state.music = data
  },
  focus(state, data) {
    state.focus = data
  },
  key_drop(state, data) {
    state.keyboard['drop'] = data
  },
  key_down(state, data) {
    state.keyboard['down'] = data
  },
  key_left(state, data) {
    state.keyboard['left'] = data
  },
  key_right(state, data) {
    state.keyboard['right'] = data
  },
  key_rotate(state, data) {
    state.keyboard['rotate'] = data
  },
  key_reset(state, data) {
    state.keyboard['reset'] = data
  },
  key_music(state, data) {
    state.keyboard['music'] = data
  },
  key_pause(state, data) {
    state.keyboard['pause'] = data
  }
}
export default mutations
