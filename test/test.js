var assert = chai.assert
var clear = function () {
  box1.removeAttribute('data-test')
  box2.removeAttribute('data-test')
  box3.removeAttribute('data-test')
}
box1.onoutclick = function () {
  box1.setAttribute('data-test','GOOD')
}
var eventListen = box2.addEventListener('outclick', function () {
  box2.setAttribute('data-test','GOOD')
})
var box3func = function () {
	box3.setAttribute('data-test','GOOD')
}

mocha.setup('bdd')

describe('box1', function () {
  it('Should have no data-test value', function () {
  	clear()
    assert(!box1.getAttribute('data-test'),'data-test is empty')
  })
  it('Should have the value of GOOD now', function () {
  	testBtn.click()
  	assert.equal(box1.getAttribute('data-test'),'GOOD')
  	clear()
  })
  it('Should make this equal to it', function () {
    box1.onoutclick = function () {
      assert.equal(this,box1,'The same!')
    }
    testBtn.click()
    clear()
  })
  it('Should not change in value now', function () {
  	box1.onoutclick = null
  	testBtn.click()
  	assert(!box1.getAttribute('data-test'),'data-test is empty')
  	clear()
  })
})

describe('box2', function () {
  it('Should have no data-test value', function () {
    clear()
    assert(!box2.getAttribute('data-test'),'data-test is empty')
  })
  it('Should have the value of GOOD now', function () {
    testBtn.click()
    assert.equal(box2.getAttribute('data-test'),'GOOD')
    clear()
  })
  it('Should make this equal to it', function () {
    box2.addEventListener('outclick', function () {
      assert.equal(this,box2,'The same!')
    })
    testBtn.click()
    clear()
  })
  it('Should have removed the listener', function () {
    box2.removeEventListener('outclick', eventListen)
    testBtn.click()
    assert(!box2.getAttribute('data-test'),'data-test is empty')
    clear()
  })
})

describe('box3', function () {
  it('Should have no data-test value', function () {
    clear()
    assert(!box3.getAttribute('data-test'),'data-test is empty')
  })
  it('Should have the value of GOOD now', function () {
    testBtn.click()
    assert.equal(box3.getAttribute('data-test'),'GOOD')
    clear()
  })
})

mocha.run()