import jsc from 'jsverify'
import { derivative, sum } from '../src/index'

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

describe('sum', () => {
  it('sum of a number is itself', () => {
    expect(sum(["12"])).toBe("12")
  })

  it('sum of a variable is itself', () => {
    expect(sum(["A"])).toBe("A")
  })

  it('sum of several numbers is just their sum', () => {
    expect(sum(["12", "1", "1"])).toBe("14")
  })

  it('sum of A and A is 2A', () => {
    expect(sum(["A", "A"])).toBe("2A")
  })

  it('sum of 2A and 4A is 6A', () => {
    expect(sum(["2A", "4A"])).toBe("6A")
  })

  it('sum of 2B and 4B is 6B', () => {
    expect(sum(["2B", "4B"])).toBe("6B")
  })
})
