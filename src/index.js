/**
 * Version: 0.0.1
 * Author: Joseph Thomas
 */
(function(window){
  
  var OutClickListeners = [{listener: null, exceptions: []}]

  var addEventListener = Node.prototype.addEventListener

  /** This handles any listener set by .onclick prototype property */
  Object.defineProperty(Node.prototype, 'onoutclick', {
    set: function (func) {
      OutClickListeners[0] = {
        exceptions: [this],
        listener: func
      }

      return func
    }
  })

  /** This handles all addEventListener */
  window.Node.prototype.addEventListener = function (type, listener, exceptions) {
    if (type == 'outclick') {
      exceptions = exceptions || []
      exceptions.push(this)
      OutClickListeners.push({
        exceptions: exceptions,
        listener: listener
      })
    } else {
      addEventListener.apply(this,arguments)
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

  /** This handels the HTML onclick property */
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