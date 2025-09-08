import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './unit/const'
import { subscribeRecord } from './unit'
import { useGameStore } from './stores/game'
import './control'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

// 持久化订阅（Pinia）
const game = useGameStore()
subscribeRecord(game)

app.mount('#root')
