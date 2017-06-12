import { want } from '../../unit/'
import event from '../../unit/event'
import states from '../states'
import { speeds, delays } from '../../unit/const'
import { music } from '../../unit/music'

const down = store => {
  store.commit('key_left', true)
  event.down({
    key: 'left',
    begin: 200,
    interval: 100,
    callback: () => {
      const state = store.state
      if (state.lock) {
        return
      }
      if (music.move) {
        music.move()
      }
      const cur = state.cur
      if (cur !== null) {
        if (state.pause) {
          states.pause(false)
          return
        }
        const next = cur.left()
        const delay = delays[state.speedRun - 1]
        let timeStamp
        if (want(next, state.matrix)) {
          next.timeStamp += parseInt(delay, 10)
          store.commit('moveBlock', next)
          timeStamp = next.timeStamp
        } else {
          cur.timeStamp += parseInt(parseInt(delay, 10) / 1.5, 10) // 真实移动delay多一点，碰壁delay少一点
          store.commit('moveBlock', cur)
          timeStamp = cur.timeStamp
        }
        const remain = speeds[state.speedRun - 1] - (Date.now() - timeStamp)
        states.auto(remain)
      } else {
        let speed = state.speedStart
        speed = speed - 1 < 1 ? 6 : speed - 1
        store.commit('speedStart', speed)
      }
    }
  })
}

const up = store => {
  store.commit('key_left', false)
  event.up({
    key: 'left'
  })
}

export default {
  down,
  up
}
