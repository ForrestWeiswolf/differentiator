import jsc from 'jsverify'
import derivative from '../src/index'

describe('derivative', () => {
  jsc.property(
    "derivative of a number is 0",
    jsc.integer(-1000, 1000), i => derivative(`${i}`) === '0'
  )

  it('derivative of a variable is 1', () => {
    expect(derivative('X')).toBe("1")
  })

  it('derivative 0X is 0', () => {
    expect(derivative('0X')).toBe("0")
  })

  jsc.property(
    "derivative of CX is C",
    jsc.integer(-1000, 1000), i => derivative(`${i}X`) === `${i}`
  )

  jsc.property(
    "derivative of XC is C",
    jsc.integer(-1000, 1000), i => derivative(`X${i}`) === `${i}`
  )

  jsc.property(
    "derivative of X + C is 1",
    jsc.integer(-1000, 1000), i => derivative(`X + ${i}`) === '1'
  )

  jsc.property(
    "derivative of C + X is 1",
    jsc.integer(-1000, 1000), i => derivative(`X + ${i}`) === '1'
  )

  jsc.property(
    "derivative of X^C is CX",
    jsc.integer(-1000, 1000), i => derivative(`X^${i}`) === `${i}X`
  )
})
