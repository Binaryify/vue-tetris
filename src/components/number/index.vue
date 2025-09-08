<template>
  <div class="number">
    <span v-for="(item,index) in data" :class="'bg s_'+item" />
  </div>
</template>

<script>
const formate = num => (num < 10 ? `0${num}`.split('') : `${num}`.split(''))
let NumberObj = { timeInterval: null, time_count: null }
export default {
  props: { propTime: { type: Boolean }, number: { type: Number }, length: { type: Number, default: 6 } },
  data() { return { time_count: '', time: new Date(), data: [] } },
  watch: { $props: { deep: true, handler(){ this.render() } } },
  unmounted() { if (!this.propTime) return; clearTimeout(NumberObj.timeInterval) },
  methods: {
    render() {
      if (this.propTime) {
        const now = this.time
        const hour = formate(now.getHours())
        const min = formate(now.getMinutes())
        const sec = now.getSeconds() % 2
        const t = hour.concat(sec ? 'd' : 'd_c', min)
        this.data = t
        return
      }
      const num = `${this.number}`.split('')
      for (let i = 0, len = this.length - num.length; i < len; i++) num.unshift('n')
      this.data = num
    }
  },
  beforeMount() {
    if (!this.length) this.length = 6
    if (!this.propTime) return
    const clock = () => {
      const count = +NumberObj.timeInterval
      NumberObj.timeInterval = setTimeout(() => {
        this.time = new Date()
        this.time_count = count
        this.render()
        clock()
      }, 1000)
    }
    clock()
  },
  mounted() { this.render() }
}
</script>

<style lang="less">
.number {
  height: 24px; font-size: 14px; float: right;
  span { float: left; width: 14px; height: 24px; }
  .s_0 { background-position: -75px -25px; }
  .s_1 { background-position: -89px -25px; }
  .s_2 { background-position: -103px -25px; }
  .s_3 { background-position: -117px -25px; }
  .s_4 { background-position: -131px -25px; }
  .s_5 { background-position: -145px -25px; }
  .s_6 { background-position: -159px -25px; }
  .s_7 { background-position: -173px -25px; }
  .s_8 { background-position: -187px -25px; }
  .s_9 { background-position: -201px -25px; }
  .s_n { background-position: -215px -25px; }
  .s_d { background-position: -243px -25px; }
  .s_d_c { background-position: -229px -25px; }
}
</style>
