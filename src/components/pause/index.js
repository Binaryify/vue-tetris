let Pause = {
  timeout: null
}
export default {
  props: ['data'],
  mounted() {
    this.setShake(this.data)
  },
  data() {
    return {
      showPause: false
    }
  },
  watch: {
    $props: {
      deep: true,
      handler(nextProps) {
        this.setShake(nextProps.data)
      }
    }
  },
  methods: {
    setShake(bool) {
      if (bool && !Pause.timeout) {
        Pause.timeout = setInterval(() => {
          this.showPause = !this.showPause
        }, 250)
      }
      if (!bool && Pause.timeout) {
        clearInterval(Pause.timeout)
        this.showPause = false
        Pause.timeout = null
      }
    }
  }
}
