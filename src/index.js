/**
 * Version: 0.1.0
 * Author: Joseph Thomas
 */
(function(window){
  
  var registeredIds = {}
  var OutClickListeners = [{listener: null, exceptions: []}]

  var addEventListener = Node.prototype.addEventListener
  var removeEventListener = Node.prototype.removeEventListener

  /** This handles any listener set by .onclick prototype property */
  Object.defineProperty(Node.prototype, 'onoutclick', {
    set: function (func) {
      OutClickListeners[0] = {
        exceptions: [this],
        listener: func && func.bind(this)
      }

      return func
    }
  })

  /** This handles all addEventListener */
  window.Node.prototype.addEventListener = function (type, listener, exceptions) {
    if (type == 'outclick') {
      var id = null

      while (registeredIds[(id = (Math.random() * 100000).toString())]) {}
      registeredIds[id] = listener

      exceptions = exceptions || []
      exceptions.push(this)
      OutClickListeners.push({
        exceptions: exceptions,
        listener: listener && listener.bind(this),
        id: id
      })

      return id
    } else {
      addEventListener.apply(this, arguments)
    }
  }

  window.document.addEventListener('click', function(e){
    for(var i = OutClickListeners.length; i--;){
      var listener = OutClickListeners[i]
      var contains = false

      for(var g = listener.exceptions.length; g--;){
        if (listener.exceptions[g].contains(e.target)) {
          contains = true
          break
        }
      }

      if(!contains){
        listener.listener && listener.listener(e)
      }
    }
  })

  /** Getting rid of event listeners */
  window.Node.prototype.removeEventListener = function (event, listener) {
    if (event == 'outclick') {
      var id = -1

      if (typeof listener == 'function') {
        for(i in registeredIds){
          if (listener.toString() == registeredIds[i].toString()) {
            id = i
            break
          }
        }
      } else {
        id = listener
      }
      for(var i = OutClickListeners.length; i--;){
        var outListener = OutClickListeners[i]
        if(outListener.id == id) {
          OutClickListeners.splice(i,1)
          break
        }
      }
    } else {
      removeEventListener.apply(this, arguments)
    }
  } 

  /** This handles the HTML onclick property */
  var elements = document.querySelectorAll('[outclick]')

  ;[].forEach.call(elements, function(e){
    var outclick = e.getAttribute('outclick')
    var func = Function(outclick)
    OutClickListeners.push({
      listener: func,
      exceptions: [e]
    })
  })

})(window)