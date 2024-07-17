export const getRegexMatchOrDefault = (str: string, regex: RegExp, defaultResult: string): string => {
  const match = str.match(regex)
  if(match && match[0]){
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

type Operation = {
  symbol: string
  rule: (terms: string[]) => string
}

const operations = [
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
  { symbol: '+', rule: (addends: string[]) => sum(...addends.map(derivative)) },
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
  if (!operations.some(operation => expression.includes(operation.symbol))) {
    console.log(expression, unaryDerivative(expression))
    return unaryDerivative(expression)
  }

  let result = '';

  operations.forEach(operation => {
    if (expression.includes(operation.symbol)) {
      const terms = expression.split(operation.symbol)
      console.log({ operation, expression, terms })

      result = operation.rule(terms)
    }
  })

  return result
}

