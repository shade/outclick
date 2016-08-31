# outclick 👉
![code style : standard](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)
![build : passing](https://img.shields.io/badge/build-passing-brightgreen.svg)

A library used to detect DOM clicks outside specific elements, useful for closing menus

![Example use .gif](https://raw.githubusercontent.com/joe-tom/outclick/master/test/outclick.gif)

## Warning
If you don't specifiy otherwise, this library will alter the addEventListener and removeEventListener properties. This should be okay for most cases but may lead to complications with other libraries. 

## Installation
You can download the latest [release](https://raw.githubusercontent.com/joe-tom/outclick/master/release/outclick.min.js) or install it as an npm package
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
the exceptions parameter, is an array of elements that are an exception to the outclick event.
```javascript
var menu = document.getElementById('menu')
var exceptions = [
 document.getElementById('menuBtn'),
 document.getElementById('dontCloseTheMenu')
]

menu.addEventListener('outclick', function (e) {
	hide(menu)
}, exceptions)
```
removing a listener is the same, however we've modified addEventListener to return the listening function to make it easier for you e.g.

```javascript
var menu = document.getElementById('menu')

var menuFunc = menu.addEventListener('outclick', function (e) {
	hide(menu)
})

menu.removeEventListener('outclick', menuFunc)
```

Alternatively, you can also use the html attribute outclick to trigger an event.
This does not handle dynamic HTML, and we have no plans to add that, yet
```html
<div outclick="someFunc()"></div>
```
## Defined Methods and Attributes
### Node.addEventListener('outclick', listener, exceptions)
This is like the normal addEventListener except it works for an outclick event

**listener** - the function to be executed on an outclick

**exceptions** - the exceptions to the outclick event, the current node is automatically one

### Node.removeEventListener('outclick', listener)
This is like the normal removeEventListener except it works for the outclick events

**listener** - the function to be executed on an outclick
### Node.onoutclick













