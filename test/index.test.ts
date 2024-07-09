import jsc from 'jsverify'
import { derivative, sum } from '../src/index'
import { checkEqualityAndPrint } from './utils'

describe('derivative', () => {
  jsc.property(
    "derivative of a number is 0",
    jsc.integer(-1000, 1000), i => checkEqualityAndPrint(derivative(`${i}`), '0', String(i))
  )

  it('derivative of a variable is 1', () => {
    expect(derivative('X')).toBe("1")
  })

  it('derivative 0X is 0', () => {
    expect(derivative('0X')).toBe("0")
  })

  it('derivative of CX is C"', () => {
    expect(derivative('12X')).toBe('12')
  })

  jsc.property(
    "derivative of XC is C",
    jsc.integer(-1000, 1000), i => checkEqualityAndPrint(derivative(`X${i}`), `${i}`, String(i))
  )

  jsc.property(
    "derivative of X^C is C",
    jsc.integer(2, 1000), i => checkEqualityAndPrint(derivative(`X^${i}`), `${i}X`, String(i))
  )

  jsc.property(
    "derivative of X + C is 1",
    jsc.integer(-1000, 1000), i => checkEqualityAndPrint(derivative(`X + ${i}`), '1', String(i))
  )

  jsc.property(
    "derivative of C + X is 1",
    jsc.integer(-1000, 1000), i => checkEqualityAndPrint(derivative(`X + ${i}`), '1', String(i))
  )

  describe('sum rule', () => {
    jsc.property(
      "derivative of AX + BX is A+B",
      jsc.integer(-1000, 1000), jsc.integer(-1000, 1000),
      (a, b) => derivative(`${a}X + ${b}X`) === `${a + b}`
    )
  })
})

describe('sum', () => {
  it('sum of a number is itself', () => {
    expect(sum(["12"])).toBe("12")
  })

  it('sum of a variable is itself', () => {
    expect(sum(["A"])).toBe("A")
  })

  it('sum of an expression including a variable is itself', () => {
    expect(sum(["5A"])).toBe("5A")
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
