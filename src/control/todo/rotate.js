import { want } from '../../unit/'
import event from '../../unit/event'
import states from '../states'
import { music } from '../../unit/music'
const down = store => {
  store.commit('key_rotate', true)
  if (store.state.cur !== null) {
    event.down({
      key: 'rotate',
      once: true,
      callback: () => {
        const state = store.state
        if (state.lock) {
          return
        }
        if (state.pause) {
          states.pause(false)
        }
        const cur = state.cur
        if (cur === null) {
          return
        }
        if (music.rotate) {
          music.rotate()
        }
        const next = cur.rotate()
        if (want(next, state.matrix)) {
          store.commit('moveBlock', next)
        }
      }
    })
  } else {
    event.down({
      key: 'rotate',
      begin: 200,
      interval: 100,
      callback: () => {
        if (store.state.lock) {
          return
        }
        if (music.move) {
          music.move()
        }
        const state = store.state
        const cur = state.cur
        if (cur) {
          return
        }
        let startLines = state.startLines
        startLines = startLines + 1 > 10 ? 0 : startLines + 1
        store.commit('startLines', startLines)
      }
    })
  }
}

const up = store => {
  store.commit('key_rotate', false)
  event.up({
    key: 'rotate'
  })
}

export default {
  down,
  up
}
