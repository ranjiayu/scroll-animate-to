# scroll-animate-to

A light Javascript library to scroll to the position of element.


## Useage

```javascript
let header = document.getElementById('header')
let scrollIns = new ScrollTo({
    target: header,
    animationFn: 'easeOut',
    duration: 1500
})
scrollIns.scroll()
```


## API

new ScrollTo(option)

* @param {Object}           option
* @param {HTMLElement}      option.container    default is "window"
* @param {HTMLElement}      option.target       the element scroll to
* @param {Function|string}  option.animationFn  "easeIn", "easeOut", "easeInOut", "linear". Default is "easeIn". And you can custom the function.
* @param {Function}         option.callback     callback function
* @param {number}           option.duration     the scroll cost time, default 1000(ms)
* @param {string}           option.axis         "axis" would be "x" or "y". Default is "y"

## License

MIT
