import { blockShape, origin } from './const'

class Block {
  constructor(option) {
    this.type = option.type

    if (!option.rotateIndex) {
      this.rotateIndex = 0
    } else {
      this.rotateIndex = option.rotateIndex
    }

    if (!option.timeStamp) {
      this.timeStamp = Date.now()
    } else {
      this.timeStamp = option.timeStamp
    }

    if (!option.shape) {
      // init
      this.shape = blockShape[option.type]
    } else {
      this.shape = option.shape
    }
    if (!option.xy) {
      switch (option.type) {
        case 'I': // I
          this.xy = [0, 3]
          break
        case 'L': // L
          this.xy = [-1, 4]
          break
        case 'J': // J
          this.xy = [-1, 4]
          break
        case 'Z': // Z
          this.xy = [-1, 4]
          break
        case 'S': // S
          this.xy = [-1, 4]
          break
        case 'O': // O
          this.xy = [-1, 4]
          break
        case 'T': // T
          this.xy = [-1, 4]
          break
        default:
          break
      }
    } else {
      this.xy = option.xy
    }
  }
  rotate() {
    const shape = this.shape
    let result = []
    shape.forEach(m =>
      m.forEach((n, k) => {
        const index = m.length - k - 1
        if (result[index] === undefined) {
          result[index]=[]
        }
        
        result[index].push(n)
        const tempK = [...result[index]]
        result[index]=tempK
      })
    )
    const nextXy = [
      this.xy[0] + origin[this.type][this.rotateIndex][0],
      this.xy[1] + origin[this.type][this.rotateIndex][1]
    ]
    const nextRotateIndex = this.rotateIndex + 1 >= origin[this.type].length
      ? 0
      : this.rotateIndex + 1
    return {
      shape: result,
      type: this.type,
      xy: nextXy,
      rotateIndex: nextRotateIndex,
      timeStamp: this.timeStamp
    }
  }
  fall(n = 1) {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0] + n, this.xy[1]],
      rotateIndex: this.rotateIndex,
      timeStamp: Date.now()
    }
  }
  right() {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0], this.xy[1] + 1],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp
    }
  }
  left() {
    return {
      shape: this.shape,
      type: this.type,
      xy: [this.xy[0], this.xy[1] - 1],
      rotateIndex: this.rotateIndex,
      timeStamp: this.timeStamp
    }
  }
}

export default Block
