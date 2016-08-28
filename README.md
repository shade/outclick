# outclick 👉
A library used to detect DOM clicks outside a specific element



## Warning
If you don't specifiy otherwise, this library will alter the addEventListener property. This should be okay for most cases but may lead to complications with other libraries. 

## Installation
You can download the latest release or install it as an npm package
```javascript
npm install --save outclick
```

## Basic Usage
Using outclick you can register event listeners on DOM elements to detect whether another element that was that element or another element inside it was clicked.
The most common use of this is in menus.

```javascript
var menu = document.getElementById('menu')

menu.onoutclick = function () {
	hide(menu)
}
```

this can also be done using the addEventListener method

```javascript
var menu = document.getElementById('menu')

menu.addEventListener('outclick', function (e) {
	hide(menu)
})

```

Alternatively, you can also use the html attribute outclick to trigger an event
```html
<div outclick="someFunc()"></div>
```

## Methods

### 