import event from '../../unit/event'
import states from '../states'

const down = store => {
  store.commit('key_pause', true)
  event.down({
    key: 'p',
    once: true,
    callback: () => {
      const state = store.state
      if (state.lock) {
        return
      }
      const cur = state.cur
      const isPause = state.pause
      if (cur !== null) {
        // 暂停
        states.pause(!isPause)
      } else {
        // 新的开始
        states.start()
      }
    }
  })
}

const up = store => {
  store.commit('key_pause', false)
  event.up({
    key: 'p'
  })
}

export default {
  down,
  up
}
