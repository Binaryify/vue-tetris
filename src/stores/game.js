import { defineStore } from 'pinia'
import { getNextType, isFocus } from '../unit'
import { blankMatrix, lastRecord, maxPoint, blockType } from '../unit/const'
import Block from '../unit/block'
import { hasWebAudioAPI } from '../unit/music'
import mutations from './mutations'

let clearLinesInitState = lastRecord &&
  !isNaN(parseInt(lastRecord.clearLines, 10))
  ? parseInt(lastRecord.clearLines, 10)
  : 0
if (clearLinesInitState < 0) {
  clearLinesInitState = 0
}

const curInitState = (() => {
  if (!lastRecord || !lastRecord.cur) {
    return null
  }
  const cur = lastRecord.cur
  const option = {
    type: cur.type,
    rotateIndex: cur.rotateIndex,
    shape: cur.shape,
    xy: cur.xy
  }
  return new Block(option)
})()

const dropInitState = lastRecord && lastRecord.drop !== undefined
  ? !!lastRecord.drop
  : false

const lockInitState = lastRecord && lastRecord.lock !== undefined
  ? !!lastRecord.lock
  : false

const matrixInitState = lastRecord && Array.isArray(lastRecord.matrix)
  ? lastRecord.matrix
  : blankMatrix

let maxInitState = lastRecord && !isNaN(parseInt(lastRecord.max, 10))
  ? parseInt(lastRecord.max, 10)
  : 0

if (maxInitState < 0) {
  maxInitState = 0
} else if (maxInitState > maxPoint) {
  maxInitState = maxPoint
}
let musicInitState = lastRecord && lastRecord.music !== undefined
  ? !!lastRecord.music
  : true
if (!hasWebAudioAPI.data) {
  musicInitState = false
}

const nextInitState = lastRecord && blockType.indexOf(lastRecord.next) !== -1
  ? lastRecord.next
  : getNextType()

const pauseInitState = lastRecord && lastRecord.pause !== undefined
  ? !!lastRecord.pause
  : false

let pointsInitState = lastRecord && !isNaN(parseInt(lastRecord.points, 10))
  ? parseInt(lastRecord.points, 10)
  : 0

if (pointsInitState < 0) {
  pointsInitState = 0
} else if (pointsInitState > maxPoint) {
  pointsInitState = maxPoint
}

let speedRunInitState = lastRecord && !isNaN(parseInt(lastRecord.speedRun, 10))
  ? parseInt(lastRecord.speedRun, 10)
  : 1
if (speedRunInitState < 1 || speedRunInitState > 6) {
  speedRunInitState = 1
}
let speedStartInitState = lastRecord &&
  !isNaN(parseInt(lastRecord.speedStart, 10))
  ? parseInt(lastRecord.speedStart, 10)
  : 1
if (speedStartInitState < 1 || speedStartInitState > 6) {
  speedStartInitState = 1
}

let startLinesInitState = lastRecord &&
  !isNaN(parseInt(lastRecord.startLines, 10))
  ? parseInt(lastRecord.startLines, 10)
  : 0
if (startLinesInitState < 0 || startLinesInitState > 10) {
  startLinesInitState = 0
}
const resetInitState = lastRecord && lastRecord.reset
  ? !!lastRecord.reset
  : false

export const useGameStore = defineStore('game', {
  state: () => ({
    music: musicInitState,
    pause: pauseInitState,
    matrix: matrixInitState,
    next: nextInitState,
    cur: curInitState,
    speedStart: speedStartInitState,
    speedRun: speedRunInitState,
    startLines: startLinesInitState,
    clearLines: clearLinesInitState,
    points: pointsInitState,
    max: maxInitState,
    reset: resetInitState,
    drop: dropInitState,
    keyboard: {
      drop: false,
      down: false,
      left: false,
      right: false,
      rotate: false,
      reset: false,
      music: false,
      pause: false
    },
    lock: lockInitState,
    focus: isFocus()
  }),
  actions: {
    // Vuex-like commit to avoid name conflicts with state keys
    commit(type, payload) {
      const fn = mutations[type]
      if (typeof fn === 'function') {
        fn(this, payload)
      } else if (import.meta && import.meta.env && import.meta.env.DEV) {
        console.warn('[pinia.commit] unknown mutation:', type)
      }
    }
  }
})
