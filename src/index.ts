export const sum = (addends: string[]): string => {
  let variableName = ''

  const constants = addends
    .filter(a => /^-?\d+(\.\d+)?$/.test(a))
    .reduce((a, b) => a + parseInt(b), 0)

  const coeficcients = addends
    .filter(a => /[A-Z]/.test(a))
    .reduce((a, b) => {
      if(b.match(/[A-Z]/)) {
        variableName = b.match(/[A-Z]/)![0]
      }
      const coeficcient = b.match(/-?\d+(\.\d+)?/)
      return a + (coeficcient && coeficcient[0] ? parseInt(coeficcient[0]) : 1)
    }, 0)

  return constants !== 0 ? String(constants) : `${coeficcients === 1 ? '' : coeficcients}${variableName}`
}

export const derivative = (expression: string): string => {
  const addends = expression.replace(/ /g, '').split('+')

  return sum(addends.map((addend) => {
    const [base, exponent] = addend.split('^')
    const variable = addend.match(/[A-Z]/)

    if (!variable?.length) {
      return '0'
    } else if (exponent) {
      return `${exponent}${variable[0]}`
    } else if (base === variable[0]) {
      return '1'
    } else {
      const coeficcient = base.replace(variable[0], '')
      return `${coeficcient.length > 0 ? parseInt(coeficcient) : 1}`
    }
  }))
}

