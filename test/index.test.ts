import jsc from 'jsverify'
import derivative from '../src/index'

describe('derivative', () => {
  jsc.property(
    "derivative of a number is 0",
    jsc.integer(-1000, 1000), i => derivative(`${i}`) === 0
  )

  it('derivative of a variable is 1', () => {
    expect(derivative('X')).toBe(1)
  })

  jsc.property(
    "derivative of NX is N",
    jsc.integer(-1000, 1000), i => derivative(`${i}X`) === i
  )
})
