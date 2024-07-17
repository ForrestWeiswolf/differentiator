import jsc from 'jsverify'
import { derivative, sum } from '../src/index'
import { checkEqualityAndPrint } from './utils'

describe('derivative', () => {
  jsc.property(
    "derivative of a number is 0",
    jsc.integer(-1000, 1000), i => checkEqualityAndPrint(derivative(`${i}`), '0', String(i))
  )

  it('derivative of a numerical expression is 0', () => {
    expect(derivative('1+1+1')).toBe("0")
    expect(derivative('2^8')).toBe("0")
  })

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
    "derivative of 2X^C is 2C",
    jsc.integer(2, 1000), i => checkEqualityAndPrint(derivative(`2X^${i}`), `${i*2}X`, String(i))
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
      (a, b) => checkEqualityAndPrint(derivative(`${a}X + ${b}X`), `${a + b}`, `${a}, ${b})`)
    )

    jsc.property(
      "derivative of X^2 + CX is 2X+C",
      jsc.integer(1, 1000),
      (i) => checkEqualityAndPrint(derivative(`X^2 + ${i}X`), `2X+${i}`)
    )

    jsc.property(
      "derivative of AX^2 + BX is 2A+B",
      jsc.integer(1, 1000), jsc.integer(1, 1000),
      (a, b) => checkEqualityAndPrint(derivative(`${a}X^2 + ${b}X`), `${2 * a}X+${b}`, `${a}, ${b})`)
    )
  })
})

describe('sum', () => {
  it('sum of a number is itself', () => {
    expect(sum(["12"])).toBe("12")
  })

  it('sum of a variable is itself', () => {
    expect(sum(["A"], 'A')).toBe("A")
  })

  it('sum of an expression including a variable is itself', () => {
    expect(sum(["5A"], 'A')).toBe("5A")
  })

  it('sum of several numbers is just their sum', () => {
    expect(sum(["12", "1", "1"], 'A')).toBe("14")
  })

  it('sum of A and A is 2A', () => {
    expect(sum(["A", "A"], 'A')).toBe("2A")
  })

  it('sum of two expressions with same variable', () => {
    expect(sum(["2A", "4A"], 'A')).toBe("6A")
    expect(sum(["2B", "4B"], 'B')).toBe("6B")
  })

  it('sum of a variable and a constant', () => {
    expect(sum(["2A", "7"], 'A')).toBe("2A+7")
  })
})
