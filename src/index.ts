export const getRegexMatchOrDefault = (str: string, regex: RegExp, defaultResult: string): string => {
  const match = str.match(regex)
  if(match && match[0]){
    return match[0]
  } else {
    return defaultResult
  }
}

export const sum = (addends: string[]): string => {
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

export const derivative = (expression: string): string => {
  const addends = expression.replace(/ /g, '').split('+')

  return sum(addends.map((addend) => {
    const [base, exponent] = addend.split('^')
    const variable = addend.match(/[A-Z]/)
    const coeficcient = parseInt(getRegexMatchOrDefault(base, /-?\d+/, '1'))

    if (!variable?.length) {
      return '0'
    } else if (exponent) {
      return `${parseInt(exponent)*coeficcient}${variable[0]}`
    } else if (base === variable[0]) {
      return '1'
    } else {
      const coeficcient = base.replace(variable[0], '')
      return `${coeficcient.length > 0 ? parseInt(coeficcient) : 1}`
    }
  }))
}

