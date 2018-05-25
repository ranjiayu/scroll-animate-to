
window._scrollLock = false
window._scrollTasks = []
if (!window.requestAnimationFrame){
  window.requestAnimationFrame = (fn) => {
    return setTimeout(fn, 17)
  }
}

class ScrollTo {
  /*
   * @param {Object}           option
   * @param {HTMLElement}      option.container    default is "window"
   * @param {HTMLElement}      option.target       the element scroll to
   * @param {Function|string}  option.animationFn  default to "easeIn".You can choose "easeOut","easeInOut","linear"
   * @param {Function}         option.callback     callback function
   * @param {number}           option.duration     the scroll cost time, default 1000(ms)
   * @param {string}           option.axis         "axis" would be "x" or "y". Default is "y"
  */
  constructor(options){
    let { container = window, target, animationFn, duration=1000, callback = ()=>{}, axis='y' } = options
    this.container = container
    this.target = target
    this.animation = null
    this.duration = Math.ceil(duration / 17)
    this.callback = callback
    this.axis = axis

    this.yDistance = 0
    this.xDistance = 0

    this.startTime = 0
    this.animationFns = {
      linear(t, b, c, d){
        return c * t / d + b
      },
      easeIn(t, b, c, d){
        return c * (t /= d) * t + b
      },
      easeOut(t, b, c, d){
        return -c *(t /= d)*(t-2) + b
      },
      easeInOut(t, b, c, d){
        if ((t /= d / 2) < 1) return c / 2 * t * t + b
        return -c / 2 * ((--t) * (t-2) - 1) + b
      }
    }
    if (typeof animationFn === 'string'){
      if (animationFn in this.animationFns){
        this.animation = this.animationFns[animationFn]
      }
    }else if (typeof animationFn == 'function'){
      this.animation = animationFn
    }else{
      this.animation = this.animationFns.easeIn
    }
    this.getDistance()
  }

  isEdge(){
    return navigator.userAgent.indexOf('Edge') !== -1
  }

  // calculate how many px to be scrolled
  getDistance(){
    let e = this.target
    let container = this.container
    let eMeta = e.getBoundingClientRect()
    let { left: selfLeftOffset, top: selfTopOffset } = eMeta
    if (container !== window){
      let { left: parentLeftOffset, top: parentTopOffset } = container.getBoundingClientRect()
      this.yDistance = selfTopOffset - parentTopOffset
      this.xDistance = selfLeftOffset - parentLeftOffset
    }else{
      this.yDistance = selfTopOffset
      this.xDistance = selfLeftOffset
    }
  }

  /*
  To prevent multiple scroll task run at the same time,
  when window._scrollLock is true, other tasks will wait.
  */
  scroll(){
    let axis = this.axis
    this.startTime = 0
    if (window._scrollLock === false && window._scrollTasks.length === 0){
      window._scrollLock = true
      if (axis === 'y'){
        this.yAxisScroll()
      }else if(axis === 'x'){
        this.xAxisScroll()
      }
    }else{
      // push current scroll task into queue.
      window._scrollTasks.push(axis === 'y' ? this.yAxisScroll.bind(this) : this.xAxisScroll.bind(this))
    }
  }

  yAxisScroll(){
    let nextTask = null
    let duration = this.duration
    let from = this.container === window ? window.pageYOffset : this.container.scrollTop
    let to = this.yDistance
    let xAxis = this.container === window ? window.pageXOffset : this.container.scrollLeft
    if (parseInt(to) === 0) return
    let loop = () => {
      let start = this.startTime
      let val = this.animation(start, from, to, duration)
      this.startTime ++
      if (start <= duration){
        if (!this.isEdge()){
          this.container.scroll(xAxis, val)
        }else{
          this.container.scrollTop = val
        }
        window.requestAnimationFrame(loop)
      }else{
        this.callback()
        window._scrollLock = false
        nextTask = window._scrollTasks.length >= 1 ? window._scrollTasks.shift(): null
        if (nextTask) {
          nextTask()
        }
      }
    }
    window.requestAnimationFrame(loop)
  }

  xAxisScroll(){
    let nextTask = null
    let duration = this.duration
    let from = this.container === window ? window.pageXOffset : this.container.scrollLeft
    let to = this.xDistance
    let yAxis = this.container === window ? window.pageYOffset : this.container.scrollTop
    if (parseInt(to) === 0) return
    let loop = () => {
      let start = this.startTime
      let val = this.animation(start, from, to, duration)
      this.startTime ++
      if (start <= duration){
        if (!this.isEdge()){
          this.container.scroll(val, yAxis)
        }else{
          this.container.scrollLeft = val
        }
        
        window.requestAnimationFrame(loop)
      }else{
        this.callback()
        window._scrollLock = false
        nextTask = window._scrollTasks.length >= 1 ? window._scrollTasks.shift(): null
      }
      if (nextTask){
        nextTask()
      }
    }
    window.requestAnimationFrame(loop)
  }
}


if (window) window.ScrollTo = ScrollTo

export default ScrollTo