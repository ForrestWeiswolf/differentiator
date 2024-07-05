export const sum = (addends: string[]): string => {
  let variableName = ''

  const constants = addends
    .filter(a => /^-?\d+(\.\d+)?$/.test(a))
    .reduce((a, b) => a + parseFloat(b), 0)

  const coeficcients = addends
    .filter(a => /[A-Z]/.test(a))
    .reduce((a, b) => {
      if(b.match(/[A-Z]/)) {
        variableName = b.match(/[A-Z]/)![0]
      }
      const coeficcient = b.match(/\d+(\.\d+)?/)
      console.log(coeficcient)
      return a + (coeficcient && coeficcient[0] ? parseFloat(coeficcient[0]) : 1)
    }, 0)

  return constants > 0 ? String(constants) : `${coeficcients === 1 ? '' : coeficcients}${variableName}`
}

export const derivative = (expression: string): string => {
  expression = expression.replace(/ \+.+/, '')
  const variable = expression.match(/[A-Z]/)
  const [base, exponent] = expression.split('^')

  if (!variable?.length) {
    return '0'
  }
  else if (exponent) {
    return `${exponent}${variable[0]}`
  } else if (base === variable[0]) {
    return '1'
  } else {
    return `${parseInt(base.replace(variable[0], '')) || 0}`
  }
}

