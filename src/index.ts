export const getRegexMatchOrDefault = (str: string, regex: RegExp, defaultResult: string): string => {
  const match = str.match(regex)
  if (match && match[0]) {
    return match[0]
  } else {
    return defaultResult
  }
}

export const sum = (...addends: string[]): string => {
  let variableName = ''

  const constants = addends
    .filter(a => /^-?\d+$/.test(a))
    .reduce((a, b) => a + parseInt(b), 0)

  const coeficcients = addends
    .filter(a => /[A-Z]/.test(a))
    .reduce((a, b) => {
      if (b.match(/[A-Z]/)) {
        variableName = b.match(/[A-Z]/)![0]
      }
      const coeficcient = parseInt(getRegexMatchOrDefault(b, /-?\d+/, '1'))
      return a + coeficcient
    }, 0)

  const formattedVarAndCoefficient = `${coeficcients === 1 || coeficcients === 0 ? '' : coeficcients}${variableName}`
  const formattedConstant = constants !== 0 ? String(constants) : ''
  return `${formattedVarAndCoefficient}${formattedVarAndCoefficient && formattedConstant ? '+' : ''}${formattedConstant}` || '0'
}

const operations = [
  { symbol: '+', rule: (addends: string[]) => sum(...addends.map(derivative)) },
  {
    symbol: '^', rule: ([base, exponent]: string[]) => {
      const variable = base.match(/[A-Z]/) || exponent.match(/[A-Z]/)
      const coeficcient = parseInt(getRegexMatchOrDefault(base, /-?\d+/, '1'))

      if (!variable?.length) {
        return '0' // TODO
      } else {
        return `${parseInt(exponent) * coeficcient}${variable[0]}`
      }
    }
  },
]

const unaryDerivative = (expression: string): string => {
  const variable = expression.match(/[A-Z]/)

  if (!variable?.length) {
    return '0'
  } else if (expression === variable[0]) {
    return '1'
  } else {
    const coeficcient = expression.replace(variable[0], '')
    return `${coeficcient.length > 0 ? parseInt(coeficcient) : 1}`
  }
}

export const derivative = (expression: string): string => {
  expression = expression.replace(/ /g, '')

  const operationsPresent = operations.filter(operation => expression.includes(operation.symbol))
  if (operationsPresent.length === 0) {
    return unaryDerivative(expression)
  }

  return operationsPresent[0].rule(expression.split(operationsPresent[0].symbol))
}
