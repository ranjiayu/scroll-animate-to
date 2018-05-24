# scroll-animate-to

A light Javascript library to scroll to the position of element.

[DEMO](http://www.baidu.com)

## Install

npm i scroll-animate-to

## Useage

```javascript
import ScrollTo from 'scroll-animate-to'

let header = document.getElementById('header')
let scrollIns = new ScrollTo({
    target: header,
    animationFn: 'easeOut',
    duration: 1500
})
scrollIns.scroll()
```

Or

```html
<script src="/path/to/scroll-animate-to.min.js"></script>
```

More detail see [DEMO](http://www.baidu.com)


## API

new ScrollTo(option)

* @param {Object}           option
* @param {HTMLElement}      option.container    default is window. You can set element which has scroll bar
* @param {HTMLElement}      option.target       the element scroll to
* @param {Function|string}  option.animationFn  "easeIn", "easeOut", "easeInOut", "linear". Default is "easeIn". And you can custom the function.
* @param {Function}         option.callback     callback function
* @param {number}           option.duration     the scroll cost time, default 1000(ms)
* @param {string}           option.axis         "axis" would be "x" or "y". Default is "y"

## License

MIT
