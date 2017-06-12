const formate = num => (num < 10 ? `0${num}`.split('') : `${num}`.split(''))
let NumberObj = {
  timeInterval: null,
  time_count: null
}
export default {
  watch: {
    $props: {
      deep: true,
      handler(nextProps) {
        this.render()
      }
    }
  },
  props: {
    propTime: {
      type: Boolean
    },
    number: {
      type: Number
    },
    length: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      time_count: '',
      time: new Date(),
      data: []
    }
  },
  destroyed() {
    if (!this.propTime) {
      return
    }
    clearTimeout(NumberObj.timeInterval)
  },
  methods: {
    render() {
      if (this.propTime) {
        // 右下角时钟
        const now = this.time
        const hour = formate(now.getHours())
        const min = formate(now.getMinutes())
        const sec = now.getSeconds() % 2
        const t = hour.concat(sec ? 'd' : 'd_c', min)
        this.data = t
        return
      }
      const num = `${this.number}`.split('')
      for (let i = 0, len = this.length - num.length; i < len; i++) {
        num.unshift('n')
      }
      this.data = num
      return
    }
  },
  beforeMount() {
    if (!this.length) {
      this.length = 6
    }
    if (!this.propTime) {
      return
    }
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
  mounted() {
    this.render()
  }
}
